var CurvePanManager = function() {
	var indexArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	this.panRadius = 32;
	this.inRate = 0.6;
	this.panHeight = 20;
	this.stonePanHeight = 40;
	this.panMaterial = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		map: $$.global.RESOURCE.textures["texture/pan.jpg"]
	});
	this.panCurveMaterial = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		map: $$.global.RESOURCE.textures["texture/stone.jpg"]
	});
	this.panCurveDeepMaterial = new THREE.MeshLambertMaterial({
		color: 0x66aaff,
		//		map: $$.global.RESOURCE.textures["texture/stone.jpg"]
	});
	this.stonePanMaterial = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		map: $$.global.RESOURCE.textures["texture/stone.jpg"]
	});
	this.emptyPanMaterial = new THREE.MeshLambertMaterial({
		color: 0xdddddd,
		map: $$.global.RESOURCE.textures["texture/pan.jpg"]
	});
	this.scorePanMaterial = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		map: $$.global.RESOURCE.textures["texture/scorePan.jpg"]
	});
	this.tubeRadius = 1.75;
	this.tubeMaterial = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide,
		map: $$.global.RESOURCE.textures["texture/stone.jpg"]
	});
	this.pointsOut = [
		new THREE.Vector3(this.panRadius * Math.sqrt(3) / 2, 0, this.panRadius / 4),
		new THREE.Vector3(-this.panRadius * Math.sqrt(3) / 2, 0, this.panRadius / 4),
		new THREE.Vector3(this.panRadius * Math.sqrt(3) / 2, 0, -this.panRadius / 4),
		new THREE.Vector3(-this.panRadius * Math.sqrt(3) / 2, 0, -this.panRadius / 4)
	];
	this.pointsIn = [
		new THREE.Vector3(this.panRadius * this.inRate * Math.sqrt(3) / 2, 0, this.panRadius / 4),
		new THREE.Vector3(-this.panRadius * this.inRate * Math.sqrt(3) / 2, 0, this.panRadius / 4),
		new THREE.Vector3(this.panRadius * this.inRate * Math.sqrt(3) / 2, 0, -this.panRadius / 4),
		new THREE.Vector3(-this.panRadius * this.inRate * Math.sqrt(3) / 2, 0, -this.panRadius / 4),
	];
	var m = new THREE.Matrix4();
	m.set(Math.cos(Math.PI / 3), 0, -Math.sin(Math.PI / 3), 0,
		0, 1, 0, 0,
		Math.sin(Math.PI / 3), 0, Math.cos(Math.PI / 3), 0,
		0, 0, 0, 1);
	this.pointsOut.push(this.pointsOut[0].clone().applyMatrix4(m));
	this.pointsOut.push(this.pointsOut[1].clone().applyMatrix4(m));
	this.pointsOut.push(this.pointsOut[2].clone().applyMatrix4(m));
	this.pointsOut.push(this.pointsOut[3].clone().applyMatrix4(m));
	this.pointsIn.push(this.pointsIn[0].clone().applyMatrix4(m));
	this.pointsIn.push(this.pointsIn[1].clone().applyMatrix4(m));
	this.pointsIn.push(this.pointsIn[2].clone().applyMatrix4(m));
	this.pointsIn.push(this.pointsIn[3].clone().applyMatrix4(m));
	this.pointsOut.push(this.pointsOut[4].clone().applyMatrix4(m));
	this.pointsOut.push(this.pointsOut[5].clone().applyMatrix4(m));
	this.pointsOut.push(this.pointsOut[6].clone().applyMatrix4(m));
	this.pointsOut.push(this.pointsOut[7].clone().applyMatrix4(m));
	this.pointsIn.push(this.pointsIn[4].clone().applyMatrix4(m));
	this.pointsIn.push(this.pointsIn[5].clone().applyMatrix4(m));
	this.pointsIn.push(this.pointsIn[6].clone().applyMatrix4(m));
	this.pointsIn.push(this.pointsIn[7].clone().applyMatrix4(m));
	var that = this;
	this.createCurvePan = function() {
		var group = new THREE.Group();
		var geometry = new THREE.CylinderBufferGeometry(that.panRadius, that.panRadius, that.panHeight, 6);
		var cylinder = new THREE.Mesh(geometry, that.panMaterial);
		group.add(cylinder);
		indexArr.sort(function() {
			return Math.random() - 0.5;
		});
		var arr = [];
		for(var i = 0; i < 12; i += 2) {
			arr.push(indexArr[i]);
			arr.push(indexArr[i + 1]);
			var curve = new THREE.CubicBezierCurve3(
				that.pointsOut[indexArr[i]],
				that.pointsIn[indexArr[i]],
				that.pointsIn[indexArr[i + 1]],
				that.pointsOut[indexArr[i + 1]]
			);
			var geometry = new THREE.TubeBufferGeometry(curve, 20, that.tubeRadius, 8, false);
			var mesh = new THREE.Mesh(geometry, that.tubeMaterial);
			mesh.position.y = that.panHeight / 2;
			mesh.isPenetrated = true;
			group.add(mesh);
		}
		var geometry = new THREE.TorusBufferGeometry(that.panRadius * 0.975, that.panRadius / 40, 4, 6);
		var torus = new THREE.Mesh(geometry, that.panMaterial);
		torus.position.y = that.panHeight / 2;
		torus.rotation.x = Math.PI / 2;
		torus.rotation.z = Math.PI / 6;
		torus.isPenetrated = true;
		group.add(torus);
		var obj = new CurvePan(group, arr);
		return obj;
	};
	this.createStonePan = function() {
		var group = new THREE.Group();
		var geometry = new THREE.CylinderBufferGeometry(that.panRadius, that.panRadius, that.stonePanHeight, 6);
		var cylinder = new THREE.Mesh(geometry, that.stonePanMaterial);
		group.add(cylinder);

		var geometry = new THREE.TorusBufferGeometry(that.panRadius * 0.9, that.panRadius / 10, 4, 6);
		var torus = new THREE.Mesh(geometry, that.stonePanMaterial);
		torus.position.y = that.stonePanHeight / 2;
		torus.rotation.x = Math.PI / 2;
		torus.rotation.z = Math.PI / 6;
		group.add(torus);
		var obj = new CurvePan(group, []);
		return obj;
	};
	this.createEmptyPan = function() {
		var group = new THREE.Group();
		var geometry = new THREE.CylinderBufferGeometry(that.panRadius, that.panRadius, that.panHeight / 2, 6);
		var cylinder = new THREE.Mesh(geometry, that.emptyPanMaterial);
		group.add(cylinder);
		cylinder.isPenetrated = true;
		var geometry = new THREE.TorusBufferGeometry(that.panRadius * 0.95, that.panRadius / 20, 4, 6);
		var torus = new THREE.Mesh(geometry, that.emptyPanMaterial);
		torus.position.y = that.stonePanHeight / 8;
		torus.rotation.x = Math.PI / 2;
		torus.rotation.z = Math.PI / 6;
		group.add(torus);
		var obj = new CurvePan(group, []);
		return obj;
	};
	this.createScorePan = function() {
		var group = new THREE.Group();
		var geometry = new THREE.CylinderBufferGeometry(that.panRadius, that.panRadius, that.stonePanHeight, 6);
		var cylinder = new THREE.Mesh(geometry, that.scorePanMaterial);
		group.add(cylinder);

		var geometry = new THREE.TorusBufferGeometry(that.panRadius * 0.9, that.panRadius / 10, 4, 6);
		var torus = new THREE.Mesh(geometry, that.scorePanMaterial);
		torus.position.y = that.stonePanHeight / 2;
		torus.rotation.x = Math.PI / 2;
		torus.rotation.z = Math.PI / 6;
		group.add(torus);
		var obj = new CurvePan(group, []);
		return obj;
	};
	//获取一个格子周围6个格子
	this.getAroundSixPan = function(i, j) {
		var arr = [];
		//奇数情况
		if(i % 2) {
			arr.push({
				i: i,
				j: j - 1
			});
			arr.push({
				i: i,
				j: j + 1
			});
			arr.push({
				i: i - 1,
				j: j
			});
			arr.push({
				i: i + 1,
				j: j
			});
			arr.push({
				i: i - 1,
				j: j + 1
			});
			arr.push({
				i: i - 1,
				j: j - 1
			});
		} else {
			arr.push({
				i: i,
				j: j - 1
			});
			arr.push({
				i: i,
				j: j + 1
			});
			arr.push({
				i: i - 1,
				j: j
			});
			arr.push({
				i: i + 1,
				j: j
			});
			arr.push({
				i: i - 1,
				j: j - 1
			});
			arr.push({
				i: i - 1,
				j: j + 1
			});
		}
		return arr;
	};
	this.setPositionByIJ = function(obj, i, j, theMap) {
		obj.i = i;
		obj.j = j;
		obj.position.x = (i - (theMap.length - 1) / 2) * (curvePanManager.panRadius + 0) * 1.732 + (j % 2) * (curvePanManager.panRadius + 1) * 1.732 / 2;
		obj.position.z = (j - (theMap[i].length - 1) / 2) * (curvePanManager.panRadius + 0) * (1.732 * 2 - 2);
	};
	this.addACurveInPan = function(pan, startPointIndex) {
		var i1, i2;
		if(startPointIndex % 2) {
			i1 = pan.pointIndexArr[startPointIndex];
			i2 = pan.pointIndexArr[startPointIndex - 1];
		} else {
			i1 = pan.pointIndexArr[startPointIndex];
			i2 = pan.pointIndexArr[startPointIndex + 1];
		}
		pan.firstPoint=i1;
		pan.secondPoint=i2;

		var curve = new THREE.CubicBezierCurve3(
			that.pointsOut[i1],
			that.pointsIn[i1],
			that.pointsIn[i2],
			that.pointsOut[i2]
		);
		var geometry = new THREE.TubeBufferGeometry(curve, 20, that.tubeRadius * 1.5, 8, false);
		var mesh = new THREE.Mesh(geometry, that.panCurveDeepMaterial);
		mesh.position.y = that.panHeight / 2;
		mesh.isPenetrated = true;
		pan.group.add(mesh);
	};
	
	this.getEndPoint=function(pan,startPointIndex){
		for(var i =0;i<12;i++){
			if(startPointIndex==pan.pointIndexArr[i]){
				startPointIndex=i;
				break;
			}
		}
		if(startPointIndex % 2) {
			return pan.pointIndexArr[startPointIndex - 1];
		} else {
			return pan.pointIndexArr[startPointIndex + 1];
		}
	};
	
	this.clockwisePan = function(pan, duration, func) {
		pan.group.rotateTimes--;
		if(duration) {
			var tween = new TWEEN.Tween(pan.group.rotation)
				.to({ y: pan.group.rotation.y - Math.PI / 3 }, duration)
				.easing(TWEEN.Easing.Exponential.InOut)
				.onComplete(function() {
					if(func) {
						func();
					}
				}).start();
		} else {
			pan.group.rotation.y -= Math.PI / 3;
			if(func) {
				func();
			}
		}
	};
	this.anticlockwisePan = function(pan, duration, func) {
		pan.group.rotateTimes++;
		if(duration) {
			var tween = new TWEEN.Tween(pan.group.rotation)
				.to({ y: pan.group.rotation.y + Math.PI / 3 }, duration)
				.easing(TWEEN.Easing.Exponential.InOut)
				.onComplete(function() {
					if(func) {
						func();
					}
				}).start();
		} else {
			pan.group.rotation.y += Math.PI / 3;
			if(func) {
				func();
			}
		}
	};
	this.createStartDot = function(i, j) {
		var dotIndex = Math.floor(Math.random() * 12);
	};
	//获取某个点的正对面的点的坐标，传入某个点在固定数组里的索引
	this.getOppositeIndex = function(id) {
		if(id % 2) {
			return id - 1;
		} else {
			return id + 1;
		}
	};
	//获取某个pan上的一个点指向的方向
	this.pointToDirection = function(rotate, index) {
		//pan是group，里面有i和j代表在map里的索引
		var direction = 0;
		if(index == 1 || index == 3) {
			direction = 0;
		} else if(index == 0 || index == 2) {
			direction = 3;
		} else if(index == 4 || index == 6) {
			direction = 2;
		} else if(index == 5 || index == 7) {
			direction = 5;
		} else if(index == 8 || index == 10) {
			direction = 1;
		} else if(index == 9 || index == 11) {
			direction = 4;
		}
		direction += rotate;
		while(direction < 0) {
			direction += 6;
		}
		direction = direction % 6;
		return direction;
	};
	//左点还是右点
	this.isLeftPoint = function(index) {
		if(index == 0 || index == 3 || index == 4 || index == 7 || index == 8 || index == 11) {
			return false;
		} else {
			return true;
		}
	};
	//获取direction对应的反向direction
	this.getOppositeDirection = function(direction) {
		if(direction == 0) {
			return 3;
		}
		if(direction == 1) {
			return 4;
		}
		if(direction == 2) {
			return 5;
		}
		if(direction == 3) {
			return 0;
		}
		if(direction == 4) {
			return 1;
		}
		if(direction == 5) {
			return 2;
		}
	}
	//从1个pan连到另一个pan的路径的曲线4点（返回固定点的索引）
	this.formPanToPanIndex = function(pan1, index, pan2) {
		var isPanLeft = this.isLeftPoint(index);
		var direction = this.pointToDirection(pan1.group.rotate, index);
		var direction2 = this.getOppositeDirection(direction);
		var isPanLeft2 = !isPanLeft;
		for(var i = 0; i < 12; i++) {
			if(this.isLeftPoint(i) == isPanLeft2) {
				if(this.pointToDirection(pan2.group.rotateTimes, i) == direction2) {
					var id = i;
					return id;
				}
			} else {
				continue;
			}
		}
	};

	//方向转i,j索引
	this.directionToIJ = function(pan, direction) {
		if(direction == 0) {
			return {
				i: pan.i - 1,
				j: pan.j
			}
		} else if(direction == 1) {
			if(pan.i % 2) {
				return {
					i: pan.i,
					j: pan.j + 1
				}
			} else {
				return {
					i: pan.i - 1,
					j: pan.j + 1
				}
			}
		} else if(direction == 2) {
			if(pan.i % 2) {
				return {
					i: pan.i + 1,
					j: pan.j + 1
				}
			} else {
				return {
					i: pan.i,
					j: pan.j + 1
				}
			}
		} else if(direction == 3) {
			return {
				i: pan.i + 1,
				j: pan.j
			}
		} else if(direction == 4) {
			if(pan.i % 2) {
				return {
					i: pan.i + 1,
					j: pan.j - 1
				}
			} else {
				return {
					i: pan.i,
					j: pan.j - 1
				}
			}
		} else if(direction == 5) {
			if(pan.i % 2) {
				return {
					i: pan.i,
					j: pan.j - 1
				}
			} else {
				return {
					i: pan.i - 1,
					j: pan.j - 1
				}
			}
		}
	}
}

var CurvePan = function(group, arr) {
	this.group = group;
	this.pointIndexArr = arr;
	this.group.rotateTimes = 0;
	this.group.owner = this;
	//传入固定点数组的索引

}