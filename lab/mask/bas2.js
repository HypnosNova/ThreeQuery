THREE.BAS = {}, THREE.BAS.ShaderChunk = {}, THREE.BAS.ShaderChunk.catmull_rom_spline = "vec4 catmullRomSpline(vec4 p0, vec4 p1, vec4 p2, vec4 p3, float t, vec2 c) {\n    vec4 v0 = (p2 - p0) * c.x;\n    vec4 v1 = (p3 - p1) * c.y;\n    float t2 = t * t;\n    float t3 = t * t * t;\n\n    return vec4((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n}\nvec4 catmullRomSpline(vec4 p0, vec4 p1, vec4 p2, vec4 p3, float t) {\n    return catmullRomSpline(p0, p1, p2, p3, t, vec2(0.5, 0.5));\n}\n\nvec3 catmullRomSpline(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t, vec2 c) {\n    vec3 v0 = (p2 - p0) * c.x;\n    vec3 v1 = (p3 - p1) * c.y;\n    float t2 = t * t;\n    float t3 = t * t * t;\n\n    return vec3((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n}\nvec3 catmullRomSpline(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t) {\n    return catmullRomSpline(p0, p1, p2, p3, t, vec2(0.5, 0.5));\n}\n\nvec2 catmullRomSpline(vec2 p0, vec2 p1, vec2 p2, vec2 p3, float t, vec2 c) {\n    vec2 v0 = (p2 - p0) * c.x;\n    vec2 v1 = (p3 - p1) * c.y;\n    float t2 = t * t;\n    float t3 = t * t * t;\n\n    return vec2((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n}\nvec2 catmullRomSpline(vec2 p0, vec2 p1, vec2 p2, vec2 p3, float t) {\n    return catmullRomSpline(p0, p1, p2, p3, t, vec2(0.5, 0.5));\n}\n\nfloat catmullRomSpline(float p0, float p1, float p2, float p3, float t, vec2 c) {\n    float v0 = (p2 - p0) * c.x;\n    float v1 = (p3 - p1) * c.y;\n    float t2 = t * t;\n    float t3 = t * t * t;\n\n    return float((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n}\nfloat catmullRomSpline(float p0, float p1, float p2, float p3, float t) {\n    return catmullRomSpline(p0, p1, p2, p3, t, vec2(0.5, 0.5));\n}\n\nivec4 getCatmullRomSplineIndices(float l, float p) {\n    float index = floor(p);\n    int i0 = int(max(0.0, index - 1.0));\n    int i1 = int(index);\n    int i2 = int(min(index + 1.0, l));\n    int i3 = int(min(index + 2.0, l));\n\n    return ivec4(i0, i1, i2, i3);\n}\n\nivec4 getCatmullRomSplineIndicesClosed(float l, float p) {\n    float index = floor(p);\n    int i0 = int(index == 0.0 ? l : index - 1.0);\n    int i1 = int(index);\n    int i2 = int(mod(index + 1.0, l));\n    int i3 = int(mod(index + 2.0, l));\n\n    return ivec4(i0, i1, i2, i3);\n}\n", THREE.BAS.ShaderChunk.cubic_bezier = "vec3 cubicBezier(vec3 p0, vec3 c0, vec3 c1, vec3 p1, float t) {\n    float tn = 1.0 - t;\n\n    return tn * tn * tn * p0 + 3.0 * tn * tn * t * c0 + 3.0 * tn * t * t * c1 + t * t * t * p1;\n}\n\nvec2 cubicBezier(vec2 p0, vec2 c0, vec2 c1, vec2 p1, float t) {\n    float tn = 1.0 - t;\n\n    return tn * tn * tn * p0 + 3.0 * tn * tn * t * c0 + 3.0 * tn * t * t * c1 + t * t * t * p1;\n}\n", THREE.BAS.ShaderChunk.ease_back_in = "float easeBackIn(float p, float amplitude) {\n    return p * p * ((amplitude + 1.0) * p - amplitude);\n}\n\nfloat easeBackIn(float p) {\n    return easeBackIn(p, 1.70158);\n}\n\nfloat easeBackIn(float t, float b, float c, float d, float amplitude) {\n    return b + easeBackIn(t / d, amplitude) * c;\n}\n\nfloat easeBackIn(float t, float b, float c, float d) {\n    return b + easeBackIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_back_in_out = "float easeBackInOut(float p, float amplitude) {\n    amplitude *= 1.525;\n\n    return ((p *= 2.0) < 1.0) ? 0.5 * p * p * ((amplitude + 1.0) * p - amplitude) : 0.5 * ((p -= 2.0) * p * ((amplitude + 1.0) * p + amplitude) + 2.0);\n}\n\nfloat easeBackInOut(float p) {\n    return easeBackInOut(p, 1.70158);\n}\n\nfloat easeBackInOut(float t, float b, float c, float d, float amplitude) {\n    return b + easeBackInOut(t / d, amplitude) * c;\n}\n\nfloat easeBackInOut(float t, float b, float c, float d) {\n    return b + easeBackInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_back_out = "float easeBackOut(float p, float amplitude) {\n    return ((p = p - 1.0) * p * ((amplitude + 1.0) * p + amplitude) + 1.0);\n}\n\nfloat easeBackOut(float p) {\n    return easeBackOut(p, 1.70158);\n}\n\nfloat easeBackOut(float t, float b, float c, float d, float amplitude) {\n    return b + easeBackOut(t / d, amplitude) * c;\n}\n\nfloat easeBackOut(float t, float b, float c, float d) {\n    return b + easeBackOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_bezier = "float easeBezier(float p, vec4 curve) {\n    float ip = 1.0 - p;\n    return (3.0 * ip * ip * p * curve.xy + 3.0 * ip * p * p * curve.zw + p * p * p).y;\n}\n\nfloat easeBezier(float t, float b, float c, float d, vec4 curve) {\n    return b + easeBezier(t / d, curve) * c;\n}\n", THREE.BAS.ShaderChunk.ease_bounce_in = "float easeBounceIn(float p) {\n    if ((p = 1.0 - p) < 1.0 / 2.75) {\n        return 1.0 - (7.5625 * p * p);\n    } else if (p < 2.0 / 2.75) {\n        return 1.0 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);\n    } else if (p < 2.5 / 2.75) {\n        return 1.0 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);\n    }\n    return 1.0 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);\n}\n\nfloat easeBounceIn(float t, float b, float c, float d) {\n    return b + easeBounceIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_bounce_in_out = "float easeBounceInOut(float p) {\n    bool invert = (p < 0.5);\n\n    p = invert ? (1.0 - (p * 2.0)) : ((p * 2.0) - 1.0);\n\n    if (p < 1.0 / 2.75) {\n        p = 7.5625 * p * p;\n    } else if (p < 2.0 / 2.75) {\n        p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;\n    } else if (p < 2.5 / 2.75) {\n        p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;\n    } else {\n        p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;\n    }\n\n    return invert ? (1.0 - p) * 0.5 : p * 0.5 + 0.5;\n}\n\nfloat easeBounceInOut(float t, float b, float c, float d) {\n    return b + easeBounceInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_bounce_out = "float easeBounceOut(float p) {\n    if (p < 1.0 / 2.75) {\n        return 7.5625 * p * p;\n    } else if (p < 2.0 / 2.75) {\n        return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;\n    } else if (p < 2.5 / 2.75) {\n        return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;\n    }\n    return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;\n}\n\nfloat easeBounceOut(float t, float b, float c, float d) {\n    return b + easeBounceOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_circ_in = "float easeCircIn(float p) {\n    return -(sqrt(1.0 - p * p) - 1.0);\n}\n\nfloat easeCircIn(float t, float b, float c, float d) {\n    return b + easeCircIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_circ_in_out = "float easeCircInOut(float p) {\n    return ((p *= 2.0) < 1.0) ? -0.5 * (sqrt(1.0 - p * p) - 1.0) : 0.5 * (sqrt(1.0 - (p -= 2.0) * p) + 1.0);\n}\n\nfloat easeCircInOut(float t, float b, float c, float d) {\n    return b + easeCircInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_circ_out = "float easeCircOut(float p) {\n  return sqrt(1.0 - (p = p - 1.0) * p);\n}\n\nfloat easeCircOut(float t, float b, float c, float d) {\n  return b + easeCircOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_cubic_in = "float easeCubicIn(float t) {\n  return t * t * t;\n}\n\nfloat easeCubicIn(float t, float b, float c, float d) {\n  return b + easeCubicIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_cubic_in_out = "float easeCubicInOut(float t) {\n  return (t /= 0.5) < 1.0 ? 0.5 * t * t * t : 0.5 * ((t-=2.0) * t * t + 2.0);\n}\n\nfloat easeCubicInOut(float t, float b, float c, float d) {\n  return b + easeCubicInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_cubic_out = "float easeCubicOut(float t) {\n  float f = t - 1.0;\n  return f * f * f + 1.0;\n}\n\nfloat easeCubicOut(float t, float b, float c, float d) {\n  return b + easeCubicOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_elastic_in = "float easeElasticIn(float p, float amplitude, float period) {\n    float p1 = max(amplitude, 1.0);\n    float p2 = period / min(amplitude, 1.0);\n    float p3 = p2 / PI2 * (asin(1.0 / p1));\n\n    return -(p1 * pow(2.0, 10.0 * (p -= 1.0)) * sin((p - p3) * PI2 / p2));\n}\n\nfloat easeElasticIn(float p) {\n    return easeElasticIn(p, 1.0, 0.3);\n}\n\nfloat easeElasticIn(float t, float b, float c, float d, float amplitude, float period) {\n    return b + easeElasticIn(t / d, amplitude, period) * c;\n}\n\nfloat easeElasticIn(float t, float b, float c, float d) {\n    return b + easeElasticIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_elastic_in_out = "float easeElasticInOut(float p, float amplitude, float period) {\n    float p1 = max(amplitude, 1.0);\n    float p2 = period / min(amplitude, 1.0);\n    float p3 = p2 / PI2 * (asin(1.0 / p1));\n\n    return ((p *= 2.0) < 1.0) ? -0.5 * (p1 * pow(2.0, 10.0 * (p -= 1.0)) * sin((p - p3) * PI2 / p2)) : p1 * pow(2.0, -10.0 * (p -= 1.0)) * sin((p - p3) * PI2 / p2) * 0.5 + 1.0;\n}\n\nfloat easeElasticInOut(float p) {\n    return easeElasticInOut(p, 1.0, 0.3);\n}\n\nfloat easeElasticInOut(float t, float b, float c, float d, float amplitude, float period) {\n    return b + easeElasticInOut(t / d, amplitude, period) * c;\n}\n\nfloat easeElasticInOut(float t, float b, float c, float d) {\n    return b + easeElasticInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_elastic_out = "float easeElasticOut(float p, float amplitude, float period) {\n    float p1 = max(amplitude, 1.0);\n    float p2 = period / min(amplitude, 1.0);\n    float p3 = p2 / PI2 * (asin(1.0 / p1));\n\n    return p1 * pow(2.0, -10.0 * p) * sin((p - p3) * PI2 / p2) + 1.0;\n}\n\nfloat easeElasticOut(float p) {\n    return easeElasticOut(p, 1.0, 0.3);\n}\n\nfloat easeElasticOut(float t, float b, float c, float d, float amplitude, float period) {\n    return b + easeElasticOut(t / d, amplitude, period) * c;\n}\n\nfloat easeElasticOut(float t, float b, float c, float d) {\n    return b + easeElasticOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_expo_in = "float easeExpoIn(float p) {\n    return pow(2.0, 10.0 * (p - 1.0));\n}\n\nfloat easeExpoIn(float t, float b, float c, float d) {\n    return b + easeExpoIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_expo_in_out = "float easeExpoInOut(float p) {\n    return ((p *= 2.0) < 1.0) ? 0.5 * pow(2.0, 10.0 * (p - 1.0)) : 0.5 * (2.0 - pow(2.0, -10.0 * (p - 1.0)));\n}\n\nfloat easeExpoInOut(float t, float b, float c, float d) {\n    return b + easeExpoInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_expo_out = "float easeExpoOut(float p) {\n  return 1.0 - pow(2.0, -10.0 * p);\n}\n\nfloat easeExpoOut(float t, float b, float c, float d) {\n  return b + easeExpoOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quad_in = "float easeQuadIn(float t) {\n    return t * t;\n}\n\nfloat easeQuadIn(float t, float b, float c, float d) {\n  return b + easeQuadIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quad_in_out = "float easeQuadInOut(float t) {\n    float p = 2.0 * t * t;\n    return t < 0.5 ? p : -p + (4.0 * t) - 1.0;\n}\n\nfloat easeQuadInOut(float t, float b, float c, float d) {\n    return b + easeQuadInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quad_out = "float easeQuadOut(float t) {\n  return -t * (t - 2.0);\n}\n\nfloat easeQuadOut(float t, float b, float c, float d) {\n  return b + easeQuadOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quart_in = "float easeQuartIn(float t) {\n  return t * t * t * t;\n}\n\nfloat easeQuartIn(float t, float b, float c, float d) {\n  return b + easeQuartIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quart_in_out = "float easeQuartInOut(float t) {\n    return t < 0.5 ? 8.0 * pow(t, 4.0) : -8.0 * pow(t - 1.0, 4.0) + 1.0;\n}\n\nfloat easeQuartInOut(float t, float b, float c, float d) {\n    return b + easeQuartInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quart_out = "float easeQuartOut(float t) {\n  return 1.0 - pow(1.0 - t, 4.0);\n}\n\nfloat easeQuartOut(float t, float b, float c, float d) {\n  return b + easeQuartOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quint_in = "float easeQuintIn(float t) {\n    return pow(t, 5.0);\n}\n\nfloat easeQuintIn(float t, float b, float c, float d) {\n    return b + easeQuintIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quint_in_out = "float easeQuintInOut(float t) {\n    return (t /= 0.5) < 1.0 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2.0) * t * t * t * t + 2.0);\n}\n\nfloat easeQuintInOut(float t, float b, float c, float d) {\n    return b + easeQuintInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_quint_out = "float easeQuintOut(float t) {\n    return (t -= 1.0) * t * t * t * t + 1.0;\n}\n\nfloat easeQuintOut(float t, float b, float c, float d) {\n    return b + easeQuintOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_sine_in = "float easeSineIn(float p) {\n  return -cos(p * 1.57079632679) + 1.0;\n}\n\nfloat easeSineIn(float t, float b, float c, float d) {\n  return b + easeSineIn(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_sine_in_out = "float easeSineInOut(float p) {\n  return -0.5 * (cos(PI * p) - 1.0);\n}\n\nfloat easeSineInOut(float t, float b, float c, float d) {\n  return b + easeSineInOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.ease_sine_out = "float easeSineOut(float p) {\n  return sin(p * 1.57079632679);\n}\n\nfloat easeSineOut(float t, float b, float c, float d) {\n  return b + easeSineOut(t / d) * c;\n}\n", THREE.BAS.ShaderChunk.quaternion_rotation = "vec3 rotateVector(vec4 q, vec3 v)\n{\n    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\nvec4 quatFromAxisAngle(vec3 axis, float angle)\n{\n    float halfAngle = angle * 0.5;\n    return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));\n}\n", THREE.BAS.Utils = {
	separateFaces: function(e) {
		for(var t = [], n = 0, a = e.faces.length; n < a; n++) {
			var r = t.length,
				i = e.faces[n],
				o = i.a,
				s = i.b,
				l = i.c,
				f = e.vertices[o],
				u = e.vertices[s],
				c = e.vertices[l];
			t.push(f.clone()), t.push(u.clone()), t.push(c.clone()), i.a = r, i.b = r + 1, i.c = r + 2
		}
		e.vertices = t
	},
	computeCentroid: function(e, t, n) {
		var a = e.vertices[t.a],
			r = e.vertices[t.b],
			i = e.vertices[t.c];
		return n = n || new THREE.Vector3, n.x = (a.x + r.x + i.x) / 3, n.y = (a.y + r.y + i.y) / 3, n.z = (a.z + r.z + i.z) / 3, n
	},
	randomInBox: function(e, t) {
		return t = t || new THREE.Vector3, t.x = THREE.Math.randFloat(e.min.x, e.max.x), t.y = THREE.Math.randFloat(e.min.y, e.max.y), t.z = THREE.Math.randFloat(e.min.z, e.max.z), t
	},
	randomAxis: function(e) {
		return e = e || new THREE.Vector3, e.x = THREE.Math.randFloatSpread(2), e.y = THREE.Math.randFloatSpread(2), e.z = THREE.Math.randFloatSpread(2), e.normalize(), e
	},
	createDepthAnimationMaterial: function(e) {
		return new THREE.BAS.DepthAnimationMaterial({
			uniforms: e.uniforms,
			vertexFunctions: e.vertexFunctions,
			vertexParameters: e.vertexParameters,
			vertexInit: e.vertexInit,
			vertexPosition: e.vertexPosition
		})
	},
	createDistanceAnimationMaterial: function(e) {
		return new THREE.BAS.DistanceAnimationMaterial({
			uniforms: e.uniforms,
			vertexFunctions: e.vertexFunctions,
			vertexParameters: e.vertexParameters,
			vertexInit: e.vertexInit,
			vertexPosition: e.vertexPosition
		})
	}
}, THREE.BAS.ModelBufferGeometry = function(e, t) {
	THREE.BufferGeometry.call(this), this.modelGeometry = e, this.faceCount = this.modelGeometry.faces.length, this.vertexCount = this.modelGeometry.vertices.length, t = t || {}, t.computeCentroids && this.computeCentroids(), this.bufferIndices(), this.bufferPositions(t.localizeFaces)
}, THREE.BAS.ModelBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype), THREE.BAS.ModelBufferGeometry.prototype.constructor = THREE.BAS.ModelBufferGeometry, THREE.BAS.ModelBufferGeometry.prototype.computeCentroids = function() {
	this.centroids = [];
	for(var e = 0; e < this.faceCount; e++) this.centroids[e] = THREE.BAS.Utils.computeCentroid(this.modelGeometry, this.modelGeometry.faces[e])
}, THREE.BAS.ModelBufferGeometry.prototype.bufferIndices = function() {
	var e = new Uint32Array(3 * this.faceCount);
	this.setIndex(new THREE.BufferAttribute(e, 1));
	for(var t = 0, n = 0; t < this.faceCount; t++, n += 3) {
		var a = this.modelGeometry.faces[t];
		e[n] = a.a, e[n + 1] = a.b, e[n + 2] = a.c
	}
}, THREE.BAS.ModelBufferGeometry.prototype.bufferPositions = function(e) {
	var t, n, a = this.createAttribute("position", 3).array;
	if(e === !0)
		for(t = 0; t < this.faceCount; t++) {
			var r = this.modelGeometry.faces[t],
				i = this.centroids ? this.centroids[t] : THREE.BAS.Utils.computeCentroid(this.modelGeometry, r),
				o = this.modelGeometry.vertices[r.a],
				s = this.modelGeometry.vertices[r.b],
				l = this.modelGeometry.vertices[r.c];
			a[3 * r.a] = o.x - i.x, a[3 * r.a + 1] = o.y - i.y, a[3 * r.a + 2] = o.z - i.z, a[3 * r.b] = s.x - i.x, a[3 * r.b + 1] = s.y - i.y, a[3 * r.b + 2] = s.z - i.z, a[3 * r.c] = l.x - i.x, a[3 * r.c + 1] = l.y - i.y, a[3 * r.c + 2] = l.z - i.z
		} else
			for(t = 0, n = 0; t < this.vertexCount; t++, n += 3) {
				var f = this.modelGeometry.vertices[t];
				a[n] = f.x, a[n + 1] = f.y, a[n + 2] = f.z
			}
}, THREE.BAS.ModelBufferGeometry.prototype.bufferUVs = function() {
	for(var e = this.createAttribute("uv", 2).array, t = 0; t < this.faceCount; t++) {
		var n, a = this.modelGeometry.faces[t];
		n = this.modelGeometry.faceVertexUvs[0][t][0], e[2 * a.a] = n.x, e[2 * a.a + 1] = n.y, n = this.modelGeometry.faceVertexUvs[0][t][1], e[2 * a.b] = n.x, e[2 * a.b + 1] = n.y, n = this.modelGeometry.faceVertexUvs[0][t][2], e[2 * a.c] = n.x, e[2 * a.c + 1] = n.y
	}
}, THREE.BAS.ModelBufferGeometry.prototype.createAttribute = function(e, t, n) {
	var a = new Float32Array(this.vertexCount * t),
		r = new THREE.BufferAttribute(a, t);
	if(this.addAttribute(e, r), n)
		for(var i = [], o = 0; o < this.faceCount; o++) n(i, o, this.faceCount), this.setFaceData(r, o, i);
	return r
}, THREE.BAS.ModelBufferGeometry.prototype.setFaceData = function(e, t, n) {
	e = "string" == typeof e ? this.attributes[e] : e;
	for(var a = 3 * t * e.itemSize, r = 0; r < 3; r++)
		for(var i = 0; i < e.itemSize; i++) e.array[a++] = n[i]
}, THREE.BAS.PrefabBufferGeometry = function(e, t) {
	THREE.BufferGeometry.call(this), this.prefabGeometry = e, this.prefabCount = t, this.prefabVertexCount = e.vertices.length, this.bufferIndices(), this.bufferPositions()
}, THREE.BAS.PrefabBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype), THREE.BAS.PrefabBufferGeometry.prototype.constructor = THREE.BAS.PrefabBufferGeometry, THREE.BAS.PrefabBufferGeometry.prototype.bufferIndices = function() {
	for(var e = this.prefabGeometry.faces.length, t = 3 * this.prefabGeometry.faces.length, n = [], a = 0; a < e; a++) {
		var r = this.prefabGeometry.faces[a];
		n.push(r.a, r.b, r.c)
	}
	var i = new Uint32Array(this.prefabCount * t);
	this.setIndex(new THREE.BufferAttribute(i, 1));
	for(var o = 0; o < this.prefabCount; o++)
		for(var s = 0; s < t; s++) i[o * t + s] = n[s] + o * this.prefabVertexCount
}, THREE.BAS.PrefabBufferGeometry.prototype.bufferPositions = function() {
	for(var e = this.createAttribute("position", 3).array, t = 0, n = 0; t < this.prefabCount; t++)
		for(var a = 0; a < this.prefabVertexCount; a++, n += 3) {
			var r = this.prefabGeometry.vertices[a];
			e[n] = r.x, e[n + 1] = r.y, e[n + 2] = r.z
		}
}, THREE.BAS.PrefabBufferGeometry.prototype.bufferUvs = function() {
	for(var e = this.prefabGeometry.faces.length, t = this.prefabVertexCount = this.prefabGeometry.vertices.length, n = [], a = 0; a < e; a++) {
		var r = this.prefabGeometry.faces[a],
			i = this.prefabGeometry.faceVertexUvs[0][a];
		n[r.a] = i[0], n[r.b] = i[1], n[r.c] = i[2]
	}
	for(var o = this.createAttribute("uv", 2), s = 0, l = 0; s < this.prefabCount; s++)
		for(var f = 0; f < t; f++, l += 2) {
			var u = n[f];
			o.array[l] = u.x, o.array[l + 1] = u.y
		}
}, THREE.BAS.PrefabBufferGeometry.prototype.createAttribute = function(e, t, n) {
	var a = new Float32Array(this.prefabCount * this.prefabVertexCount * t),
		r = new THREE.BufferAttribute(a, t);
	if(this.addAttribute(e, r), n)
		for(var i = [], o = 0; o < this.prefabCount; o++) n(i, o, this.prefabCount), this.setPrefabData(r, o, i);
	return r
}, THREE.BAS.PrefabBufferGeometry.prototype.setPrefabData = function(e, t, n) {
	e = "string" == typeof e ? this.attributes[e] : e;
	for(var a = t * this.prefabVertexCount * e.itemSize, r = 0; r < this.prefabVertexCount; r++)
		for(var i = 0; i < e.itemSize; i++) e.array[a++] = n[i]
}, THREE.BAS.BaseAnimationMaterial = function(e, t) {
	THREE.ShaderMaterial.call(this);
	var n = e.uniformValues;
	if(delete e.uniformValues, this.setValues(e), this.uniforms = THREE.UniformsUtils.merge([t, this.uniforms]), this.setUniformValues(n), n && (n.map && (this.defines.USE_MAP = ""), n.normalMap && (this.defines.USE_NORMALMAP = ""), n.envMap && (this.defines.USE_ENVMAP = ""), n.aoMap && (this.defines.USE_AOMAP = ""), n.specularMap && (this.defines.USE_SPECULARMAP = ""), n.alphaMap && (this.defines.USE_ALPHAMAP = ""), n.lightMap && (this.defines.USE_LIGHTMAP = ""), n.emissiveMap && (this.defines.USE_EMISSIVEMAP = ""), n.bumpMap && (this.defines.USE_BUMPMAP = ""), n.displacementMap && (this.defines.USE_DISPLACEMENTMAP = ""), n.roughnessMap && (this.defines.USE_DISPLACEMENTMAP = ""), n.roughnessMap && (this.defines.USE_ROUGHNESSMAP = ""), n.metalnessMap && (this.defines.USE_METALNESSMAP = ""), n.envMap)) {
		this.defines.USE_ENVMAP = "";
		var a = "ENVMAP_TYPE_CUBE",
			r = "ENVMAP_MODE_REFLECTION",
			i = "ENVMAP_BLENDING_MULTIPLY";
		switch(n.envMap.mapping) {
			case THREE.CubeReflectionMapping:
			case THREE.CubeRefractionMapping:
				a = "ENVMAP_TYPE_CUBE";
				break;
			case THREE.CubeUVReflectionMapping:
			case THREE.CubeUVRefractionMapping:
				a = "ENVMAP_TYPE_CUBE_UV";
				break;
			case THREE.EquirectangularReflectionMapping:
			case THREE.EquirectangularRefractionMapping:
				a = "ENVMAP_TYPE_EQUIREC";
				break;
			case THREE.SphericalReflectionMapping:
				a = "ENVMAP_TYPE_SPHERE"
		}
		switch(n.envMap.mapping) {
			case THREE.CubeRefractionMapping:
			case THREE.EquirectangularRefractionMapping:
				r = "ENVMAP_MODE_REFRACTION"
		}
		switch(n.combine) {
			case THREE.MixOperation:
				i = "ENVMAP_BLENDING_MIX";
				break;
			case THREE.AddOperation:
				i = "ENVMAP_BLENDING_ADD";
				break;
			case THREE.MultiplyOperation:
			default:
				i = "ENVMAP_BLENDING_MULTIPLY"
		}
		this.defines[a] = "", this.defines[i] = "", this.defines[r] = ""
	}
}, THREE.BAS.BaseAnimationMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype), THREE.BAS.BaseAnimationMaterial.prototype.constructor = THREE.BAS.BaseAnimationMaterial, THREE.BAS.BaseAnimationMaterial.prototype.setUniformValues = function(e) {
	for(var t in e)
		if(t in this.uniforms) {
			var n = this.uniforms[t],
				a = e[t];
			n.value = a
		}
}, THREE.BAS.BaseAnimationMaterial.prototype._stringifyChunk = function(e) {
	return this[e] ? this[e].join("\n") : ""
}, THREE.BAS.BasicAnimationMaterial = function(e) {
	this.varyingParameters = [], this.vertexFunctions = [], this.vertexParameters = [], this.vertexInit = [], this.vertexNormal = [], this.vertexPosition = [], this.vertexColor = [], this.fragmentFunctions = [], this.fragmentParameters = [], this.fragmentInit = [], this.fragmentMap = [], this.fragmentDiffuse = [];
	var t = THREE.ShaderLib.basic;
	THREE.BAS.BaseAnimationMaterial.call(this, e, t.uniforms), this.lights = !1, this.vertexShader = this._concatVertexShader(), this.fragmentShader = this._concatFragmentShader()
}, THREE.BAS.BasicAnimationMaterial.prototype = Object.create(THREE.BAS.BaseAnimationMaterial.prototype), THREE.BAS.BasicAnimationMaterial.prototype.constructor = THREE.BAS.BasicAnimationMaterial, THREE.BAS.BasicAnimationMaterial.prototype._concatVertexShader = function() {
	return ["#include <common>", "#include <uv_pars_vertex>", "#include <uv2_pars_vertex>", "#include <envmap_pars_vertex>", "#include <color_pars_vertex>", "#include <morphtarget_pars_vertex>", "#include <skinning_pars_vertex>", "#include <logdepthbuf_pars_vertex>", "#include <clipping_planes_pars_vertex>", this._stringifyChunk("vertexFunctions"), this._stringifyChunk("vertexParameters"), this._stringifyChunk("varyingParameters"), "void main() {", this._stringifyChunk("vertexInit"), "#include <uv_vertex>", "#include <uv2_vertex>", "#include <color_vertex>", "#include <skinbase_vertex>", "\t#ifdef USE_ENVMAP", "#include <beginnormal_vertex>", this._stringifyChunk("vertexNormal"), "#include <morphnormal_vertex>", "#include <skinnormal_vertex>", "#include <defaultnormal_vertex>", "\t#endif", "#include <begin_vertex>", this._stringifyChunk("vertexPosition"), this._stringifyChunk("vertexColor"), "#include <morphtarget_vertex>", "#include <skinning_vertex>", "#include <project_vertex>", "#include <logdepthbuf_vertex>", "#include <worldpos_vertex>", "#include <clipping_planes_vertex>", "#include <envmap_vertex>", "}"].join("\n")
}, THREE.BAS.BasicAnimationMaterial.prototype._concatFragmentShader = function() {
	return ["uniform vec3 diffuse;", "uniform float opacity;", this._stringifyChunk("fragmentFunctions"), this._stringifyChunk("fragmentParameters"), this._stringifyChunk("varyingParameters"), "#ifndef FLAT_SHADED", "\tvarying vec3 vNormal;", "#endif", "#include <common>", "#include <color_pars_fragment>", "#include <uv_pars_fragment>", "#include <uv2_pars_fragment>", "#include <map_pars_fragment>", "#include <alphamap_pars_fragment>", "#include <aomap_pars_fragment>", "#include <envmap_pars_fragment>", "#include <fog_pars_fragment>", "#include <specularmap_pars_fragment>", "#include <logdepthbuf_pars_fragment>", "#include <clipping_planes_pars_fragment>", "void main() {", "#include <clipping_planes_fragment>", this._stringifyChunk("fragmentInit"), "\tvec4 diffuseColor = vec4( diffuse, opacity );", this._stringifyChunk("fragmentDiffuse"), "#include <logdepthbuf_fragment>", this._stringifyChunk("fragmentMap") || "#include <map_fragment>", "#include <color_fragment>", "#include <alphamap_fragment>", "#include <alphatest_fragment>", "#include <specularmap_fragment>", "\tReflectedLight reflectedLight;", "\treflectedLight.directDiffuse = vec3( 0.0 );", "\treflectedLight.directSpecular = vec3( 0.0 );", "\treflectedLight.indirectDiffuse = diffuseColor.rgb;", "\treflectedLight.indirectSpecular = vec3( 0.0 );", "#include <aomap_fragment>", "\tvec3 outgoingLight = reflectedLight.indirectDiffuse;", "#include <normal_flip>", "#include <envmap_fragment>", "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "#include <premultiplied_alpha_fragment>", "#include <tonemapping_fragment>", "#include <encodings_fragment>", "#include <fog_fragment>", "}"].join("\n")
}, THREE.BAS.DepthAnimationMaterial = function(e) {
	this.depthPacking = THREE.RGBADepthPacking, this.clipping = !0, this.vertexFunctions = [], this.vertexParameters = [], this.vertexInit = [], this.vertexPosition = [], THREE.BAS.BaseAnimationMaterial.call(this, e);
	var t = THREE.ShaderLib.depth;
	this.uniforms = THREE.UniformsUtils.merge([t.uniforms, this.uniforms]), this.vertexShader = this._concatVertexShader(), this.fragmentShader = t.fragmentShader
}, THREE.BAS.DepthAnimationMaterial.prototype = Object.create(THREE.BAS.BaseAnimationMaterial.prototype), THREE.BAS.DepthAnimationMaterial.prototype.constructor = THREE.BAS.DepthAnimationMaterial, THREE.BAS.DepthAnimationMaterial.prototype._concatVertexShader = function() {
	return [THREE.ShaderChunk.common, THREE.ShaderChunk.uv_pars_vertex, THREE.ShaderChunk.displacementmap_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, THREE.ShaderChunk.clipping_planes_pars_vertex, this._stringifyChunk("vertexFunctions"), this._stringifyChunk("vertexParameters"), "void main() {", this._stringifyChunk("vertexInit"), THREE.ShaderChunk.uv_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.begin_vertex, this._stringifyChunk("vertexPosition"), THREE.ShaderChunk.displacementmap_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.clipping_planes_vertex, "}"].join("\n")
}, THREE.BAS.DistanceAnimationMaterial = function(e) {
	this.depthPacking = THREE.RGBADepthPacking, this.clipping = !0, this.vertexFunctions = [], this.vertexParameters = [], this.vertexInit = [], this.vertexPosition = [], THREE.BAS.BaseAnimationMaterial.call(this, e);
	var t = THREE.ShaderLib.distanceRGBA;
	this.uniforms = THREE.UniformsUtils.merge([t.uniforms, this.uniforms]), this.vertexShader = this._concatVertexShader(), this.fragmentShader = t.fragmentShader
}, THREE.BAS.DistanceAnimationMaterial.prototype = Object.create(THREE.BAS.BaseAnimationMaterial.prototype), THREE.BAS.DistanceAnimationMaterial.prototype.constructor = THREE.BAS.DistanceAnimationMaterial, THREE.BAS.DistanceAnimationMaterial.prototype._concatVertexShader = function() {
	return ["varying vec4 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.clipping_planes_pars_vertex, this._stringifyChunk("vertexFunctions"), this._stringifyChunk("vertexParameters"), "void main() {", this._stringifyChunk("vertexInit"), THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.begin_vertex, this._stringifyChunk("vertexPosition"), THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.project_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.clipping_planes_vertex, "vWorldPosition = worldPosition;", "}"].join("\n")
}, THREE.BAS.PhongAnimationMaterial = function(e) {
	this.varyingParameters = [], this.vertexFunctions = [], this.vertexParameters = [], this.vertexInit = [], this.vertexNormal = [], this.vertexPosition = [], this.vertexColor = [], this.fragmentFunctions = [], this.fragmentParameters = [], this.fragmentInit = [], this.fragmentMap = [], this.fragmentDiffuse = [], this.fragmentEmissive = [], this.fragmentSpecular = [];
	var t = THREE.ShaderLib.phong;
	THREE.BAS.BaseAnimationMaterial.call(this, e, t.uniforms), this.lights = !0, this.vertexShader = this._concatVertexShader(), this.fragmentShader = this._concatFragmentShader()
}, THREE.BAS.PhongAnimationMaterial.prototype = Object.create(THREE.BAS.BaseAnimationMaterial.prototype), THREE.BAS.PhongAnimationMaterial.prototype.constructor = THREE.BAS.PhongAnimationMaterial, THREE.BAS.PhongAnimationMaterial.prototype._concatVertexShader = function() {
	return ["#define PHONG", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "\tvarying vec3 vNormal;", "#endif", "#include <common>", "#include <uv_pars_vertex>", "#include <uv2_pars_vertex>", "#include <displacementmap_pars_vertex>", "#include <envmap_pars_vertex>", "#include <color_pars_vertex>", "#include <morphtarget_pars_vertex>", "#include <skinning_pars_vertex>", "#include <shadowmap_pars_vertex>", "#include <logdepthbuf_pars_vertex>", "#include <clipping_planes_pars_vertex>", this._stringifyChunk("vertexFunctions"), this._stringifyChunk("vertexParameters"), this._stringifyChunk("varyingParameters"), "void main() {", this._stringifyChunk("vertexInit"), "#include <uv_vertex>", "#include <uv2_vertex>", "#include <color_vertex>", "#include <beginnormal_vertex>", this._stringifyChunk("vertexNormal"), "#include <morphnormal_vertex>", "#include <skinbase_vertex>", "#include <skinnormal_vertex>", "#include <defaultnormal_vertex>", "#ifndef FLAT_SHADED", "\tvNormal = normalize( transformedNormal );", "#endif", "#include <begin_vertex>", this._stringifyChunk("vertexPosition"), this._stringifyChunk("vertexColor"), "#include <displacementmap_vertex>", "#include <morphtarget_vertex>", "#include <skinning_vertex>", "#include <project_vertex>", "#include <logdepthbuf_vertex>", "#include <clipping_planes_vertex>", "\tvViewPosition = - mvPosition.xyz;", "#include <worldpos_vertex>", "#include <envmap_vertex>", "#include <shadowmap_vertex>", "}"].join("\n")
}, THREE.BAS.PhongAnimationMaterial.prototype._concatFragmentShader = function() {
	return ["#define PHONG", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", this._stringifyChunk("fragmentFunctions"), this._stringifyChunk("fragmentParameters"), this._stringifyChunk("varyingParameters"), "#include <common>", "#include <packing>", "#include <color_pars_fragment>", "#include <uv_pars_fragment>", "#include <uv2_pars_fragment>", "#include <map_pars_fragment>", "#include <alphamap_pars_fragment>", "#include <aomap_pars_fragment>", "#include <lightmap_pars_fragment>", "#include <emissivemap_pars_fragment>", "#include <envmap_pars_fragment>", "#include <fog_pars_fragment>", "#include <bsdfs>", "#include <lights_pars>", "#include <lights_phong_pars_fragment>", "#include <shadowmap_pars_fragment>", "#include <bumpmap_pars_fragment>", "#include <normalmap_pars_fragment>", "#include <specularmap_pars_fragment>", "#include <logdepthbuf_pars_fragment>", "#include <clipping_planes_pars_fragment>", "void main() {", "#include <clipping_planes_fragment>", this._stringifyChunk("fragmentInit"), "\tvec4 diffuseColor = vec4( diffuse, opacity );", "\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );", "\tvec3 totalEmissiveRadiance = emissive;", this._stringifyChunk("fragmentDiffuse"), "#include <logdepthbuf_fragment>", this._stringifyChunk("fragmentMap") || "#include <map_fragment>", "#include <color_fragment>", "#include <alphamap_fragment>", "#include <alphatest_fragment>", "#include <specularmap_fragment>", "#include <normal_flip>", "#include <normal_fragment>", this._stringifyChunk("fragmentEmissive"), "#include <emissivemap_fragment>", "#include <lights_phong_fragment>", this._stringifyChunk("fragmentSpecular"), "#include <lights_template>", "#include <aomap_fragment>", "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;", "#include <envmap_fragment>", "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "#include <premultiplied_alpha_fragment>", "#include <tonemapping_fragment>", "#include <encodings_fragment>", "#include <fog_fragment>", "}"].join("\n");
}, THREE.BAS.StandardAnimationMaterial = function(e) {
	this.varyingParameters = [], this.vertexFunctions = [], this.vertexParameters = [], this.vertexInit = [], this.vertexNormal = [], this.vertexPosition = [], this.vertexColor = [], this.fragmentFunctions = [], this.fragmentParameters = [], this.fragmentInit = [], this.fragmentMap = [], this.fragmentDiffuse = [], this.fragmentRoughness = [], this.fragmentMetalness = [], this.fragmentEmissive = [];
	var t = THREE.ShaderLib.standard;
	THREE.BAS.BaseAnimationMaterial.call(this, e, t.uniforms), this.lights = !0, this.vertexShader = this._concatVertexShader(), this.fragmentShader = this._concatFragmentShader()
}, THREE.BAS.StandardAnimationMaterial.prototype = Object.create(THREE.BAS.BaseAnimationMaterial.prototype), THREE.BAS.StandardAnimationMaterial.prototype.constructor = THREE.BAS.StandardAnimationMaterial, THREE.BAS.StandardAnimationMaterial.prototype._concatVertexShader = function() {
	return ["#define PHYSICAL", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "\tvarying vec3 vNormal;", "#endif", "#include <common>", "#include <uv_pars_vertex>", "#include <uv2_pars_vertex>", "#include <displacementmap_pars_vertex>", "#include <color_pars_vertex>", "#include <morphtarget_pars_vertex>", "#include <skinning_pars_vertex>", "#include <shadowmap_pars_vertex>", "#include <specularmap_pars_fragment>", "#include <logdepthbuf_pars_vertex>", "#include <clipping_planes_pars_vertex>", this._stringifyChunk("vertexFunctions"), this._stringifyChunk("vertexParameters"), this._stringifyChunk("varyingParameters"), "void main() {", this._stringifyChunk("vertexInit"), "#include <uv_vertex>", "#include <uv2_vertex>", "#include <color_vertex>", "#include <beginnormal_vertex>", this._stringifyChunk("vertexNormal"), "#include <morphnormal_vertex>", "#include <skinbase_vertex>", "#include <skinnormal_vertex>", "#include <defaultnormal_vertex>", "#ifndef FLAT_SHADED", "\tvNormal = normalize( transformedNormal );", "#endif", "#include <begin_vertex>", this._stringifyChunk("vertexPosition"), this._stringifyChunk("vertexColor"), "#include <displacementmap_vertex>", "#include <morphtarget_vertex>", "#include <skinning_vertex>", "#include <project_vertex>", "#include <logdepthbuf_vertex>", "#include <clipping_planes_vertex>", "\tvViewPosition = - mvPosition.xyz;", "#include <worldpos_vertex>", "#include <shadowmap_vertex>", "}"].join("\n")
}, THREE.BAS.StandardAnimationMaterial.prototype._concatFragmentShader = function() {
	return ["#define PHYSICAL", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform float roughness;", "uniform float metalness;", "uniform float opacity;", "#ifndef STANDARD", "uniform float clearCoat;", "uniform float clearCoatRoughness;", "#endif", "", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "varying vec3 vNormal;", "#endif", this._stringifyChunk("fragmentFunctions"), this._stringifyChunk("fragmentParameters"), this._stringifyChunk("varyingParameters"), "#include <common>", "#include <packing>", "#include <color_pars_fragment>", "#include <uv_pars_fragment>", "#include <uv2_pars_fragment>", "#include <map_pars_fragment>", "#include <alphamap_pars_fragment>", "#include <aomap_pars_fragment>", "#include <lightmap_pars_fragment>", "#include <emissivemap_pars_fragment>", "#include <envmap_pars_fragment>", "#include <fog_pars_fragment>", "#include <bsdfs>", "#include <cube_uv_reflection_fragment>", "#include <lights_pars>", "#include <lights_physical_pars_fragment>", "#include <shadowmap_pars_fragment>", "#include <bumpmap_pars_fragment>", "#include <normalmap_pars_fragment>", "#include <roughnessmap_pars_fragment>", "#include <metalnessmap_pars_fragment>", "#include <logdepthbuf_pars_fragment>", "#include <clipping_planes_pars_fragment>", "void main() {", "#include <clipping_planes_fragment>", this._stringifyChunk("fragmentInit"), "\tvec4 diffuseColor = vec4( diffuse, opacity );", "\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );", "\tvec3 totalEmissiveRadiance = emissive;", this._stringifyChunk("fragmentDiffuse"), "#include <logdepthbuf_fragment>", this._stringifyChunk("fragmentMap") || "#include <map_fragment>", "#include <color_fragment>", "#include <alphamap_fragment>", "#include <alphatest_fragment>", "#include <specularmap_fragment>", "float roughnessFactor = roughness;", this._stringifyChunk("fragmentRoughness"), "#ifdef USE_ROUGHNESSMAP", " roughnessFactor *= texture2D( roughnessMap, vUv ).r;", "#endif", "float metalnessFactor = metalness;", this._stringifyChunk("fragmentMetalness"), "#ifdef USE_METALNESSMAP", " metalnessFactor *= texture2D( metalnessMap, vUv ).r;", "#endif", "#include <normal_flip>", "#include <normal_fragment>", this._stringifyChunk("fragmentEmissive"), "#include <emissivemap_fragment>", "#include <lights_physical_fragment>", "#include <lights_template>", "#include <aomap_fragment>", "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;", "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "#include <premultiplied_alpha_fragment>", "#include <tonemapping_fragment>", "#include <encodings_fragment>", "#include <fog_fragment>", "}"].join("\n")
};