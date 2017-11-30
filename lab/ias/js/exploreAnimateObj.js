function createAnimationMesh(geometry, settings) {
	var textAnimationData = makeSplitGeometry(geometry, settings);
	var animationMesh = new AnimationMesh(textAnimationData, settings);
	return animationMesh;
}

function createManyAnimationMesh(geometryArr, offsetArr, settings) {
	var textAnimationData = makeSplitGeometryArr(geometryArr, offsetArr, settings);
	var animationMesh = new AnimationMesh(textAnimationData, settings);
	return animationMesh;
}

function createTextAnimationMesh(str, params, settings) {
	var textAnimationData = makeSplitTextGeometryArr(str,params, settings);
	var animationMesh = new AnimationMesh(textAnimationData, settings);
	return animationMesh;
}

function makeSplitTextGeometryArr(text, params,settings) {
	var matrix = new THREE.Matrix4();

	var scale = params.size / params.font.data.resolution;
	var offset = 0;

	var data = {
		geometry: new THREE.Geometry(),
		info: []
	};
	var faceOffset = 0;

	for(var i = 0; i < text.length; i++) {
		var char = text[i];
		var glyph = params.font.data.glyphs[char];
		var charGeometry = new THREE.TextGeometry(char, params);

		data.info[i] = {};

		// compute and store char bounding box
		charGeometry.computeBoundingBox();
		data.info[i].boundingBox = charGeometry.boundingBox.clone();

		// translate char based on font data
		matrix.identity().makeTranslation(offset, 0, 0);
		charGeometry.applyMatrix(matrix);

		data.info[i].glyphOffset = {x:offset,y:0,z:0};
		offset += glyph.ha * scale;

		// store face index offsets
//		THREE.BAS.Utils.tessellate(charGeometry, 1.0);
		THREE.BAS.Utils.separateFaces(charGeometry);
		data.info[i].faceCount = charGeometry.faces.length;
		data.info[i].faceOffset = faceOffset;

		faceOffset += charGeometry.faces.length;

		// colors!
		data.info[i].color = new THREE.Color();
		data.info[i].color.setHSL(i / (text.length - 1), 1.0, 0.5);

		// merge char geometry into text geometry
		data.geometry.merge(charGeometry);
	}

	data.geometry.computeBoundingBox();

	return data;
}

function makeSplitGeometryArr(geometryArr, offsetArr) {
	if(!offsetArr) {
		offsetArr = [];
	}
	var matrix = new THREE.Matrix4();

	var scale = 1;

	var data = {
		geometry: new THREE.Geometry(),
		info: []
	};
	var faceOffset = 0;

	for(var i = 0; i < geometryArr.length; i++) {
		var geometry = geometryArr[i];

		data.info[i] = {};

		// compute and store char bounding box
		geometry.computeBoundingBox();
		data.info[i].boundingBox = geometry.boundingBox.clone();

		// translate char based on font data

		var offest = $$.extends({}, [{
			x: 0,
			y: 0,
			z: 0
		}, offsetArr[i]]);
		matrix.identity().makeTranslation(offest.x || 0, offest.y || 0, offest.z || 0);
		geometry.applyMatrix(matrix);

		data.info[i].glyphOffset = offest;

		// store face index offsets
//		if(settings&&settings.tessellate) {
			THREE.BAS.Utils.tessellate(geometry, 1.0);
//		}
		THREE.BAS.Utils.separateFaces(geometry);
		data.info[i].faceCount = geometry.faces.length;
		data.info[i].faceOffset = faceOffset;

		faceOffset += geometry.faces.length;

		// merge char geometry into text geometry
		data.geometry.merge(geometry);
	}

	data.geometry.computeBoundingBox();

	return data;
}

