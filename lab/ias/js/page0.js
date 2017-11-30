function createWorld0() {
//	$$.global.settings.raycaster = false;
	var settings = {
		letterTimeOffset: 0.075
	};

	function init() {
		var world = new PageWorld({}, {
			fov: 27
		});
		world.rayCasterEventReceivers = [];

		world.camera.position.set(0, 0, 500);

		new THREE.FontLoader().load('assets/font/loadFont.js', function(font) {
			var mesh2 = createTextAnimationMesh("Loading", {
				size: 36,
				height: 8,
				font: font,
				curveSegments: 12,
				bevelEnabled: true,
				bevelSize: 1,
				bevelThickness: 1
			}, {
				timeOffset: 0.3
			});
			mesh2.geometry.center();
			mesh2.position.set(-90, -15, 0)
			world.scene.add(mesh2);

			var light = new THREE.DirectionalLight(0xff9933, 1.0);
			light.position.set(0.2, 0.5, 1);
			world.scene.add(light);
			var light = new THREE.AmbientLight(0x404040);
			world.scene.add(light);

			new TWEEN.Tween(mesh2).to({
				time: mesh2.animationDuration
			}, 6000).start().yoyo(true).repeat(Infinity);

		});

		world.actionInjections.push(TWEEN.update);

		return world;
	}

	////////////////////
	// CLASSES
	////////////////////

	function Animation(modelGeometry) {
		var geometry = new BAS.ModelBufferGeometry(modelGeometry);

		var i, j;

		var aOffsetAmplitude = geometry.createAttribute('aOffsetAmplitude', 2);
		var positionBuffer = geometry.getAttribute('position').array;
		var x, y, distance;

		for(i = 0; i < aOffsetAmplitude.array.length; i += 12) { // 6 * 2
			var offset = THREE.Math.randFloat(1, 4);
			var amplitude = THREE.Math.randFloat(0.5, 1.0);

			x = 0;
			y = 0;

			// x/y position of the corresponding vertex from the position buffer
			for(j = 0; j < 6; j += 2) {
				x += positionBuffer[(i + j) / 2 * 3];
				y += positionBuffer[(i + j) / 2 * 3 + 1];
			}

			x /= 3;
			y /= 3;

			distance = Math.sqrt(x * x + y * y);

			for(j = 0; j < 12; j += 2) {
				aOffsetAmplitude.array[i + j] = (distance + offset) * (1.0 + THREE.Math.randFloatSpread(0.0125));
				aOffsetAmplitude.array[i + j + 1] = amplitude;
			}
		}

		var aColor = geometry.createAttribute('color', 3);
		var color = new THREE.Color();

		for(i = 0; i < aColor.array.length; i += 18) { // 6 * 3
			color.setHSL(0, 0, THREE.Math.randFloat(0.5, 1.0));

			for(j = 0; j < 18; j += 3) {
				aColor.array[i + j] = color.r;
				aColor.array[i + j + 1] = color.g;
				aColor.array[i + j + 2] = color.b;
			}
		}

		var material = new BAS.StandardAnimationMaterial({
			flatShading: true,
			vertexColors: THREE.VertexColors,
			transparent: true,
			side: THREE.DoubleSide,
			uniforms: {
				uTime: {
					value: 0
				},
				uD: {
					value: 6.4
				},
				uA: {
					value: 3.2
				}
			},
			uniformValues: {
				diffuse: new THREE.Color(0x469aff),
				roughness: 0.8,
				metalness: 0.8,
				opacity: 0.8
			},
			vertexFunctions: [
				BAS.ShaderChunk['ease_cubic_in_out']
			],
			vertexParameters: [
				'uniform float uTime;',
				'uniform float uD;',
				'uniform float uA;',
				'attribute vec2 aOffsetAmplitude;'
			],
			vertexPosition: [
				'float tProgress = sin(uTime + aOffsetAmplitude.x / uD);',
				'tProgress = easeCubicInOut(tProgress);',
				'transformed.z += aOffsetAmplitude.y * uA * tProgress;'
			]
		});

		geometry.computeVertexNormals();

		THREE.Mesh.call(this, geometry, material);

		this.frustumCulled = false;
	}
	Animation.prototype = Object.create(THREE.Mesh.prototype);
	Animation.prototype.constructor = Animation;
	Object.defineProperty(Animation.prototype, 'time', {
		get: function() {
			return this.material.uniforms['uTime'].value;
		},
		set: function(v) {
			this.material.uniforms['uTime'].value = v;
		}
	});

	var worldB = createWorld1();
	loadAsset();

	function loadAsset() {
		$$.Loader.loadTexture([
			"assets/transition/transition0.png",
			"assets/transition/transition1.png",
			"assets/transition/transition2.png",
			"assets/transition/transition3.png",
			"assets/transition/transition4.png",
			"assets/transition/transition5.png",
			"assets/transition/transition6.png",
			"assets/transition/transition7.png",
			"assets/img/ias.jpg",
			"assets/img/photo.jpg",
			"assets/slide/0.png",
			"assets/slide/1.png",
			"assets/slide/2.png",
			"assets/slide/world.png",
			"assets/slide/app.png",
			"assets/slide/demo.png",
		]);
	}
	$$.Loader.onLoadComplete = function() {
		setTimeout(function() {
//			worldB=createWorld5();
			var transition = new $$.Transition(worldB, {}, $$.Loader.RESOURCE.textures['assets/transition/transition0.png']);
			$$.actionInjections.push(transition.render);
			worldB.showText();
		}, 1000);
	}

	return init();
}