function createWorld1() {
	function Tree() {
		var mat0 = new THREE.MeshLambertMaterial({
			color: 0xffaa00
		});
		var mat3 = new THREE.MeshLambertMaterial({
			color: 0xeeffee
		});
		var mat2 = new THREE.MeshLambertMaterial({
			color: 0xccffcc
		});
		var mat1 = new THREE.MeshLambertMaterial({
			color: 0xaaffaa
		});
		this.mesh = new THREE.Group();

		var mesh0 = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 4), mat0);
		mesh0.position.y = 5;
		mesh0.castShadow = true;
		mesh0.receiveShadow = true;
		this.mesh.add(mesh0);
		var mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(0, 25, 60, 7), mat1);
		mesh1.position.y = 40;
		mesh1.castShadow = true;
		mesh1.receiveShadow = true;
		this.mesh.add(mesh1);
		var mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(0, 20, 50, 7), mat2);
		mesh2.position.y = 55;
		mesh2.castShadow = true;
		mesh2.receiveShadow = true;
		this.mesh.add(mesh2);
		var mesh3 = new THREE.Mesh(new THREE.CylinderGeometry(0, 15, 40, 7), mat3);
		mesh3.position.y = 70;
		mesh3.castShadow = true;
		mesh3.receiveShadow = true;
		this.mesh.add(mesh3);

		this.variation = (Math.random() - .5) * .25;

		this.mesh.scale.x = 1 + this.variation;
		this.mesh.scale.y = 1 + this.variation;
		this.mesh.scale.z = 1 + this.variation;
		this.mesh.rotation.y = Math.random() * Math.PI;
	};
	var world = new $$.SubWorld({
		clearColor: 0xffffff
	}, {
		fov: 40
	});
	world.rayCasterEventReceivers = [];
	world.scene.fog = new THREE.Fog(0xffffff, 300, 1250);
	var light = new THREE.AmbientLight(0x0c0c0c);
	world.scene.add(light);

	var shadowLight = new THREE.DirectionalLight(0xffffff, 1);
	shadowLight.position.set(500, 1000, 500);
	shadowLight.castShadow = true;
	shadowLight.shadow.mapSize.width = 1024;
	shadowLight.shadow.mapSize.height = 1024;
	world.scene.add(shadowLight);

	world.camera.position.z = 700;
	world.camera.position.y = 400;
	world.camera.position.x = 0;
	world.camera.lookAt(new THREE.Vector3(0, 45, 0));

	floor = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 1, 1), new THREE.MeshLambertMaterial({
		color: 0xccaaaa
	}));
	floor.rotation.x = -Math.PI / 2;
	floor.receiveShadow = true;
	world.scene.add(floor);

	var treeGroup = new THREE.Group();
	var trees = [];

	for(var z = 0; z < 16; z++) {
		for(var x = 0; x < 16; x++) {
			var tree = new Tree();
			var variation = (Math.random() - .5) * 25;
			tree.mesh.position.z = (z * 80) - (8 * 80) + variation;
			tree.mesh.position.x = (x * 80) - (8 * 80) + variation;
			treeGroup.add(tree.mesh);
		}
	}

	treeGroup.rotation.y = 1;
	world.scene.add(treeGroup);

	var particleCount = 2000;
	var pMaterial = new THREE.PointsMaterial({
		color: 0xFFFFFF,
		size: 4,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true
	});
	var particles = new THREE.Geometry;

	for(var i = 0; i < particleCount; i++) {
		var pX = Math.random() * 1000 - 500,
			pY = Math.random() * 500 - 250,
			pZ = Math.random() * 1000 - 500,
			particle = new THREE.Vector3(pX, pY, pZ);
		particle.velocity = {};
		particle.velocity.y = -1;
		particles.vertices.push(particle);
	}

	var particleSystem = new THREE.Points(particles, pMaterial);
	particleSystem.position.y = 200;
	world.scene.add(particleSystem);

	var simulateRain = function() {
		var pCount = particleCount;
		while(pCount--) {
			var particle = particles.vertices[pCount];
			if(particle.y < -200) {
				particle.y = 200;
				particle.velocity.y = -1.2;
			}

			particle.velocity.y -= Math.random() * .02;

			particle.y += particle.velocity.y;
		}

		particles.verticesNeedUpdate = true;
	};

	var step = 0;
	world.actionInjections.push(function() {
		world.camera.position.y = 400 + Math.sin((step / 400) * Math.PI * 4) * 10;
		world.camera.position.x = Math.sin((step / 400) * Math.PI * 2) * 20;
		world.camera.lookAt(new THREE.Vector3(0, 45, 200));
		world.camera.rotation.z = Math.sin((step / 400) * Math.PI * 2) * Math.PI / 200;

		simulateRain();

		step++;
		step = step % 400;
	});

	world.toMain();
	showBoard();
	var bodyDom;

	function showBoard() {
		bodyDom = new $$.Body();
		bodyDom.distanceFromCamera = 60;
		world.scene.add(bodyDom);
		world.rayCasterEventReceivers = [];
		var title = new $$.Txt("Legend of The Dawn", {
			fontSize: 60,
			width: 650,
			height: 68,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		title.element.opacity = 0;
		title.element.scale.x /= 4;
		title.element.scale.y /= 4;
		title.position.y = 13;
		bodyDom.add(title);

		var chapter = new $$.Txt("Nucleus of Ice Crystal", {
			fontSize: 100,
			width: 1200,
			height: 110,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		chapter.element.scale.x /= 4;
		chapter.element.scale.y /= 4;
		bodyDom.add(chapter);

		new TWEEN.Tween(title.element.material).to({
			opacity: 1
		}, 2000).delay(1000).start().onComplete(function() {
			new TWEEN.Tween(title.element.material).to({
				opacity: 0
			}, 3000).delay(5000).start();
		});

		new TWEEN.Tween(chapter.element.material).to({
			opacity: 1
		}, 2000).delay(3000).start().onComplete(function() {
			new TWEEN.Tween(chapter.element.material).to({
				opacity: 0
			}, 3000).delay(3000).start().onComplete(function() {
				var l1 = new $$.Txt("On a snowy night, Noya was walking across", {
					fontSize: 40,
					width: 1000,
					height: 60,
					fontWeight: 800,
					color: "#333333",
					opacity: 0
				});
				l1.element.scale.x /= 4;
				l1.element.scale.y /= 4;
				l1.position.y = 10;
				bodyDom.add(l1);
				var l2 = new $$.Txt("pine grove. It was so cold that Noya just", {
					fontSize: 40,
					width: 1000,
					height: 60,
					fontWeight: 800,
					color: "#333333",
					opacity: 0
				});
				l2.position.y = 6;
				l2.position.x = -2.2;
				l2.element.scale.x /= 4;
				l2.element.scale.y /= 4;
				bodyDom.add(l2);
				var l3 = new $$.Txt("hoped she hadn't gone outside in such an", {
					fontSize: 40,
					width: 1000,
					height: 60,
					fontWeight: 800,
					color: "#333333",
					opacity: 0
				});
				l3.position.y = 2;
				l3.position.x = -1.2;
				l3.element.scale.x /= 4;
				l3.element.scale.y /= 4;
				bodyDom.add(l3);
				var l4 = new $$.Txt("awful night. Suddenly, she heard a female", {
					fontSize: 40,
					width: 1000,
					height: 60,
					fontWeight: 800,
					color: "#333333",
					opacity: 0
				});
				l4.position.y = -2;
				l4.position.x = -1.1;
				l4.element.scale.x /= 4;
				l4.element.scale.y /= 4;
				bodyDom.add(l4);
				var l5 = new $$.Txt("voice, but the voice was too indistinct.", {
					fontSize: 40,
					width: 1000,
					height: 60,
					fontWeight: 800,
					color: "#333333",
					opacity: 0
				});
				l5.position.y = -6;
				l5.position.x = -3.3;
				l5.element.scale.x /= 4;
				l5.element.scale.y /= 4;
				bodyDom.add(l5);

				var btn = new $$.Txt("◎", {
					fontSize: 140,
					width: 1000,
					height: 150,
					fontWeight: 800,
					color: "#333333",
					opacity: 0
				});
				btn.position.y = -14;
				btn.element.scale.x /= 4;
				btn.element.scale.y /= 4;
				bodyDom.add(btn);
				new TWEEN.Tween({
					opacity: 0
				}).to({
					opacity: 2
				}, 2000).delay(500).start().onUpdate(function() {
					l1.element.material.opacity = Math.max(0, Math.min(this.opacity, 1));
					l2.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.2, 1));
					l3.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.4, 1));
					l4.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.6, 1));
					l5.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.8, 1));
					btn.element.material.opacity = Math.max(0, Math.min(this.opacity - 1, 1));
				}).onComplete(function() {
					$$.rayCasterEventReceivers = [];
					$$.rayCasterEventReceivers.push(btn.element);
					btn.element.onClick = function() {
						new TWEEN.Tween({
							opacity: 2
						}).to({
							opacity: 0
						}, 1000).start().onUpdate(function() {
							l1.element.material.opacity = Math.max(0, Math.min(this.opacity - 1, 1));
							l2.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.8, 1));
							l3.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.6, 1));
							l4.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.4, 1));
							l5.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.2, 1));
							btn.element.material.opacity = Math.max(0, Math.min(this.opacity, 1));
						}).onComplete(function() {
							bodyDom.remove(l1);
							bodyDom.remove(l2);
							bodyDom.remove(l3);
							bodyDom.remove(l4);
							bodyDom.remove(l5);
							nextPage();
						});
						bodyDom.remove(btn);
					}
				});

			});
		});

		$$.actionInjections.push(bodyDom.lockToScreen);
		$$.actionInjections.push(TWEEN.update);
	}

	function nextPage() {
		var l1 = new $$.Txt("\"What's that?\"", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0,
			fontStyle: "italic "
		});
		l1.element.scale.x /= 4;
		l1.element.scale.y /= 4;
		l1.position.y = 10;
		bodyDom.add(l1);
		var l2 = new $$.Txt("Noya was shocked. She looked around but", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		l2.position.y = 6;
		l2.position.x = -0.2;
		l2.element.scale.x /= 4;
		l2.element.scale.y /= 4;
		bodyDom.add(l2);
		var l3 = new $$.Txt("there were only pines and snow. With snow", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		l3.position.y = 2;
		l3.position.x = 0.4;
		l3.element.scale.x /= 4;
		l3.element.scale.y /= 4;
		bodyDom.add(l3);
		var l4 = new $$.Txt("falling harder and harder, she had to go ", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		l4.position.y = -2;
		l4.position.x = -1.4;
		l4.element.scale.x /= 4;
		l4.element.scale.y /= 4;
		bodyDom.add(l4);
		var l5 = new $$.Txt("home as soon as possible.", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		l5.position.y = -6;
		l5.position.x = -10.6;
		l5.element.scale.x /= 4;
		l5.element.scale.y /= 4;
		bodyDom.add(l5);

		var btn = new $$.Txt("◎", {
			fontSize: 140,
			width: 1000,
			height: 150,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		btn.position.y = -14;
		btn.element.scale.x /= 4;
		btn.element.scale.y /= 4;
		bodyDom.add(btn);
		new TWEEN.Tween({
			opacity: 0
		}).to({
			opacity: 2
		}, 2000).delay(500).start().onUpdate(function() {
			l1.element.material.opacity = Math.max(0, Math.min(this.opacity, 1));
			l2.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.2, 1));
			l3.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.4, 1));
			l4.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.6, 1));
			l5.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.8, 1));
			btn.element.material.opacity = Math.max(0, Math.min(this.opacity - 1, 1));
		}).onComplete(function() {
			$$.rayCasterEventReceivers = [];
			$$.rayCasterEventReceivers.push(btn.element);
			btn.element.onClick = function() {
				new TWEEN.Tween({
					opacity: 2
				}).to({
					opacity: 0
				}, 1000).start().onUpdate(function() {
					l1.element.material.opacity = Math.max(0, Math.min(this.opacity - 1, 1));
					l2.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.8, 1));
					l3.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.6, 1));
					l4.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.4, 1));
					l5.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.2, 1));
					btn.element.material.opacity = Math.max(0, Math.min(this.opacity, 1));
				}).onComplete(function() {
					bodyDom.remove(l1);
					bodyDom.remove(l2);
					bodyDom.remove(l3);
					bodyDom.remove(l4);
					bodyDom.remove(l5);
					nextPage2();
				});
				bodyDom.remove(btn);
			}

		});
	}

	function nextPage2() {
		var l1 = new $$.Txt("\"Come here... Come here...\"", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#884400",
			opacity: 0,
			fontStyle: "italic "
		});
		l1.element.scale.x /= 4;
		l1.element.scale.y /= 4;
		l1.position.y = 10;
		bodyDom.add(l1);
		var l2 = new $$.Txt("This time Noya heard the voice more clearly.", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		l2.position.y = 6;
		l2.position.x = -0.2;
		l2.element.scale.x /= 4;
		l2.element.scale.y /= 4;
		bodyDom.add(l2);
		var l3 = new $$.Txt("She stopped walking and tried to find where", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		l3.position.y = 2;
		l3.position.x = -0.2;
		l3.element.scale.x /= 4;
		l3.element.scale.y /= 4;
		bodyDom.add(l3);
		var l4 = new $$.Txt("the voice came from, but she couldn't see", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		l4.position.y = -2;
		l4.position.x = -1.9;
		l4.element.scale.x /= 4;
		l4.element.scale.y /= 4;
		bodyDom.add(l4);
		var l5 = new $$.Txt("clearly due to the heavy snow and wind.", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		l5.position.y = -6;
		l5.position.x = -2.9;
		l5.element.scale.x /= 4;
		l5.element.scale.y /= 4;
		bodyDom.add(l5);

		var btn = new $$.Txt("◎", {
			fontSize: 140,
			width: 1000,
			height: 150,
			fontWeight: 800,
			color: "#333333",
			opacity: 0
		});
		btn.position.y = -14;
		btn.element.scale.x /= 4;
		btn.element.scale.y /= 4;
		bodyDom.add(btn);
		new TWEEN.Tween({
			opacity: 0
		}).to({
			opacity: 2
		}, 2000).delay(500).start().onUpdate(function() {
			l1.element.material.opacity = Math.max(0, Math.min(this.opacity, 1));
			l2.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.2, 1));
			l3.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.4, 1));
			l4.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.6, 1));
			l5.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.8, 1));
			btn.element.material.opacity = Math.max(0, Math.min(this.opacity - 1, 1));
		}).onComplete(function() {
			$$.rayCasterEventReceivers = [];
			$$.rayCasterEventReceivers.push(btn.element);
			btn.element.onClick = function() {
				new TWEEN.Tween({
					opacity: 2
				}).to({
					opacity: 0
				}, 1000).start().onUpdate(function() {
					l1.element.material.opacity = Math.max(0, Math.min(this.opacity - 1, 1));
					l2.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.8, 1));
					l3.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.6, 1));
					l4.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.4, 1));
					l5.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.2, 1));
					btn.element.material.opacity = Math.max(0, Math.min(this.opacity, 1));
				}).onComplete(function() {
					bodyDom.remove(l1);
					bodyDom.remove(l2);
					bodyDom.remove(l3);
					bodyDom.remove(l4);
					bodyDom.remove(l5);
					
					nextPage3();
				});
				bodyDom.remove(btn);
			}
		});
	}

	function nextPage3() {
		var l1 = new $$.Txt("\"What should I do now?\"", {
			fontSize: 40,
			width: 1000,
			height: 60,
			fontWeight: 800,
			color: "#333333",
			opacity: 0,
			fontStyle: "italic "
		});
		l1.element.scale.x /= 4;
		l1.element.scale.y /= 4;
		l1.position.y = 10;
		bodyDom.add(l1);
		var l2 = new $$.Txt("Find the voice.", {
			fontSize: 40,
			width: 500,
			height: 50,
			fontWeight: 800,
//			backgroundColor: "rgba(0,0,0,0.3)",
			color: "#ff0000",
			opacity: 0
		});
		l2.element.position.y = 2;
		l2.element.scale.x /= 4;
		l2.element.scale.y /= 4;
		bodyDom.add(l2.element);
		var l3 = new $$.Txt("Went back home.", {
			fontSize: 40,
			width: 500,
			height: 50,
			fontWeight: 800,
			color: "#0000ff",
//			backgroundColor: "rgba(0,0,0,0.3)",
			opacity: 0
		});
		l3.element.position.y = -6;
		l3.element.scale.x /= 4;
		l3.element.scale.y /= 4;
		bodyDom.add(l3.element);

		new TWEEN.Tween({
			opacity: 0
		}).to({
			opacity: 2
		}, 2000).delay(500).start().onUpdate(function() {
			l1.element.material.opacity = Math.max(0, Math.min(this.opacity, 1));
			l2.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.2, 0.6));
			l3.element.material.opacity = Math.max(0, Math.min(this.opacity - 0.4, 0.6));
			//btn.element.material.opacity = Math.max(0, Math.min(this.opacity - 1, 1));
		}).onComplete(function() {
			$$.rayCasterEventReceivers=[];
			$$.rayCasterEventReceivers.push(l2.element);
			$$.rayCasterEventReceivers.push(l3.element);
			
			l3.element.onEnter=function(obj){
				obj.object.material.opacity=1;
			}
			l2.element.onEnter=function(obj){
				obj.object.material.opacity=1;
			}
			l2.element.onLeave=function(obj){
				l2.element.material.opacity=0.6;
			}
			l3.element.onLeave=function(obj){
				l3.element.material.opacity=0.6;
			}
		});
	}
}