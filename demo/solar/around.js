function aroundSystem(mother, child, speedRate, vVect, showTrack) {
	this.angle = 0;
	this.speedRate = speedRate;
	this.mother = mother;
	this.child = child;
	this.vVect = vVect;
	this.radius = vecLength({
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
		var modVec1 = vecLength(childToMotherVec);
		childToMotherVec.x = childToMotherVec.x * this.radius / modVec1;
		childToMotherVec.y = childToMotherVec.y * this.radius / modVec1;
		childToMotherVec.z = childToMotherVec.z * this.radius / modVec1;
		
		var speedVec = crossMulti(childToMotherVec, vVect);
		var modSpeedVec = vecLength(speedVec);
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
		
		var modVec2 = vecLength(vec2);
		vec2.x = vec2.x * this.radius / modVec2;
		vec2.y = vec2.y * this.radius / modVec2;
		vec2.z = vec2.z * this.radius / modVec2;
		this.child.position.x = this.mother.position.x + vec2.x;
		this.child.position.y = this.mother.position.y + vec2.y;
		this.child.position.z = this.mother.position.z + vec2.z;
	}
}

function crossMulti(vec1, vec2) {
	var res = {
		x: 0,
		y: 0,
		z: 0
	};
	res.x = vec1.y * vec2.z - vec2.y * vec1.z;
	res.y = vec1.z * vec2.x - vec2.z * vec1.x;
	res.z = vec1.x * vec2.y - vec2.x * vec1.y;
	return res;
}

function vecLength(vec) {
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}