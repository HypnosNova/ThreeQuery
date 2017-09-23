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
var lockWorld;

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
		}
	}
}