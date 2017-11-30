function createWorld5() {
	var world = new $$.SubWorld({},{
		fov:45
	});
	world.camera.position.z = 1000;
	world.camera.lookAt(world.scene.position);

	// Load texture first
	var tunnelTexture = new THREE.TextureLoader().load('assets/img/electric.jpg');
	tunnelTexture.wrapT = tunnelTexture.wrapS = THREE.RepeatWrapping;
	tunnelTexture.repeat.set(1, 2);

	// Tunnel Mesh
	var tunnelMesh = new THREE.Mesh(
		new THREE.CylinderGeometry(2000, 100, 6000, 32, 32, true),
		new THREE.MeshBasicMaterial({
			color: 0x2222ff,
			transparent: true,
			alphaMap: tunnelTexture,
			opacity: 0.5,
			side: THREE.BackSide,
		})
	);
	tunnelMesh.rotation.x = Math.PI / 2;
	tunnelMesh.position.z = -3000;
	world.scene.add(tunnelMesh);

	// Starfield
	var geometry = new THREE.Geometry();
	for(i = 0; i < 5000; i++) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 12000 - 6000;
		vertex.y = Math.random() * 12000 - 6000;
		vertex.z = Math.random() * 200 - 100;
		geometry.vertices.push(vertex);
	}
	var starField = new THREE.Points(geometry, new THREE.PointsMaterial({
		size: 0.5,
		color: 0xffff99
	}));
	world.scene.add(starField);
	starField.position.z = -5000;

	var time = new THREE.Clock();

	world.actionInjections.push(function() {
		starField.rotation.z += 0.003;
		tunnelMesh.material.color.setHSL(Math.abs(Math.cos((time.getElapsedTime() / 10))), 1, 0.5);
		tunnelTexture.offset.y = time.getElapsedTime() / 8;
		tunnelTexture.offset.x = time.getElapsedTime() / 100;
	});
	createSlide();
	function createSlide() {
		var positions, group, planes, slides, len;
		var select = 0;
		var tweenTime = 800;
		var planeWidth = 920;
		var planeHeight = 690;
		var dx = 1200;
		var dz = 600;
		var show = 1;
		var deltaRotation = 30;
		var half = 0;
		var tweening = false;
		var pictureArr = [
			"assets/slide/0.png", "assets/slide/1.png", "assets/slide/world.png", "assets/slide/app.png", "assets/slide/2.png", "assets/slide/demo.png"
		];
		var camera=world.camera;
		var scene=world.scene;
		function init() {
			// CAROUSEL GROUP
			group = new THREE.Object3D();
			scene.add(group);
			
			createPlanes();

			// PLANES
			function createPlanes() {
				len = pictureArr.length;
				planes = [];
				slides = [];

				half = Math.floor((len - 1) / 2);
				positions = [];
				var i, id = 0,
					n = 0;
				for(i = select; i < select + len; i++) {
					id = i;
					if(i >= len) id -= len;
					positions[id] = n;
					n++;
				}

				for(i = 0; i < len; i++) {
					// texture, material
					slides[i] = {
						side: 1,
						dif: 0,
						rotation: 0
					};
					console.log(pictureArr[i])
					var img_texture = $$.Loader.RESOURCE.textures[pictureArr[i]];
					img_texture.needsUpdate = true;
					var img_material = new THREE.MeshBasicMaterial({
						map: img_texture,
						depthWrite: true,
						depthTest: true,
						transparent: true
					});

					// mesh / plane
					var plane = new THREE.Mesh(new THREE.PlaneGeometry(planeWidth, planeHeight), img_material);
					plane.overdraw = true;
					plane.position.x = i * dx;
					group.add(plane);

					planes[i] = plane;
					plane.index = i;
					plane.onClick = function(obj) {
						var i = obj.object.index;
						if(slides[i].dif <= show) {
							gotoImage(i);
						}
					}
				}

				window.addEventListener('mousewheel', wheel, false);
				updatePlanes(true);
			}

			function wheel(event) {
				mouseWheel(event);
				event.preventDefault();
			}

		}

		//________________________________________________________ MOUSE WHEEL
		function mouseWheel(event) {
			var delta = 0;
			if(!event) event = window.event; /* IE  */
			if(event.wheelDelta) { /* IE, Opera. */
				delta = event.wheelDelta / 120;
			} else if(event.detail) { /* Mozilla */
				delta = -event.detail;
			}

			if(delta && tweening === false) gotoDir(delta / Math.abs(delta));
		}

		//________________________________________________________ GOTO DIRECTION < >
		function gotoDir(direction) {
			select++;
			if(select >= len) select = 0;

			var id = 0;
			for(var i = 0; i < len; i++) {
				id = positions[i];
				id += direction;

				if(id < 0) id = len - 1;
				else if(id >= len) id -= len;

				positions[i] = id;
			}

			updatePlanes(false);
		}

		//________________________________________________________ UPDATE POSITIONS
		function updatePlanes(fast) {
			var plane_x, plane_z;
			var tween = true;
			var sAlpha = 1;
			var showDetails;
			var tweenRatio = 1;
			var rot = 0;
			var id = 0;
			var time = tweenTime;

			if(fast === true) time = 0;
			var delayScale = 0;
			if(fast === false) delayScale = 0;

			for(var i = 0; i < len; i++) {
				id = positions[i];
				showDetails = false;

				if(id === 0) { // selected
					plane_x = id * dx;
					tween = true;
					sAlpha = 1;
					showDetails = true;
					rot = 0;
					slides[i].side = 0;
					slides[i].dif = 0;
				} else if(id <= half) { // right side
					plane_x = id * dx;

					if(id <= show) sAlpha = 0.5;
					else sAlpha = 0;

					if(id > show + 3) tween = false;
					else tween = true;

					rot = -id * deltaRotation;

					slides[i].side = 1;
					slides[i].dif = id;
				} else { // left side
					id = -(id - len);
					plane_x = -id * dx;

					if(id <= show) sAlpha = 0.5;
					else sAlpha = 0;

					if(id > show + 3) tween = false;
					else tween = true;

					rot = id * deltaRotation;

					slides[i].side = 2;
					slides[i].dif = id;
				}

				if(time !== 0) {
					if(tween === true) tweenRatio = 1;
					else tweenRatio = 0;
				}

				plane_z = id * dz;
				planes[i].visible = tween;

				new TWEEN.Tween(planes[i].position).to({
					x: plane_x,
					z: -plane_z,
				}, time * tweenRatio).delay(delayScale * id * tweenTime / 3).start();

				new TWEEN.Tween(planes[i].rotation).to({
					y: rot * Math.PI / 180,
				}, time * tweenRatio).delay(delayScale * id * tweenTime / 3).start();

				new TWEEN.Tween(planes[i].material).to({
					opacity: sAlpha,
				}, time * tweenRatio).delay(delayScale * id * tweenTime / 3).start();

				tweening = true;
				setTimeout(resetTween, time * 75 / 1000);
			}
		}

		function resetTween() {
			tweening = false;
		}

		function gotoImage(id) {
			select = id;
			var i, dir;

			if(slides[id].side === 0) {
				console.log("click action");
			} else {
				if(slides[id].side === 1) {
					dir = -1;
				} else {
					dir = 1;
				}

				for(i = 0; i < slides[id].dif; i++) {
					setTimeout(gotoDir, i * 100, dir);
				}
			}
		}

		// Init
		init();

		world.actionInjections.push(TWEEN.update);
	}

	return world;
}