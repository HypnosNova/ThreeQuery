var camera, scene, renderer, loader, ambientLight, directionalLight, car, body, lfw, rfw, lrw, rrw, bm, dt, ta, debug, DEG2RAD = Math.PI / 180,
	DEG90 = Math.PI / 2,
	sa = 0,
	s1 = 0,
	fs = false,
	rs = false,
	ur = false,
	ul = false,
	uu = false,
	ud = false,
	cvel = new THREE.Vector3,
	vel = new THREE.Vector3,
	a2d = new THREE.Vector3,
	force = new THREE.Vector3,
	res = new THREE.Vector3,
	acc = new THREE.Vector3,
	ft = new THREE.Vector3,
	flf = new THREE.Vector3,
	flr = new THREE.Vector3,
	av = 0,
	aa = 0,
	distance = 10,
	height = 5,
	heightDamping = 2,
	rotationDamping = 3,
	randomPositionMin = new THREE.Vector3(3,
		0.1, 3),
	randomPositionMax = new THREE.Vector3(5, 3, 5),
	cameraSpeedMin = 0.1,
	cameraSpeedMax = 0.1,
	cameraShotTime = 5,
	target = new THREE.Vector3,
	cameraSpeed = new THREE.Vector3(4, 2, 4),
	cameraTime = 0,
	userWeight = 1,
	angleX, angleY, orbitX, orbitY, orbitDistance, orbitOrigin = new THREE.Vector3(4, 2, 4),
	enableSkidMarks = false,
	maxMarks = 1024,
	markWidth = 0.275,
	numMarks = 0,
	lastMark = -1,
	markSection = {
		pos: new THREE.Vector3,
		normal: new THREE.Vector3,
		posl: new THREE.Vector3,
		posr: new THREE.Vector3,
		intensity: 0,
		lastIndex: 0
	},
	skidmarks = [],
	updated = false,
	skm, skg, v3 = new THREE.Vector3;
init();

function init() {
	var a = document.getElementById("container");
	scene = new THREE.Scene();
	camera = new THREE.Camera(35, window.innerWidth / window.innerHeight, 0.01, 200000);
	camera.position.y = 2;
	camera.position.z = 8;
	ambientLight = new THREE.AmbientLight(8421504);
	scene.add(ambientLight);
	directionalLight = new THREE.DirectionalLight(16777215, 1.5);
	directionalLight.position.x = 0;
	directionalLight.position.y = 1;
	directionalLight.position.z = 0;
	directionalLight.position.normalize();
	scene.add(directionalLight);
	renderer = new THREE.WebGLRenderer;
	renderer.setSize(window.innerWidth, window.innerHeight);
	a.appendChild(renderer.domElement);
	loader = new THREE.BinaryLoader(true);
//	document.body.appendChild(loader.statusDomElement);
	CreateCar();
	LoadCar();
	enableSkidMarks && SetupSkidMarks();
	document.addEventListener("keydown", onKeyDown, false);
	document.addEventListener("keyup", onKeyUp, false);
	ta = (new Date).getTime();
	animate()
}

function CreateCar() {
	new THREE.MeshBasicMaterial({
		color: 16777215
	});
	car = new THREE.Object3D;
	scene.add(car);
	body = new THREE.Object3D;
	body.rotation.y = DEG90;
	car.add(body);
	lfw = new THREE.Object3D;
	lfw.position.x = 1.3928;
	lfw.position.y = 0.34;
	lfw.position.z = -0.69;
	car.add(lfw);
	rfw = new THREE.Object3D;
	rfw.position.x = 1.4;
	rfw.position.y = 0.34;
	rfw.position.z = 0.69;
	car.add(rfw);
	lrw = new THREE.Object3D;
	lrw.position.x = -2;
	lrw.position.y = 0.34;
	lrw.position.z = -0.69;
	car.add(lrw);
	rrw = new THREE.Object3D;
	rrw.position.x = -2;
	rrw.position.y = 0.34;
	rrw.position.z = 0.69;
	car.add(rrw)
}

