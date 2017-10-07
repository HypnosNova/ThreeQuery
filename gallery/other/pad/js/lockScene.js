function createLockWorld() {
	var world = new PadWorld({
		clearColor: 0x000000,
		resize: false,
		name: "lock"
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
	var body = new $$.Body();
	world.scene.add(body);

	var img = new $$.Img("img/bg.jpg", {
		width: 1200,
		height: 1600
	})
	body.add(img);
	world.dom.push(img);
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var year = date.getUTCFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var d = date.getDay();
	switch(d) {
		case 0:
			d = "星期天";
			break;
		case 1:
			d = "星期一";
			break;
		case 2:
			d = "星期二";
			break;
		case 3:
			d = "星期三";
			break;
		case 4:
			d = "星期四";
			break;
		case 5:
			d = "星期五";
			break;
		case 6:
			d = "星期六";
			break;
	}
	var timeText = new $$.Txt(h + ":" + m, {
		color: "#ffffff",
		width: 900,
		height: 240,
		fontSize: 220,
		fontWeight: 200
	});
	body.add(timeText);
	world.dom.push(timeText);
	timeText.position.set(0, 120, 1);
	timeText.element.material.opacity = 0;

	var yearText = new $$.Txt(year + "年" + month + "月" + day + "日 " + d, {
		color: "#ffffff",
		width: 900,
		height: 100,
		fontSize: 56,
		fontWeight: 200,
		fontFamily: "simhei"
	});
	body.add(yearText);
	yearText.position.set(0, 86, 1);
	world.dom.push(yearText);
	world.actionInjections.push(function() {
		var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes();
		timeText.text = h + ":" + m;
		timeText.update();
	});

	var unlockText = new $$.Txt("上划解锁", {
		color: "#ffffff",
		width: 900,
		height: 100,
		fontSize: 52,
		fontWeight: 200,
		fontFamily: "simhei"
	});
	body.add(unlockText);
	unlockText.position.set(0, -160, 1);
	world.dom.push(unlockText);

	var point, screenDown;
	world.onDown = function(obj, event) {
		screenDown = true;
		point = obj.point;
	}
	world.onUp = function(obj, event) {
		var thres = obj.point.y - point.y;
		if(thres > 2.5) {
			pad.state = "menu";
			var transition = new $$.TransitionFBO(menuWorld, lockWorld, tmpWorld, {}, (new THREE.TextureLoader()).load("img/transition1.png"), function() {
				//$$.actionInjections.push(menuWorld.updateFBO);
				pad.changeFBO(menuWorld);
			});
			$$.actionInjections.push(transition.render)
			pad.changeFBO(tmpWorld);
		} else {}
		screenDown = false;
	}
	return world;
}