function AnimationMesh(data, settings) {
	settings = $$.extends({}, [{
		timeOffset: 0,
		minDuration: 1.0,
		maxDuration: 2.0,
		axisX: 2.0,
		axisY: 2.0,
		axisZ: 2.0,
		minAngle: 4.0,
		maxAngle: 8.0,
		minX: 1.0,
		maxX: 8.0,
		minY: 1.0,
		maxY: 8.0,
		minZ: 1.0,
		maxZ: 8.0,
		tessellate: false
	}, settings])

	var geometry = data.geometry;

	var bufferGeometry = new AnimationGeometry(geometry);

	var aAnimation = bufferGeometry.createAttribute('aAnimation', 2);
	var aStartPosition = bufferGeometry.createAttribute('aStartPosition', 3);
	var aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
	var aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);

	var minDuration = settings.minDuration;
	var maxDuration = settings.maxDuration;

	this.animationDuration = maxDuration + data.info.length * settings.timeOffset;

	var axis = new THREE.Vector3();
	var angle;

	var glyphSize = new THREE.Vector3();
	var glyphCenter = new THREE.Vector3();
	var centroidLocal = new THREE.Vector3();
	var delta = new THREE.Vector3();
	for(var f = 0; f < data.info.length; f++) {
		bufferChar(data.info[f], f);
	}

	function bufferChar(info, index) {
		var s = info.faceOffset;
		var l = info.faceOffset + info.faceCount;
		var box = info.boundingBox;
		var glyphOffset = info.glyphOffset;

		box.getSize(glyphSize);
		box.getCenter(glyphCenter);

		var i, i2, i3, i4, v;

		var delay = index * settings.timeOffset;

		for(i = s, i2 = s * 6, i3 = s * 9, i4 = s * 12; i < l; i++, i2 += 6, i3 += 9, i4 += 12) {

			var face = geometry.faces[i];
			var centroid = THREE.BAS.Utils.computeCentroid(geometry, face);

			// animation

			var duration = THREE.Math.randFloat(minDuration, maxDuration);

			for(v = 0; v < 6; v += 2) {
				aAnimation.array[i2 + v] = delay;
				aAnimation.array[i2 + v + 1] = duration;
			}

			// start position (centroid)
			for(v = 0; v < 9; v += 3) {
				aStartPosition.array[i3 + v] = centroid.x;
				aStartPosition.array[i3 + v + 1] = centroid.y;
				aStartPosition.array[i3 + v + 2] = centroid.z;
			}

			// end position
			centroidLocal.copy(centroid);
			centroidLocal.x -= glyphOffset.x;
			centroidLocal.y -= glyphOffset.y;
			centroidLocal.z -= glyphOffset.z;
			delta.subVectors(centroidLocal, glyphCenter);

			//			delta.y += THREE.Math.randFloatSpread(100.0);

			var x = delta.x * THREE.Math.randFloat(settings.minX, settings.maxX);
			var y = delta.y * THREE.Math.randFloat(settings.minY, settings.maxY);
			var z = delta.z * THREE.Math.randFloat(settings.minZ, settings.maxZ);

			for(v = 0; v < 9; v += 3) {
				aEndPosition.array[i3 + v] = centroid.x + x;
				aEndPosition.array[i3 + v + 1] = centroid.y + y;
				aEndPosition.array[i3 + v + 2] = centroid.z + z;
			}

			// axis angle
			axis.x = THREE.Math.randFloatSpread(settings.axisX);
			axis.y = THREE.Math.randFloatSpread(settings.axisY);
			axis.z = THREE.Math.randFloatSpread(settings.axisZ);
			axis.normalize();
			angle = Math.PI * THREE.Math.randFloat(settings.minAngle, settings.maxAngle);

			for(v = 0; v < 12; v += 4) {
				aAxisAngle.array[i4 + v] = axis.x;
				aAxisAngle.array[i4 + v + 1] = axis.y;
				aAxisAngle.array[i4 + v + 2] = axis.z;
				aAxisAngle.array[i4 + v + 3] = angle;
			}
		}
	}
	var material = new THREE.BAS.PhongAnimationMaterial({
		shading: THREE.FlatShading,
		side: THREE.DoubleSide,
		transparent: true,
		uniforms: {
			uTime: {
				type: 'f',
				value: 0
			}
		},
		shaderFunctions: [
			THREE.BAS.ShaderChunk['cubic_bezier'],
			THREE.BAS.ShaderChunk['ease_out_cubic'],
			THREE.BAS.ShaderChunk['quaternion_rotation']
		],
		shaderParameters: [
			'uniform float uTime;',
			'uniform vec3 uAxis;',
			'uniform float uAngle;',
			'attribute vec2 aAnimation;',
			'attribute vec3 aStartPosition;',
			'attribute vec3 aEndPosition;',
			'attribute vec4 aAxisAngle;'
		],
		shaderVertexInit: [
			'float tDelay = aAnimation.x;',
			'float tDuration = aAnimation.y;',
			'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
			//'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
			'float tProgress = tTime / tDuration;'
		],
		shaderTransformPosition: [
			// scale
			'transformed *= 1.0 - tProgress;',

			// rotate
			'float angle = aAxisAngle.w * tProgress;',
			'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);',
			'transformed = rotateVector(tQuat, transformed);',

			// translate
			'transformed += mix(aStartPosition, aEndPosition, tProgress);'
		]
	}, {
		//		map:texture
		//		diffuse: 0x444444,
		//		specular: 0xcccccc,
		//		shininess: 4,
		//		emissive: 0x444444
	});

	THREE.Mesh.call(this, bufferGeometry, material);

	this.frustumCulled = false;
}
AnimationMesh.prototype = Object.create(THREE.Mesh.prototype);
AnimationMesh.prototype.constructor = AnimationMesh;
Object.defineProperty(AnimationMesh.prototype, 'time', {
	get: function() {
		return this.material.uniforms['uTime'].value;
	},
	set: function(v) {
		this.material.uniforms['uTime'].value = v;
	}
});