function LoadCar() {
	var a = "img/";
	a = [a + "envmap_right.jpg", a + "envmap_left.jpg", a + "envmap_top.jpg", a + "envmap_bottom.jpg", a + "envmap_front.jpg", a + "envmap_back.jpg"];
	a = THREE.ImageUtils.loadTextureCube(a);
	var b = {
			x: 0,
			y: 0.5859,
			z: 0,
			material: new THREE.MeshLambertMaterial({
				color: 16777215,
				map: THREE.ImageUtils.loadTexture("img/BodyPaint.jpg"),
				envMap: a,
				combine: THREE.MultiplyOperation,
				reflectivity: 1
			})
		},
		c = {
			x: 0,
			y: 0.4044,
			z: -0.3071,
			material: new THREE.MeshPhongMaterial({
				color: 657930
			})
		},
		e = {
			x: 0,
			y: 0.5773,
			z: 0.729,
			material: new THREE.MeshBasicMaterial({
				color: 0
			})
		},
		f = {
			x: 0,
			y: 0.4115,
			z: -0.7112,
			material: new THREE.MeshPhongMaterial({
				color: 657930,
				specular: 6316128
			})
		},
		o = {
			x: 0,
			y: 0.5867,
			z: 0.3202,
			material: new THREE.MeshPhongMaterial({
				color: 16777215,
				envMap: a,
				combine: THREE.MultiplyOperation
			})
		},
		p = {
			x: 0,
			y: 0.5694,
			z: 0.8672,
			material: new THREE.MeshPhongMaterial({
				color: 8668176,
				specular: 8421504,
				shininess: 0.5,
//				ambient: 8421504
			})
		},
		i = {
			x: 0,
			y: 0.6777,
			z: 0.5647,
			material: new THREE.MeshPhongMaterial({
				color: 16777215,
				envMap: a,
				combine: THREE.MixOperation,
				opacity: 0.5
			})
		},
		g = {
			x: 0,
			y: 0.4652,
			z: -2.34,
			material: new THREE.MeshBasicMaterial({
				color: 8388608,
				map: THREE.ImageUtils.loadTexture("img/RearLights.jpg")
			})
		},
		k = {
			x: 0,
			y: 0.4652,
			z: -2.34,
			material: new THREE.MeshBasicMaterial({
				color: 16711680,
				envMap: a,
				combine: THREE.MixOperation,
				opacity: 0.5
			})
		},
		l = {
			x: 0,
			y: 0.5933,
			z: 0.5054,
			material: new THREE.MeshPhongMaterial({
				color: 16777215,
				map: THREE.ImageUtils.loadTexture("img/SteeringWheel.jpg")
			})
		},
		m = {
			x: -0.0113,
			y: 0.4063,
			z: 0.5277,
			material: new THREE.MeshPhongMaterial({
				color: 16777215,
				map: THREE.ImageUtils.loadTexture("img/Driver.jpg")
			})
		},
		h = {
			x: 0.0016,
			y: 0.7287,
			z: -0.0175,
			material: new THREE.MeshBasicMaterial({
				color: 16777215,
				map: THREE.ImageUtils.loadTexture("img/Helmet.jpg"),
				envMap: a,
				combine: THREE.MultiplyOperation
			})
		},
		j = {
			x: 0.0016,
			y: 0.6993,
			z: 0.052,
			material: new THREE.MeshBasicMaterial({
				color: 16777215,
				map: THREE.ImageUtils.loadTexture("img/Visor.jpg"),
				envMap: a,
				combine: THREE.MultiplyOperation
			})
		},
		n = {
			x: 0,
			y: 0,
			z: 0,
			material: new THREE.MeshPhongMaterial({
				color: 16777215,
				map: THREE.ImageUtils.loadTexture("img/Tyre.jpg"),
				specular: 8421504,
				shininess: 0.5,
//				ambient: 8421504
			})
		},
		q = {
			x: 0,
			y: 0,
			z: 0,
			material: new THREE.MeshPhongMaterial({
				color: 16777215,
				map: THREE.ImageUtils.loadTexture("img/Rim.jpg"),
//				ambient: 4210752
			})
		},
		r = {
			x: 0,
			y: 0,
			z: 0,
			material: new THREE.MeshBasicMaterial({
				color: 0
			})
		};
	h.material.map.wrap_s = THREE.RepeatWrapping;
	bm = g.material;
	loader.load({
		model: "obj/js/BodyPaint.js",
		callback: function(d) {
			AddBodyPart(d, b)
		}
	});
	loader.loadBinary("obj/js/Suspension.js",function(d) {
		AddBodyPart(d, c)
	});
	loader.loadBinary("obj/js/InsideBlack.js",function(d) {
		AddBodyPart(d, e)
	});
	loader.loadBinary("obj/js/GlossyBlack.js",function(d) {
		AddBodyPart(d, f)
	});
	loader.loadBinary("obj/js/Chrome.js",function(d) {
		AddBodyPart(d, o)
	});
	loader.loadBinary("obj/js/Bolts.js",function(d) {
		AddBodyPart(d, p)
	});
	loader.loadBinary("obj/js/Windshield.js",function(d) {
		AddBodyPart(d, i)
	});
	loader.loadBinary("obj/js/RearLight.js",function(d) {
		AddBodyPart(d, g)
	});
	loader.loadBinary("obj/js/RearLightGlass.js",function(d) {
		AddBodyPart(d, k)
	});
	loader.loadBinary("obj/js/SteeringWheel.js",function(d) {
		AddBodyPart(d, l)
	});
	loader.loadBinary("obj/js/DriverBody.js",function(d) {
		AddBodyPart(d, m)
	});
	loader.loadBinary("obj/js/Helmet.js",function(d) {
		AddBodyPart(d, h)
	});
	loader.loadBinary("obj/js/Visor.js",function(d) {
		AddBodyPart(d, j)
	});
	loader.loadBinary("obj/js/Tyre.js",function(d) {
		AddWheelPart(d, n)
	});
	loader.loadBinary("obj/js/Rim.js",function(d) {
		AddWheelPart(d, q)
	});
	loader.loadBinary("obj/js/WheelBase.js",function(d) {
		AddWheelPart(d, r)
	});
	loader.loadBinary("obj/js/HelloEnjoy.js", function(d) {
		AddHelloEnjoy(d)
	});
	a = new THREE.Mesh(new Plane(7.5, 7.5), new THREE.MeshBasicMaterial({
		color: 16777215,
		map: THREE.ImageUtils.loadTexture("img/Shadow.jpg")
	}));
	a.position.x = -0.4;
	a.position.y = -0.0010;
	a.rotation.x = -DEG90;
	a.rotation.z = -DEG90;
	car.addChild(a)
}

