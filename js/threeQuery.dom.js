$$.DOM = function() {
	THREE.Group.call(this);
	this.css = {
		backgroundColor: "rgba(0,0,0,0)",
		opacity: 1,
		width: 1,
		height: 1
	};
};
(function() {
	var Super = function() {};
	Super.prototype = THREE.Group.prototype;
	$$.DOM.prototype = new Super();
})();

$$.Body = function(css) {
	$$.DOM.call(this);
	var that = this;
	this.css = $$.extends({}, [this.css, css]);
	this.canvas = document.createElement("canvas");
	this.distanceFromCamera = 50;
	var canvas = this.canvas;
	//	this.text=text;
	this.update = function() {
		canvas.width = this.css.width;
		canvas.height = this.css.height;
		let ctx = this.canvas.getContext("2d");
		ctx.fillStyle = this.css.backgroundColor;
		ctx.fillRect(0, 0, this.css.width, this.css.height);
		var texture = new THREE.CanvasTexture(canvas);
		texture.generateMipmaps = false;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		var spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
			color: 0xffffff
		});
		sprite.material = spriteMaterial;
		sprite.scale.set(this.css.width / 4, this.css.height / 4, 1);
	}

	var spriteMaterial = new THREE.SpriteMaterial({
		map: canvas,
		color: 0xffffff
	});
	var sprite = new THREE.Sprite(spriteMaterial);
	var vector = new THREE.Vector3(); // create once and reuse it!
	this.lockToScreen = function() {
		var c = $$.global.camera;
		c.getWorldDirection(vector);
		that.rotation.set(c.rotation.x, c.rotation.y, c.rotation.z);
		that.position.set(c.position.x + vector.x * that.distanceFromCamera, c.position.y + vector.y * that.distanceFromCamera, c.position.z + vector.z * that.distanceFromCamera);
		//		that.lookAt($$.global.camera.position);
	}

	this.update();
	this.element = sprite;
	this.add(this.element);
};
(function() {
	var Super = function() {};
	Super.prototype = $$.DOM.prototype;
	$$.Body.prototype = new Super();
})();

$$.Set = function(css) {
	$$.DOM.call(this);
	var that = this;
	this.css = $$.extends({}, [this.css, css]);
	this.canvas = document.createElement("canvas");
	this.distanceFromCamera = 50;
	var canvas = this.canvas;
	//	this.text=text;
	this.update = function() {
		canvas.width = this.css.width;
		canvas.height = this.css.height;
		let ctx = this.canvas.getContext("2d");
		ctx.fillStyle = this.css.backgroundColor;
		ctx.fillRect(0, 0, this.css.width, this.css.height);
		var texture = new THREE.CanvasTexture(canvas);
		texture.generateMipmaps = false;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		var spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
			color: 0xffffff
		});
		sprite.material = spriteMaterial;
		sprite.scale.set(this.css.width / 4, this.css.height / 4, 1);
	}

	var spriteMaterial = new THREE.SpriteMaterial({
		map: canvas,
		color: 0xffffff
	});
	var sprite = new THREE.Sprite(spriteMaterial);
	this.update();
	this.element = sprite;
	this.add(this.element);
};
(function() {
	var Super = function() {};
	Super.prototype = $$.DOM.prototype;
	$$.Set.prototype = new Super();
})();

$$.Txt = function(text, css) {
	$$.DOM.call(this);
	var that = this;
	this.css = $$.extends({}, [this.css, {
		fontSize: 12,
		fontWeight: "normal",
		fontFamily: "微软雅黑",
		color: "#ffffff",
		textAlign: "center"
	}, css]);
	this.canvas = document.createElement("canvas");
	var canvas = this.canvas;
	this.text = text;
	this.update = function() {
		canvas.width = this.css.width;
		canvas.height = this.css.height;
		let ctx = this.canvas.getContext("2d");
		ctx.fillStyle = this.css.backgroundColor;
		ctx.fillRect(0, 0, this.css.width, this.css.height);
		ctx.textAlign = this.css.textAlign;
		ctx.font = this.css.fontWeight + " " + this.css.fontSize + "px " + this.css.fontFamily;
		ctx.fillStyle = this.css.color;
		let width = ctx.measureText(this.text).width;
		ctx.fillText(this.text, this.css.width / 2, this.css.height / 2 + this.css.fontSize / 4);
		var texture = new THREE.CanvasTexture(canvas);
		texture.generateMipmaps = false;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		var spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
			color: 0xffffff
		});
		sprite.material = spriteMaterial;
		sprite.scale.set(this.css.width / 4, this.css.height / 4, 1);
	}

	var spriteMaterial = new THREE.SpriteMaterial({
		map: canvas,
		color: 0xffffff
	});
	var sprite = new THREE.Sprite(spriteMaterial);
	this.update();
	this.element = sprite;
	this.add(this.element);
};
(function() {
	var Super = function() {};
	Super.prototype = $$.DOM.prototype;
	$$.Txt.prototype = new Super();
})();

$$.Img = function(url, css) {
	$$.DOM.call(this);
	var that = this;

	if($$.Loader.RESOURCE.textures[url]) {
		var spriteMaterial = new THREE.SpriteMaterial({
			map: $$.Loader.RESOURCE.textures[url],
			color: 0xffffff
		});
		var sprite = new THREE.Sprite(spriteMaterial);
		that.element = sprite;
		that.add(that.element);
		this.css = $$.extends({}, [this.css, {
			width: $$.Loader.RESOURCE.textures[url].image.naturalWidth,
			height: $$.Loader.RESOURCE.textures[url].image.naturalHeight,
		}, css]);
		sprite.scale.set(this.css.width / 4, this.css.height / 4, 1);
	} else {
		that.element = {};
		$$.Loader.loadTexture([url], function(texture) {
			texture.generateMipmaps = false;
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			var tmpProperty = that.element;
			var spriteMaterial = new THREE.SpriteMaterial({
				map: texture,
				color: 0xffffff
			});
			var sprite = new THREE.Sprite(spriteMaterial);
			that.element = sprite;
			that.add(that.element);
			this.css = $$.extends({}, [this.css, {
				width: texture.image.naturalWidth,
				height: texture.image.naturalHeight,
			}, css]);
			sprite.scale.set(this.css.width / 4, this.css.height / 4, 1);

			for(var i in tmpProperty) {
				that.element[i] = tmpProperty[i];
			}
		});
	}
};
(function() {
	var Super = function() {};
	Super.prototype = $$.DOM.prototype;
	$$.Img.prototype = new Super();
})();

$$.Video = function(url, css) {
	$$.DOM.call(this);
	var that = this;
	this.video = document.createElement("video");
	this.video.src = url;
	var texture = new THREE.VideoTexture(this.video);
	texture.generateMipmaps = false;
	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	var spriteMaterial = new THREE.SpriteMaterial({
		map: texture,
		color: 0xffffff
	});
	var sprite = new THREE.Sprite(spriteMaterial);
	that.element = sprite;
	that.add(that.element);
	this.css = $$.extends({}, [this.css, {
		width: texture.image.naturalWidth,
		height: texture.image.naturalHeight,
	}, css]);
	sprite.scale.set(this.css.width / 4, this.css.height / 4, 1);
};
(function() {
	var Super = function() {};
	Super.prototype = $$.DOM.prototype;
	$$.Video.prototype = new Super();
})();