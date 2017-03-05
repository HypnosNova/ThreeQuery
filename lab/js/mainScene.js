function createMainScene() {
	world = new $$.SubWorld({
		clearColor: 0x000000
	}, {
		far: 3000000,
		fov: 50
	});
	world.camera.position.set(300, 300, 300);
	var controls = $$.Controls.createOrbitControls(world);
	controls.target.set(0, 0, 0);
	controls.update();
	world.camera.lookAt(world.scene.position);

	$$.Component.createSkybox("texture/skybox.jpg", 2000000, world);
	$$.Component.createSea({ texture: "texture/waternormals.jpg", color: 0x999999, alpha: 0.75 }, world);
	world.scene.add(new THREE.AmbientLight(0x444444));
	var directionalLight = new THREE.DirectionalLight(0xdddddd, 0.9);
	directionalLight.position.set(1, 3, 1);
	world.scene.add(directionalLight);

	var theMap = maps[0];
	var curveArr = [];
	for(var i in theMap) {
		curveArr.push([]);
	}

	function animateCreatePan() {
		for(let i = 0; i < theMap.length; i++) {
			for(let j = 0; j < theMap[i].length; j++) {
				var rndint = $$.rndInt(3000);
				var timer = new $$.Component.Timer({
					life: rndint,
					duration: rndint,
					onStart: function() {},
					onRepeat: function() {},
					onEnd: function() {
						if(theMap[i][j] == 0) {
							return;
						} else if(theMap[i][j] == 1) {
							var obj = curvePanManager.createStonePan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap);
							world.scene.add(obj.group);
							curveArr[i][j] = "stone";
						} else if(theMap[i][j] == 2) {
							var obj = curvePanManager.createCurvePan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap);
							world.scene.add(obj.group);
							curveArr[i][j] = obj;
						} else if(theMap[i][j] == -1) {
							var obj = curvePanManager.createEmptyPan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap);
							world.scene.add(obj.group);
							curveArr[i][j] = "0";
						} else if(theMap[i][j] == 9) {
							var obj = curvePanManager.createScorePan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap);
							world.scene.add(obj.group);
							curveArr[i][j] = "stone";
						}
						obj.group.position.y = -100;
						var tween = new TWEEN.Tween(obj.group.position)
							.easing(TWEEN.Easing.Elastic.InOut)
							.to({ y: 0 }, 3000).start();
					}
				}, world);
				timer.start();
			}
		}
	}

	world.currentUserPan;
	world.currentStartPoint;
	world.lastUserPan = { group: { rotateTimes: 0 } };
	world.currentEndPoint;
	world.leftBtn = document.getElementById("leftBtn");
	world.rightBtn = document.getElementById("rightBtn");

	function makeStartPan() {
		var startPoint = $$.rndInt(12);
		world.currentStartPoint = startPoint;
		var direction = curvePanManager.pointToDirection(0, startPoint);
		var indexIJ = curvePanManager.directionToIJ({ i: 4, j: 4 }, direction);
		var obj = curvePanManager.createCurvePan();
		curvePanManager.setPositionByIJ(obj.group, indexIJ.i, indexIJ.j, theMap);
		world.scene.add(obj.group);

		obj.group.children[0].onClick = panSureClick;

		function panSureClick(obj) {
			var pan = obj.object.parent.owner;
			obj.object.onClick = null;
			world.lastUserPan = world.currentUserPan;
			world.currentUserPan = null;
			world.currentEndPoint = world.currentStartPoint;
			world.currentStartPoint = world.lastUserPan.secondPoint;
			//console.log(world.lastUserPan)
			var direction = curvePanManager.pointToDirection(world.lastUserPan.group.rotateTimes, world.currentStartPoint);
			//console.log(direction);
			//console.log(world.lastUserPan.group)
			var zb = curvePanManager.directionToIJ(world.lastUserPan.group, direction);
			//console.log(zb)
			//console.log(curveArr[zb.i][zb.j])
			if(curveArr[zb.i][zb.j] == 0) {
				var obj = curvePanManager.createCurvePan();
				curvePanManager.setPositionByIJ(obj.group, zb.i, zb.j, theMap);
				world.scene.add(obj.group);
				curveArr[zb.i][zb.j] = obj;
				world.currentUserPan = obj;
				obj.group.children[0].onClick = panSureClick;
				
				console.log(world.lastUserPan);
				console.log(world.currentStartPoint);
				var id = curvePanManager.formPanToPanIndex(world.lastUserPan, world.currentStartPoint, obj);
				console.log(id)
				for(var i = 0; i < 12; i++) {
					if(obj.pointIndexArr[i] == id) {
						curvePanManager.addACurveInPan(obj, i);
						obj.group.children[obj.group.children.length - 1].isTmp = true;
						world.currentUserPan = obj;
						break;
					}
				}
			}
		}

		var id = curvePanManager.formPanToPanIndex(world.lastUserPan, startPoint, obj);
		for(var i = 0; i < 12; i++) {
			if(obj.pointIndexArr[i] == id) {
				curvePanManager.addACurveInPan(obj, i);
				obj.group.children[obj.group.children.length - 1].isTmp = true;
				world.currentUserPan = obj;
				break;
			}
		}
		world.leftBtn.onclick = function() {
			world.leftBtn.style.pointerEvents = "none";
			if(world.currentUserPan) {
				var lastCurve = world.currentUserPan.group.children[world.currentUserPan.group.children.length - 1];
				if(lastCurve.isTmp) {
					world.currentUserPan.group.children.splice(world.currentUserPan.group.children.length - 1, 1);
				}
				curvePanManager.clockwisePan(world.currentUserPan, 500, function() {
					var obj = world.currentUserPan;
					//console.log(world.currentUserPan)
					var id = curvePanManager.formPanToPanIndex(world.lastUserPan, world.currentStartPoint, obj);
					//console.log(id)
					for(var i = 0; i < 12; i++) {
						if(obj.pointIndexArr[i] == id) {
							curvePanManager.addACurveInPan(obj, i);
							obj.group.children[obj.group.children.length - 1].isTmp = true;
							world.currentUserPan = obj;
							break;
						}
					}
					world.leftBtn.style.pointerEvents = "auto";
				});
			}
		};
		world.rightBtn.onclick = function() {
			world.rightBtn.style.pointerEvents = "none";
			if(world.currentUserPan) {
				var lastCurve = world.currentUserPan.group.children[world.currentUserPan.group.children.length - 1];
				if(lastCurve.isTmp) {
					world.currentUserPan.group.children.splice(world.currentUserPan.group.children.length - 1, 1);
				}
				curvePanManager.anticlockwisePan(world.currentUserPan, 500, function() {
					var obj = world.currentUserPan;
					var id = curvePanManager.formPanToPanIndex(world.lastUserPan, world.currentStartPoint, obj);
					for(var i = 0; i < 12; i++) {
						if(obj.pointIndexArr[i] == id) {
							curvePanManager.addACurveInPan(obj, i);
							obj.group.children[obj.group.children.length - 1].isTmp = true;
							world.currentUserPan = obj;
							break;
						}
					}
					world.rightBtn.style.pointerEvents = "auto";
				});
			}
		};

	}
	animateCreatePan();

	new $$.Component.Timer({
		life: 5500,
		duration: 5500,
		onStart: function() {},
		onEnd: makeStartPan
	}, world).start();

	//	var pi = 11;
	//	var direction = curvePanManager.pointToDirection(0, pi);
	//	console.log(direction)
	//	var indexIJ = curvePanManager.directionToIJ({ i: 4, j: 4 }, direction);
	//	console.log(indexIJ)
	//	var obj = curvePanManager.createCurvePan();
	//	curvePanManager.setPositionByIJ(obj.group, indexIJ.i, indexIJ.j, theMap);
	//	world.scene.add(obj.group);
	//
	//	var geometry = new THREE.SphereBufferGeometry(5, 32, 32);
	//	var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	//	var sphere = new THREE.Mesh(geometry, material);
	//	world.scene.add(sphere);
	//
	//	sphere.position.set(curvePanManager.pointsOut[pi].x, 40, curvePanManager.pointsOut[pi].z);
	//	sphere.position.y = 20;
	//	console.log(sphere.position)
	//	
	//	obj.group.children[0].onClick=function(theobj){
	//		console.log(theobj);
	//		//curvePanManager.clockwisePan(theobj.object.parent);
	//		var id=curvePanManager.formPanToPanIndex({group:{rotate:0}},pi,obj);
	//		console.log(id)
	//		for(var i =0;i<12;i++){
	//			if(obj.pointIndexArr[i]==id){
	//				curvePanManager.addACurveInPan(obj,i);
	//				break;
	//			}
	//		}
	//		
	//		//var idArr=
	//	}
	//
	var options = {
		size: curvePanManager.panRadius * 0.64,
		height: 0.1,
		weight: 'normal',
		font: $$.global.RESOURCE.fonts["font/tahomabd.ttf"],
		style: 'normal',
	};
	var word = new THREE.Mesh(
		new THREE.TextGeometry("99", options),
		new THREE.MeshLambertMaterial({
			color: 0xffbb88
		})
	);
	word.position.set(options.size * 0.5, curvePanManager.stonePanHeight / 2, options.size * 0.82);
	word.rotation.x = -Math.PI / 2;
	word.rotation.z = Math.PI / 6 + Math.PI / 3;
	world.scene.add(word);

	world.actionInjections.push(TWEEN.update);
	return world;
}