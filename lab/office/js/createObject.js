function createDesk(num) {
	var group = new THREE.Group();
	for(var i = 0; i < num; i++) {
		//桌子板
		var geometry = new THREE.BoxBufferGeometry(15, 0.5, 15);
		var cube = new THREE.Mesh(geometry, materialAll.deskMaterial);
		cube.position.set(i * 15, 9, 0);
		group.add(cube);

		var geometry = new THREE.CylinderBufferGeometry(0.3, 0.6, 2.8, 6);
		var cylinder = new THREE.Mesh(geometry, materialAll.GrassFootMaterial);
		group.add(cylinder);
		cylinder.position.set(i * 15 - 4, 9.2, 0);
		var cylinder = new THREE.Mesh(geometry, materialAll.GrassFootMaterial);
		group.add(cylinder);
		cylinder.position.set(i * 15 + 4, 9.2, 0);

		var roundRectG = roundRectGeometry(11, 4, 0.5);
		var roundCube = new THREE.Mesh(roundRectG, materialAll.GrassFlurMaterial);
		group.add(roundCube);
		roundCube.position.set(i * 15 - 5.5, 10, -0.05);

		var c1 = chairModel.clone();
		c1.position.set(i * 15, 0, 13);
		group.add(c1);

		var c2 = chairModel.clone();
		c2.position.set(i * 15, 0, -13);
		c2.rotation.y = Math.PI;
		group.add(c2);

		if(i != 0) {
			var f1 = flowerModel.clone();
			f1.position.set(i * 15-7.5, 9.2, 1);
			group.add(f1);
			var f2 = flowerModel.clone();
			f2.position.set(i * 15-7.5, 9.2, -1);
			group.add(f2);
		}

	}
	//桌子脚
	var geometry = new THREE.BoxBufferGeometry(1, 18, 1);
	var cube = new THREE.Mesh(geometry, materialAll.deskFeetMaterial);
	cube.position.set(-6.4, 0, -6.4);
	group.add(cube);
	var cube = new THREE.Mesh(geometry, materialAll.deskFeetMaterial);
	cube.position.set(-6.4, 0, 6.4);
	group.add(cube);

	var cube = new THREE.Mesh(geometry, materialAll.deskFeetMaterial);
	cube.position.set(15 * (num - 0.5) - 0.6, 0, -6.4);
	group.add(cube);
	var cube = new THREE.Mesh(geometry, materialAll.deskFeetMaterial);
	cube.position.set(15 * (num - 0.5) - 0.6, 0, 6.4);
	group.add(cube);

	var geometry = new THREE.BoxBufferGeometry(1, 1, 13);
	var cube = new THREE.Mesh(geometry, materialAll.deskFeetMaterial);
	cube.position.set(-6.4, 0.3, 0);
	group.add(cube);
	var cube = new THREE.Mesh(geometry, materialAll.deskFeetMaterial);
	cube.position.set(-6.4, 8.3, 0);
	group.add(cube);

	var cube = new THREE.Mesh(geometry, materialAll.deskFeetMaterial);
	cube.position.set(15 * (num - 0.5) - 0.6, 0.3, 0);
	group.add(cube);
	var cube = new THREE.Mesh(geometry, materialAll.deskFeetMaterial);
	cube.position.set(15 * (num - 0.5) - 0.6, 8.3, 0);
	group.add(cube);
	return group;
}

function roundRectGeometry(width, height, round) {
	var roundedRectShape = new THREE.Shape();
	(function roundedRect(ctx, x, y, width, height, radius) {
		ctx.moveTo(x, y + radius);
		ctx.lineTo(x, y + height - radius);
		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
		ctx.lineTo(x + width - radius, y + height);
		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
		ctx.lineTo(x + width, y + radius);
		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
		ctx.lineTo(x + radius, y);
		ctx.quadraticCurveTo(x, y, x, y + radius);
	})(roundedRectShape, 0, 0, width, height, round);
	var extrudeSettings = {
		amount: 0.1,
		bevelEnabled: false
	};
	return new THREE.ExtrudeGeometry(roundedRectShape, extrudeSettings);
}

function loadChair() {
	//椅子
	var objLoader = new THREE.OBJLoader($$.Loader.loadingManager);
	objLoader.setPath('model/');
	objLoader.load('chair.obj', function(object) {
		chairModel = object;
		//scene.add(object);
		chairModel.scale.x = chairModel.scale.y = chairModel.scale.z = 0.38;

		chairModel.children[0].material = new THREE.MeshLambertMaterial({
			color: 0x224466
		});
	});
}
var flowerMaterials, flowerModel,sofaMaterials,sofaModel;

function loadFlower() {
	//椅子
	var mtlLoader = new THREE.MTLLoader($$.Loader.loadingManager);
	mtlLoader.setPath('model/');
	mtlLoader.load('plant/house plant.mtl', function(materials) {
		materials.preload();
		flowerMaterials = materials;
		var objLoader = new THREE.OBJLoader($$.Loader.loadingManager);
		objLoader.setMaterials(materials);
		objLoader.setPath('model/');
		objLoader.load('plant/house plant.obj', function(object) {
			object.scale.x = object.scale.y = object.scale.z = 0.015;
			flowerModel = object;
		});

	});
}
function loadSofa() {
	//椅子
	var mtlLoader = new THREE.MTLLoader($$.Loader.loadingManager);
	mtlLoader.setPath('model/');
	mtlLoader.load('sofa/Sofa.mtl', function(materials) {
		materials.preload();
		sofaMaterials = materials;
		var objLoader = new THREE.OBJLoader($$.Loader.loadingManager);
		objLoader.setMaterials(materials);
		objLoader.setPath('model/');
		objLoader.load('sofa/Sofa.obj', function(object) {
			object.scale.x = object.scale.y = object.scale.z = 0.015;
			sofaModel = object;
		});

	});
}