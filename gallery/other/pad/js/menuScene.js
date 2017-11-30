function createMenuWorld() {
	var world = new PadWorld({
		clearColor: 0x000000,
		resize: false,
		name: "menu"
	}, {
		type: "OrthographicCamera"
	});
	world.camera.left = -300 / 2;
	world.camera.right = 300 / 2;
	world.camera.top = 400 / 2;
	world.camera.bottom = -400 / 2;
	world.camera.updateProjectionMatrix();
	world.camera.position.z = 100;
	world.camera.lookAt(world.scene.position);
	world.dom = [];
	var maxLeft = 150,
		maxRight = -150,
		icoSize = 128;
	world.range = maxLeft;
	var body = new $$.Body({});
	world.scene.add(body);
	var img = new $$.Img("img/menuBg.jpg", {
		width: 2400,
		height: 1600
	});
	img.position.x = maxLeft;
	world.bg = img;
	world.scene.add(img);
	var icoArr = [];
	for(let i in icoData) {
		for(let j in icoData[i]) {
			let ico = new $$.Img(icoData[i][j].ico, {
				width: icoSize,
				height: icoSize
			}, function() {
				body.add(ico.element);
				icoArr.push(ico);
				ico.element.position.set(i * 300 + (j % 4) * 70 - 105, 150 - Math.floor(j / 4) * 60, 2);
				ico.element.onClick = function() {
					appIconClick(icoData[i][j]);
				}
			});

			let text = new $$.Txt(icoData[i][j].text, {
				width: icoSize * 1.4,
				height: 32,
				fontSize: 28,
				fontFamily: "微软雅黑"
			});
			body.add(text);
			text.position.set(i * 300 + (j % 4) * 70 - 105, 125 - Math.floor(j / 4) * 60, 2);
		}
	}

	var point, screenDown;
	world.onDown = function(obj, event) {
		screenDown = true;
		point = obj.point;
	}
	world.onUp = function(obj, event) {
		var thres = obj.point.x - point.x;
		if(thres < -2) {
			if(menuWorld.bg.position.x > -menuWorld.range) {
				new TWEEN.Tween(menuWorld.bg.position).to({
					x: menuWorld.bg.position.x - 100
				}, 500).start();
				new TWEEN.Tween(body.position).to({
					x: body.position.x - 300
				}, 500).start();
			}
		} else if(thres > 2) {
			if(menuWorld.bg.position.x < menuWorld.range) {
				new TWEEN.Tween(menuWorld.bg.position).to({
					x: menuWorld.bg.position.x + 100
				}, 500).start();
				new TWEEN.Tween(body.position).to({
					x: body.position.x + 300
				}, 500).start();
			}
		} else {

		}
		screenDown = false;
	}

	world.onClick = function(obj, event) {
		var raycaster = new THREE.Raycaster();
		var point = new THREE.Vector2();
		point.x = obj.point.x;
		point.y = obj.point.y - 2;
		point.x /= 7.5;
		point.y /= 10;
		raycaster.setFromCamera(point, world.camera);
		var intersects = raycaster.intersectObjects(world.rayCasterEventReceivers, true);
		var intersect;
		if(intersects.length) {
			intersect = intersects[0];
		}
		if(intersect && intersect.object.onClick) {
			intersect.object.onClick(intersect, event);
		}
	}

	function appIconClick(appId) {
		if(appId) {
			if(appId.world) {
				pad.state = "app";
				var transition = new $$.TransitionFBO(appId.world, menuWorld, tmpWorld, {
					"transitionSpeed": 40
				}, (new THREE.TextureLoader()).load("img/transition1.png"), function() {
					pad.changeFBO(appId.world);
				});
				$$.actionInjections.push(transition.render)
				pad.changeFBO(tmpWorld);
			} else {
				var app = window[appId.app]();
				appId.world=app;
				pad.state = "app";
				var transition = new $$.TransitionFBO(app, menuWorld, tmpWorld, {
					"transitionSpeed": 40
				}, (new THREE.TextureLoader()).load("img/transition1.png"), function() {
					pad.changeFBO(app);
				});
				$$.actionInjections.push(transition.render)
				pad.changeFBO(tmpWorld);
			}
		}
	}
	return world;
}

var icoData = [
	[{
		text: "我是谁",
		ico: "img/me.png",
		app: "createMeWorld",
		world: null
	}],
	[{
		text: "flappy bird",
		ico: "img/flappy.png",
		app: "createFlappyWorld",
		world: null
	}],
	[{
		text: "app1",
		ico: "img/ico1.png"
	}, {
		text: "app2",
		ico: "img/ico2.png"
	}, {
		text: "app3",
		ico: "img/ico3.png"
	}, {
		text: "app4",
		ico: "img/ico1.png"
	}, {
		text: "app5",
		ico: "img/ico2.png"
	}, {
		text: "app6",
		ico: "img/ico3.png"
	}, {
		text: "app7",
		ico: "img/ico1.png"
	}, {
		text: "app8",
		ico: "img/ico2.png"
	}, {
		text: "app9",
		ico: "img/ico3.png"
	}, {
		text: "app10",
		ico: "img/ico1.png"
	}, {
		text: "app7",
		ico: "img/ico1.png"
	}, {
		text: "app8",
		ico: "img/ico2.png"
	}, {
		text: "app9",
		ico: "img/ico3.png"
	}, {
		text: "app10",
		ico: "img/ico1.png"
	}],
	[{
		text: "app1",
		ico: "img/ico1.png"
	}, {
		text: "app2",
		ico: "img/ico2.png"
	}, {
		text: "app3",
		ico: "img/ico3.png"
	}, {
		text: "app4",
		ico: "img/ico1.png"
	}, {
		text: "app5",
		ico: "img/ico2.png"
	}, {
		text: "app6",
		ico: "img/ico3.png"
	}, {
		text: "app7",
		ico: "img/ico1.png"
	}, {
		text: "app8",
		ico: "img/ico2.png"
	}]
]