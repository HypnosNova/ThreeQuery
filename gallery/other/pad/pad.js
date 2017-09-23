var pad = {
	model: null,
	state: "close",
	closeBtn: null,
	screen: null,
	screenUpdate: null,
	changeFBO: function(world) {
		for(var i = 0; i < $$.actionInjections.length; i++) {
			if($$.actionInjections[i]==pad.screenUpdate){
				$$.actionInjections.splice(i, 1);
				break;
			}
			
		}
		pad.screenUpdate = world.updateFBO;
		pad.screen.material.map=world.fbo.texture;
		$$.actionInjections.push(pad.screenUpdate);
	}
}
var emptyWorld = createEmptyWorld();
var lockWorld=createLockWorld();

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
		if(pad.state == "close") {
			pad.state = "lock";
			if(!lockWorld) {
				lockWorld = createLockWorld();
			}
			pad.changeFBO(lockWorld);
			for(var i in lockWorld.dom){
				console.log()
				lockWorld.dom[i].element.material.opacity=0;
			}
			var opa={a:0};
			new TWEEN.Tween(opa).to({a:1},500).start().onUpdate(function(){
				for(var i in lockWorld.dom){
					lockWorld.dom[i].element.material.opacity=this.a;
				}
			});
		}
	}
	var point,screenDown;
	pad.screen.onDown=function(obj){
		point=obj.point;
		screenDown=true;
	}
	pad.screen.onUp=function(obj){
		var thres=obj.point.y-point.y;
		if(thres>3){
			alert(true);
		}else{
			alert(false)
		}
		screenDown=false;
	}
	
//	document.addEventListener("mousemove",function(){
//		if(screenDown){
//			
//		}
//	},false);
}