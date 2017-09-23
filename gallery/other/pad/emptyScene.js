function createEmptyWorld() {
	var world = new $$.SubWorld({
		clearColor: 0x000000,
		resize: false
	}, {});
	var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	var cube = new THREE.Mesh(geometry, material);
	world.scene.add(cube);
	world.camera.position.z = 5;
	world.camera.lookAt(world.scene.position);
	world.resize = false;

	$$.actionInjections.push(function() {
		world.update(true);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.02;
	});
	return world;
}