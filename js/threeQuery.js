var threeQuery = function() {
	this.global = {};
	this.global.camera;
	this.global.world;
	this.global.canvasDom;
	this.global.canvasContainerDom = document.body;
	this.global.renderer;
	this.global.vrEffect;

	this.getWorldWidth = function() {
		return this.global.canvasContainerDom == document.body ? window.innerWidth : this.global.canvasContainerDom.offsetWidth;
	};

	this.getWorldHeight = function() {
		return this.global.canvasContainerDom == document.body ? window.innerHeight : this.global.canvasContainerDom.offsetHeight;
	};

	this.resize = function() {
		var width = this.getWorldWidth();
		var height = this.getWorldHeight();
		//console.log(width+"----"+height);
		if(this.global.settings.camera.type == "PerspectiveCamera") {
			this.global.camera.aspect = width / height;
			this.global.camera.updateProjectionMatrix();

		} else {
			this.global.camera.left = -width / 2;
			this.global.camera.right = width / 2;
			this.global.camera.top = height / 2;
			this.global.camera.bottom = -height / 2;
		}
		this.global.renderer.setSize(width, height);
		this.global.vrEffect.setSize(width, height);
	};
	//设置最基本的css
	this.setCommonCSS = function() {
		document.write("<style>*{margin:0;padding:0} body{overflow:hidden}</style>")
	};

	this.createWorld = function() {
		this.global.world = new THREE.Scene();
		return this.global.world;
	};
	this.createRender = function(options) {
		options = this.extends({}, [this.global.settings.render, options]);
		this.global.renderer = new THREE.WebGLRenderer();
		this.global.renderer.setSize(this.getWorldWidth(), this.getWorldHeight());
		this.global.canvasContainerDom.appendChild(this.global.renderer.domElement);
		this.global.renderer.precision = options.precision;
		this.global.renderer.alpha = options.alpha;
		this.global.renderer.premultipliedAlpha = options.premultipliedAlpha;
		this.global.renderer.antialias = options.antialias;
		this.global.renderer.stencil = options.stencil;
		this.global.renderer.preserveDrawingBuffer = options.preserveDrawingBuffer;
		this.global.renderer.depth = options.depth;
		this.global.renderer.logarithmicDepthBuffer = options.logarithmicDepthBuffer;
		this.global.renderer.setClearColor(options.clearColor);
		this.global.vrEffect = new THREE.StereoEffect(this.global.renderer);
		this.global.canvasDom = this.global.renderer.domElement;
		return this.global.renderer;
	};
	this.createCamera = function(options) {
		var options = this.extends({}, [this.global.settings.camera, options]);
		if(options.type != "OrthographicCamera") {
			this.global.camera = new THREE.PerspectiveCamera(options.fov, options.aspect, options.near, options.far);
		} else {
			this.global.camera = new THREE.OrthographicCamera(options.left, options.right, options.top, options.bottom, options.near, options.far);
		}
		return this.global.camera;
	};

	this.init = function(worldOpt, renderOpt, cameraOpt) {
		this.setCommonCSS();
		this.createWorld(worldOpt);
		this.createRender(renderOpt);
		this.createCamera(cameraOpt);
		addEvent();
		return [this.global.world, this.global.renderer, this.global.camera];
	};
	//添加鼠标事件
	function addEvent() {
		//鼠标移动事件
		function onDocumentMouseMove(event) {
			event.preventDefault();
			$$.global.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			$$.global.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
			if($$.global.selectedObj && $$.global.selectedObj.object.onDrag && $$.global.isDown) {
				$$.global.selectedObj.object.onDrag($$.global.selectedObj);
			}
		}

		function onDocumentMouseClick(event) {
			if($$.global.selectedObj && $$.global.selectedObj.object.onClick && $$.global.selectedObj.object.isDown == true) {
				$$.global.selectedObj.object.isDown = false;
				$$.global.selectedObj.object.onClick($$.global.selectedObj);
			}
			if($$.global.centerSelectedObj && $$.global.centerSelectedObj.object.onCenterClick && $$.global.centerSelectedObj.object.isCenterDown == true) {
				$$.global.centerSelectedObj.object.isCenterDown = false;
				$$.global.centerSelectedObj.object.onCenterClick($$.global.centerSelectedObj);
			}
		}

		function onMouseDownOrTouchStart(event) {
			$$.global.isDown = true;
			if($$.global.selectedObj && $$.global.selectedObj.object) {
				$$.global.selectedObj.object.isDown = true;
			}
			if($$.global.selectedObj && $$.global.selectedObj.object.onDown) {
				$$.global.selectedObj.object.onDown($$.global.selectedObj);
			}

			$$.global.isCenterDown = true;
			if($$.global.centerSelectedObj && $$.global.centerSelectedObj.object) {
				$$.global.centerSelectedObj.object.isCenterDown = true;
			}
			if($$.global.centerSelectedObj && $$.global.centerSelectedObj.object.onCenterDown) {
				$$.global.centerSelectedObj.object.onCenterDown($$.global.centerSelectedObj);
			}
		}

		function onMouseUpOrTouchEnd(event) {
			$$.global.isDown = false;
			if($$.global.selectedObj && $$.global.selectedObj.object.onUp && $$.global.selectedObj.object.isDown == true) {
				$$.global.selectedObj.object.onUp($$.global.selectedObj);
			}

			$$.global.isCenterDown = false;
			if($$.global.centerSelectedObj && $$.global.centerSelectedObj.object.onCenterUp && $$.global.centerSelectedObj.object.isCenterDown == true) {
				$$.global.centerSelectedObj.object.onCenterUp($$.global.centerSelectedObj);
			}
		}
		$$.global.canvasContainerDom.addEventListener("click", onDocumentMouseClick);
		$$.global.canvasContainerDom.addEventListener("mousemove", onDocumentMouseMove);
		$$.global.canvasContainerDom.addEventListener("mousedown", onMouseDownOrTouchStart);
		$$.global.canvasContainerDom.addEventListener("mouseup", onMouseUpOrTouchEnd);
		$$.global.canvasContainerDom.addEventListener("touchstart", onMouseDownOrTouchStart);
		$$.global.canvasContainerDom.addEventListener("touchend", onMouseUpOrTouchEnd);
	}

	this.animate = function(func) {
		requestAnimationFrame($$.animate);
		if($$.global.settings.renderPause) {
			return;
		}
		if($$.global.settings.resize) {
			$$.resize();
		}
		$$.worldActions();
		for(var i in $$.actionInjections) {
			$$.actionInjections[i]();
		}
		$$.updateRaycaster();
		if($$.global.settings.vr) {
			$$.global.renderer.render($$.global.world, $$.global.camera);
			$$.global.vrEffect.render($$.global.world, $$.global.camera);
		} else {
			$$.global.renderer.render($$.global.world, $$.global.camera);
		}
		if($$.controls) {
			$$.controls.update();
		}
	};
	this.actionInjections = [];
	this.worldActions = function() {};
	//颜色和浓密程度
	this.createFog = function(color, dz) {
		this.global.world = new THREE.FogExp2(color, dz);
	}

	this.extends = function(des, src, over) {
		var res = extend(des, src, over);

		function extend(des, src, over) {
			var override = true;
			if(over === false) {
				override = false;
			}
			if(src instanceof Array) {
				for(var i = 0, len = src.length; i < len; i++)
					extend(des, src[i], override);
			}
			for(var i in src) {
				if(override || !(i in des)) {
					des[i] = src[i];
				}
			}
			return des;
		}
		for(var i in src) {
			delete res[i]
		}
		return res;
	};

	this.global.RESOURCE = {
		textures: {},
		models: {},
		sounds: {},
		fonts: {},
		unloadedSource: {
			textures: [],
			models: [],
			sounds: [],
			fonts: []
		}
	}
	this.global.loadingManager = new THREE.LoadingManager();
	this.global.loadingManager.onProgress = function(item, loaded, total) {
		console.log(item, loaded, total);
		if(loaded == total) {
			if($$.onLoadComplete) {
				$$.onLoadComplete();
			}
		}
	};
	this.onLoadComplete = function() {};
	this.loadTexture = function(arr) {
		var loader = new THREE.TextureLoader(this.global.loadingManager);
		for(let i in arr) {
			loader.load(arr[i],
				function(texture) {
					$$.global.RESOURCE.textures[arr[i]] = texture;
				},
				function(xhr) {},
				function(xhr) {
					$$.global.RESOURCE.unloadedSource.textures.push(arrr[i]);
					console.log(arr[i] + " is not found");
				}
			);
		}
	}
	this.loadFont = function(arr) {
		var loader = new THREE.FontLoader(this.global.loadingManager);
		var loader2 = new THREE.TTFLoader(this.global.loadingManager);
		for(let i in arr) {
			var str = arr[i];
			if(str.lastIndexOf(".json") == str.length - 5) {
				loader.load(arr[i],
					function(font) {
						$$.global.RESOURCE.fonts[arr[i]] = font;
					},
					function(xhr) {},
					function(xhr) {
						$$.global.RESOURCE.unloadedSource.textures.push(arrr[i]);
						console.log(arr[i] + " is not found");
					}
				);
			} else {
				loader2.load(arr[i],
					function(json) {
						var font = new THREE.Font(json);
						$$.global.RESOURCE.fonts[arr[i]] = font;
					},
					function(xhr) {},
					function(xhr) {
						$$.global.RESOURCE.unloadedSource.textures.push(arrr[i]);
						console.log(arr[i] + " is not found");
					}
				);
			}
		}
	}
	this.openFullScreen = function() {
		var container = $$.global.canvasContainerDom;
		$$.global.settings.isFullScreem = true;
		if(container.requestFullscreen) {
			container.requestFullscreen();
		} else if(container.msRequestFullscreen) {
			container.msRequestFullscreen();
		} else if(container.mozRequestFullScreen) {
			container.mozRequestFullScreen();
		} else if(container.webkitRequestFullscreen) {
			container.webkitRequestFullscreen();
		} else {
			$$.global.settings.isFullScreem = false;
		}
		return $$.global.settings.isFullScreem;
	}
	this.closeFullScreen = function() {
		var container = document;
		$$.global.settings.isFullScreem = false;
		if(container.exitFullscreen) {
			container.exitFullscreen();
		} else if(container.mozCancelFullScreen) {
			container.mozCancelFullScreen();
		} else if(container.webkitExitFullScreen) {
			container.webkitExitFullScreen();
		} else if(container.msExitFullscreen) {
			container.msExitFullscreen();
		} else if(container.webkitCancelFullScreen) {
			container.webkitCancelFullScreen();
		}
		if(container.webkitExitFullScreen) {
			container.webkitCancelFullScreen();
		}
		return $$.global.settings.isFullScreem;
	}
	this.groups = {}; //添加小组，可以把不同的物体放在不同的组里。并且后续的性能优化，操作方式都会用到group。但是这个group只是把里面的物体进行分类，不进行其他任何操作
	//传入一个group的名称,每个名称的group都是个单例
	this.createGroup = function(str) {
		if($$.groups[str]) {
			return $$.groups[str];
		}
		var g = new $$.ThreeGroup(str);
		$$.groups[str] = g;
		return g;
	}

	this.removeGroup = function(str) {
		if($$.groups[str]) {
			var arr = $$.groups[str].children;
			delete $$.groups[str];
			return arr;
		}
		return [];
	}
	this.global.mouse = new THREE.Vector2();
	this.global.mouse.x = NaN;
	this.global.mouse.y = NaN;
	this.global.raycaster = new THREE.Raycaster();
	this.global.centerRaycaster = new THREE.Raycaster();

	this.global.selectedObj = null;
	this.global.centerSelectedObj = null;

	function updateMouseRaycaster() {
		$$.global.raycaster.setFromCamera($$.global.mouse, $$.global.camera);
		var intersects = $$.global.raycaster.intersectObjects($$.global.world.children);
		if(intersects.length) {
			if(($$.global.selectedObj == null) || ($$.global.selectedObj.object.uuid != intersects[0].object.uuid)) {
				if($$.global.selectedObj && $$.global.selectedObj.object.uuid != intersects[0].object.uuid) {
					if($$.global.selectedObj.object.onLeave) {
						$$.global.selectedObj.object.onLeave($$.global.selectedObj);
					}
				}
				$$.global.selectedObj = intersects[0];
				if($$.global.selectedObj.object.onEnter) {
					$$.global.selectedObj.object.onEnter($$.global.selectedObj);
				}
			}
		} else {
			if($$.global.selectedObj) {
				if($$.global.selectedObj.object.onLeave) {
					$$.global.selectedObj.object.onLeave($$.global.selectedObj);
				}
				$$.global.selectedObj = null;
			}
		}
	}

	function updateCenterRaycaster() {
		var centerV = new THREE.Vector2(0, 0);
		$$.global.centerRaycaster.setFromCamera(centerV, $$.global.camera);
		var intersects = $$.global.centerRaycaster.intersectObjects($$.global.world.children);
		if(intersects.length) {
			if(($$.global.centerSelectedObj == null) || ($$.global.centerSelectedObj.object.uuid != intersects[0].object.uuid)) {
				if($$.global.centerSelectedObj && $$.global.centerSelectedObj.object.uuid != intersects[0].object.uuid) {
					if($$.global.centerSelectedObj.object.onCenterLeave) {
						$$.global.centerSelectedObj.object.onCenterLeave($$.global.centerSelectedObj);
					}
				}
				$$.global.centerSelectedObj = intersects[0];
				if($$.global.centerSelectedObj.object.onCenterEnter) {
					$$.global.centerSelectedObj.object.onCenterEnter($$.global.centerSelectedObj);
				}
			}
		} else {
			if($$.global.centerSelectedObj) {
				if($$.global.centerSelectedObj.object.onCenterLeave) {
					$$.global.centerSelectedObj.object.onCenterLeave($$.global.centerSelectedObj);
				}
				$$.global.centerSelectedObj = null;
			}
		}
	}
	this.updateRaycaster = function() {
		updateMouseRaycaster();
		updateCenterRaycaster();
	}

	this.ThreeGroup = function(str) {
		this.name = str;
		this.children = [];
		this.remove = function(obj) {
			for(var i in this.children) {
				if(obj == this.children[i]) {
					this.splice(i, 1);
					return;
				}
			}
		}
		this.push = function(obj) {
			for(var i in this.children) {
				if(obj == this.children[i]) {
					return i;
				}
			}
			this.children.push(obj);
			return i;
		}
	}
	this.get = function(str, group) {
		var key = str.split('=');
		var val = key[1];
		key = key[0];
		var arr = null,
			res = [];
		if(group) {
			if(typeof group == "string") {
				arr = $$.groups[group];
				if(arr) {

				} else {
					return [];
				}
			} else if(typeof group == "object") {
				arr = group.children;
			}
		} else {
			arr = $$.global.world.children;
		}
		if(arr) {
			if(key == "id") {
				for(var i = 0; i < arr.length; i++) {
					if(arr[i].id == val) {
						return arr[i];
					}
				}
			} else {
				for(var i = 0; i < arr.length; i++) {
					if(arr[i][key] == val) {
						res.push(arr[i]);
					}
				}
				return res;
			}
		}
		return [];
	}
	this.createSkybox = function(texture, width) {
		var cubeMap = new THREE.CubeTexture([]);
		cubeMap.format = THREE.RGBFormat;

		var loader = new THREE.ImageLoader();
		loader.load(texture, function(image) {
			var getSide = function(x, y) {

				var size = 1024;

				var canvas = document.createElement('canvas');
				canvas.width = size;
				canvas.height = size;

				var context = canvas.getContext('2d');
				context.drawImage(image, -x * size, -y * size);
				return canvas;
			};

			cubeMap.images[0] = getSide(2, 1); // px
			cubeMap.images[1] = getSide(0, 1); // nx
			cubeMap.images[2] = getSide(1, 0); // py
			cubeMap.images[3] = getSide(1, 2); // ny
			cubeMap.images[4] = getSide(1, 1); // pz
			cubeMap.images[5] = getSide(3, 1); // nz
			cubeMap.needsUpdate = true;

		});

		var cubeShader = THREE.ShaderLib['cube'];
		cubeShader.uniforms['tCube'].value = cubeMap;

		var skyBoxMaterial = new THREE.ShaderMaterial({
			fragmentShader: cubeShader.fragmentShader,
			vertexShader: cubeShader.vertexShader,
			uniforms: cubeShader.uniforms,
			depthWrite: false,
			side: THREE.BackSide
		});

		var skyBox = new THREE.Mesh(
			new THREE.BoxGeometry(width || 1000000, width || 1000000, width || 1000000),
			skyBoxMaterial
		);

		scene.add(skyBox);
		return skyBox;
	}

	this.createSkydome = function(pic, size) {
		var skyGeo = new THREE.SphereGeometry(size || 1000000, 25, 25);
		var texture = $$.global.RESOURCE.textures["../textures/patterns/checker.png"] || THREE.ImageUtils.loadTexture(pic);
		var material = new THREE.MeshPhongMaterial({
			map: texture,
		});
		var sky = new THREE.Mesh(skyGeo, material);
		sky.material.side = THREE.BackSide;
		scene.add(sky);
		return sky;
	}

	this.createSea = function(options) {
		options = $$.extends({}, [$$.global.settings.sea, options]);
		if($$.global.RESOURCE.textures[options.texture]) {
			waterNormals = $$.global.RESOURCE.textures[options.texture];
			waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
			water = new THREE.Water(renderer, camera, scene, {
				textureWidth: waterNormals.image.width,
				textureHeight: waterNormals.image.height,
				waterNormals: waterNormals,
				alpha: options.alpha,
				waterColor: options.color,
			});

			mirrorMesh = new THREE.Mesh(
				new THREE.PlaneBufferGeometry(options.width, options.height),
				water.material
			);

			mirrorMesh.add(water);
			mirrorMesh.rotation.x = -Math.PI * 0.5;
			scene.add(mirrorMesh);
			water.waterMesh = mirrorMesh;
			return water;
		} else {
			var loader = new THREE.TextureLoader();
			loader.load(options.texture,
				function(texture) {
					$$.global.RESOURCE.textures[options.texture] = texture;
					waterNormals = texture;
					waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
					water = new THREE.Water(renderer, camera, scene, {
						textureWidth: waterNormals.image.width,
						textureHeight: waterNormals.image.height,
						waterNormals: waterNormals,
						alpha: options.alpha,
						waterColor: options.color,
					});

					mirrorMesh = new THREE.Mesh(
						new THREE.PlaneBufferGeometry(options.width, options.height),
						water.material
					);

					mirrorMesh.add(water);
					mirrorMesh.rotation.x = -Math.PI * 0.5;
					scene.add(mirrorMesh);
					water.waterMesh = mirrorMesh;
					$$.actionInjections.push(function() {
						water.material.uniforms.time.value += 1.0 / 60.0;
						water.render();
					})
					return water;
				},
				function(xhr) {},
				function(xhr) {
					$$.global.RESOURCE.unloadedSource.textures.push(arrr[i]);
					console.log(arr[i] + " is not found");
				}
			);
		}

	}

	this.global.settings = {
		camera: {
			type: "PerspectiveCamera", //透视相機
			fov: 90, //视野广角，单位是度数
			aspect: this.getWorldWidth() / this.getWorldHeight(), //拉伸比例
			near: 1,
			far: 10000,
			left: -this.getWorldWidth() / 2, //这4个用于正交相机
			right: this.getWorldWidth() / 2,
			top: this.getWorldHeight() / 2,
			bottom: -this.getWorldHeight() / 2,
		},
		render: {
			alpha: false,
			antialias: true,
			clearColor: 0x000000,
			depth: true,
			logarithmicDepthBuffer: false,
			precision: "highp",
			premultipliedAlpha: false,
			preserveDrawingBuffer: false,
			stencil: true,
		},
		sea: {
			alpha: 1,
			color: 0x001e0f,
			width: 100000,
			height: 100000
		},
		resize: true, //如果窗口大小改变则改变渲染大小
		renderPause: false, //暂停渲染循环
		vr: false, //显示VR效果,
		showLoadingProgress: false, //显示加载的进度条
		isFullScreem: false
	};
}
var $$ = new threeQuery();