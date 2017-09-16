let STEP = game.settings.blockSize;
let groundGeometry = new THREE.PlaneBufferGeometry(STEP, STEP);
let cylinderGeometry = new THREE.CylinderBufferGeometry(STEP, STEP, STEP, 64);
let cubeGeometry = new THREE.BoxBufferGeometry(STEP, STEP, STEP);
let triangleGeometry = new THREE.BoxGeometry(STEP, STEP, STEP);
let stickGeomerty = new THREE.BoxBufferGeometry(STEP / 10, STEP, STEP / 10);
triangleGeometry.vertices = [new THREE.Vector3(STEP >> 1, STEP >> 1, STEP >> 1), new THREE.Vector3(STEP >> 1, STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, STEP >> 1, STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, STEP >> 1)];
triangleGeometry.mergeVertices();
let circleRadius = STEP / 6 * 5;
let circleShape = new THREE.Shape();
circleShape.moveTo(-STEP / 2, STEP / 2);
circleShape.lineTo(-STEP / 2, STEP / 3);
circleShape.absarc(-STEP / 2, -STEP / 2, STEP * 5 / 6, Math.PI / 2, 0, true);
circleShape.lineTo(STEP / 2, -STEP / 2);
circleShape.lineTo(STEP / 2, STEP / 2);
circleShape.lineTo(-STEP / 2, STEP / 2);
let arcGeometry = new THREE.ExtrudeBufferGeometry(circleShape, {
	steps: 1,
	amount: STEP,
	bevelEnabled: false
});
arcGeometry.center();

var roundedRectShape = new THREE.Shape();
(function(ctx, x, y, width, height, radius) {
	ctx.moveTo(x, y + radius);
	ctx.lineTo(x, y + height - radius);
	ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
	ctx.lineTo(x + width - radius, y + height);
	ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
	ctx.lineTo(x + width, y + radius);
	ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
	ctx.lineTo(x + radius, y);
	ctx.quadraticCurveTo(x, y, x, y + radius);
})(roundedRectShape, 0, 0, STEP, STEP, STEP / 3);
let roundRectGeometry = new THREE.ExtrudeBufferGeometry(roundedRectShape, {
	steps: 1,
	amount: STEP,
	bevelEnabled: false
});
roundRectGeometry.center();

var cirlceShape = new THREE.Shape();
cirlceShape.moveTo(0, 0);
cirlceShape.absarc(STEP, STEP, STEP, 0, Math.PI * 2, false);
var smileyEye1Path = new THREE.Path();
smileyEye1Path.moveTo(0, 0);
smileyEye1Path.absarc(STEP, STEP, STEP / 2, 0, Math.PI * 2, false);
cirlceShape.holes.push(smileyEye1Path);
let ringGeometry = new THREE.ExtrudeBufferGeometry(cirlceShape, {
	steps: 1,
	amount: STEP,
	bevelEnabled: false
});
ringGeometry.center();