function AddHelloEnjoy(a) {
	a = new THREE.Mesh(a, new THREE.MeshBasicMaterial({
		color: 0
	}));
	a.position.y = 0.01;
	a.rotation.x = -DEG90;
	scene.addObject(a)
}

function AddBodyPart(a, b) {
//	loader.statusDomElement.innerHTML = "Creating model ...";
	a = new THREE.Mesh(a, b.material);
	a.position.x = b.x;
	a.position.y = b.y;
	a.position.z = b.z;
	body.addChild(a);
//	loader.statusDomElement.style.display = "none";
//	loader.statusDomElement.innerHTML = "Loading model ..."
}

function AddWheelPart(a, b) {
	var c = new THREE.Mesh(a, b.material);
	c.position.x = b.x;
	c.position.y = b.y;
	c.position.z = b.z;
	c.rotation.y = -DEG90;
	lfw.addChild(c);
	c = new THREE.Mesh(a, b.material);
	c.position.x = b.x;
	c.position.y = b.y;
	c.position.z = b.z;
	c.rotation.y = DEG90;
	rfw.addChild(c);
	c = new THREE.Mesh(a, b.material);
	c.position.x = b.x;
	c.position.y = b.y;
	c.position.z = b.z;
	c.rotation.y = -DEG90;
	lrw.addChild(c);
	c = new THREE.Mesh(a, b.material);
	c.position.x = b.x;
	c.position.y = b.y;
	c.position.z = b.z;
	c.rotation.y = DEG90;
	rrw.addChild(c)
}

function AddTyrePart(a, b) {
	a.computeTangents();
	AddWheelPart(a, b)
}

function animate() {
	requestAnimationFrame(animate);
	loop()
}

function loop() {
	var a = (new Date).getTime();
	dt = (a - ta) * 0.0010;
	ta = a;
	UpdateCar();
	SteerWheels();
	UpdateCamera();
	enableSkidMarks && UpdateSkidMarks();
	if(debug) {
		console.log(av);
		debug = false
	}
	renderer.render(scene, camera);
	stats.update()
}

function SteerWheels() {
	var a = 2.5 * dt,
		b = ul ? -1 : 0,
		c = ur ? 1 : 0;
	b = b + c;
	if(b == 0) a = Math.min(a, Math.abs(s1));
	if(b > s1) s1 += a;
	else if(b < s1) s1 -= a;
	s1 = Math.min(1, Math.max(s1, -1));
	sa = s1 * 20 * DEG2RAD
}

