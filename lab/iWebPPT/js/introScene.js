function createIntroScene() {
	var world = new $$.SubWorld({
		clearColor: 0x000000
	}, {
		fov: 45,
		near: 0.0001
	});
	var box = $$.Component.createSkydome("img/skydome.jpg", 10000, world);

	let scene = world.scene;
	let camera = world.camera;
	camera.position.set(3, 0, 3);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	let spotLight = new THREE.SpotLight(0xffffff, 0.7, 0, 10, 2);

	// Planet Proto
	let planetProto = {
		sphere: function(size) {
			let sphere = new THREE.SphereGeometry(size, 32, 32);

			return sphere;
		},
		material: function(options) {
			let material = new THREE.MeshPhongMaterial();
			if(options) {
				for(var property in options) {
					material[property] = options[property];
				}
			}

			return material;
		},
		glowMaterial: function(intensity, fade, color) {
			let glowMaterial = new THREE.ShaderMaterial({
				uniforms: {
					'c': {
						type: 'f',
						value: intensity
					},
					'p': {
						type: 'f',
						value: fade
					},
					glowColor: {
						type: 'c',
						value: new THREE.Color(color)
					},
					viewVector: {
						type: 'v3',
						value: camera.position
					}
				},
				vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
				fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() 
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }`,
				side: THREE.BackSide,
				blending: THREE.AdditiveBlending,
				transparent: true
			});

			return glowMaterial;
		},
		texture: function(material, property, uri) {
			material[property] = $$.Loader.RESOURCE.textures[uri];
			material.needsUpdate = true;
		}
	};

	let createPlanet = function(options) {
		// Create the planet's Surface
		let surfaceGeometry = planetProto.sphere(options.surface.size);
		let surfaceMaterial = planetProto.material(options.surface.material);
		let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

		// Create the planet's Atmosphere
		let atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
		let atmosphereMaterialDefaults = {
			side: THREE.DoubleSide,
			transparent: true
		}
		let atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
		let atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
		let atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

		// Create the planet's Atmospheric glow
		let atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
		let atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
		let atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);

		// Nest the planet's Surface and Atmosphere into a planet object
		let planet = new THREE.Object3D();
		surface.name = 'surface';
		atmosphere.name = 'atmosphere';
		atmosphericGlow.name = 'atmosphericGlow';
		planet.add(surface);
		planet.add(atmosphere);
		planet.add(atmosphericGlow);

		// Load the Surface's textures
		for(let textureProperty in options.surface.textures) {
			planetProto.texture(
				surfaceMaterial,
				textureProperty,
				options.surface.textures[textureProperty]
			);
		}

		// Load the Atmosphere's texture
		for(let textureProperty in options.atmosphere.textures) {
			planetProto.texture(
				atmosphereMaterial,
				textureProperty,
				options.atmosphere.textures[textureProperty]
			);
		}

		return planet;
	};

	let earth = createPlanet({
		surface: {
			size: 1,
			material: {
				bumpScale: 0.05,
				specular: new THREE.Color('grey'),
				shininess: 5
			},
			textures: {
				map: 'img/earthmap1k.jpg',
				bumpMap: 'img/earthbump1k.jpg',
				specularMap: 'img/earthspec1k.jpg'
			}
		},
		atmosphere: {
			size: 0.02,
			material: {
				opacity: 0.8
			},
			textures: {
				map: 'img/earthcloudmap.jpg',
				alphaMap: 'img/earthcloudmaptrans.jpg'
			},
			glow: {
				size: 0.04,
				intensity: 0.7,
				fade: 7,
				color: 0x93cfef
			}
		},
	});

	var light = new THREE.AmbientLight(0x888888); // soft white light
	scene.add(light);
	scene.add(camera);
	scene.add(spotLight);
	scene.add(earth);

	// Light Configurations
	spotLight.position.set(20, 0, 10);

	earth.getObjectByName('surface').geometry.center();

	var geometry = new THREE.BoxBufferGeometry(0.3, 0.3, 0.3);

	var materials = [];
	for(var i = 0; i < 6; ++i) {
		materials.push(new THREE.MeshLambertMaterial({
			map: $$.Loader.RESOURCE.textures["img/intro" + (i + 1) + ".jpg"]
		}));
	}
	var material = new THREE.MultiMaterial(materials);
	var introBoxMesh = new THREE.Mesh(geometry, material);
	introBoxMesh.rotation.y = Math.PI * 1.5;
	introBoxMesh.position.set(8, 0, -8);
	scene.add(introBoxMesh);

	var rotationIndex = 1;
	var rotationArr = [{
			x: 0,
			y: Math.PI * 1.5,
			z: 0
		},
		{
			x: 0,
			y: Math.PI / 2,
			z: 0
		},
		{
			x: Math.PI / 2,
			y: 0,
			z: 0
		},
		{
			x: Math.PI * 1.5,
			y: 0,
			z: 0
		},
		{
			x: 0,
			y: 0,
			z: 0
		},
		{
			x: 0,
			y: Math.PI,
			z: 0
		},
	]

	new TWEEN.Tween(introBoxMesh.position).to({
		x: 2.8,
		z: 2.5
	}, 7000).start();

	var vec = new THREE.Vector3(0, 0, 0);
	new TWEEN.Tween(vec).to({
		x: 2.8,
		z: 2.5
	}, 7000).start().onUpdate(function() {
		camera.lookAt(vec);
	});

	world.actionInjections.push(function() {
		earth.getObjectByName('surface').rotation.y += 1 / 16 * 0.01;
		earth.getObjectByName('atmosphere').rotation.y += 1 / 8 * 0.01;
		TWEEN.update();
	});
	introBoxMesh.onClick = function() {
		if(rotationIndex < 6) {
			new TWEEN.Tween(introBoxMesh.rotation).to(rotationArr[rotationIndex], 2000).start().easing(TWEEN.Easing.Back.InOut);
			rotationIndex++;
		}else{
			var codeScene=createCodeScene();
			worldArr.push(codeScene);
			var transition = new $$.Transition(codeScene, {}, $$.Loader.RESOURCE.textures["transition/transition3.png"]);
			$$.actionInjections.push(transition.render);
		}
	}

	return world;
}