var core = {};
core.map = {};
core.childrenWithId = {};
core.charactor = {};
core.createLevelWorld = function() {
	let world = new $$.SubWorld({}, {
		type: "OrthographicCamera"
	});
	core.loadMapResource(function() {
		core.initMapMaterials(world);
		core.initMapBlocks(world);
		core.initPathGraph(world);
		core.initMapLights(world);
		core.initMapCamera(world);
		core.initLevelBoard(world);
		core.createCharacter(world);
		if(core.map.background != null) {
			$$.global.renderer.setClearColor(core.map.background);
		}
		if(core.map.onGameStart) {
			core.map.onGameStart();
		}
	});

	world.actionInjections.push(TWEEN.update);
	return world;
};
core.createRing = function(item, m, container) {
	let cube = new THREE.Mesh(ringGeometry, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.set(item.sx || 1, item.sy || 1, item.sz || 1);
	container.add(cube);
	if(item.cannotClick) {
		cube.isPenetrated = true;
	}
	return cube;
};
core.createRoundRect = function(item, m, container) {
	let cube = new THREE.Mesh(roundRectGeometry, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.set(item.sx || 1, item.sy || 1, item.sz || 1);
	container.add(cube);
	if(item.cannotClick) {
		cube.isPenetrated = true;
	}
	return cube;
};

core.createRoof = function(item, ms, container) {
	let material;
	for(let i in core.map.materials) {
		material = core.map.materials[i];
		break;
	}
	let group = new THREE.Group();
	var step = STEP / 1.3;
	let geometry = new THREE.CylinderBufferGeometry(step * 0.95, step, STEP / 5, 4);
	let m = core.map.materials[ms[0]] || material;
	let cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = -step * 0.4;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step, step, STEP / 10, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = -STEP * 0.45;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 1.05, step * 0.95, STEP / 5, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = -STEP * 0.2;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 1.2, step * 1.05, STEP / 5, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = 0;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 1.25, step * 1.2, STEP / 5, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = STEP * 0.2;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 1.15, step * 1.25, STEP / 5, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = STEP * 0.4;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 0.90, step * 1.15, STEP / 5, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = STEP * 0.6;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 0.63, step * 0.90, STEP / 5, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = STEP * 0.8;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 0.45, step * 0.63, STEP / 5, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = STEP;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 0.30, step * 0.45, STEP / 5, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = STEP * 1.2;
	group.add(cylinder);
	geometry = new THREE.CylinderBufferGeometry(step * 0.15, step * 0.30, STEP * 0.4, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = STEP * 1.5;
	group.add(cylinder);

	geometry = new THREE.CylinderBufferGeometry(step * 0.001, step * 0.15, STEP * 0.4, 4);
	m = core.map.materials[ms[1]] || material;
	cylinder = new THREE.Mesh(geometry, m);
	cylinder.position.y = STEP * 1.9;
	group.add(cylinder);

	group.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	group.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	container.add(group);
	return group;
}

core.createCube = function(item, m, container) {
	let cube = new THREE.Mesh(cubeGeometry, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.set(item.sx || 1, item.sy || 1, item.sz || 1);
	container.add(cube);
	return cube;
};
core.createPlane = function(item, m, container) {
	let cube = new THREE.Mesh(cubeGeometry, m);
	cube.position.set(item.x * STEP || 0, (item.y + 5 / 12) * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.y = 1 / 6;
	cube.scale.x = item.sx || 1;
	cube.scale.z = item.sz || 1;
	container.add(cube);
	return cube;
};

core.createGround = function(item, m, container) {
	let cube = new THREE.Mesh(groundGeometry, m);
	cube.position.set(item.x * STEP || 0, (item.y + 5 / 12) * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.x = item.width;
	cube.scale.y = item.height;
	container.add(cube);
	return cube;
};

core.createTri = function(item, m, container) {
	let cube = new THREE.Mesh(triangleGeometry, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.set(item.sx || 1, item.sy || 1, item.sz || 1);
	container.add(cube);
	return cube;
};

core.createCylinder = function(item, m, container) {
	let cube = new THREE.Mesh(cylinderGeometry, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.set(item.sx || 1, item.sy || 1, item.sz || 1);
	container.add(cube);
	return cube;
};

core.createArc = function(item, m, container) {
	let cube = new THREE.Mesh(arcGeometry, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	container.add(cube);
	return cube;
};

core.createStick = function(item, m, container) {
	let cube = new THREE.Mesh(stickGeomerty, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	if(item.height) {
		cube.scale.y = item.height;
	}
	if(item.d === 0) {
		cube.position.x -= STEP * 0.45;
		cube.position.z -= STEP * 0.45;
	} else if(item.d === 1) {
		cube.position.x += STEP * 0.45;
		cube.position.z -= STEP * 0.45;
	} else if(item.d === 2) {
		cube.position.x += STEP * 0.45;
		cube.position.z += STEP * 0.45;
	} else if(item.d === 3) {
		cube.position.x -= STEP * 0.45;
		cube.position.z += STEP * 0.45;
	}
	cube.isPenetrated = true;
	container.add(cube);
	return cube;
};
core.createStair = function(item, m, container) {
	let cube = new THREE.Mesh(triangleGeometry, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	if(!item.height) {
		item.height = 1;
	}
	let group = new THREE.Group();
	for(let ii = 0; ii < item.height * 6; ii++) {
		var c = cube.clone();
		c.position.y += (ii + 1) * STEP / 6 + STEP / 4;
		if(item.d === 0) {
			c.position.z -= (ii) * STEP / 6 - STEP / 4;
			c.rotation.y = Math.PI / 2;
		} else if(item.d === 1) {
			c.position.x += (ii) * STEP / 6 - STEP / 4;
		} else if(item.d === 2) {
			c.position.z += (ii) * STEP / 6 - STEP / 4;
			c.rotation.y = -Math.PI / 2;
		} else if(item.d === 3) {
			c.position.x -= (ii) * STEP / 6 - STEP / 4;
			c.rotation.y = Math.PI;
		} else {
			c.position.z -= (ii) * STEP / 6 - STEP / 4;
			c.rotation.y = Math.PI / 2;
		}
		c.scale.x = 0.5;
		c.scale.y = 0.5;
		group.add(c);
	}
	container.add(group);
	return group;
};

core.LinearBar = function(item, container, gameWorld) {
	var that = this;
	var _mouse = new THREE.Vector2();
	var _raycaster = new THREE.Raycaster();
	let group = new THREE.Group();
	group.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	group.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	this.object = group;
	that.axis = item.axis || "x";
	that.min = item.min;
	that.max = item.max;
	container.add(group);
	for(let child of item.children) {
		let material;
		if(child.materialId) {
			material = core.map.materials[child.materialId];
		} else {
			for(let i in core.map.materials) {
				material = core.map.materials[i];
				break;
			}
		}
		var obj;
		if(child.type == "cube") {
			obj = core.createCube(child, material, group);
		} else if(child.type == "plane") {
			obj = core.createPlane(child, material, group);
		} else if(item.type == "ground") {
			obj = core.createGround(item, material, group);
		} else if(child.type == "tri") {
			obj = core.createTri(child, material, group);
		} else if(child.type == "stick") {
			obj = core.createStick(child, material, group);
		} else if(child.type == "stair") {
			obj = core.createStair(child, material, group);
		} else if(child.type == "turntable") {
			obj = core.createTurntable(child, group);
		} else if(child.type == "arc") {
			obj = core.core.createArc(child, material, group);
		} else if(child.type == "cylinder") {
			obj = core.createCylinder(child, material, group);
		} else if(child.type == "roof") {
			obj = core.createRoof(child, child.materialArr, group);
		} else if(child.type == "roundRect") {
			obj = core.createRoundRect(child, material, group);
		} else if(child.type == "ring") {
			obj = core.createRing(child, material, group);
		} else if(child.type == "group") {
			obj = core.createGroup(child, group);
		} else {
			obj = core.createCube(child, material, group);
		}

		if(child.dragPart) {
			obj.onDown = function() {
				that.hasDown = true;
				oldX = event.clientX || event.touches[0].clientX;
				oldY = event.clientY || event.touches[0].clientY;
				oldPosition = {
					x: group.position.x,
					y: group.position.y,
					z: group.position.z,
				};
				if(item.onDown) {
					item.onDown();
				}
			}
		}
	}
	$$.global.canvasDom.addEventListener("mousemove", dragMove, false);
	$$.global.canvasDom.addEventListener("touchmove", dragMove, false);
	$$.global.canvasDom.addEventListener("mouseup", dragEnd, false);
	$$.global.canvasDom.addEventListener("touchend", dragEnd, false);
	var oldX = 0,
		oldY = 0,
		oldPosition = {};

	function dragEnd() {
		that.hasDown = false;
		if(that.axis == "z") {
			var oz = group.position.z;
			for(var i = item.min; i <= that.max; i++) {
				if(Math.abs(oz - i * STEP) <= STEP / 2) {
					new TWEEN.Tween(group.position).to({
						z: i * STEP
					}, Math.abs(oz - i * STEP) * 2 / STEP * game.settings.moveSpeed).start().onComplete(function() {
						if(item.onUp) {
							item.onUp();
						}
					});
					break;
				}
			}
		} else if(that.axis == "y") {
			var oy = group.position.y;
			for(var i = that.min; i <= that.max; i++) {
				if(Math.abs(oy - i * STEP) <= STEP / 2) {
					new TWEEN.Tween(group.position).to({
						y: i * STEP
					}, Math.abs(oy - i * STEP) * 2 / STEP * game.settings.moveSpeed).start().onComplete(function() {
						if(item.onUp) {
							item.onUp();
						}
					});
					break;
				}
			}
		}
	}

	function dragMove(e) {
		if(!that.hasDown) {
			return;
		}
		var x = e.clientX || event.touches[0].clientX;
		var y = e.clientY || event.touches[0].clientY;
		if(item.axis == "z") {
			group.position.z = oldPosition.z + (oldX - x) * 1.414;
			if(group.position.z < item.min * STEP) {
				group.position.z = item.min * STEP;
			} else if(group.position.z > item.max * STEP) {
				group.position.z = item.max * STEP;
			}
		} else if(item.axis == "y") {
			group.position.y = oldPosition.y + (oldY - y) * 1.2;
			if(group.position.y < item.min * STEP) {
				group.position.y = item.min * STEP;
			} else if(group.position.y > item.max * STEP) {
				group.position.y = item.max * STEP;
			}
		}
		if(item.onMove) {
			item.onMove();
		}
	}

	return group;
}

core.createCharacter = function(gameWorld) {
	var geometry = new THREE.CylinderBufferGeometry(STEP / 3, 1, STEP, 16);
	var material = new THREE.MeshLambertMaterial({
		color: 0xffff00
	});
	var cylinder = new THREE.Mesh(geometry, material);
	gameWorld.scene.add(cylinder);
	var sp = core.map["path" + core.map.currentPath][core.map.startPoint];
	//	cylinder.isPenetrated=true;
	cylinder.position.set(sp.x * STEP, sp.y * STEP, sp.z * STEP);
	cylinder.isWalking = false;
	cylinder.walkingPath = [];
	cylinder.currentPath = core.map.startPoint;
	core.charactor = cylinder;
};

core.Obj = {};
core.Obj.TurntableX = function(options) {
	let that = this;
	let group = new THREE.Group();
	group.position.set(options.x * STEP || 0, options.y * STEP || 0, options.z * STEP || 0);
	//group.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
	this.object = group;
	group.owner = that;
	let axisG = new THREE.BoxBufferGeometry(STEP, STEP / 4, STEP / 4);
	let axisM;
	if(options.axisMaterial) {
		axisM = options.axisMaterial;
	} else {
		for(let i in core.map.materials) {
			axisM = core.map.materials[i];
			break;
		}
	}
	let axis = new THREE.Mesh(axisG, axisM);
	axis.position.x = -STEP;
	group.add(axis);

	let hoopG = new THREE.CylinderBufferGeometry(STEP / 2.3, STEP / 2.3, STEP, 32);
	let hoopM;
	if(options.hoopMaterial) {
		hoopM = core.map.materials[options.hoopMaterial];
	} else {
		for(let i in core.map.materials) {
			hoopM = core.map.materials[i];
			break;
		}
	}
	var hoop = new THREE.Mesh(hoopG, hoopM);
	hoop.rotation.z = Math.PI / 2;
	group.add(hoop);

	let rodG = new THREE.CylinderBufferGeometry(STEP / 6, STEP / 6, STEP * 2.5, 32);
	let rodM;
	if(options.rodMaterial) {
		rodM = core.map.materials[options.rodMaterial];
	} else {
		for(let i in core.map.materials) {
			rodM = core.map.materials[i];
			break;
		}
	}
	var rod1 = new THREE.Mesh(rodG, rodM);
	group.add(rod1);

	var rod2 = rod1.clone();
	rod2.rotation.x = Math.PI / 2;
	group.add(rod2);

	let poleG = new THREE.CylinderBufferGeometry(STEP / 4, STEP / 4, STEP * 0.5, 32);
	let poleM;
	if(options.poleMaterial) {
		poleM = core.map.materials[options.poleMaterial];
	} else {
		for(let i in core.map.materials) {
			poleM = core.map.materials[i];
			break;
		}
	}
	var pole1 = new THREE.Mesh(poleG, poleM);
	pole1.position.y = STEP * 1.5;
	group.add(pole1);
	var pole2 = pole1.clone();
	pole2.position.y = -STEP * 1.5;
	group.add(pole2);
	var pole3 = pole1.clone();
	pole3.position.y = 0;
	pole3.position.z = STEP * 1.5;
	pole3.rotation.x = Math.PI / 2;
	group.add(pole3);
	var pole4 = pole1.clone();
	pole4.position.y = 0;
	pole4.position.z = -STEP * 1.5;
	pole4.rotation.x = Math.PI / 2;
	group.add(pole4);

	hoop.onDown = axis.onDown = rod1.onDown = rod2.onDown = pole1.onDown = pole2.onDown = pole3.onDown = pole4.onDown = function() {
		if(that.disable) {
			return;
		}
		that.isDown = true;
		var canvasXY = $$.sceneCoordinateToCanvasCoordinate(group);
		if(event.touches) {
			var e = event.touches[0];
		} else {
			var e = event;
		}
		var distance = Math.sqrt((e.clientX - canvasXY.x) * (e.clientX - canvasXY.x) + (e.clientY - canvasXY.y) * (e.clientY - canvasXY.y));
		if(distance > 0) {
			that.clickAngle = 0;
			if(e.clientY > canvasXY.y) {
				that.clickAngle = 2 * Math.PI - Math.acos((e.clientX - canvasXY.x) / distance);
			} else {
				that.clickAngle = Math.acos((e.clientX - canvasXY.x) / distance);
			}
		} else {
			that.clickAngle = 0;
		}
		that.preAngle = that.clickAngle;
		$$.global.canvasDom.addEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.addEventListener("touchend", dragEnd, false);
		$$.global.canvasDom.addEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.addEventListener("touchmove", dragMove, false);
	}
	hoop.onUp = axis.onUp = rod1.onUp = rod2.onUp = pole1.onUp = pole2.onUp = pole3.onUp = pole4.onUp = function() {
		dragEnd();
	}
	hoop.onClick = axis.onClick = rod1.onClick = rod2.onClick = pole1.onClick = pole2.onClick = pole3.onClick = pole4.onClick = function() {
		dragEnd();
	}

	this.disable = false;

	this.becomeDisable = function() {
		if(that.disable) {
			return;
		}
		that.disable = true;
		new TWEEN.Tween(rod1.scale).to({
			y: 0.5
		}, 350).start();
		new TWEEN.Tween(rod2.scale).to({
			y: 0.5
		}, 350).start();
		new TWEEN.Tween(pole1.position).to({
			y: pole1.position.y / 2
		}, 350).start();
		new TWEEN.Tween(pole2.position).to({
			y: pole2.position.y / 2
		}, 350).start();
		new TWEEN.Tween(pole3.position).to({
			z: pole3.position.z / 2
		}, 350).start();
		new TWEEN.Tween(pole4.position).to({
			z: pole4.position.z / 2
		}, 350).start();
	};

	this.becomeAble = function() {
		if(!that.disable) {
			return;
		}
		that.disable = false;
		new TWEEN.Tween(rod1.scale).to({
			y: 1
		}, 350).start();
		new TWEEN.Tween(rod2.scale).to({
			y: 1
		}, 350).start();
		new TWEEN.Tween(pole1.position).to({
			y: pole1.position.y * 2
		}, 350).start();
		new TWEEN.Tween(pole2.position).to({
			y: pole2.position.y * 2
		}, 350).start();
		new TWEEN.Tween(pole3.position).to({
			z: pole3.position.z * 2
		}, 350).start();
		new TWEEN.Tween(pole4.position).to({
			z: pole4.position.z * 2
		}, 350).start();
	};

	function dragEnd(e) {
		that.isDown = false;
		$$.global.canvasDom.removeEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.removeEventListener("touchmove", dragMove, false);
		$$.global.canvasDom.removeEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.removeEventListener("touchend", dragEnd, false);
		var tmp = group.rotation.x;
		while(tmp < 0) {
			tmp += 2 * Math.PI;
		}
		group.rotation.x = tmp;
		if(group.rotation.x > Math.PI / 4 * 7) {
			group.rotation.x -= 2 * Math.PI;
		}
		tmp -= Math.PI / 4;
		var quaro = 0;
		while(tmp > 0) {
			quaro++;
			tmp -= Math.PI / 2;
		}

		quaro = quaro % 4;
		if(quaro === 0) {
			tmp = 0;
		} else if(quaro === 1) {
			tmp = Math.PI / 2;
		} else if(quaro === 2) {
			tmp = Math.PI;
		} else if(quaro === 3) {
			tmp = Math.PI * 1.5;
		}
		var time = Math.abs(group.rotation.x - tmp) * 400;
		new TWEEN.Tween(group.rotation)
			.to({
				x: tmp
			}, time)
			.easing(TWEEN.Easing.Back.Out)
			.start();
		if(options.funcEnd) {
			options.funcEnd(e, group.rotation.x);
		}
	}

	function dragMove(event) {
		if(that.isDown) {
			if(event.touches) {
				var e = event.touches[0];
			} else {
				var e = event;
			}
			var canvasXY = $$.sceneCoordinateToCanvasCoordinate(group);
			var distance = Math.sqrt((e.clientX - canvasXY.x) * (e.clientX - canvasXY.x) + (e.clientY - canvasXY.y) * (e.clientY - canvasXY.y));
			if(distance > 0) {
				that.clickAngle = 0;
				if(e.clientY > canvasXY.y) {
					that.clickAngle = 2 * Math.PI - Math.acos((e.clientX - canvasXY.x) / distance);
				} else {
					that.clickAngle = Math.acos((e.clientX - canvasXY.x) / distance);
				}
			} else {
				that.clickAngle = 0;
			}
			group.rotation.x += that.clickAngle - that.preAngle;
			that.preAngle = that.clickAngle;
			if(options.funcMove) {
				options.funcMove(e, group.rotation.x);
			}
		}
	}
}
core.Obj.TurntableY = function(options) {
	let that = this;
	let group = new THREE.Group();
	group.position.set(options.x * STEP || 0, options.y * STEP || 0, options.z * STEP || 0);
	//group.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
	group.rotation.z = Math.PI / 2;
	this.object = group;
	group.owner = that;
	let axisG = new THREE.BoxBufferGeometry(STEP, STEP / 4, STEP / 4);
	let axisM;
	if(options.axisMaterial) {
		axisM = options.axisMaterial;
	} else {
		for(let i in core.map.materials) {
			axisM = core.map.materials[i];
			break;
		}
	}
	let axis = new THREE.Mesh(axisG, axisM);
	axis.position.x = -STEP;
	group.add(axis);

	let hoopG = new THREE.CylinderBufferGeometry(STEP / 2.3, STEP / 2.3, STEP, 32);
	let hoopM;
	if(options.hoopMaterial) {
		hoopM = core.map.materials[options.hoopMaterial];
	} else {
		for(let i in core.map.materials) {
			hoopM = core.map.materials[i];
			break;
		}
	}
	var hoop = new THREE.Mesh(hoopG, hoopM);
	hoop.rotation.z = Math.PI / 2;
	group.add(hoop);

	let rodG = new THREE.CylinderBufferGeometry(STEP / 6, STEP / 6, STEP * 2.5, 32);
	let rodM;
	if(options.rodMaterial) {
		rodM = core.map.materials[options.rodMaterial];
	} else {
		for(let i in core.map.materials) {
			rodM = core.map.materials[i];
			break;
		}
	}
	var rod1 = new THREE.Mesh(rodG, rodM);
	group.add(rod1);

	var rod2 = rod1.clone();
	rod2.rotation.x = Math.PI / 2;
	group.add(rod2);

	let poleG = new THREE.CylinderBufferGeometry(STEP / 4, STEP / 4, STEP * 0.5, 32);
	let poleM;
	if(options.poleMaterial) {
		poleM = core.map.materials[options.poleMaterial];
	} else {
		for(let i in core.map.materials) {
			poleM = core.map.materials[i];
			break;
		}
	}
	var pole1 = new THREE.Mesh(poleG, poleM);
	pole1.position.y = STEP * 1.5;
	group.add(pole1);
	var pole2 = pole1.clone();
	pole2.position.y = -STEP * 1.5;
	group.add(pole2);
	var pole3 = pole1.clone();
	pole3.position.y = 0;
	pole3.position.z = STEP * 1.5;
	pole3.rotation.x = Math.PI / 2;
	group.add(pole3);
	var pole4 = pole1.clone();
	pole4.position.y = 0;
	pole4.position.z = -STEP * 1.5;
	pole4.rotation.x = Math.PI / 2;
	group.add(pole4);

	hoop.onDown = axis.onDown = rod1.onDown = rod2.onDown = pole1.onDown = pole2.onDown = pole3.onDown = pole4.onDown = function() {
		if(that.disable) {
			return;
		}
		that.isDown = true;
		var canvasXY = $$.sceneCoordinateToCanvasCoordinate(group);
		if(event.touches) {
			var e = event.touches[0];
		} else {
			var e = event;
		}
		var distance = Math.sqrt((e.clientX - canvasXY.x) * (e.clientX - canvasXY.x) + (e.clientY - canvasXY.y) * (e.clientY - canvasXY.y));
		if(distance > 0) {
			that.clickAngle = 0;
			if(e.clientY > canvasXY.y) {
				that.clickAngle = 2 * Math.PI - Math.acos((e.clientX - canvasXY.x) / distance);
			} else {
				that.clickAngle = Math.acos((e.clientX - canvasXY.x) / distance);
			}
		} else {
			that.clickAngle = 0;
		}
		that.preAngle = that.clickAngle;
		$$.global.canvasDom.addEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.addEventListener("touchend", dragEnd, false);
		$$.global.canvasDom.addEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.addEventListener("touchmove", dragMove, false);
	}
	hoop.onUp = axis.onUp = rod1.onUp = rod2.onUp = pole1.onUp = pole2.onUp = pole3.onUp = pole4.onUp = function() {
		dragEnd();
	}
	hoop.onClick = axis.onClick = rod1.onClick = rod2.onClick = pole1.onClick = pole2.onClick = pole3.onClick = pole4.onClick = function() {
		dragEnd();
	}

	this.disable = false;

	this.becomeDisable = function() {
		if(that.disable) {
			return;
		}
		that.disable = true;
		new TWEEN.Tween(rod1.scale).to({
			y: 0.5
		}, 350).start();
		new TWEEN.Tween(rod2.scale).to({
			y: 0.5
		}, 350).start();
		new TWEEN.Tween(pole1.position).to({
			y: pole1.position.y / 2
		}, 350).start();
		new TWEEN.Tween(pole2.position).to({
			y: pole2.position.y / 2
		}, 350).start();
		new TWEEN.Tween(pole3.position).to({
			z: pole3.position.z / 2
		}, 350).start();
		new TWEEN.Tween(pole4.position).to({
			z: pole4.position.z / 2
		}, 350).start();
	};

	this.becomeAble = function() {
		if(!that.disable) {
			return;
		}
		that.disable = false;
		new TWEEN.Tween(rod1.scale).to({
			y: 1
		}, 350).start();
		new TWEEN.Tween(rod2.scale).to({
			y: 1
		}, 350).start();
		new TWEEN.Tween(pole1.position).to({
			y: pole1.position.y * 2
		}, 350).start();
		new TWEEN.Tween(pole2.position).to({
			y: pole2.position.y * 2
		}, 350).start();
		new TWEEN.Tween(pole3.position).to({
			z: pole3.position.z * 2
		}, 350).start();
		new TWEEN.Tween(pole4.position).to({
			z: pole4.position.z * 2
		}, 350).start();
	};

	function dragEnd(e) {
		that.isDown = false;
		$$.global.canvasDom.removeEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.removeEventListener("touchmove", dragMove, false);
		$$.global.canvasDom.removeEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.removeEventListener("touchend", dragEnd, false);
		var tmp = group.rotation.y;
		while(tmp < 0) {
			tmp += 2 * Math.PI;
		}
		group.rotation.y = tmp;
		if(group.rotation.y > Math.PI / 4 * 7) {
			group.rotation.y -= 2 * Math.PI;
		}
		tmp -= Math.PI / 4;
		var quaro = 0;
		while(tmp > 0) {
			quaro++;
			tmp -= Math.PI / 2;
		}

		quaro = quaro % 4;
		if(quaro === 0) {
			tmp = 0;
		} else if(quaro === 1) {
			tmp = Math.PI / 2;
		} else if(quaro === 2) {
			tmp = Math.PI;
		} else if(quaro === 3) {
			tmp = Math.PI * 1.5;
		}
		var time = Math.abs(group.rotation.y - tmp) * 400;
		new TWEEN.Tween(group.rotation)
			.to({
				y: tmp
			}, time)
			.easing(TWEEN.Easing.Back.Out)
			.start();
		if(options.funcEnd) {
			options.funcEnd(e, group.rotation.y);
		}
	}

	function dragMove(event) {
		if(that.isDown) {
			if(event.touches) {
				var e = event.touches[0];
			} else {
				var e = event;
			}
			var canvasXY = $$.sceneCoordinateToCanvasCoordinate(group);
			var distance = Math.sqrt((e.clientX - canvasXY.x) * (e.clientX - canvasXY.x) + (e.clientY - canvasXY.y) * (e.clientY - canvasXY.y));
			if(distance > 0) {
				that.clickAngle = 0;
				if(e.clientY > canvasXY.y) {
					that.clickAngle = 2 * Math.PI - Math.acos((e.clientX - canvasXY.x) / distance);
				} else {
					that.clickAngle = Math.acos((e.clientX - canvasXY.x) / distance);
				}
			} else {
				that.clickAngle = 0;
			}
			group.rotation.y += that.clickAngle - that.preAngle;
			that.preAngle = that.clickAngle;
			if(options.funcMove) {
				options.funcMove(e, group.rotation.y);
			}
		}
	}
}
core.Obj.TurntableZ = function(options) {
	let that = this;
	let group = new THREE.Group();
	group.position.set(options.x * STEP || 0, options.y * STEP || 0, options.z * STEP || 0);
	//group.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
	this.object = group;
	group.owner = that;
	let axisG = new THREE.BoxBufferGeometry(STEP, STEP / 4, STEP / 4);
	let axisM;
	if(options.axisMaterial) {
		axisM = options.axisMaterial;
	} else {
		for(let i in core.map.materials) {
			axisM = core.map.materials[i];
			break;
		}
	}
	let axis = new THREE.Mesh(axisG, axisM);
	axis.position.x = -STEP;
	group.add(axis);

	let hoopG = new THREE.CylinderBufferGeometry(STEP / 2.3, STEP / 2.3, STEP, 32);
	let hoopM;
	if(options.hoopMaterial) {
		hoopM = core.map.materials[options.hoopMaterial];
	} else {
		for(let i in core.map.materials) {
			hoopM = core.map.materials[i];
			break;
		}
	}
	var hoop = new THREE.Mesh(hoopG, hoopM);
	hoop.rotation.z = Math.PI / 2;
	group.add(hoop);

	let rodG = new THREE.CylinderBufferGeometry(STEP / 6, STEP / 6, STEP * 2.5, 32);
	let rodM;
	if(options.rodMaterial) {
		rodM = core.map.materials[options.rodMaterial];
	} else {
		for(let i in core.map.materials) {
			rodM = core.map.materials[i];
			break;
		}
	}
	var rod1 = new THREE.Mesh(rodG, rodM);
	group.add(rod1);

	var rod2 = rod1.clone();
	rod2.rotation.x = Math.PI / 2;
	group.add(rod2);

	let poleG = new THREE.CylinderBufferGeometry(STEP / 4, STEP / 4, STEP * 0.5, 32);
	let poleM;
	if(options.poleMaterial) {
		poleM = core.map.materials[options.poleMaterial];
	} else {
		for(let i in core.map.materials) {
			poleM = core.map.materials[i];
			break;
		}
	}
	var pole1 = new THREE.Mesh(poleG, poleM);
	pole1.position.y = STEP * 1.5;
	group.add(pole1);
	var pole2 = pole1.clone();
	pole2.position.y = -STEP * 1.5;
	group.add(pole2);
	var pole3 = pole1.clone();
	pole3.position.y = 0;
	pole3.position.z = STEP * 1.5;
	pole3.rotation.x = Math.PI / 2;
	group.add(pole3);
	var pole4 = pole1.clone();
	pole4.position.y = 0;
	pole4.position.z = -STEP * 1.5;
	pole4.rotation.x = Math.PI / 2;
	group.add(pole4);

	hoop.onDown = axis.onDown = rod1.onDown = rod2.onDown = pole1.onDown = pole2.onDown = pole3.onDown = pole4.onDown = function() {
		if(that.disable) {
			return;
		}
		that.isDown = true;
		var canvasXY = $$.sceneCoordinateToCanvasCoordinate(group);
		if(event.touches) {
			var e = event.touches[0];
		} else {
			var e = event;
		}
		var distance = Math.sqrt((e.clientX - canvasXY.x) * (e.clientX - canvasXY.x) + (e.clientY - canvasXY.y) * (e.clientY - canvasXY.y));
		if(distance > 0) {
			that.clickAngle = 0;
			if(e.clientY > canvasXY.y) {
				that.clickAngle = 2 * Math.PI - Math.acos((e.clientX - canvasXY.x) / distance);
			} else {
				that.clickAngle = Math.acos((e.clientX - canvasXY.x) / distance);
			}
		} else {
			that.clickAngle = 0;
		}
		that.preAngle = that.clickAngle;
		$$.global.canvasDom.addEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.addEventListener("touchend", dragEnd, false);
		$$.global.canvasDom.addEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.addEventListener("touchmove", dragMove, false);
	}
	hoop.onUp = axis.onUp = rod1.onUp = rod2.onUp = pole1.onUp = pole2.onUp = pole3.onUp = pole4.onUp = function() {
		dragEnd();
	}
	hoop.onClick = axis.onClick = rod1.onClick = rod2.onClick = pole1.onClick = pole2.onClick = pole3.onClick = pole4.onClick = function() {
		dragEnd();
	}

	this.disable = false;

	this.becomeDisable = function() {
		if(that.disable) {
			return;
		}
		that.disable = true;
		new TWEEN.Tween(rod1.scale).to({
			y: 0.5
		}, 350).start();
		new TWEEN.Tween(rod2.scale).to({
			y: 0.5
		}, 350).start();
		new TWEEN.Tween(pole1.position).to({
			y: pole1.position.y / 2
		}, 350).start();
		new TWEEN.Tween(pole2.position).to({
			y: pole2.position.y / 2
		}, 350).start();
		new TWEEN.Tween(pole3.position).to({
			z: pole3.position.z / 2
		}, 350).start();
		new TWEEN.Tween(pole4.position).to({
			z: pole4.position.z / 2
		}, 350).start();
	};

	this.becomeAble = function() {
		if(!that.disable) {
			return;
		}
		that.disable = false;
		new TWEEN.Tween(rod1.scale).to({
			y: 1
		}, 350).start();
		new TWEEN.Tween(rod2.scale).to({
			y: 1
		}, 350).start();
		new TWEEN.Tween(pole1.position).to({
			y: pole1.position.y * 2
		}, 350).start();
		new TWEEN.Tween(pole2.position).to({
			y: pole2.position.y * 2
		}, 350).start();
		new TWEEN.Tween(pole3.position).to({
			z: pole3.position.z * 2
		}, 350).start();
		new TWEEN.Tween(pole4.position).to({
			z: pole4.position.z * 2
		}, 350).start();
	};

	function dragEnd(e) {
		that.isDown = false;
		$$.global.canvasDom.removeEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.removeEventListener("touchmove", dragMove, false);
		$$.global.canvasDom.removeEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.removeEventListener("touchend", dragEnd, false);
		var tmp = group.rotation.x;
		while(tmp < 0) {
			tmp += 2 * Math.PI;
		}
		group.rotation.x = tmp;
		if(group.rotation.x > Math.PI / 4 * 7) {
			group.rotation.x -= 2 * Math.PI;
		}
		tmp -= Math.PI / 4;
		var quaro = 0;
		while(tmp > 0) {
			quaro++;
			tmp -= Math.PI / 2;
		}

		quaro = quaro % 4;
		if(quaro === 0) {
			tmp = 0;
		} else if(quaro === 1) {
			tmp = Math.PI / 2;
		} else if(quaro === 2) {
			tmp = Math.PI;
		} else if(quaro === 3) {
			tmp = Math.PI * 1.5;
		}
		var time = Math.abs(group.rotation.x - tmp) * 400;
		new TWEEN.Tween(group.rotation)
			.to({
				x: tmp
			}, time)
			.easing(TWEEN.Easing.Back.Out)
			.start();
		if(options.funcEnd) {
			options.funcEnd(e, group.rotation.x);
		}
	}

	function dragMove(event) {
		if(that.isDown) {
			if(event.touches) {
				var e = event.touches[0];
			} else {
				var e = event;
			}
			var canvasXY = $$.sceneCoordinateToCanvasCoordinate(group);
			var distance = Math.sqrt((e.clientX - canvasXY.x) * (e.clientX - canvasXY.x) + (e.clientY - canvasXY.y) * (e.clientY - canvasXY.y));
			if(distance > 0) {
				that.clickAngle = 0;
				if(e.clientY > canvasXY.y) {
					that.clickAngle = 2 * Math.PI - Math.acos((e.clientX - canvasXY.x) / distance);
				} else {
					that.clickAngle = Math.acos((e.clientX - canvasXY.x) / distance);
				}
			} else {
				that.clickAngle = 0;
			}
			group.rotation.x += that.clickAngle - that.preAngle;
			that.preAngle = that.clickAngle;
			if(options.funcMove) {
				options.funcMove(e, group.rotation.x);
			}
		}
	}
}

core.createTurntable = function(item, container) {
	if(item.axis == "y") {
		var turntable = new core.Obj.TurntableY(item);
		container.add(turntable.object);
		return turntable.object;
	} else if(item.axis == "z") {
		var turntable = new core.Obj.TurntableZ(item);
		container.add(turntable.object);
		return turntable.object;
	} else {
		var turntable = new core.Obj.TurntableX(item);
		container.add(turntable.object);
		return turntable.object;
	}
};

core.createGroup = function(item, container) {
	let group = new THREE.Group();
	group.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	group.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	container.add(group);

	for(let child of item.children) {
		let material;
		if(child.materialId) {
			material = core.map.materials[child.materialId];
		} else {
			for(let i in core.map.materials) {
				material = core.map.materials[i];
				break;
			}
		}
		if(child.type == "cube") {
			core.createCube(child, material, group);
		} else if(child.type == "plane") {
			core.createPlane(child, material, group);
		} else if(item.type == "ground") {
			core.createGround(item, material, group);
		} else if(child.type == "tri") {
			core.createTri(child, material, group);
		} else if(child.type == "stick") {
			core.createStick(child, material, group);
		} else if(child.type == "stair") {
			core.createStair(child, material, group);
		} else if(child.type == "turntable") {
			core.createTurntable(child, group);
		} else if(child.type == "arc") {
			core.core.createArc(child, material, group);
		} else if(child.type == "cylinder") {
			core.createCylinder(child, material, group);
		} else if(child.type == "roof") {
			core.createRoof(child, child.materialArr, group);
		} else if(child.type == "roundRect") {
			core.createRoundRect(child, material, group);
		} else if(child.type == "ring") {
			core.createRing(child, material, group);
		} else if(child.type == "group") {
			core.createGroup(child, group);
		} else {
			core.createCube(child, material, group);
		}
	}
	return group;
};

core.initLevelBoard = function(gameWorld) {
	if(!core.map.levelBoard) {
		return;
	}
	let w = $$.getWorldWidth();
	let h = $$.getWorldHeight();
	let canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = core.map.levelBoard.backgroundColor;
	ctx.fillRect(0, 0, w, h);
	ctx.textAlign = "center";
	for(let item of core.map.levelBoard.info) {
		if(item.type == "text") {
			ctx.font = item.weight + " " + item.size * h + "px " + item.family;
			ctx.fillStyle = item.color;
			let width = ctx.measureText(item.text).width;
			ctx.fillText(item.text, w / 2, h * item.y);
		} else if(item.type == "pic") {
			let imgWidth = $$.Loader.RESOURCE.textures[item.src].image.naturalWidth;
			let imgHeight = $$.Loader.RESOURCE.textures[item.src].image.naturalHeight;
			let newHeight = item.height * h;
			let newWidth = newHeight / imgHeight * imgWidth;
			ctx.drawImage($$.Loader.RESOURCE.textures[item.src].image, (w - newWidth) / 2, h * item.y - newHeight / 2, newWidth, newHeight);

		}
	}

	let texture = new THREE.CanvasTexture(canvas);
	let geometry = new THREE.PlaneBufferGeometry(w, h, 2);
	let material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		map: texture,
		transparent: true,
	});
	let plane = new THREE.Mesh(geometry, material);

	plane.position.set(gameWorld.camera.position.x - 100, gameWorld.camera.position.y - 100, gameWorld.camera.position.z - 100);
	plane.lookAt(gameWorld.camera.position);
	gameWorld.scene.add(plane);
	new TWEEN.Tween(plane.material)
		.to({
			opacity: 0
		}, core.map.levelBoard.duration)
		.delay(core.map.levelBoard.life)
		.onComplete(function() {
			gameWorld.scene.remove(plane);
		})
		.start();

};

core.initMapBlocks = function(gameWorld) {
	for(let item of core.map.blocks) {
		//let item = core.map.blocks[i];
		let material;
		if(item.materialId) {
			material = core.map.materials[item.materialId];
		} else {
			for(let i in core.map.materials) {
				material = core.map.materials[i];
				break;
			}
		}
		var obj;
		if(item.type == "cube") {
			obj = core.createCube(item, material, gameWorld.scene);
		} else if(item.type == "plane") {
			obj = core.createPlane(item, material, gameWorld.scene);
		} else if(item.type == "ground") {
			obj = core.createGround(item, material, gameWorld.scene);
		} else if(item.type == "tri") {
			obj = core.createTri(item, material, gameWorld.scene);
		} else if(item.type == "stick") {
			obj = core.createStick(item, material, gameWorld.scene);
		} else if(item.type == "stair") {
			obj = core.createStair(item, material, gameWorld.scene);
		} else if(item.type == "turntable") {
			obj = core.createTurntable(item, gameWorld.scene);
		} else if(item.type == "arc") {
			obj = core.createArc(item, material, gameWorld.scene);
		} else if(item.type == "cylinder") {
			obj = core.createCylinder(item, material, gameWorld.scene);
		} else if(item.type == "roof") {
			obj = core.createRoof(item, item.materialArr, gameWorld.scene);
		} else if(item.type == "roundRect") {
			obj = core.createRoundRect(item, material, gameWorld.scene);
		} else if(item.type == "ring") {
			obj = core.createRing(item, material, gameWorld.scene);
		} else if(item.type == "linear") {
			obj = new core.LinearBar(item, gameWorld.scene, gameWorld);
		} else if(item.type == "group") {
			obj = core.createGroup(item, gameWorld.scene);
		} else {
			obj = core.createCube(item, material, gameWorld.scene);
		}
		if(item.cannotClick) {
			obj.isPenetrated = item.cannotClick;
		}
		if(item.id) {
			core.childrenWithId[item.id] = obj;
		}
	}
};

core.initMapMaterials = function(gameWorld) {
	for(let i in core.map.materials) {
		let item = core.map.materials[i];
		if(item.type == "L") {
			if(item.mapId != null) {
				core.map.materials[i] = new THREE.MeshLambertMaterial({
					color: item.color,
					transparent: true,
					opacity: core.map.materials[i].opacity == null ? 1 : core.map.materials[i].opacity,
					map: $$.Loader.RESOURCE.textures[item.mapId]
				});
			} else {
				core.map.materials[i] = new THREE.MeshLambertMaterial({
					transparent: true,
					opacity: core.map.materials[i].opacity == null ? 1 : core.map.materials[i].opacity,
					color: item.color
				});
			}
		} else if(item.type == "B") {
			if(item.mapId) {
				core.map.materials[i] = new THREE.MeshBasicMaterial({
					color: item.color,
					opacity: core.map.materials[i].opacity == null ? 1 : core.map.materials[i].opacity,
					transparent: true,
					map: $$.Loader.RESOURCE.textures[core.map.textures[item.mapId]]
				});
			} else {
				core.map.materials[i] = new THREE.MeshBasicMaterial({
					transparent: true,
					opacity: core.map.materials[i].opacity == null ? 1 : core.map.materials[i].opacity,
					color: item.color
				});
			}
		}
	}
};

core.initMapCamera = function(gameWorld) {
	let c = core.map.camera;
	if(core.map.currentPath === 0) {
		gameWorld.camera.position.set((c.lookAt.x + c.distance) * STEP, (c.lookAt.y + c.distance) * STEP, (c.lookAt.z + c.distance) * STEP);
	}
	gameWorld.camera.lookAt(new THREE.Vector3(c.lookAt.x * STEP, c.lookAt.y * STEP, c.lookAt.z * STEP));
};

core.initMapLights = function(gameWorld) {
	for(let i in core.map.lights) {
		let item = core.map.lights[i];
		if(item.type == "A") {
			core.map.lights[i] = new THREE.AmbientLight(item.color);
			gameWorld.scene.add(core.map.lights[i]);
		} else if(item.type == "D") {
			core.map.lights[i] = new THREE.DirectionalLight(item.color, item.intensity);
			gameWorld.scene.add(core.map.lights[i]);
			core.map.lights[i].position.set(item.position.x, item.position.y, item.position.z);
		}
	}
};

core.showEndBoard = function() {
	var info = core.map.endBoard;
	let w = $$.getWorldWidth();
	let h = $$.getWorldHeight();
	let canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = core.map.levelBoard.backgroundColor;
	ctx.fillRect(0, 0, w, h);
	ctx.textAlign = "center";
	for(let item of info.info) {
		if(item.type == "text") {
			ctx.font = item.size * h + "px " + item.family + " " + item.weight;
			ctx.fillStyle = item.color;
			let width = ctx.measureText(item.text).width;
			ctx.fillText(item.text, w / 2, h * item.y);
		} else if(item.type == "pic") {
			let imgWidth = $$.Loader.RESOURCE.textures[item.src].image.naturalWidth;
			let imgHeight = $$.Loader.RESOURCE.textures[item.src].image.naturalHeight;
			let newHeight = item.height * h;
			let newWidth = newHeight / imgHeight * imgWidth;
			ctx.drawImage($$.Loader.RESOURCE.textures[item.src].image, (w - newWidth) / 2, h * item.y - newHeight / 2, newWidth, newHeight);

		}
	}

	let texture = new THREE.CanvasTexture(canvas);
	let geometry = new THREE.PlaneBufferGeometry(w, h, 2);
	let material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		map: texture,
		transparent: true,
	});
	let plane = new THREE.Mesh(geometry, material);

	plane.position.set(gameWorld.camera.position.x - 100, gameWorld.camera.position.y - 100, gameWorld.camera.position.z - 100);
	plane.lookAt(gameWorld.camera.position);
	gameWorld.scene.add(plane);
	plane.material.opacity = 0;
	new TWEEN.Tween(plane.material)
		.to({
			opacity: 1
		}, core.map.levelBoard.duration)
		.start();
}
core.createOnePath = function(gameWorld, pathInfo) {
	if(pathInfo.parentId) {
		var contain = core.childrenWithId[pathInfo.parentId];
	} else {
		var contain = gameWorld.scene;
	}
	var m;
	if(pathInfo.materialId) {
		m = core.map.materials[pathInfo.materialId];
	} else {
		for(let i in core.map.materials) {
			m = core.map.materials[i];
			break;
		}
	}
	let obj = new THREE.Mesh(groundGeometry, m);
	obj.position.set(pathInfo.x * STEP || 0, pathInfo.y * STEP || 0, pathInfo.z * STEP || 0);
	obj.rotation.set(pathInfo.rx || 0, pathInfo.ry || 0, pathInfo.rz || 0);
	obj.scale.set(pathInfo.sx || 1, pathInfo.sy || 1, pathInfo.sz || 1);
	contain.add(obj);
	obj.pathId = pathInfo.id;
	pathInfo.obj = obj;
	if(pathInfo.face === 0) {
		obj.rotation.x = -Math.PI / 2;
		obj.position.y -= STEP * 0.495;
	} else if(pathInfo.face == 1) {
		obj.rotation.y = Math.PI / 2;
		obj.position.x -= STEP * 0.495;
	} else if(pathInfo.face == 2) {
		obj.position.z -= STEP * 0.495;
	} else if(pathInfo.face == 4) {
		obj.rotation.x = Math.PI;
		obj.position.z += STEP * 0.495;
	} else if(pathInfo.face == 5) {
		obj.rotation.x = Math.PI / 2;
		obj.position.y += STEP * 0.495;
	}
	if(pathInfo.rx) {
		obj.rotation.x += pathInfo.rx;
	}
	if(pathInfo.ry) {
		obj.rotation.y += pathInfo.ry;
	}
	if(pathInfo.rz) {
		obj.rotation.z += pathInfo.rz;
	}
	if(pathInfo.sx) {
		obj.scale.x = pathInfo.rx;
	}
	if(pathInfo.sy) {
		obj.scale.y = pathInfo.sy;
	}
	if(pathInfo.cannotClick) {
		obj.isPenetrated = true;
	} else {
		obj.onClick = function(obj) {
			console.log(obj.object.pathId, core.charactor.currentPath)
			if(core.charactor.isWalking == false) {
				var path = core.mapGraph.findPath(core.charactor.currentPath, obj.object.pathId);
				if(path === false) {
					core.charactor.walkingPath = [core.charactor.walkingPath[0]];
					return;
				}
				path = path.splice(1);
				core.moveCharacter(path);
			} else {
				var path = core.mapGraph.findPath(core.charactor.walkingPath[0], obj.object.pathId);
				if(path === false) {
					core.charactor.walkingPath = [core.charactor.walkingPath[0]];
					return;
				}
				core.charactor.walkingPath = path;
			}
		}
	}
};

core.mapGraph;
core.initPathGraph = function(gameWorld) {
	var pathInfo = core.map["path" + core.map.currentPath];
	var graph = new core.PathGraph(pathInfo);
	core.mapGraph = graph;
	for(var i in pathInfo) {
		core.createOnePath(gameWorld, pathInfo[i]);
	}
};

core.moveCharacter = function(arr) {
	if(!arr || arr.length == 0) {
		core.charactor.isWalking = false;
		return;
	}
	core.charactor.walkingPath = arr;
	core.charactor.isWalking = true;
	nextP = core.map["path" + core.map.currentPath][arr[0]];
	var vec = new THREE.Vector3(nextP.x * STEP, nextP.y * STEP, nextP.z * STEP);
	if(nextP.parentId && !nextP.local) {
		core.charactor.isLocal = false;
		core.charactor.parentId = nextP.parentId;
		vec = core.childrenWithId[nextP.parentId].localToWorld(vec);
		$$.global.world.add(core.charactor);
	} else if(nextP.parentId && nextP.local) {
		if(!core.charactor.isLocal) {
			core.charactor.parentId = nextP.parentId;
			var parent = core.childrenWithId[nextP.parentId];
			parent.updateMatrixWorld();
			core.charactor.applyMatrix(new THREE.Matrix4().getInverse(parent.matrixWorld));
			parent.add(core.charactor);
			core.charactor.isLocal = true;
		}
	} else {
		if(core.charactor.isLocal) {
			core.charactor.isLocal = false;
			core.charactor.position = core.childrenWithId[core.charactor.parentId].localToWorld(core.charactor.position);
			$$.global.world.add(core.charactor);
			core.charactor.parentId = null;
		}
	}
	var time = game.settings.moveSpeed;

	var prevP = core.map["path" + core.map.currentPath][core.charactor.currentPath];

	if(prevP.changeSpeed && prevP.changeSpeed[nextP.id]) {
		var str = prevP.changeSpeed[nextP.id];
		if(typeof str == "number") {
			time = str;
		} else if(str == "auto") {
			time = time / STEP * core.charactor.position.distanceTo(vec);
		}
	}

	var canMove = false;
	for(var item of prevP.neighbors) {
		if(item == nextP.id) {
			canMove = true;
		}
	}
	if(prevP.onLeaving) {
		prevP.onLeaving();
	}
	if(!canMove) {
		core.charactor.isWalking = false;
		return;
	}
	if(nextP.onComing) {
		nextP.onComing();
	}

	new TWEEN.Tween(core.charactor.position)
		.to(vec, time)
		//		.onComplete(function() {
		//			gameWorld.scene.remove(plane);
		//		})
		.start()
		.onComplete(function() {
			if(nextP.hasCome) {
				nextP.hasCome();
			}
			if(prevP.hasLeft) {
				prevP.hasLeft();
			}
			core.charactor.currentPath = core.charactor.walkingPath[0];
			arr = core.charactor.walkingPath.splice(1);
			core.charactor.walkingPath = [];
			core.moveCharacter(arr);
		});

}

core.loadMapResource = function(callback) {
	$$.Loader.loadTexture(core.map.textures);
	$$.Loader.onLoadComplete = callback;
};

core.PathGraph = function(path) {
	var that = this;
	this.neighbors = path;
	this.addEdge = function(a, b, path) {
		//		if(neighbors[u] === undefined) {
		//			neighbors[u] = [];
		//		}
		//		neighbors[u].push(v);
		//		if(neighbors[v] === undefined) {
		//			neighbors[v] = [];
		//		}
		//		neighbors[v].push(u);
		var nb = core.map[path][a].neighbors;
		for(var i in nb) {
			if(nb[i] == b) {
				return;
			}
		}
		core.map[path][a].neighbors.push(b);
		core.map[path][b].neighbors.push(a);
	};

	this.removeEdge = function(a, b, path) {
		let nb = core.map[path][a].neighbors;
		removeByValue(nb, b);
		nb = core.map[path][b].neighbors;
		removeByValue(nb, a);
	};

	function shortestPath(graph, source, target) {
		if(source == target) {
			return [source];
		}
		// the target.
		var queue = [source],
			visited = {
				source: true
			},
			predecessor = {},
			tail = 0;
		while(tail < queue.length) {
			var u = queue[tail++];
			var neighbors = graph[u].neighbors;
			for(var i = 0; i < neighbors.length; ++i) {
				var v = neighbors[i];
				if(visited[v]) {
					continue;
				}
				visited[v] = true;
				if(v === target) {
					var path = [v];
					while(u !== source) {
						path.push(u);
						u = predecessor[u];
					}
					path.push(u);
					path.reverse();
					return path;
				}
				predecessor[v] = u;
				queue.push(v);
			}
		}
		return false;
	}

	this.findPath = function(start, end) {
		return shortestPath(that.neighbors, start, end);
	}

	return this;
}

function removeByValue(arr, val) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == val) {
			arr.splice(i, 1);
			break;
		}
	}
}