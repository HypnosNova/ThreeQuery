var pad = {
	model: null,
	state: "close",
	closeBtn: null,
	screen: null,
	screenUpdate: null,
	currentWorld: null,
	changeFBO: function(world) {
		//去掉上一个world的所有注入的函数
		for(var i = 0; i < $$.actionInjections.length; i++) {
			if($$.actionInjections[i] == pad.screenUpdate) {
				$$.actionInjections.splice(i, 1);
				break;
			}
		}
		pad.currentWorld = world;
		pad.screenUpdate = world.updateFBO;
		pad.screen.material.map = world.fbo.texture;
		$$.actionInjections.push(pad.screenUpdate);
	}
}

class PadWorld extends $$.SubWorld {
	constructor(sceneOpt,cameraOpt) {
		super(sceneOpt,cameraOpt);
		this.state="";
		this.onClick = function(){console.log("click")};
		this.onUp = function(){console.log("up")};
		this.onDown = function(){console.log("down")};
		this.onMove = function(){console.log("move")};
		this.onBack = function(){console.log("back")};
	}
}

var emptyWorld = createEmptyWorld();
var lockWorld = createLockWorld();
var menuWorld = createMenuWorld();

function createPad(obj) {
	obj.position.y = -10;
	var geometry = new THREE.PlaneBufferGeometry(15, 20, 1);
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		shininess: 100
	});
	var plane = new THREE.Mesh(geometry, material);
	obj.add(plane);
	plane.position.set(0, 12, 0.67);
	pad.screen = plane;
	var geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({
		color: 0,
		transparent: true,
		opacity: 0
	});
	var plane = new THREE.Mesh(geometry, material);
	obj.add(plane);
	pad.closeBtn = plane;
	plane.position.set(0, 1.2, 0.67)
	scene.add(obj);
	pad.model = obj;
	pad.changeFBO(emptyWorld);
	pad.closeBtn.onClick = function() {
		pad.currentWorld.onBack();
	}
	var point, screenDown;
	pad.screen.onDown = function(obj,event) {
		point = obj.point;
		screenDown = true;
		pad.currentWorld.onDown(obj,event);
	}
	pad.screen.onUp = function(obj) {
		pad.currentWorld.onUp(obj,event);
//		if(pad.state == "lock") {
//			var thres = obj.point.y - point.y;
//			if(thres > 2.5) {
//				pad.state = "menu";
//				var transition = new $$.TransitionFBO(menuWorld, lockWorld, tmpWorld, {}, (new THREE.TextureLoader()).load("img/transition1.png"), function() {
//					$$.actionInjections.push(menuWorld.updateFBO);
//				});
//				$$.actionInjections.push(transition.render)
//				pad.changeFBO(tmpWorld);
//			} else {}
//			screenDown = false;
//		} else if(pad.state == "menu") {
//			var thres = obj.point.x - point.x;
//			console.log(thres)
//			if(thres < -2) {
//				console.log(menuWorld.bg.position.x, menuWorld.range)
//				if(menuWorld.bg.position.x > -menuWorld.range) {
//					console.log("??")
//					new TWEEN.Tween(menuWorld.bg.position).to({
//						x: menuWorld.bg.position.x - 100
//					}, 400).start();
//				}
//			} else {}
//			screenDown = false;
//		}
	}
}