function UpdateCar() {
	var a = 5,
		b = 30,
		c = -5,
		e = -5.2,
		f = 2,
		o = 1,
		p = 1,
		i = o + p,
		g = car.rotation.y,
		k = Math.sin(g),
		l = Math.cos(g);
	vel.x = l * cvel.y + k * cvel.x;
	vel.y = -k * cvel.y + l * cvel.x;
	var m = vel.x > 0 ? sa : -sa;
	i = i * 0.5 * av;
	var h, j, n;
	if(Math.abs(vel.x) < 0.2) vel.x = vel.y = h = j = n = i = 0;
	else {
		h = Math.atan2(i, Math.abs(vel.x));
		j = Math.atan2(vel.y, Math.abs(vel.x));
		n = j + h - m;
		i = j - h
	}
	h = 1500;
	j = h * 9.8 * 0.5;
	flf.x = 0;
	flf.y = c * n;
	flf.y = Math.min(f, flf.y);
	flf.y = Math.max(-f, flf.y);
	flf.y *= j;
	if(fs) flf.y *= 0.5;
	flr.x = 0;
	flr.y = e * i;
	flr.y = Math.min(f, flr.y);
	flr.y = Math.max(-f,
		flr.y);
	flr.y *= j;
	if(rs) flr.y *= 0.7;
	c = uu ? 100 : 0;
	e = ud ? -100 : 0;
	ft.x = 100 * (c + e);
	ft.y = 0;
	bm.color.setHex(e < 0 ? 16711680 : 8388608);
	if(rs) ft.x *= 0.5;
	res.x = -(b * vel.x + a * vel.x * Math.abs(vel.x));
	res.y = -(b * vel.y + a * vel.y * Math.abs(vel.y));
	force.x = ft.x + Math.sin(m) * flf.x + flr.x + res.x;
	force.y = ft.y + Math.cos(m) * flf.y + flr.y + res.y;
	if(force.x == 0 && vel.x == 0) flf.y = flr.y = force.y = a = acc.x = acc.y = aa = a2d.x = a2d.y = cvel.x = cvel.y = av = 0;
	else {
		a = o * flf.y - p * flr.y;
		acc.x = force.x / h;
		acc.y = force.y / h;
		b = 1500;
		aa = a / b;
		a2d.x = l * acc.y + k * acc.x;
		a2d.y = -k * acc.y + l * acc.x;
		cvel.x += dt * a2d.x;
		cvel.y += dt * a2d.y;
		av += dt * aa
	}
	car.position.z -= dt * cvel.x;
	car.position.x += dt * cvel.y;
	if(enableSkidMarks && Math.abs(i) > 0.5) lastMark = AddSkidMark(car.position, new THREE.Vector3(0, 1, 0), 1, lastMark);
	g += dt * av;
	car.rotation.y = g;
	lfw.rotation.y = sa;
	rfw.rotation.y = sa;
	g = 0.334;
	g = 0.012 * vel.x / g;
	lfw.rotation.z -= g;
	rfw.rotation.z -= g;
	lrw.rotation.z -= g;
	rrw.rotation.z -= g
}

function UpdateCamera() {
	camera.position.distanceTo(camera.target.position);
	cameraTime -= dt;
	if(cameraTime < 0) {
		cameraTime = cameraShotTime;
		if(car.position.length() > 50) car.position = new THREE.Vector3;
		var a = camera.position.clone(),
			b = car.position.clone();
		if(b.length > 100) {
			a -= b;
			b = new THREE.Vector3
		}
		for(var c = a.clone(), e = 200; --e > 0 && a.distanceTo(c) < 3;) {
			var f = Math.random() * 2 * Math.PI;
			c.x = b.x + randomPositionMin.x + Math.random() * (randomPositionMax.x - randomPositionMin.x) * Math.cos(f);
			c.y = b.y + randomPositionMin.y + Math.random() *
				(randomPositionMax.y - randomPositionMin.y);
			c.z = b.z + randomPositionMin.z + Math.random() * (randomPositionMax.z - randomPositionMin.z) * Math.sin(f)
		}
		camera.position = c;
		cameraSpeed.x = cameraSpeed.y = cameraSpeed.z = 0;
		Math.random();
		cameraSpeed.x = cameraSpeedMin + Math.random() * (cameraSpeedMax - cameraSpeedMin);
		cameraSpeed.x *= Math.random() > 0.5 ? 1 : -1;
		cameraSpeed.z *= Math.random() > 0.5 ? 1 : -1
	}
	camera.position.x += cameraSpeed.x * dt;
	camera.position.y += cameraSpeed.y * dt;
	camera.position.z += cameraSpeed.z * dt;
	camera.target.position.x -= (camera.target.position.x -
		car.position.x) * 0.05;
	camera.target.position.y -= (camera.target.position.y - car.position.y) * 0.05;
	camera.target.position.z -= (camera.target.position.z - car.position.z) * 0.05
}

