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
	for(var i in icoData) {
		for(var j in icoData[i]) {
			var ico = new $$.Img(icoData[i][j].ico, {
				width: icoSize,
				height: icoSize
			});
			body.add(ico);
			icoArr.push(ico);
			ico.position.set(i * 300 + (j % 4) * 70 - 105, 150 - Math.floor(j / 4) * 60, 2);
		}
	}

	var point, screenDown;
	world.onDown = function(obj, event) {
		console.log("??")
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
	return world;
}

var icoData = [
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