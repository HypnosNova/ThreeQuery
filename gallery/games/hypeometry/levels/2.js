var map = {
	background:0xefe196,
	levelBoard: {
		life: 2500,
		duration: 1000,
		backgroundColor: "rgba(0,0,0,0.4)",
		info: [{
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.15
		}, {
			type: "text",
			text: "第二章",
			family: "微软雅黑",
			size: 0.035,
			y: 0.27,
			color: "#ffffff",
			weight: "bolder"
		}, {
			type: "text",
			text: "花园",
			family: "微软雅黑",
			size: 0.07,
			y: 0.37,
			color: "#ffffff",
			weight: "bolder"
		}, {
			type: "text",
			text: "─────",
			family: "微软雅黑",
			size: 0.02,
			y: 0.45,
			color: "#ffffff",
			weight: "bold"
		}, {
			type: "text",
			text: "在此",
			family: "微软雅黑",
			size: 0.03,
			y: 0.5,
			color: "#ffffff",
			weight: "bolder"
		}, {
			type: "text",
			text: "我要向",
			family: "微软雅黑",
			size: 0.04,
			y: 0.625,
			color: "#ffffff",
			weight: "bold"
		}, {
			type: "text",
			text: "纪念碑谷致敬",
			family: "微软雅黑",
			size: 0.04,
			y: 0.7,
			color: "#ffffff",
			weight: "bold"
		}, {
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.85
		}]
	},
	endBoard: {
		duration: 1000,
		backgroundColor: "rgba(0,0,0,0.4)",
		info: [{
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.15
		}, {
			type: "text",
			text: "完成",
			family: "微软雅黑",
			size: 0.06,
			y: 0.5,
			color: "#ffffff",
			weight: "bolder"
		}, {
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.85
		}]
	},
	onGameStart: function() {
		core.childrenWithId.turn.gameState = 0;
	},
	blocks: [{
		type: "ground",
		width: 22,
		height: 22,
		x: 0,
		y: -3,
		rx: -Math.PI / 2,
		materialId: "m3"
	}, {
		z: 6,
		x: 0.05,
		y: 0.25,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		z: 6,
		x: 0.05,
		y: 0,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		z: 6,
		x: 0.05,
		y: -0.25,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		z: 6,
		x: 0.05,
		y: -0.5,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		z: 6,
		x: 0.05,
		y: -0.75,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		z: 6,
		x: 0.05,
		y: -1,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		z: 6,
		x: 0.05,
		y: -1.25,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -5.5,
		y: -1,
		sx: 2,
		sy: 3
	}, {
		x: -6,
		y: 3.5,
		sy: 6
	}, {
		type: "arc",
		ry: Math.PI,
		x: -5,
		y: 6
	}, {
		type: "plane",
		x: -4,
		y: 6
	}, {
		type: "arc",
		ry: -Math.PI / 2,
		x: -6,
		z: -1,
		y: 6
	}, {
		type: "arc",
		x: -1,
		z: -6,
		y: 6
	}, {
		sy: 2,
		y: 5.5,
		z: -6
	}, {
		type: "arc",
		ry: Math.PI / 2,
		z: -5,
		y: 6
	}, {
		type: "plane",
		y: 6,
		z: -4,
	}, {
		sy: 3,
		z: -6,
		y: -1
	}, {
		type: "plane",
		x: -6,
		y: 6,
		z: -3.5,
		sz: 4
	}, {
		type: "plane",
		x: -3.5,
		y: 6,
		z: -6,
		sx: 4
	}, {
		type: "plane",
		x: -6,
		y: 6.01,
		z: -6,
		sz: 1.3333,
		sx: 1.3333,
		materialId:"m5"
	}, {
		type: "arc",
		ry: Math.PI,
		x: -4
	}, {
		z: 5.5,
		sz: 2,
		sy: 3,
		y: -1
	}, {
		y: -2,
		z: 6,
		x: 1.5,
		sx: 2
	}, {
		type: "arc",
		ry: -Math.PI / 2,
		z: 4
	}, {
		type: "stick",
		y: 2.5,
		z: -6,
		d: 1,
		height: 4
	}, {
		type: "stick",
		y: 2.5,
		z: -6,
		d: 2,
		height: 4
	}, {
		type: "stick",
		y: 4,
		z: -6,
		d: 3,
		height: 1
	}, {
		type: "stick",
		x: 7,
		y: 9,
		z: 1,
		d: 3,
		height: 3
	}, {
		type: "tri",
		x: 6.6,
		y: 10.6,
		z: 1.5,
		sx: 0.1,
		sz: 0.1,
		sy: 0.1,
		rz: Math.PI
	}, {
		type: "stick",
		y: 2.5,
		z: -6,
		d: 0,
		height: 4
	}, {
		type: "roof",
		y: 9,
		z: -6,
		ry: Math.PI / 4,
		materialArr: ["mRoof", "mRoof"]
	}, {
		type: "stick",
		y: 7.5,
		z: -6,
		d: 1,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		z: -6,
		d: 2,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		z: -6,
		d: 3,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		z: -6,
		d: 0,
		height: 2
	}, {
		type: "roof",
		y: 9,
		x: -6,
		ry: Math.PI / 4,
		materialArr: ["mRoof", "mRoof"]
	}, {
		type: "stick",
		y: 7.5,
		x: -6,
		d: 1,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		x: -6,
		d: 2,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		x: -6,
		d: 3,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		x: -6,
		d: 0,
		height: 2
	}, {
		type: "roof",
		y: 9,
		x: -6,
		z: -6,
		ry: Math.PI / 4,
		materialArr: ["mRoof", "mRoof"]
	}, {
		type: "stick",
		y: 7.5,
		x: -6,
		z: -6,
		d: 1,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		x: -6,
		z: -6,
		d: 2,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		x: -6,
		z: -6,
		d: 3,
		height: 2
	}, {
		type: "stick",
		y: 7.5,
		x: -6,
		z: -6,
		d: 0,
		height: 2
	}, {
		type: "roundRect",
		id: "btn1",
		y: -1.9,
		sy: 0.6,
		sx: 0.6,
		x: 2,
		z: 6,
		rx: Math.PI / 2,
		materialId: "mRoof",
		cannotClick: true
	}, {
		type: "group",
		id: "bridge",
		children: [{
			materialId: "m1",
			sx: 4,
			x: 1.5
		}, {
			z: 2,
			sz: 3,
			materialId: "m1"
		}, {
			type: "stick",
			y: 1.5,
			d: 1,
			height: 2
		}, {
			type: "stick",
			y: 1.5,
			d: 2,
			height: 2
		}, {
			type: "stick",
			y: 1.5,
			d: 3,
			height: 2
		}, {
			type: "stick",
			y: 1.5,
			d: 0,
			height: 2.5
		}, {
			y: 3
		}, {
			type: "cylinder",
			y: -1,
			materialId: "m1"
		}, {
			type: "cylinder",
			sx: 1.3,
			sy: 8,
			sz: 1.3,
			y: -5
		}]
	}, {
		type: "turntable",
		id: "turn",
		x: 0,
		y: 4,
		z: 0,
		axis: "y",
		funcMove: function(e, angle) {
			if(core.childrenWithId.turn.gameState == 0) {
				core.mapGraph.removeEdge("p2", "p3", "path0");
				core.mapGraph.removeEdge("p10", "p3", "path0");
				core.mapGraph.removeEdge("p2", "p9", "path0");
				core.mapGraph.removeEdge("p10", "p9", "path0");
			} else if(core.childrenWithId.turn.gameState == 1) {
				core.mapGraph.removeEdge("p2", "p3", "path0");
				core.mapGraph.removeEdge("p10", "p3", "path0");
				core.mapGraph.removeEdge("p2", "p9", "path0");
				core.mapGraph.removeEdge("p10", "p9", "path0");
				core.mapGraph.removeEdge("p3", "n5", "path0");
				core.mapGraph.removeEdge("p9", "n5", "path0");
			} else if(core.childrenWithId.turn.gameState == 2) {
				core.mapGraph.removeEdge("t17", "p3", "path0");
				core.mapGraph.removeEdge("t1", "p3", "path0");
				core.mapGraph.removeEdge("t17", "p9", "path0");
				core.mapGraph.removeEdge("t1", "p9", "path0");
			}
			core.childrenWithId["bridge"].rotation.y = angle;
		},
		funcEnd: function(e, angle) {
			//			return
			var tmp = angle;
			while(tmp < 0) {
				tmp += 2 * Math.PI;
			}
			core.childrenWithId["bridge"].rotation.y = tmp;
			if(core.childrenWithId["bridge"].rotation.y > Math.PI / 4 * 7) {
				core.childrenWithId["bridge"].rotation.y -= 2 * Math.PI;
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
			var time = Math.abs(core.childrenWithId["bridge"].rotation.y - tmp) * 400;
			var tween = new TWEEN.Tween(core.childrenWithId["bridge"].rotation)
				.to({
					y: tmp
				}, time)
				.easing(TWEEN.Easing.Back.Out)
				.start().onComplete(function() {
					if(core.childrenWithId.turn.gameState == 0) {
						if(core.childrenWithId["bridge"].rotation.y == Math.PI * 1.5) {
							core.mapGraph.addEdge("p2", "p3", "path0");
							core.mapGraph.addEdge("p9", "p10", "path0");
						} else if(core.childrenWithId["bridge"].rotation.y == 0) {
							core.mapGraph.addEdge("p3", "p10", "path0");
						} else if(core.childrenWithId["bridge"].rotation.y == Math.PI) {
							core.mapGraph.addEdge("p9", "p2", "path0");
						}
					} else if(core.childrenWithId.turn.gameState == 1) {
						if(core.childrenWithId["bridge"].rotation.y == Math.PI * 1.5) {
							core.mapGraph.addEdge("p2", "p3", "path0");
							core.mapGraph.addEdge("p9", "p10", "path0");
						} else if(core.childrenWithId["bridge"].rotation.y == 0) {
							core.mapGraph.addEdge("p3", "p10", "path0");
						} else if(core.childrenWithId["bridge"].rotation.y == Math.PI) {
							core.mapGraph.addEdge("p9", "p2", "path0");
							core.mapGraph.addEdge("p3", "n5", "path0");
						} else if(core.childrenWithId["bridge"].rotation.y == Math.PI * 0.5) {
							core.mapGraph.addEdge("p9", "n5", "path0");
						}
					} else if(core.childrenWithId.turn.gameState == 2) {
						if(core.childrenWithId["bridge"].rotation.y == Math.PI * 1.5) {
							core.mapGraph.addEdge("t1", "p3", "path0");
						} else if(core.childrenWithId["bridge"].rotation.y == Math.PI) {
							core.mapGraph.addEdge("p3", "t17", "path0");
							core.mapGraph.addEdge("p9", "t1", "path0");
						} else if(core.childrenWithId["bridge"].rotation.y == Math.PI * 0.5) {
							core.mapGraph.addEdge("p9", "t17", "path0");
							core.mapGraph.addEdge("p3", "n1", "path0");
						} else if(core.childrenWithId["bridge"].rotation.y == 0) {
							core.mapGraph.addEdge("p9", "n1", "path0");
						}
					}
				});
		},
		hoopMaterial: "m2",
		poleMaterial: "m2"
	}],
	materials: {
		m0: {
			type: "L",
			color: 0xdad282
		},
		m1: {
			type: "L",
			color: 0xafa862
		},
		m2: {
			type: "L",
			color: 0xff6600
		},
		m3: {
			type: "L",
			color: 0xffffff,
			mapId: "img/level2ground.png"
		},
		m4: {
			type: "B",
			color: 0xdad282,
			type: "B",
			//			color: 0xffffff,
			opacity: 0,
			//			mapId: "img/null.png"
		},
		m5: {
			type: "L",
			color: 0xff8822,
			mapId: "img/endPoint.png"
		},
		mRoof: {
			type: "L",
			color: 0xf7b41f
		},
		st: {
			type: "L",
			color: 0x444444,
		}
	},
	textures: ["img/path/texture0.jpg", "img/common/border.png", "img/level2ground.png", "img/null.png", "img/endPoint.png"],
	lights: {
		areaLight: {
			color: 0x333333,
			type: "A"
		},
		directionLight: {
			color: 0xeedacc,
			type: "D",
			intensity: 1,
			position: {
				x: 200,
				y: 400,
				z: 100
			}
		},
		directionLight2: {
			color: 0x444444,
			type: "D",
			intensity: 1,
			position: {
				x: -200,
				y: -400,
				z: -100
			}
		}
	},
	camera: {
		distance: 50,
		lookAt: {
			x: 0,
			y: 5,
			z: 0
		}
	},
	currentPath: 0,
	path0: {
		p1: {
			id: "p1",
			x: -5,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p2"],
			materialId: "m4"
		},
		p2: {
			id: "p2",
			x: -4,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p1"],
			materialId: "m4",
			onComing: function() {
				core.childrenWithId.turn.owner.becomeAble();
			}
		},
		p3: {
			id: "p3",
			x: 0,
			y: 1,
			z: 3,
			face: 0,
			neighbors: ["p4", "p10"],
			materialId: "m4",
			parentId: "bridge",
			onComing: function() {
				core.childrenWithId.turn.owner.becomeDisable();
			}
		},
		p4: {
			id: "p4",
			x: 0,
			y: 1,
			z: 2,
			face: 0,
			neighbors: ["p3", "p5"],
			materialId: "m4",
			parentId: "bridge"
		},
		p5: {
			id: "p5",
			x: 0,
			y: 1,
			z: 1,
			face: 0,
			neighbors: ["p4", "p6"],
			materialId: "m4",
			parentId: "bridge"
		},
		p6: {
			id: "p6",
			x: 0,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p5", "p7"],
			materialId: "m4",
			parentId: "bridge"
		},
		p7: {
			id: "p7",
			x: 1,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p6", "p8"],
			materialId: "m4",
			parentId: "bridge"
		},
		p8: {
			id: "p8",
			x: 2,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p9", "p7"],
			materialId: "m4",
			parentId: "bridge"
		},
		p9: {
			id: "p9",
			x: 3,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p8"],
			materialId: "m4",
			parentId: "bridge",
			onComing: function() {
				core.childrenWithId.turn.owner.becomeDisable();
			}
		},
		p10: {
			id: "p10",
			x: 0,
			y: 1,
			z: 4,
			face: 0,
			neighbors: ["p11", "p3"],
			materialId: "m4",
			onComing: function() {
				core.childrenWithId.turn.owner.becomeAble();
			}
		},
		p11: {
			id: "p11",
			x: 0,
			y: 1,
			z: 5,
			face: 0,
			neighbors: ["p12", "p10"],
			materialId: "m4"
		},
		p12: {
			id: "p12",
			x: 0,
			y: 1,
			z: 6,
			face: 0,
			neighbors: ["p11", "p13"],
			materialId: "m4"
		},
		p13: {
			id: "p13",
			x: 1,
			y: 1,
			z: 6,
			face: 0,
			neighbors: ["p12", "p14"],
			materialId: "m4",
			cannotClick: true,
			changeSpeed: {
				"p14": "auto"
			},
		},
		p14: {
			id: "p14",
			x: 1,
			y: 0,
			z: 6,
			face: 1,
			neighbors: ["p13", "p15"],
			materialId: "m4",
			changeSpeed: {
				"p13": "auto"
			},
		},
		p15: {
			id: "p15",
			x: 1,
			y: -1,
			z: 6,
			face: 1,
			neighbors: ["p14", "p16"],
			materialId: "m4",
			changeSpeed: {
				"p16": "auto"
			},
		},
		p16: {
			id: "p16",
			x: 1,
			y: -1,
			z: 6,
			face: 0,
			neighbors: ["p15", "p17"],
			materialId: "m4",
			changeSpeed: {
				"p15": "auto"
			},
		},
		p17: {
			id: "p17",
			x: 2,
			y: -1,
			z: 6,
			face: 0,
			neighbors: ["p16"],
			materialId: "m4",
			onComing: function() {
				if(!core.childrenWithId["btn1"].hasMove) {
					core.childrenWithId["btn1"].hasMove = true;
					new TWEEN.Tween(core.childrenWithId["btn1"].position)
						.to({
							y: -1.99 * game.settings.blockSize
						}, 300)
						.delay(200)
						.start().onComplete(function() {
							var cube = core.createCube({
								x: -1,
								y: -4.6,
								z: -6,
								sy: 3
							}, core.map.materials.m0, gameWorld.scene);
							new TWEEN.Tween(cube.position).to({
								y: -1 * game.settings.blockSize
							}, 600).start();

							var cube2 = core.createCube({
								x: -2,
								y: -4.6,
								z: -6,
								sy: 3
							}, core.map.materials.m0, gameWorld.scene);
							new TWEEN.Tween(cube2.position).to({
								y: -1 * game.settings.blockSize
							}, 600).delay(400).start();

							var cube3 = core.createCube({
								x: 0,
								y: -4.6,
								z: -5,
								sy: 3
							}, core.map.materials.m0, gameWorld.scene);
							new TWEEN.Tween(cube3.position).to({
								y: -1 * game.settings.blockSize
							}, 600).delay(800).start();

							var cube4 = core.createCube({
								x: 0,
								y: -4.6,
								z: -4,
								sy: 3
							}, core.map.materials.m0, gameWorld.scene);
							new TWEEN.Tween(cube4.position).to({
								y: -1 * game.settings.blockSize
							}, 600).delay(1200).start();

							var cube5 = core.createCube({
								x: 1,
								y: -4.6,
								z: -4,
								sy: 3
							}, core.map.materials.m0, gameWorld.scene);
							new TWEEN.Tween(cube5.position).to({
								y: -1 * game.settings.blockSize
							}, 600).delay(1600).start();

							var cube6 = core.createCube({
								x: 2,
								y: -4.6,
								z: -4,
								sy: 3
							}, core.map.materials.m0, gameWorld.scene);

							var btn2 = core.createRoundRect({
								type: "roundRect",
								id: "btn2",
								y: -3.5,
								sy: 0.6,
								sx: 0.6,
								x: 2,
								z: -4,
								rx: Math.PI / 2,
								cannotClick: true
							}, core.map.materials.mRoof, gameWorld.scene)

							new TWEEN.Tween(btn2.position).to({
								y: 0.1 * game.settings.blockSize
							}, 600).delay(2000).start()

							new TWEEN.Tween(cube6.position).to({
								y: -1 * game.settings.blockSize
							}, 600).delay(2000).start().onComplete(function() {
								var tri = core.createTri({
									y: 7,
									x: 5,
									z: 1
								}, core.map.materials.m4, gameWorld.scene);
								var pathInfo = {
									n1: {
										id: "n1",
										x: 5,
										y: 8,
										z: 1,
										face: 0,
										neighbors: ["n2"],
										materialId: "m4",
										onComing: function() {
											core.childrenWithId.turn.owner.becomeAble();
										}
									},
									n2: {
										id: "n2",
										x: 6,
										y: 8,
										z: 1,
										face: 0,
										neighbors: ["n1", "n3"],
										materialId: "m4"
									},
									n3: {
										id: "n3",
										x: 7,
										y: 8,
										z: 1,
										face: 0,
										neighbors: ["n2", "n4"],
										materialId: "m4"
									},
									n4: {
										id: "n4",
										x: 7,
										y: 8,
										z: 2,
										face: 0,
										neighbors: ["n3", "n5"],
										materialId: "m4"
									},
									n5: {
										id: "n5",
										x: 7,
										y: 8,
										z: 3,
										face: 0,
										neighbors: ["n4", "n6"],
										materialId: "m4",
										onComing: function() {
											core.childrenWithId.turn.owner.becomeAble();
										}
									},
									n6: {
										id: "n6",
										x: 1,
										y: 1,
										z: -4,
										face: 0,
										neighbors: ["n5", "n7"],
										materialId: "m4"
									},
									n7: {
										id: "n7",
										x: 2,
										y: 1,
										z: -4,
										face: 0,
										neighbors: ["n6"],
										materialId: "m4",
										onComing: function() {
											if(btn2.hasMove) {
												return;
											}
											btn2.hasMove = true;
											core.mapGraph.removeEdge("p2", "p3", "path0");
											core.mapGraph.removeEdge("p10", "p3", "path0");
											core.mapGraph.removeEdge("p2", "p9", "path0");
											core.mapGraph.removeEdge("p10", "p9", "path0");
											core.mapGraph.removeEdge("p3", "n5", "path0");
											core.mapGraph.removeEdge("p9", "n5", "path0");
											new TWEEN.Tween(btn2.position).to({
													y: 0.01 * game.settings.blockSize
												}, 300)
												.delay(200)
												.start().onComplete(function() {
													core.childrenWithId.turn.gameState = 2;
													new TWEEN.Tween(core.childrenWithId.bridge.position).to({
														y: core.childrenWithId.bridge.position.y + 6 * game.settings.blockSize
													}, 2000).start();
													core.childrenWithId.turn.owner.becomeDisable();
													new TWEEN.Tween(core.childrenWithId.turn.position).to({
														y: core.childrenWithId.turn.position.y + 6 * game.settings.blockSize
													}, 2000).start().onComplete(function() {
														core.childrenWithId.turn.owner.becomeAble();													console.log(tri);
														tri.material = core.map.materials.m0;													console.log(tri);
														if(core.childrenWithId["bridge"].rotation.y == Math.PI * 1.5) {
															core.mapGraph.addEdge("t1", "p3", "path0");
														} else if(core.childrenWithId["bridge"].rotation.y == Math.PI) {
															core.mapGraph.addEdge("p3", "t17", "path0");
															core.mapGraph.addEdge("p9", "t1", "path0");
														} else if(core.childrenWithId["bridge"].rotation.y == Math.PI * 0.5) {
															core.mapGraph.addEdge("p9", "t17", "path0");
															core.mapGraph.addEdge("p3", "n1", "path0");
														} else if(core.childrenWithId["bridge"].rotation.y == 0) {
															core.mapGraph.addEdge("p9", "n1", "path0");
														}
													});
												});
										}
									}
								};
								for(var i in pathInfo) {
									core.createOnePath(gameWorld, pathInfo[i]);
									core.map.path0[pathInfo[i].id] = pathInfo[i];
								}
								var turntable = core.childrenWithId.turn;
								turntable.gameState = 1;
							});
						});
				}
			}
		},
		t1: {
			id: "t1",
			x: -4,
			y: 7,
			z: 0,
			face: 0,
			neighbors: ["t2"],
			materialId: "m4",
			onComing: function() {
				core.childrenWithId.turn.owner.becomeAble();
			}
		},
		t2: {
			id: "t2",
			x: -5,
			y: 7,
			z: 0,
			face: 0,
			neighbors: ["t1", "t3"],
			materialId: "m4"
		},
		t3: {
			id: "t3",
			x: -6,
			y: 7,
			z: 0,
			face: 0,
			neighbors: ["t2", "t4"],
			materialId: "m4"
		},
		t4: {
			id: "t4",
			x: -6,
			y: 7,
			z: -1,
			face: 0,
			neighbors: ["t3", "t5"],
			materialId: "m4"
		},
		t5: {
			id: "t5",
			x: -6,
			y: 7,
			z: -2,
			face: 0,
			neighbors: ["t4", "t6"],
			materialId: "m4"
		},
		t6: {
			id: "t6",
			x: -6,
			y: 7,
			z: -3,
			face: 0,
			neighbors: ["t5", "t7"],
			materialId: "m4"
		},
		t7: {
			id: "t7",
			x: -6,
			y: 7,
			z: -4,
			face: 0,
			neighbors: ["t6", "t8"],
			materialId: "m4"
		},
		t8: {
			id: "t8",
			x: -6,
			y: 7,
			z: -5,
			face: 0,
			neighbors: ["t7", "t9"],
			materialId: "m4"
		},
		t9: {
			id: "t9",
			x: -6,
			y: 7.1,
			z: -6,
			face: 0,
			neighbors: ["t8", "t10"],
			materialId: "m4",
			hasCome: function() {
				core.charactor.walkingPath=[];
				core.showEndBoard();
			}
		},
		t10: {
			id: "t10",
			x: -5,
			y: 7,
			z: -6,
			face: 0,
			neighbors: ["t9", "t11"],
			materialId: "m4"
		},
		t11: {
			id: "t11",
			x: -4,
			y: 7,
			z: -6,
			face: 0,
			neighbors: ["t10", "t12"],
			materialId: "m4"
		},
		t12: {
			id: "t12",
			x: -3,
			y: 7,
			z: -6,
			face: 0,
			neighbors: ["t11", "t13"],
			materialId: "m4"
		},
		t13: {
			id: "t13",
			x: -2,
			y: 7,
			z: -6,
			face: 0,
			neighbors: ["t12", "t14"],
			materialId: "m4"
		},
		t14: {
			id: "t14",
			x: -1,
			y: 7,
			z: -6,
			face: 0,
			neighbors: ["t13", "t15"],
			materialId: "m4"
		},
		t15: {
			id: "t15",
			x: 0,
			y: 7,
			z: -6,
			face: 0,
			neighbors: ["t14", "t16"],
			materialId: "m4"
		},
		t16: {
			id: "t16",
			x: 0,
			y: 7,
			z: -5,
			face: 0,
			neighbors: ["t15", "t17"],
			materialId: "m4"
		},
		t17: {
			id: "t17",
			x: 0,
			y: 7,
			z: -4,
			face: 0,
			neighbors: ["t16"],
			materialId: "m4",
			onComing: function() {
				core.childrenWithId.turn.owner.becomeAble();
			}
		}
	},
	startPoint: "p1"
}