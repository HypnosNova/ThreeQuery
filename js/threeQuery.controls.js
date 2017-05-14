$$.Controls = {
	createOrbitControls: function(world) {
		var camera = world?world.camera:$$.global.camera;
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
		if(world) {
			world.controls = controls;
			world.controls.enabledBefore=controls.enabled;
		} else {
			$$.global.controls = controls;
		}
		return controls;
	},
	createTrackBallControls: function(options, world) {
		if(!options) {
			options = {};
		}
		var camera = world ? world.camera : $$.global.camera;
		//		var scene = $$.global.world;
		controls = new THREE.TrackballControls(camera);
		controls.rotateSpeed = options.rotateSpeed || 1;
		controls.minDistance = options.minDistance || 1000;
		controls.maxDistance = options.maxDistance || 1000;
		controls.zoomSpeed = options.zoomSpeed || 1;
		controls.panSpeed = options.panSpeed || 1;
		controls.noZoom = options.noZoom || false;
		controls.noPan = options.noPan || false;
		controls.enabled = options.enabled == null ? true : options.enabled;
		controls.dynamicDampingFactor = options.dynamicDampingFactor || 0.3;
		controls.staticMoving = options.staticMoving || false;
		if(world) {
			world.controls = controls;
			world.controls.enabledBefore=controls.enabled;
		} else {
			$$.global.controls = controls;
		}

		return controls;
	},
	createDeviceOrientationControls: function() {
		var controls = new THREE.DeviceOrientationControls($$.global.camera, true);
		controls.connect();
		controls.update();
		//window.removeEventListener('deviceorientation', $$.Controls.createDeviceOrientationControls, true);
		//window.addEventListener('deviceorientation', $$.Controls.createDeviceOrientationControls, true);
		$$.global.controls = controls;
		return controls;
	},
	createPointerLockControls: function() {
		var controls = new THREE.PointerLockControls($$.global.camera);
		$$.global.controls = controls;
		scene.add(controls.getObject());
		controls.controlsEnabled = true;
		controls.enabled = true;
		controls.update = function() {

		};
		return controls;
	},
	createFirstCharacterControls: function(options, blocker) {
		if(options){
			if(options.speed){
				options.speed.x=options.speed.x!=null?options.speed.x:1;
				options.speed.z=options.speed.z!=null?options.speed.z:1;
				options.speed.y=options.speed.y!=null?options.speed.y:200;
			}else{
				options.speed=new THREE.Vector3(100,200,100);
			}
			options.gravity=options.gravity!=null?options.gravity:10;
			options.tall=options.tall!=null?options.tall:10;
			if(options.acceleration){
				options.acceleration.x=options.acceleration.x!=null?options.acceleration.x:1;
				options.acceleration.z=options.acceleration.z!=null?options.acceleration.z:1;
			}else{
				options.acceleration=new THREE.Vector3(1,0,1);
			}
		}
		
		var controls = new THREE.PointerLockControls($$.global.camera);
		$$.global.controls = controls;
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
		controls.canJump = true;
		controls.prevTime = performance.now();
		controls.velocity = new THREE.Vector3(0,0,0);
		//是否使用键盘控制移动
		if(options && options.keymove) {
			document.addEventListener('keydown', function(event) {
				switch(event.keyCode) {
					case 38: // up
					case 87: // w
						$$.global.controls.moveForward = true;
						break;
					case 37: // left
					case 65: // a
						$$.global.controls.moveLeft = true;
						break;
					case 40: // down
					case 83: // s
						$$.global.controls.moveBackward = true;
						break;
					case 39: // right
					case 68: // d
						$$.global.controls.moveRight = true;
						break;
					case 32: // space
						
						if($$.global.controls.canJump === true){$$.global.controls.velocity.y += options.speed.y};
						$$.global.controls.canJump = false;
						break;
				}
			}, false);
			document.addEventListener('keyup', function(event) {
				switch(event.keyCode) {
					case 38: // up
					case 87: // w
						$$.global.controls.moveForward = false;
						break;
					case 37: // left
					case 65: // a
						$$.global.controls.moveLeft = false;
						break;
					case 40: // down
					case 83: // s
						$$.global.controls.moveBackward = false;
						break;
					case 39: // right
					case 68: // d
						$$.global.controls.moveRight = false;
						break;
				}
			}, false);
		}
		controls.prevTime = performance.now();
		controls.update = function() {
			if($$.global.controls.enabled) {
				$$.global.controls.time = performance.now();
				var delta = ($$.global.controls.time - $$.global.controls.prevTime) / 1000;
				$$.global.controls.velocity.x -= $$.global.controls.velocity.x * options.acceleration.x * delta;
				$$.global.controls.velocity.z -= $$.global.controls.velocity.z * options.acceleration.z * delta;
				$$.global.controls.velocity.y -= options.gravity * 100.0 * delta; // 100.0 = mass
				if($$.global.controls.moveForward) $$.global.controls.velocity.z -= options.speed.z * delta;
				if($$.global.controls.moveBackward) $$.global.controls.velocity.z += options.speed.z * delta;
				if($$.global.controls.moveLeft) $$.global.controls.velocity.x -= options.speed.x * delta;
				if($$.global.controls.moveRight) $$.global.controls.velocity.x += options.speed.x * delta;
				$$.global.controls.getObject().translateX($$.global.controls.velocity.x * delta);
				$$.global.controls.getObject().translateY($$.global.controls.velocity.y * delta);
				$$.global.controls.getObject().translateZ($$.global.controls.velocity.z * delta);
				if($$.global.controls.getObject().position.y < options.tall) {
					$$.global.controls.velocity.y = 0;
					$$.global.controls.getObject().position.y = options.tall;
					$$.global.controls.canJump = true;
				}
				$$.global.controls.prevTime = $$.global.controls.time;
			}
		};
		return controls;
	},
};