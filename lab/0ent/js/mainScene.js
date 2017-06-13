function createMainScene() {
	world = new $$.SubWorld({
		clearColor: 0x000000
	}, {
		far: 30000,
		fov: 50
	});
	world.camera.position.set(400, 400, 400);
	var controls = $$.Controls.createOrbitControls({},world);
	controls.target.set(0, 0, 0);
	controls.minDistance = 250;
	controls.maxDistance = 1000;
	controls.noZoom = false;
	controls.maxPolarAngle = Math.PI / 2.4;
	controls.update();
	world.camera.lookAt(world.scene.position);

	//$$.Component.createSkybox("texture/skybox.jpg", 20000, world);
	//$$.Component.createSea({ texture: "texture/waternormals.jpg", color: 0x999999, alpha: 0.75, width: 20000, height: 20000 }, world);
	world.scene.add(new THREE.AmbientLight(0x444444));
	var directionalLight = new THREE.DirectionalLight(0xdddddd, 0.9);
	directionalLight.position.set(1, 3, 1);
	world.scene.add(directionalLight);
	world.scoreTextPan;
	var wordMeterial = new THREE.MeshLambertMaterial({
		color: 0xffbb88
	});
	var theMap;
	var curveArr = [];

	function makeSoundArr() {
		for(var i in curveSound) {
			soundPlayerArr.push([]);
			for(var j in curveSound[i]) {
				var sound = new THREE.Audio(listener);
				sound.setBuffer($$.global.RESOURCE.sounds[soundArr[curveSound[i][j]]]);
				sound.setVolume(0.75);
				soundPlayerArr[i].push(sound);
			}
		}
	}

	function animateCreatePan() {
		for(let i = 0; i < theMap.map.length; i++) {
			for(let j = 0; j < theMap.map[i].length; j++) {
				var rndint = $$.rndInt(3000);
				var timer = new $$.Component.Timer({
					life: rndint,
					duration: rndint,
					onStart: function() {},
					onRepeat: function() {},
					onEnd: function() {
						if(theMap.map[i][j] == 0) {
							curveArr[i][j] = "empty";
							return;
						} else if(theMap.map[i][j] == 1) {
							var obj = curvePanManager.createStonePan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap.map);
							world.scene.add(obj.group);
							curveArr[i][j] = "stone";
						} else if(theMap.map[i][j] == 2) {
							var obj = curvePanManager.createCurvePan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap.map);
							world.scene.add(obj.group);
							curveArr[i][j] = obj;
						} else if(theMap.map[i][j] == -1) {
							var obj = curvePanManager.createEmptyPan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap.map);
							world.scene.add(obj.group);
							curveArr[i][j] = "0";
						} else if(theMap.map[i][j] == 9) {
							var obj = curvePanManager.createScorePan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap.map);

//							var word = new THREE.Mesh(
//								new THREE.TextGeometry("0", options),
//								wordMeterial
//							);
//							word.position.set(options.size * 0.5, curvePanManager.stonePanHeight / 2, options.size * 0.41);
//							word.rotation.x = -Math.PI / 2;
//							word.rotation.z = Math.PI / 6 + Math.PI / 3;
//							world.scoreTextPan = obj;
//							obj.group.add(word);

							world.scene.add(obj.group);
							curveArr[i][j] = "stone";
						} else if(theMap.map[i][j] == 8) {
							var obj = curvePanManager.createCurvePan();
							curvePanManager.setPositionByIJ(obj.group, i, j, theMap.map);
							world.scene.add(obj.group);
							curveArr[i][j] = "stone";
							var pan = obj.group.children[0];

							pan.onDown = function(obj) {
								var thePan = obj.object.parent.owner;
								if(world.currentUserPan) {
									var panTarget = world.currentUserPan;

									var arr1 = [];
									for(var i = 0; i < panTarget.group.children.length; i++) {
										if(panTarget.group.children[i].isOriginCurve) {
											arr1.push(panTarget.group.children[i]);
											panTarget.group.remove(panTarget.group.children[i]);
											i--;
										} else if(panTarget.group.children[i].isBlue) {
											panTarget.group.remove(panTarget.group.children[i]);
											i--;
										}
									}
									var arr2 = [];
									for(var i = 0; i < thePan.group.children.length; i++) {
										if(thePan.group.children[i].isOriginCurve) {
											arr2.push(thePan.group.children[i]);
											thePan.group.remove(thePan.group.children[i]);
											i--;
										}
									}
									for(var i = 0; i < 6; i++) {
										thePan.group.add(arr1[i]);
										panTarget.group.add(arr2[i]);
									}
									var tmpArr = panTarget.pointIndexArr;
									panTarget.pointIndexArr = thePan.pointIndexArr;
									thePan.pointIndexArr = tmpArr;
									var tmpR = panTarget.group.rotateTimes;
									panTarget.group.rotateTimes = thePan.group.rotateTimes;
									thePan.group.rotateTimes = tmpR;
									panTarget.group.rotation.y = Math.PI / 3 * panTarget.group.rotateTimes;
									thePan.group.rotation.y = Math.PI / 3 * thePan.group.rotateTimes;

									var id = curvePanManager.formPanToPanIndex(world.lastUserPan, world.currentStartPoint, panTarget);
									if(panTarget.banInputId != null) {
										panTarget.banInputId = id;
									}
									for(var i = 0; i < 12; i++) {
										if(panTarget.pointIndexArr[i] == id) {
											curvePanManager.addACurveInPan(panTarget, i);
											panTarget.group.children[panTarget.group.children.length - 1].isTmp = true;
											world.currentUserPan = panTarget;
											break;
										}
									}
								}
							}
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
	world.homeBtn = document.getElementById("homeBtn");

	var width = $$.getWorldWidth();
	var height = $$.getWorldHeight();
	if(width > height) {
		world.leftBtn.style.maxWidth = (height / 6) + "px";
		world.rightBtn.style.maxWidth = (height / 6) + "px";
		world.leftBtn.style.maxHeight = (height / 6) + "px";
		world.rightBtn.style.maxHeight = (height / 6) + "px";
		world.homeBtn.style.maxHeight = (height / 6) + "px";
		world.homeBtn.style.maxHeight = (height / 6) + "px";
	} else {
		world.leftBtn.style.maxWidth = (width / 5) + "px";
		world.rightBtn.style.maxWidth = (width / 5) + "px";
		world.leftBtn.style.maxHeight = (width / 5) + "px";
		world.rightBtn.style.maxHeight = (width / 5) + "px";
		world.homeBtn.style.maxHeight = (height / 5) + "px";
		world.homeBtn.style.maxHeight = (height / 5) + "px";
	}

	world.score = 0;
	world.scoreStep = 0;
	world.sinColor = {};

	function setScore(score) {
		var group = world.scoreTextPan.group;
		group.remove(group.children[group.children.length - 1]);
		var word = new THREE.Mesh(
			new THREE.TextGeometry("" + score, options),
			wordMeterial
		);
		var len = (score + "").length;
		//options.size * 0.5, curvePanManager.stonePanHeight / 2, options.size * 0.82
		word.position.set(options.size * 0.5, curvePanManager.stonePanHeight / 2, options.size * 0.41 * len);
		word.rotation.x = -Math.PI / 2;
		word.rotation.z = Math.PI / 6 + Math.PI / 3;
		group.add(word);
	}

	function gameOver() {
		world.currentUserPan = null;
		for(let i = 0; i < curveArr.length; i++) {
			for(let j = 0; j < curveArr[i].length; j++) {
				if(typeof curveArr[i][j] == "object") {
					var group = curveArr[i][j].group;
					for(var k = 0; k < group.children.length; k++) {
						if(group.children[k].isOriginCurve) {
							group.remove(group.children[k]);
							k--;
						}
					}
				}
			}
		}
	}

	function makeStartPan() {
		world.leftBtn.style.display = "";
		world.rightBtn.style.display = "";
		var startPoint = $$.rndInt(12);
		world.currentStartPoint = startPoint;
		var direction = curvePanManager.pointToDirection(0, startPoint);
		var indexIJ = curvePanManager.directionToIJ(theMap.startPoint, direction);
		var obj = curvePanManager.createCurvePan();
		curvePanManager.setPositionByIJ(obj.group, indexIJ.i, indexIJ.j, theMap.map);
		world.scene.add(obj.group);
		curveArr[indexIJ.i][indexIJ.j] = obj;
		obj.group.children[0].onDown = panSureClick;
		world.sinColor = new SinPanColorer(obj.group.children[0]);
		world.actionInjections.push(world.sinColor.update);

		function panSureClick(obj) {
			world.scoreStep++;
			var pan = obj.object.parent.owner;
			obj.object.onDown = null;
			world.lastUserPan = world.currentUserPan;
			world.currentUserPan = null;
			world.currentEndPoint = world.currentStartPoint;
			world.currentStartPoint = world.lastUserPan.secondPoint;
			var direction = curvePanManager.pointToDirection(world.lastUserPan.group.rotateTimes, world.currentStartPoint);
			var zb = curvePanManager.directionToIJ(world.lastUserPan.group, direction);
			if(curveArr[zb.i][zb.j] == 0) {
				var soundPlayerArrI = soundPlayerArr[Math.min(9, world.scoreStep) - 1];
				var soundIndex = $$.rndInt(soundPlayerArrI.length);
				var soundPlayer = soundPlayerArrI[soundIndex];
				if(soundPlayer.isPlaying) {
					soundIndex = (soundIndex + 1) % soundPlayerArrI.length;
					soundPlayer = soundPlayerArrI[soundIndex];
				}
				soundPlayer.play();
				var obj = curvePanManager.createCurvePan();
				world.sinColor.pan.material.emissive.setHex(0);
				world.sinColor.pan = obj.group.children[0];
				curvePanManager.setPositionByIJ(obj.group, zb.i, zb.j, theMap.map);
				world.scene.add(obj.group);
				curveArr[zb.i][zb.j] = obj;
				world.currentUserPan = obj;
				obj.group.children[0].onDown = panSureClick;
				var id = curvePanManager.formPanToPanIndex(world.lastUserPan, world.currentStartPoint, obj);
				for(var i = 0; i < 12; i++) {
					if(obj.pointIndexArr[i] == id) {
						curvePanManager.addACurveInPan(obj, i);
						obj.group.children[obj.group.children.length - 1].isTmp = true;
						world.currentUserPan = obj;
						break;
					}
				}
				world.score += world.scoreStep;
				world.scoreStep = 0;
				setScore(world.score);
			} else if(curveArr[zb.i][zb.j] == "stone" || curveArr[zb.i][zb.j] == "empty") {
				var soundPlayerArrI = soundPlayerArr[Math.min(9, world.scoreStep) - 1];
				var soundIndex = $$.rndInt(soundPlayerArrI.length);
				var soundPlayer = soundPlayerArrI[soundIndex];
				if(soundPlayer.isPlaying) {
					soundIndex = (soundIndex + 1) % soundPlayerArrI.length;
					soundPlayer = soundPlayerArrI[soundIndex];
				}
				soundPlayer.play();

				world.score += world.scoreStep;
				world.scoreStep = 0;
				world.sinColor.destroy();
				world.sinColor.pan.material.emissive.setHex(0);
				setScore(world.score);
				gameOver();
				//alert("Game Over");
			} else {
				var obj = curveArr[zb.i][zb.j];
				world.currentUserPan = obj;
				var id = curvePanManager.formPanToPanIndex(world.lastUserPan, world.currentStartPoint, obj);
				if(id == obj.banInputId) {
					var soundPlayerArrI = soundPlayerArr[Math.min(9, world.scoreStep) - 1];
					var soundIndex = $$.rndInt(soundPlayerArrI.length);
					var soundPlayer = soundPlayerArrI[soundIndex];
					if(soundPlayer.isPlaying) {
						soundIndex = (soundIndex + 1) % soundPlayerArrI.length;
						soundPlayer = soundPlayerArrI[soundIndex];
					}
					soundPlayer.play();

					world.score += world.scoreStep;
					world.scoreStep = 0;
					world.sinColor.destroy();
					world.sinColor.pan.material.emissive.setHex(0);
					setScore(world.score);
					gameOver();
				} else {
					for(var i = 0; i < 12; i++) {
						if(obj.pointIndexArr[i] == id) {
							curvePanManager.addACurveInPan(obj, i);
							obj.group.children[obj.group.children.length - 1].isTmp = true;
							world.currentUserPan = obj;
							break;
						}
					}
					world.score += world.scoreStep;
					panSureClick({ object: obj.group.children[0] });
				}

			}
		}

		var id = curvePanManager.formPanToPanIndex(world.lastUserPan, startPoint, obj);
		obj.banInputId = id;
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
					var id = curvePanManager.formPanToPanIndex(world.lastUserPan, world.currentStartPoint, obj);
					if(obj.banInputId != null) {
						obj.banInputId = id;
					}
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
		world.homeBtn.onclick=function(){
			for(var i in curveArr){
				
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
					if(obj.banInputId != null) {
						obj.banInputId = id;
					}
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
	//startGame(1);
	function startGame(index) {
		theMap = maps[index];
		curveArr = [];
		for(var i in theMap.map) {
			curveArr.push([]);
		}

		animateCreatePan();

//		new $$.Component.Timer({
//			life: 5500,
//			duration: 5500,
//			onEnd: makeStartPan
//		}, world).start();
	}
	startHomePage();

	function startHomePage() {
		var levelArr = [];
		var group=createLevelBtn(3);
		levelArr.push(group);
		group=createLevelBtn(2);
		group.position.set(curvePanManager.panRadius*3.464,0,0);
		levelArr.push(group);
	}
	
	function createLevelBtn(index){
		var group = new THREE.Group();
		var geometry = new THREE.CylinderBufferGeometry(curvePanManager.panRadius * 2, curvePanManager.panRadius * 2, curvePanManager.stonePanHeight, 6);
		var cylinder = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
			color: 0xffffff,
			map: $$.global.RESOURCE.textures["texture/"+index+".jpg"]
		}));
		group.add(cylinder);

		var geometry = new THREE.TorusBufferGeometry(curvePanManager.panRadius * 1.8, curvePanManager.panRadius / 5, 4, 6);
		var torus = new THREE.Mesh(geometry, curvePanManager.stonePanMaterial);
		torus.position.y = curvePanManager.stonePanHeight / 2;
		torus.rotation.x = Math.PI / 2;
		torus.rotation.z = Math.PI / 6;
		group.add(torus);
		world.scene.add(group);
		
		group.children[0].onClick = function(obj) {
			var group = obj.object.parent;
			var tween = new TWEEN.Tween(group.position)
				.to({ y: -60 }, 1500).start();
			obj.object.onDown = null;

			new $$.Component.Timer({
				life: 1500,
				duration: 1500,
				onEnd: function(){
					world.scene.remove(group);
					startGame(index);
				}
			}, world).start();
		}
		return group;
	}

	var options = {
		size: curvePanManager.panRadius * 0.5,
		height: 0.5,
		weight: 'normal',
		font: $$.global.RESOURCE.fonts["font/tahomabd.ttf"],
		style: 'normal',
	};

	world.actionInjections.push(TWEEN.update);

	//console.log($$.global.RESOURCE.sounds["media/main.ogg"]);

	var listener = new THREE.AudioListener();
	world.camera.add(listener);
	var sound = new THREE.Audio(listener);
	sound.setBuffer($$.global.RESOURCE.sounds["media/main.ogg"]);
	sound.setLoop(true);
	sound.setVolume(0.5);
	sound.play();

	makeSoundArr();

	return world;
}