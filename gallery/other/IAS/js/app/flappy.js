function createFlappyWorld() {
	var birdWorld = new PadWorld({
		clearColor: 0x999999,
		resize: false,
		name: "empty"
	}, {
		fov: 45
	});

	birdWorld.onBack = function() {
		pad.state = "menu";
		var transition = new $$.TransitionFBO(menuWorld, birdWorld, tmpWorld, {
			"transitionSpeed": 40
		}, (new THREE.TextureLoader()).load("img/transition1.png"), function() {
			pad.changeFBO(menuWorld);
		});
		$$.actionInjections.push(transition.render)
		pad.changeFBO(tmpWorld);
	};
	birdWorld.camera.aspect = 3 / 4;
	birdWorld.camera.updateProjectionMatrix();
	birdWorld.camera.position.set(-150, 0, 0);
	birdWorld.camera.lookAt(birdWorld.scene.position);

	birdWorld.scene.add(new THREE.AmbientLight(0x444444));
	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directionalLight.position.set(-20, 40, 25)
	birdWorld.scene.add(directionalLight);

	birdWorld.gravity = $$.getWorldHeight() / 10000;
	birdWorld.upV = $$.getWorldHeight() / 400; //点击一下向上的速度
	birdWorld.currentV = 0; //当前鸟的速度
	birdWorld.gameStart = false;
	birdWorld.padding = 120;
	birdWorld.pipeRange = 50;
	birdWorld.pipeLow = -85;
	birdWorld.score = 0;

	var loader = new THREE.ObjectLoader($$.Loader.loadingManager);
	loader.load('../../games/flappy/models/bird.json',
		function(object) {
			object.traverse((child) => {
				if(child instanceof THREE.Mesh) {
					var bird = child;
					bird.geometry.center();
					bird.scale.set(16, 16, 16);
					bird.position.set(0, 0, -20)
					birdWorld.bird = bird;
					birdWorld.scene.add(bird);
				}
			});
		}
	);
	loader.load('../../games/flappy/models/pipe.json',
		function(object) {
			object.traverse((child) => {
				if(child instanceof THREE.Mesh) {
					var pipe = child;
					pipe.geometry.center();
					pipe.scale.set(16, 32, 16);
					pipe.position.set(0, -35, 20)
					pipe.material.color = new THREE.Color(0x23ff10);
					pipe.material.side = THREE.DoubleSide;
					birdWorld.pipe = pipe;
				}
			});
		}
	);

	$$.Loader.loadTexture(["../../games/flappy/textures/background.png"], function() {
		var texture = $$.Loader.RESOURCE.textures["../../games/flappy/textures/background.png"];
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;

		var geometry = new THREE.PlaneBufferGeometry(500, 250, 1);
		var material = new THREE.MeshBasicMaterial({
			map: texture,
			overdraw: 0.5
		});

		background = new THREE.Mesh(geometry, material);
		background.position.x = 150;
		background.lookAt(birdWorld.camera.position)
		birdWorld.scene.add(background);

		birdWorld.actionInjections.push(function() {
			if(birdWorld.gameStart) {
				var time = performance.now() * 0.0001;
				texture.offset.x = time * 0.3;
			}
		});
	});

	$$.Loader.loadSound(["../../games/flappy/audio/birdFlap.mp3",
		"../../games/flappy/audio/collision.mp3",
		//		"../../games/flappy/audio/Happy8bit.mp3"
	]);

	var text = new $$.Txt("正在加载", {
		width: 340,
		height: 85,
		fontSize: 80,
		fontWeight: "bold",
		color: "#eeeeee"
	});
	text.element.position.x = -50;
	text.element.position.y = 10;
	text.element.scale.x /= 4;
	text.element.scale.y /= 4;
	birdWorld.scene.add(text.element);
	birdWorld.startBtn = text;

	var text = new $$.Txt("得分：0", {
		width: 340,
		height: 85,
		fontSize: 54,
		fontWeight: "bold",
		color: "#eeeeee"
	});
	text.element.position.x = -50;
	text.element.position.y = 30;
	text.element.scale.x /= 4;
	text.element.scale.y /= 4;
	birdWorld.scene.add(text.element);
	birdWorld.scoreText = text;

	$$.Loader.onLoadComplete = function() {
		setTimeout(function() {
			setSoundPlayer(birdWorld);
			birdControl(birdWorld);
			var text = birdWorld.startBtn;
			text.text = "开始游戏";
			text.update();
			text.element.scale.x /= 4;
			text.element.scale.y /= 4;
			text.element.onEnter = function() {
				text.css.color = "#ffffff";
				text.update();
				text.element.scale.x /= 4;
				text.element.scale.y /= 4;
			};
			text.element.onLeave = function() {
				text.css.color = "#eeeeee";
				text.update();
				text.element.scale.x /= 4;
				text.element.scale.y /= 4;
			};
			text.element.onClick = function() {
				startGame(birdWorld);
			}
			birdWorld.startBtn = text.element;

			birdWorld.onClick = function(obj, event) {
				var raycaster = new THREE.Raycaster();
				var point = new THREE.Vector2();
				point.x = obj.point.x;
				point.y = obj.point.y - 2;
				point.x /= 7.5;
				point.y /= 10;
				raycaster.setFromCamera(point, birdWorld.camera);
				var intersects = raycaster.intersectObjects(birdWorld.rayCasterEventReceivers, true);
				var intersect;
				if(intersects.length) {
					intersect = intersects[0];
				}
				if(intersect && intersect.object.onClick) {
					intersect.object.onClick(intersect, event);
				}
			}
		});
	}

	function birdControl(birdWorld) {
		var bird = birdWorld.bird;
		birdWorld.actionInjections.push(function() {
			if(birdWorld.gameStart) {
				bird.position.y += birdWorld.currentV;
				birdWorld.currentV -= birdWorld.gravity;
				if(bird.position.y < -55) {
					bird.position.y = -55;
					gameOver(birdWorld);
				}
				bird.rotation.x = -Math.atan(birdWorld.currentV / 1.5);
			}

		});
		birdWorld.onDown = clickDown;

		function clickDown() {
			if(birdWorld.gameStart) {
				birdWorld.currentV = birdWorld.upV;
				birdWorld.flapSoundPlayer.play();
			}
		}
	}

	function startGame(birdWorld) {
		birdWorld.score = 0;
		birdWorld.scoreText.text = "得分：0";
		birdWorld.scoreText.update();
		birdWorld.scoreText.element.scale.x /= 4;
		birdWorld.scoreText.element.scale.y /= 4;
		birdWorld.scene.remove(birdWorld.startBtn);
		birdWorld.gameStart = true;
		birdWorld.bird.position.y = 0;
		birdWorld.currentV = 0;
		for(var i = 0; i < birdWorld.scene.children.length; i++) {
			if(birdWorld.scene.children[i].type == "Group") {
				birdWorld.scene.remove(birdWorld.scene.children[i]);
				i--;
			}
		}
		var timer = new $$.Component.Timer({
			life: Infinity,
			duration: 2200,
			onStart: function() {
				createPipe();
			},
			onRepeat: function() {
				createPipe();
			},
			onEnd: function() {
				console.log("timer end");
			}
		}, birdWorld);
		timer.start();
		birdWorld.pipeTimer = timer;

		birdWorld.actionInjections.push(function() {
			var isInRect = checkCollision(birdWorld);
			if(isInRect && birdWorld.gameStart) {
				birdWorld.collisionSoundPlayer.play();
				gameOver(birdWorld);
			}
		});
	}

	function createPipe() {
		var low = Math.random() * birdWorld.pipeRange + birdWorld.pipeLow;
		var pipe1 = birdWorld.pipe.clone();
		pipe1.position.y = low;
		var pipe2 = birdWorld.pipe.clone();
		pipe2.position.y = low + birdWorld.padding;
		pipe2.rotation.x = Math.PI;
		var group = new THREE.Group();
		group.add(pipe1);
		group.add(pipe2);
		group.position.z = 100;
		group.hasPass = false;
		birdWorld.scene.add(group);
		new TWEEN.Tween(group.position).to({
			z: -200
		}, 10000).start().onComplete(function() {
			birdWorld.scene.remove(group);
		}).onUpdate(function() {
			if(group.hasPass) {
				return;
			}
			if(group.position.z < birdWorld.bird.position.z - pipeSize.x * 4) {
				birdWorld.score++;
				group.hasPass = true;
				birdWorld.scoreText.text = "得分：" + birdWorld.score;
				birdWorld.scoreText.update();
				birdWorld.scoreText.element.scale.x /= 4;
				birdWorld.scoreText.element.scale.y /= 4;
			}
		});
	}

	function setSoundPlayer(birdWorld) {
		var listener = new THREE.AudioListener();
		birdWorld.camera.add(listener);
		var sound = new THREE.Audio(listener);
		sound.setBuffer($$.Loader.RESOURCE.sounds["../../games/flappy/audio/birdFlap.mp3"]);
		sound.setLoop(false);
		sound.setVolume(1);
		birdWorld.flapSoundPlayer = sound;

		//Happy8bit.mp3
		//		var listener = new THREE.AudioListener();
		//		birdWorld.camera.add(listener);
		//		var sound = new THREE.Audio(listener);
		//		sound.setBuffer($$.Loader.RESOURCE.sounds["../../games/flappy/audio/Happy8bit.mp3"]);
		//		sound.setLoop(true);
		//		sound.setVolume(0.5);
		//		birdWorld.bgSoundPlayer = sound;
		//	sound.play();

		var listener = new THREE.AudioListener();
		birdWorld.camera.add(listener);
		var sound = new THREE.Audio(listener);
		sound.setBuffer($$.Loader.RESOURCE.sounds["../../games/flappy/audio/collision.mp3"]);
		sound.setLoop(false);
		sound.setVolume(1);
		birdWorld.collisionSoundPlayer = sound;
		//	sound.play();
	}

	function checkCollision(birdWorld) {
		var bird = birdWorld.bird;
		var widHf = 5,
			higHf = 5;
		var birdRect = [{
			x: bird.position.z - widHf,
			y: bird.position.y - higHf
		}, {
			x: bird.position.z + widHf,
			y: bird.position.y - higHf
		}, {
			x: bird.position.z - widHf,
			y: bird.position.y + higHf
		}, {
			x: bird.position.z + widHf,
			y: bird.position.y + higHf
		}];
		for(var i in birdWorld.scene.children) {
			var item = pipe = birdWorld.scene.children[i];
			if(item.type == "Group") {
				var isCollision = false;
				for(var i in birdRect) {
					isCollision = pointInPipe(birdRect[i], item.children[0]);
					if(isCollision) {
						return isCollision;
					}
					isCollision = pointInPipe(birdRect[i], item.children[1]);
					if(isCollision) {
						return isCollision;
					}
				}
			}
		}
		return false;
	}

	var pipeSize = {
		x: 10,
		y: 38
	}

	function pointInPipe(point, pipe) {
		var rect = {
			x1: pipe.parent.position.z + pipeSize.x,
			x2: pipe.parent.position.z + pipeSize.x * 3,
			y1: pipe.position.y - pipeSize.y,
			y2: pipe.position.y + pipeSize.y,
		}
		if(point.x >= rect.x1 && point.x <= rect.x2) {
			if(point.y >= rect.y1 && point.y <= rect.y2) {
				return true;
			}
		}
		return false;
	}

	function gameOver(birdWorld) {
		birdWorld.gameStart = false;
		TWEEN.removeAll();
		birdWorld.pipeTimer.stop();

		birdWorld.scene.add(birdWorld.startBtn);
	}

	return birdWorld;
}