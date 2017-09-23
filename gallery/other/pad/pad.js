var pad = {
	model: null,
	state: "close",
	closeBtn: null,
	screen: null
}
var emptyWorld = createEmptyWorld();
var lockWorld; //=createEmptyWorld();

function createPad(obj) {
	obj.position.y = -10;
	var geometry = new THREE.PlaneBufferGeometry(15, 20, 1);
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		shininess: 100,
		map: emptyWorld.fbo.texture
	});
	var plane = new THREE.Mesh(geometry, material);
	obj.add(plane);
	plane.position.set(0, 12, 0.67)
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

	pad.closeBtn.onClick = function() {
		console.log("?")
		if(pad.state == "close") {
			pad.state = "lock";
			if(!lockWorld) {
				lockWorld = createEmptyWorld();
			}
			console.log(pad.screen.material.map)
			pad.screen.material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				shininess: 100,
				map: lockWorld.fbo.texture
			});
		}
	}
}