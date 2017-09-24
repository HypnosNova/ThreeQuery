function createMenuWorld() {
	var world = new $$.SubWorld({
		clearColor: 0x000000,
		resize: false
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

	var body = new $$.Body({});
	world.scene.add(body);
	var img = new $$.Img("img/menuBg.jpg", {
		width: 2400,
		height: 1600
	});
	img.position.x = maxLeft;
	body.add(img);
	var icoArr = [];
	for(var i in icoData) {
		for(var j in icoData[i]) {
			var ico = new $$.Img(icoData[i][j].ico, {
				width: icoSize,
				height: icoSize
			});
			body.add(ico);
			icoArr.push(ico);
			ico.position.set(i*300+(j%4)*70-105, Math.floor(j/4)*60+90, 2);
		}
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
	},{
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