function onKeyDown(a) {
	var b = a.keyCode;
	if(b == 38 || b == 87) uu = true;
	else if(b == 40 || b == 83) ud = true;
	else if(b == 37 || b == 65) ur = true;
	else if(b == 39 || b == 68) ul = true;
	else if(b == 32) rs = true;
	else if(a.keyCode == 13) cameraTime = 0
}

function onKeyUp(a) {
	a = a.keyCode;
	if(a == 38 || a == 87) uu = false;
	else if(a == 40 || a == 83) ud = false;
	else if(a == 37 || a == 65) ur = false;
	else if(a == 39 || a == 68) ul = false;
	else if(a == 32) rs = false
}

function log(a) {
	var b = document.getElementById("log");
	b.innerHTML = a + "<br/>" + b.innerHTML
}

function SetupSkidMarks() {
	for(var a = 0; a < maxMarks; a++) skidmarks[a] = {
		pos: new THREE.Vector3,
		normal: new THREE.Vector3,
		posl: new THREE.Vector3,
		posr: new THREE.Vector3,
		intensity: 0,
		lastIndex: 0
	};
	skg = new THREE.Geometry;
	skm = new THREE.Mesh(skg, new THREE.MeshBasicMaterial({
		color: 65280
	}));
	skm.position.y = 0.1;
	scene.addObject(skm)
}

function AddSkidMark(a, b, c, e) {
	if(c > 1) c = 1;
	if(c < 0) return -1;
	curr = skidmarks[numMarks % maxMarks];
	curr.pos.copy(a);
	curr.normal.copy(b);
	curr.intensity = c;
	curr.lastIndex = e;
	if(e != -1) {
		width2 = markWidth * 0.5;
		last = skidmarks[e % maxMarks];
		dir = new THREE.Vector3;
		dir = dir.sub(curr.pos, last.pos);
		xDir = new THREE.Vector3;
		xDir.cross(dir, b);
		xDir.normalize();
		a = new THREE.Vector3;
		a.copy(xDir);
		a.multiplyScalar(width2);
		curr.posl.add(curr.pos, a);
		curr.posr.sub(curr.pos, a);
		if(last.lastIndex == -1) {
			last.posl.add(curr.pos, a);
			last.posr.sub(curr.pos,
				a)
		}
	}
	numMarks++;
	updated = true;
	return numMarks - 1
}

function ClearSkidMarks() {
	numMarks = 0;
	updated = true
}

function UpdateSkidMarks() {
	if(updated) {
		updated = false;
		for(var a = 0, b = skg.vertices, c = 0; c < numMarks && c < maxMarks; c++) {
			if(skidmarks[c].lastIndex != -1 && skidmarks[c].lastIndex > numMarks - maxMarks) {
				var e = skidmarks[c],
					f = skidmarks[e.lastIndex % maxMarks];
				b[a * 4 + 1] = new THREE.Vertex(new THREE.Vector3(f.posl.x, f.posl.y, f.posl.z));
				b[a * 4 + 0] = new THREE.Vertex(new THREE.Vector3(f.posr.x, f.posr.y, f.posr.z));
				b[a * 4 + 2] = new THREE.Vertex(new THREE.Vector3(e.posl.x, e.posl.y, e.posl.z));
				b[a * 4 + 3] = new THREE.Vertex(new THREE.Vector3(e.posr.x,
					e.posr.y, e.posr.z));
				skg.uvs[a] = [new THREE.UV(0, 0), new THREE.UV(1, 0), new THREE.UV(0, 1), new THREE.UV(1, 1)];
				e = new THREE.Face4(a * 4 + 0, a * 4 + 1, a * 4 + 2, a * 4 + 3);
				e.normal = new THREE.Vector3(0, 1, 0);
				skg.faces[a] = e;
				a++
			}
			skg.computeCentroids();
			skg.computeFaceNormals();
			skg.computeBoundingBox();
			skg.computeBoundingSphere()
		}
	}
};