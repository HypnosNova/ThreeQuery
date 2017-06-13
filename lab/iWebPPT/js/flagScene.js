function createFlagScene() {
	var world = new $$.SubWorld({
		clearColor: 0x000000
	}, {
		fov: 45
	});

	var box = $$.Component.createSkybox("img/skybox.jpg", 5000, world);
	box.rotation.y = Math.PI / 2;
	$$.Controls.createOrbitControls({}, world);
	world.camera.position.set(0, 0, 1000);
	world.camera.lookAt(world.scene.position);

	var DAMPING = 0.03;
	var DRAG = 1 - DAMPING;
	var MASS = .1;
	var restDistance = 20;

	var xSegs = 15; // ratio is 2:3
	var ySegs = 10; //

	var clothFunction = plane(restDistance * xSegs, restDistance * ySegs);

	var cloth = new Cloth(xSegs, ySegs);

	var GRAVITY = 981 * 1.4; // 
	var gravity = new THREE.Vector3(0, -GRAVITY, 0).multiplyScalar(MASS);

	var TIMESTEP = 18 / 1000;
	var TIMESTEP_SQ = TIMESTEP * TIMESTEP;

	var pins = [];

	var wind = true;
	var windStrength = 2;
	var windForce = new THREE.Vector3(0, 0, 0);

	var ballPosition = new THREE.Vector3(0, -45, 0);
	var ballSize = 60; //40

	var tmpForce = new THREE.Vector3();

	var lastTime;

	function plane(width, height) {
		return function(u, v) {
			var x = u * width; //(u-0.5)
			var y = v * height;
			var z = 0;
			return new THREE.Vector3(x, y, z);
		};
	}

	function Particle(x, y, z, mass) {
		this.position = clothFunction(x, y); // position
		this.previous = clothFunction(x, y); // previous
		this.original = clothFunction(x, y);
		this.a = new THREE.Vector3(0, 0, 0); // acceleration
		this.mass = mass;
		this.invMass = 1 / mass;
		this.tmp = new THREE.Vector3();
		this.tmp2 = new THREE.Vector3();
	}

	// Force -> Acceleration
	Particle.prototype.addForce = function(force) {
		this.a.add(
			this.tmp2.copy(force).multiplyScalar(this.invMass)
		);
	};

	// Performs verlet integration
	Particle.prototype.integrate = function(timesq) {
		var newPos = this.tmp.subVectors(this.position, this.previous);
		newPos.multiplyScalar(DRAG).add(this.position);
		newPos.add(this.a.multiplyScalar(timesq));

		this.tmp = this.previous;
		this.previous = this.position;
		this.position = newPos;

		this.a.set(0, 0, 0);
	}

	var diff = new THREE.Vector3();

	function satisifyConstrains(p1, p2, distance) {
		diff.subVectors(p2.position, p1.position);
		var currentDist = diff.length();
		if(currentDist == 0) return; // prevents division by 0
		var correction = diff.multiplyScalar(1 - distance / currentDist);
		var correctionHalf = correction.multiplyScalar(0.5);
		p1.position.add(correctionHalf);
		p2.position.sub(correctionHalf);
	}

	function Cloth(w, h) {
		w = w || 10;
		h = h || 10;
		this.w = w;
		this.h = h;

		var particles = [];
		var constrains = [];

		var u, v;

		// Create particles
		for(v = 0; v <= h; v++) {
			for(u = 0; u <= w; u++) {
				particles.push(
					new Particle(u / w, v / h, 0, MASS)
				);
			}
		}

		// Structural

		for(v = 0; v < h; v++) {
			for(u = 0; u < w; u++) {

				constrains.push([
					particles[index(u, v)],
					particles[index(u, v + 1)],
					restDistance
				]);

				constrains.push([
					particles[index(u, v)],
					particles[index(u + 1, v)],
					restDistance
				]);

			}
		}

		for(u = w, v = 0; v < h; v++) {
			constrains.push([
				particles[index(u, v)],
				particles[index(u, v + 1)],
				restDistance

			]);
		}

		for(v = h, u = 0; u < w; u++) {
			constrains.push([
				particles[index(u, v)],
				particles[index(u + 1, v)],
				restDistance
			]);
		}

		// While many system uses shear and bend springs,
		// the relax constrains model seem to be just fine
		// using structural springs.
		// Shear
		var diagonalDist = Math.sqrt(restDistance * restDistance * 2);

		for(v = 0; v < h; v++) {
			for(u = 0; u < w; u++) {

				constrains.push([
					particles[index(u, v)],
					particles[index(u + 1, v + 1)],
					diagonalDist
				]);

				constrains.push([
					particles[index(u + 1, v)],
					particles[index(u, v + 1)],
					diagonalDist
				]);

			}
		}

		this.particles = particles;
		this.constrains = constrains;

		function index(u, v) {
			return u + v * (w + 1);
		}
		this.index = index;

	}

	function simulate(time) {
		if(!lastTime) {
			lastTime = time;
			return;
		}

		var i, il, particles, particle, pt, constrains, constrain;

		// Aerodynamics forces
		if(wind) {
			var face, faces = clothGeometry.faces,
				normal;

			particles = cloth.particles;

			for(i = 0, il = faces.length; i < il; i++) {
				face = faces[i];
				normal = face.normal;

				tmpForce.copy(normal).normalize().multiplyScalar(normal.dot(windForce));
				particles[face.a].addForce(tmpForce);
				particles[face.b].addForce(tmpForce);
				particles[face.c].addForce(tmpForce);
			}
		}

		for(particles = cloth.particles, i = 0, il = particles.length; i < il; i++) {
			particle = particles[i];
			particle.addForce(gravity);
			//
			particle.integrate(TIMESTEP_SQ);
		}

		// Start Constrains

		constrains = cloth.constrains,
			il = constrains.length;
		for(i = 0; i < il; i++) {
			constrain = constrains[i];
			satisifyConstrains(constrain[0], constrain[1], constrain[2]);
		}

		// Ball Constrains

		ballPosition.z = -Math.sin(Date.now() / 300) * 90; //+ 40;
		ballPosition.x = Math.cos(Date.now() / 200) * 70

		if(sphere.visible)
			for(particles = cloth.particles, i = 0, il = particles.length; i < il; i++) {
				particle = particles[i];
				pos = particle.position;
				diff.subVectors(pos, ballPosition);
				if(diff.length() < ballSize) {
					// collided
					diff.normalize().multiplyScalar(ballSize);
					pos.copy(ballPosition).add(diff);
				}
			}

		// Pin Constrains

		for(i = 0, il = pins.length; i < il; i++) {
			var xy = pins[i];
			var p = particles[xy];
			p.position.copy(p.original);
			p.previous.copy(p.original);
		}

	}

	var pins = [];
	for(var j = 0; j <= cloth.h; j++)
		pins.push(cloth.index(0, j));

	var container;
	var camera = world.camera,
		scene = world.scene,
		renderer = $$.global.renderer;

	var clothGeometry;
	var sphere;
	var object, arrow;

	init();
	//	animate();

	function init() {
		// lights
		var light, materials;

		scene.add(new THREE.AmbientLight(0x666666));

		light = new THREE.DirectionalLight(0xffffff, 1.75);
		light.position.set(50, 200, 100);
		light.position.multiplyScalar(1.3);
		scene.add(light);

		light = new THREE.DirectionalLight(0xffffff, 0.35);
		light.position.set(0, -1, 0);

		scene.add(light);

		// cloth material

		var clothTexture = new THREE.TextureLoader().load('img/ilflag.jpg');
		clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
		clothTexture.anisotropy = 16;

		materials = [
			new THREE.MeshPhongMaterial({
				alphaTest: 0.5,
				color: 0xffffff,
				specular: 0x030303,
				emissive: 0x111111,
				shininess: 10,
				map: clothTexture,
				side: THREE.DoubleSide
			}),
			new THREE.MeshBasicMaterial({
				color: 0xff0000,
				wireframe: true,
				transparent: true,
				opacity: 0.9
			})
		];

		// cloth geometry

		clothGeometry = new THREE.ParametricGeometry(clothFunction, cloth.w, cloth.h, true);
		clothGeometry.dynamic = true;
		clothGeometry.computeFaceNormals();

		var uniforms = {
			texture: {
				type: "t",
				value: 0,
				texture: clothTexture
			}
		};
		var vertexShader = ([
			"varying vec2 vUV;",
			"void main() {",
			"vUV = 0.75 * uv;",
			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"gl_Position = projectionMatrix * mvPosition;",
			"}"
		]).join();
		var fragmentShader = ([
			"uniform sampler2D texture;",
			"varying vec2 vUV;",
			"vec4 pack_depth( const in float depth ) {",
			"const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );",
			"const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );",
			"vec4 res = fract( depth * bit_shift );",
			"res -= res.xxyz * bit_mask;",
			"return res;",
			"}",
			"void main() {",
			"vec4 pixel = texture2D( texture, vUV );",
			"if ( pixel.a < 0.5 ) discard;",
			"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );",
			"}"
		]).join();

		// cloth mesh

		object = new THREE.Mesh(clothGeometry, materials[0]);
		object.position.set(-140, 0, -10);
		scene.add(object);

		object.customDepthMaterial = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		});

		// sphere

		var ballGeo = new THREE.SphereGeometry(ballSize, 20, 20);
		var ballMaterial = new THREE.MeshPhongMaterial({
			color: 0xffffff
		});

		sphere = new THREE.Mesh(ballGeo, ballMaterial);
		scene.add(sphere);

		// arrow

		arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50, 0xff0000);
		arrow.position.set(-200, 0, -200);

		var groundMaterial = new THREE.MeshPhongMaterial({
			color: 0x888888,
			//			specular: 0x111111,
		});

		var groundTexture = new THREE.TextureLoader().load("img/h5ground.jpg");
		groundMaterial.map = groundTexture
		groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
		groundTexture.repeat.set(25, 25);
		//		groundTexture.anisotropy = 16;

		var mesh = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000), groundMaterial);
		mesh.position.y = -250;
		mesh.rotation.x = -Math.PI / 2;
		scene.add(mesh);

		// poles

		var poleGeo = new THREE.CubeGeometry(5, 750, 5);
		var poleMat = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			specular: 0x111111,
			shininess: 100
		});

		var mesh = new THREE.Mesh(poleGeo, poleMat);
		mesh.position.y = -175;
		mesh.position.x = -140;
		scene.add(mesh);

		var gg = new THREE.CubeGeometry(10, 10, 10);
		var mesh = new THREE.Mesh(gg, poleMat);
		mesh.position.y = -250;
		mesh.position.x = -140;
		scene.add(mesh);

		sphere.visible = !true

	}

	world.actionInjections.push(function() {
		var time = Date.now();
		windStrength = Math.cos(time / 7000) * 100 + 200;
		windForce.set(Math.sin(time / 2000), Math.cos(time / 3000), Math.sin(time / 1000)).normalize().multiplyScalar(windStrength);
		arrow.setLength(windStrength);
		arrow.setDirection(windForce);
		simulate(time);

		var timer = Date.now() * 0.0002;
		var p = cloth.particles;
		for(var i = 0, il = p.length; i < il; i++) {
			clothGeometry.vertices[i].copy(p[i].position);
		}
		clothGeometry.computeFaceNormals();
		clothGeometry.computeVertexNormals();
		clothGeometry.normalsNeedUpdate = true;
		clothGeometry.verticesNeedUpdate = true;
		sphere.position.copy(ballPosition);
	});

	var geometry = new THREE.BoxBufferGeometry(80, 80, 80);

	var materials = [];
	for(var i = 0; i < 6; ++i) {
		if(i == 4) {
			materials.push(new THREE.MeshLambertMaterial({
				map: $$.global.RESOURCE.textures["img/rightBox.jpg"]
			}));
		} else {
			materials.push(new THREE.MeshLambertMaterial({
				map: $$.global.RESOURCE.textures["img/box.jpg"]
			}));
		}
	}
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
	var material = new THREE.MultiMaterial(materials);
	var nextBoxMesh = new THREE.Mesh(geometry, material);
	nextBoxMesh.position.set(350, -210, 0);
	nextBoxMesh.rotation.y = -Math.PI / 8;
	scene.add(nextBoxMesh);
	
	nextBoxMesh.onClick=function(){
		if(worldArr[2]){
			var transition = new $$.Transition(worldArr[3], {}, $$.global.RESOURCE.textures["transition/transition2.png"]);
			$$.actionInjections.push(transition.render);
		}else{
			var mainScene = createIntroScene();
			worldArr.push(mainScene);
			var transition = new $$.Transition(mainScene, {}, $$.global.RESOURCE.textures["transition/transition2.png"]);
			$$.actionInjections.push(transition.render);
		}
	}

	return world;
}