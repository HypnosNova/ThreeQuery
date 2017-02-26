$$.Move = {
	Linear: function(obj, speedRate, targetPosition) {
		this.obj = obj;
		this.speedRate = speedRate;
		this.targetPosition = targetPosition;

		this.direction = {
			x: this.targetPosition.x - this.obj.position.x,
			y: this.targetPosition.y - this.obj.position.y,
			z: this.targetPosition.z - this.obj.position.z,
		};

		var uvec = $$.unitVector(this.direction);
		this.speed = {
			x: uvec.x * speedRate,
			y: uvec.y * speedRate,
			z: uvec.z * speedRate,
		};

		this.update = function() {
			var owner = arguments.callee.owner;
			owner.direction = {
				x: owner.targetPosition.x - owner.obj.position.x,
				y: owner.targetPosition.y - owner.obj.position.y,
				z: owner.targetPosition.z - owner.obj.position.z,
			};
			var dLen = vecLength(owner.direction);
			if(dLen < owner.speedRate) {
				owner.obj.position.x = owner.targetPosition.x;
				owner.obj.position.y = owner.targetPosition.y;
				owner.obj.position.z = owner.targetPosition.z;
				owner.destroy();
			} else {
				owner.obj.position.x += owner.speed.x;
				owner.obj.position.y += owner.speed.y;
				owner.obj.position.z += owner.speed.z;
			}
		};
		this.update.owner = this;
		this.destroy = function() {
			for(var i = 0; i < $$.actionInjections.length; i++) {

				if($$.actionInjections[i] == this.update) {
					$$.actionInjections.splice(i, 1);
					break;
				}
			}
		};
	},
	Surround: function(mother, child, speedRate, vVect) {
		this.angle = 0;
		this.speedRate = speedRate;
		this.mother = mother;
		this.child = child;
		this.vVect = vVect;
		this.radius = $$.vecLength({
			x: this.child.position.x - this.mother.position.x,
			y: this.child.position.y - this.mother.position.y,
			z: this.child.position.z - this.mother.position.z
		});
		this.update = function() {
			var childToMotherVec = {
				x: this.child.position.x - this.mother.position.x,
				y: this.child.position.y - this.mother.position.y,
				z: this.child.position.z - this.mother.position.z
			};
			var modVec1 = $$.vecLength(childToMotherVec);
			childToMotherVec.x = childToMotherVec.x * this.radius / modVec1;
			childToMotherVec.y = childToMotherVec.y * this.radius / modVec1;
			childToMotherVec.z = childToMotherVec.z * this.radius / modVec1;

			var speedVec = $$.crossMulti(childToMotherVec, vVect);
			var modSpeedVec = $$.vecLength(speedVec);
			speedVec.x = speedVec.x * speedRate / modSpeedVec;
			speedVec.y = speedVec.y * speedRate / modSpeedVec;
			speedVec.z = speedVec.z * speedRate / modSpeedVec;

			child.position.x += speedVec.x;
			child.position.y += speedVec.y;
			child.position.z += speedVec.z;

			var vec2 = {
				x: this.child.position.x - this.mother.position.x,
				y: this.child.position.y - this.mother.position.y,
				z: this.child.position.z - this.mother.position.z
			};

			var modVec2 = $$.vecLength(vec2);
			vec2.x = vec2.x * this.radius / modVec2;
			vec2.y = vec2.y * this.radius / modVec2;
			vec2.z = vec2.z * this.radius / modVec2;
			this.child.position.x = this.mother.position.x + vec2.x;
			this.child.position.y = this.mother.position.y + vec2.y;
			this.child.position.z = this.mother.position.z + vec2.z;
		};
		this.destroy = function() {
			for(var i = 0; i < $$.actionInjections.length; i++) {
				if($$.actionInjections[i] == this.update) {
					$$.actionInjections.splice(i, 1);
					break;
				}
			}
		};
	},
	RelateToCamera:function(obj,isFaceToCamera,world){
		if(!world){
			this.camera=$$.global.camera;
		}else{
			this.camera=world.camera;
		}
		this.obj=obj;
		this.isFaceToCamera=isFaceToCamera;
		this.absVec={
			x:obj.position.x-this.camera.position.x,
			y:obj.position.y-this.camera.position.y,
			z:obj.position.z-this.camera.position.z
		};
		this.update=function(){
			this.obj.position.x=this.camera.position.x+this.absVec.x;
			this.obj.position.y=this.camera.position.y+this.absVec.y;
			this.obj.position.z=this.camera.position.z+this.absVec.z;
			if(isFaceToCamera){
				this.obj.lookAt(this.camera.position);
			}
		};
		this.destroy = function() {
			for(var i = 0; i < $$.actionInjections.length; i++) {
				if($$.actionInjections[i] == this.update) {
					$$.actionInjections.splice(i, 1);
					break;
				}
			}
		};
	}
};

$$.crossMulti = function(vec1, vec2) {
	var res = {
		x: 0,
		y: 0,
		z: 0
	};
	res.x = vec1.y * vec2.z - vec2.y * vec1.z;
	res.y = vec1.z * vec2.x - vec2.z * vec1.x;
	res.z = vec1.x * vec2.y - vec2.x * vec1.y;
	return res;
};

$$.vecLength = function(vec) {
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
};

$$.unitVector = function(vec) {
	var len = $$.vecLength(vec);
	vec.x /= len;
	vec.y /= len;
	vec.z /= len;
	return vec;
};