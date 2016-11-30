$$.extend = new(function() {
	this.createOrbitControls = function() {
		var camera = $$.global.camera;
		var element = $$.global.canvasDom;
		var controls = new THREE.OrbitControls(camera, element);
		controls.rotateUp(Math.PI / 4);
		controls.target.set(
			camera.position.x + 0.1,
			camera.position.y,
			camera.position.z
		);
		controls.noZoom = true;
		controls.noPan = true;
		$$.controls = controls;
		return controls;
	}
	this.createTrackBallControls = function() {
		var camera = $$.global.camera;
		var scene = $$.global.world;
		controls = new THREE.TrackballControls(camera);
		controls.rotateSpeed = 1;
		controls.minDistance = 1000;
		controls.maxDistance = 1000;
		//		controls.keys = [65, 83, 68];

		//		controls.addEventListener('change',function(){
		//			$$.global.renderer.render( scene, camera )
		//		});
		$$.controls = controls;
		return controls;
	}
	this.createDeviceOrientationControls = function() {
		var controls = new THREE.DeviceOrientationControls($$.global.camera, true);
		controls.connect();
		controls.update();
		window.removeEventListener('deviceorientation', $$.extend.createDeviceOrientationControls, true);
		window.addEventListener('deviceorientation', $$.extend.createDeviceOrientationControls, true);
		$$.controls = controls;
		return controls;
	}
	this.createFirstCharacterControls = function(options, blocker) {
			var controls = new THREE.PointerLockControls($$.global.camera);
			$$.controls = controls;
			scene.add(controls.getObject());

			var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
			if(havePointerLock) {
				var element = document.body;
				var pointerlockchange = function(event) {
					if(document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
						controls.controlsEnabled = true;
						controls.enabled = true;
						blocker.style.display = 'none';
					} else {
						controls.enabled = false;
						blocker.style.display = '-webkit-box';
						blocker.style.display = '-moz-box';
						blocker.style.display = 'box';
					}
				};
				var pointerlockerror = function(event) {
					blocker.style.display = '-webkit-box';
					blocker.style.display = '-moz-box';
					blocker.style.display = 'box';
				};
				// Hook pointer lock state change events
				document.addEventListener('pointerlockchange', pointerlockchange, false);
				document.addEventListener('mozpointerlockchange', pointerlockchange, false);
				document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
				document.addEventListener('pointerlockerror', pointerlockerror, false);
				document.addEventListener('mozpointerlockerror', pointerlockerror, false);
				document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
				blocker.addEventListener('click', function(event) {
					blocker.style.display = 'none';
					// Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
					if(/Firefox/i.test(navigator.userAgent)) {
						var fullscreenchange = function(event) {
							if(document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
								document.removeEventListener('fullscreenchange', fullscreenchange);
								document.removeEventListener('mozfullscreenchange', fullscreenchange);
								element.requestPointerLock();
							}
						};
						document.addEventListener('fullscreenchange', fullscreenchange, false);
						document.addEventListener('mozfullscreenchange', fullscreenchange, false);
						element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
						element.requestFullscreen();
					} else {
						element.requestPointerLock();
					}
				}, false);
			} else {
				blocker.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
			}
			//移动模块
			controls.controlsEnabled = false;
			controls.moveForward = false;
			controls.moveBackward = false;
			controls.moveLeft = false;
			controls.moveRight = false;
			controls.canJump = false;
			controls.prevTime = performance.now();
			controls.velocity = new THREE.Vector3();
			//是否使用键盘控制移动
			if(options && options.keymove) {
				document.addEventListener('keydown', function(event) {
					switch(event.keyCode) {
						case 38: // up
						case 87: // w
							$$.controls.moveForward = true;
							break;
						case 37: // left
						case 65: // a
							$$.controls.moveLeft = true;
							break;
						case 40: // down
						case 83: // s
							$$.controls.moveBackward = true;
							break;
						case 39: // right
						case 68: // d
							$$.controls.moveRight = true;
							break;
						case 32: // space
							if($$.controls.canJump === true) $$.controls.velocity.y += 350;
							$$.controls.canJump = false;
							break;
					}
				}, false);
				document.addEventListener('keyup', function(event) {
					switch(event.keyCode) {
						case 38: // up
						case 87: // w
							$$.controls.moveForward = false;
							break;
						case 37: // left
						case 65: // a
							$$.controls.moveLeft = false;
							break;
						case 40: // down
						case 83: // s
							$$.controls.moveBackward = false;
							break;
						case 39: // right
						case 68: // d
							$$.controls.moveRight = false;
							break;
					}
				}, false);
			}
			controls.prevTime = performance.now();
			controls.update = function() {
				if($$.controls.controlsEnabled) {
					$$.controls.time = performance.now();
					var delta = ($$.controls.time - $$.controls.prevTime) / 1000;
					$$.controls.velocity.x -= $$.controls.velocity.x * 2.0 * delta;
					$$.controls.velocity.z -= $$.controls.velocity.z * 2.0 * delta;
					$$.controls.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
					if($$.controls.moveForward) $$.controls.velocity.z -= 400.0 * delta;
					if($$.controls.moveBackward) $$.controls.velocity.z += 400.0 * delta;
					if($$.controls.moveLeft) $$.controls.velocity.x -= 400.0 * delta;
					if($$.controls.moveRight) $$.controls.velocity.x += 400.0 * delta;

					$$.controls.getObject().translateX($$.controls.velocity.x * delta);
					$$.controls.getObject().translateY($$.controls.velocity.y * delta);
					$$.controls.getObject().translateZ($$.controls.velocity.z * delta);
					if($$.controls.getObject().position.y < 10) {
						$$.controls.velocity.y = 0;
						$$.controls.getObject().position.y = 10;
						$$.controls.canJump = true;
					}
					$$.controls.prevTime = $$.controls.time;
				}
			}
			return controls;
		}
		//创建子弹，它会直线前进，直到生命周期到了
	this.createBullet = function(mesh, options) {
		var position = $$.controls.getObject().position;
		var direction = $$.global.centerRaycaster.ray.direction;
		var defOpts = {
			speed: 3,
			life: 10000,
			position: new THREE.Vector3(position.x, position.y, position.z),
			direction: new THREE.Vector3(direction.x, direction.y, direction.z)
		}
		options = $$.extends({}, [defOpts, options]);
		mesh.lookAt(options.direction);
		mesh.position.x = options.position.x;
		mesh.position.y = options.position.y;
		mesh.position.z = options.position.z;
		mesh.lifeStart=new Date().getTime();
		mesh.life=options.life;
		$$.global.world.add(mesh);
		
		$$.actionInjections.push(function() {
			mesh.position.x += options.direction.x * options.speed;
			mesh.position.y += options.direction.y * options.speed;
			mesh.position.z += options.direction.z * options.speed;
			if(mesh.life<=new Date().getTime()-mesh.lifeStart){
				$$.global.world.remove(mesh);
				for(var i in $$.actionInjections){
					if($$.actionInjections[i]==arguments.callee){
						$$.actionInjections.splice(i,1);
					}
				}
			}
		});
	}
})();