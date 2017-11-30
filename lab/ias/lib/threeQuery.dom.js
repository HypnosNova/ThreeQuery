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
		fontStyle: "normal",
		fontVariant: "normal",
		fontSize: 12,
		fontWeight: "normal",
		fontFamily: "微软雅黑",
		color: "#ffffff",
		textAlign: "center"
	}, css]);
	if(css.opacity != null) {
		this.css.opacity = css.opacity;
	}
	this.canvas = document.createElement("canvas");
	var canvas = this.canvas;
	this.text = text;
	this.update = function() {
		canvas.width = that.css.width;
		canvas.height = that.css.height;
		let ctx = that.canvas.getContext("2d");
		ctx.fillStyle = that.css.backgroundColor;
		ctx.fillRect(0, 0, that.css.width, that.css.height);
		ctx.textAlign = that.css.textAlign;
		ctx.font = that.css.fontStyle + " " + that.css.fontVariant + " " + that.css.fontWeight + " " + that.css.fontSize + "px " + that.css.fontFamily;
		ctx.fillStyle = that.css.color;
		let width = ctx.measureText(that.text).width;
		ctx.fillText(that.text, that.css.width / 2, that.css.height / 2 + that.css.fontSize / 4);
		var texture = new THREE.CanvasTexture(canvas);
		texture.generateMipmaps = false;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		var spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
			needsUpdate: false,
			color: 0xffffff
		});
		sprite.material = spriteMaterial;
		sprite.scale.set(that.css.width / 4, that.css.height / 4, 1);
		sprite.material.opacity = that.css.opacity;
	}

	var spriteMaterial = new THREE.SpriteMaterial({
		map: canvas,
		transparent: true,
		needsUpdate: false,
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

$$.Img = function(url, css, callback) {
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
			height: $$.Loader.RESOURCE.textures[url].image.naturalHeight
		}, css]);
		sprite.scale.set(this.css.width / 4, this.css.height / 4, 1);
		sprite.material.opacity = that.css.opacity;
		if(callback) {
			callback();
		}
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
				height: texture.image.naturalHeight
			}, css]);
			if(css.opacity != null) {
				that.css.opacity = css.opacity;
			}
			sprite.scale.set(this.css.width / 4, this.css.height / 4, 1);

			for(var i in tmpProperty) {
				that.element[i] = tmpProperty[i];
			}
			sprite.material.opacity = that.css.opacity;
			if(callback) {
				callback();
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