//九宫格对齐方式：
//1 2 3
//4 5 6
//7 8 9
$$.Component = {
	drawTextImage: function(str, options) {
		var optionDefault = {
			fontSize: 30,
			fontFamily: "Courier New",
			color: "white",
			textAlign: 5, //九宫格对齐方式，5是居中
			backgroundColor: "red",
			//			backgroundImage:"",
			width: 1,
			height: 1,
			lineHeight: 30,
			x: 0,
			y: 0
		};
		var strArr = str.split("\n");

		var maxLength = 0;
		for(var i in strArr) {
			if(maxLength < strArr[i].length) {
				maxLength = strArr[i].length;
			}
		}
		var optionstmp = $$.extends({}, [optionDefault, options]);

		if(!options.width) {
			while(optionstmp.width < maxLength * optionstmp.fontSize) {
				optionstmp.width *= 2;
			}
		}
		if(!options.height) {
			var tmpheight = strArr.length * optionstmp.lineHeight;
			while(optionstmp.height < tmpheight) {
				optionstmp.height *= 2;
			}
		}

		var canvas = document.createElement("canvas");
		canvas.width = optionstmp.width;
		canvas.height = optionstmp.height;
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = optionstmp.backgroundColor;
		ctx.fillRect(0, 0, optionstmp.width, optionstmp.height);
		ctx.font = optionstmp.fontSize + "px " + optionstmp.fontFamily;
		ctx.fillStyle = optionstmp.color;

		var x = 0,
			y = 0;

		for(var i in strArr) {
			ctx.fillText(strArr[i], optionstmp.x, optionstmp.y + (optionstmp.lineHeight * i + optionstmp.lineHeight));
		}
		return canvas;
	},

	//创建计时器，计时器的总时间，间隔触发事件时间
	Timer: function(options) {
		var defaultOptions = {
			id: "",
			life: 1000,
			duration: 1000,
			onStart: function() {
				console.log("timer start");
			},
			onRepeat: function() {
				console.log("repeat");
			},
			onEnd: function() {
				console.log("timer end");
			}
		};
		this.options = $$.extends({}, [defaultOptions, options]);
		this.id = options.id;
		this.life = options.life;
		this.duration = options.duration;
		this.onStart = options.onStart || function() {
			console.log("timer start");
		};
		this.onRepeat = options.onRepeat||function() {
			console.log("timer repeat");
		};
		this.onEnd = options.onEnd||function() {
			console.log("timer end");
		};
		this.lastTime;
		this.nowTime;
		this.elapsedTime = 0;
		this.durationTmp = 0;
		this.start = function() {
			this.lastTime = this.nowTime = performance.now();
			this.onStart();
			$$.actionInjections.push(this.update);
		};
		let thisObj = this;
		this.update = function() {
			thisObj.lastTime = thisObj.nowTime;
			thisObj.nowTime = performance.now();
			thisObj.elapsedTime = thisObj.nowTime - thisObj.lastTime;
			thisObj.life -= thisObj.elapsedTime;

			if(thisObj.life <= 0) {
				thisObj.onEnd();
				for(var i in $$.actionInjections) {
					if(thisObj.update == $$.actionInjections[i]) {
						$$.actionInjections.splice(i, 1);
						break;
					}
				}
				return;
			}
			thisObj.durationTmp += thisObj.elapsedTime;
			if(thisObj.durationTmp >= thisObj.duration) {
				thisObj.durationTmp -= thisObj.duration;
				thisObj.onRepeat();
			}
		};
	},

	//创建子弹，它会直线前进，直到生命周期到了
	createBullet: function(mesh, options) {
		var position = $$.controls.getObject().position;
		var direction = $$.global.centerRaycaster.ray.direction;
		var defOpts = {
			speed: 3,
			life: 10000,
			position: new THREE.Vector3(position.x, position.y, position.z),
			direction: new THREE.Vector3(direction.x, direction.y, direction.z)
		};
		options = $$.extends({}, [defOpts, options]);
		mesh.lookAt(options.direction);
		mesh.position.x = options.position.x;
		mesh.position.y = options.position.y;
		mesh.position.z = options.position.z;
		mesh.lifeStart = new Date().getTime();
		mesh.life = options.life;
		$$.global.world.add(mesh);

		$$.actionInjections.push(function() {
			mesh.position.x += options.direction.x * options.speed;
			mesh.position.y += options.direction.y * options.speed;
			mesh.position.z += options.direction.z * options.speed;
			if(mesh.life <= new Date().getTime() - mesh.lifeStart) {
				$$.global.world.remove(mesh);
				for(var i in $$.actionInjections) {
					if($$.actionInjections[i] == arguments.callee) {
						$$.actionInjections.splice(i, 1);
					}
				}
			}
		});
	}
};