function makeSplitGeometry(geometry) {
	var matrix = new THREE.Matrix4();

	var data = {
		geometry: new THREE.Geometry(),
		info: []
	};
	var faceOffset = 0;

	data.info[0] = {};

	// compute and store char bounding box
	geometry.computeBoundingBox();
	data.info[0].boundingBox = geometry.boundingBox.clone();

	// translate char based on font data
	matrix.identity().makeTranslation(0, 0, 0);
	geometry.applyMatrix(matrix);

	data.info[0].glyphOffset = {x:0,y:0,z:0};

	// store face index offsets
//	if(settings.tessellate) {
		THREE.BAS.Utils.tessellate(geometry, 1.0);
//	}
	THREE.BAS.Utils.separateFaces(geometry);
	data.info[0].faceCount = geometry.faces.length;
	data.info[0].faceOffset = faceOffset;

	faceOffset += geometry.faces.length;

	data.geometry.merge(geometry);

	data.geometry.computeBoundingBox();

	return data;
}

function AnimationGeometry(model) {
	THREE.BAS.ModelBufferGeometry.call(this, model);
}
AnimationGeometry.prototype = Object.create(THREE.BAS.ModelBufferGeometry.prototype);
AnimationGeometry.prototype.constructor = AnimationGeometry;
AnimationGeometry.prototype.bufferPositions = function() {
	var positionBuffer = this.createAttribute('position', 3).array;

	for(var i = 0; i < this.faceCount; i++) {
		var face = this.modelGeometry.faces[i];
		var centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);

		var a = this.modelGeometry.vertices[face.a];
		var b = this.modelGeometry.vertices[face.b];
		var c = this.modelGeometry.vertices[face.c];

		positionBuffer[face.a * 3] = a.x - centroid.x;
		positionBuffer[face.a * 3 + 1] = a.y - centroid.y;
		positionBuffer[face.a * 3 + 2] = a.z - centroid.z;

		positionBuffer[face.b * 3] = b.x - centroid.x;
		positionBuffer[face.b * 3 + 1] = b.y - centroid.y;
		positionBuffer[face.b * 3 + 2] = b.z - centroid.z;

		positionBuffer[face.c * 3] = c.x - centroid.x;
		positionBuffer[face.c * 3 + 1] = c.y - centroid.y;
		positionBuffer[face.c * 3 + 2] = c.z - centroid.z;
	}
};