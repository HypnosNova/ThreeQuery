function createMeWorld() {
	var world = new PadWorld({
		clearColor: 0x666666,
		resize: false,
		name: "empty"
	}, {
		type: "OrthographicCamera"
	});

	world.onBack = function() {
		pad.state = "menu";
		var transition = new $$.TransitionFBO(menuWorld, world, tmpWorld, {
			"transitionSpeed": 40
		}, (new THREE.TextureLoader()).load("img/transition1.png"), function() {
			pad.changeFBO(menuWorld);
		});
		$$.actionInjections.push(transition.render)
		pad.changeFBO(tmpWorld);
	};

	init();

	function init() {
		world.rayCasterEventReceivers = [];
		world.camera.left = -75 / 2;
		world.camera.right = 75 / 2;
		world.camera.top = 100 / 2;
		world.camera.bottom = -100 / 2;
		world.camera.updateProjectionMatrix();
		world.camera.position.z = 100;
		world.camera.lookAt(world.scene.position);

		var light = new THREE.DirectionalLight();
		light.position.set(0, 0, 1);
		world.scene.add(light);

		var width = 60;
		var height = 75;

		var slide = new Slide(width, height, 'in');
		world.scene.add(slide);
		new THREE.ImageLoader().load('img/app/photo.jpg', function(image) {
			slide.setImage(image);
		});

		var t1 = new TWEEN.Tween(slide).to({
			time: slide.totalDuration
		}, 3000).delay(2000).start().repeat(Infinity).yoyo(true);
		
		var slide2 = new Slide(width, height, 'out');
		world.scene.add(slide2);
		new THREE.ImageLoader().load('img/app/logo.jpg', function(image) {
			slide2.setImage(image);
		});

		var t2 = new TWEEN.Tween(slide2).to({
			time: slide2.totalDuration
		}, 3000).delay(2000).start().repeat(Infinity).yoyo(true);

	}

	return world;
}