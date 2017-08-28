$$.DOM = function() {
	THREE.Group.call(this);
	this.css = {
		backgroundColor: "rgba(0,0,0,0)",
		opacity: 1,
		width: 0,
		height: 0
	};
};
(function() {
	var Super = function() {};
	Super.prototype = THREE.Group.prototype;
	$$.DOM.prototype = new Super();
})();

$$.Txt = function(text, css) {
	$$.DOM.call(this);
	var that=this;
	this.css = $$.extends({}, [this.css, {
		fontSize: 12,
		fontWeight: "normal",
		fontFamily: "微软雅黑",
		color: "#ffffff",
		textAlign: "center"
	}, css]);
	this.canvas = document.createElement("canvas");
	var canvas=this.canvas;
	this.text=text;
	this.update=function(){
		canvas.width=this.css.width;
		canvas.height=this.css.height;
		let ctx = this.canvas.getContext("2d");
		ctx.fillStyle = this.css.backgroundColor;
		ctx.fillRect(0, 0, this.css.width, this.css.height);
		ctx.textAlign = this.css.textAlign;
		ctx.font = this.css.fontWeight + " " + this.css.fontSize  + "px " + this.css.fontFamily;
		ctx.fillStyle = this.css.color;
		let width = ctx.measureText(text).width;
		ctx.fillText(text, this.css.width / 2, this.css.height/2+this.css.fontSize/4);
		var spriteMaterial = new THREE.SpriteMaterial( { map: new THREE.CanvasTexture(canvas), color: 0xffffff } );
		sprite.material=spriteMaterial;
		sprite.scale.set( this.css.width/4, this.css.height/4, 1 );
	}
	
	var spriteMaterial = new THREE.SpriteMaterial( { map: canvas, color: 0xffffff } );
	var sprite = new THREE.Sprite( spriteMaterial );
	this.update();
	this.element = sprite;
	this.add(this.element);
};
(function() {
	var Super = function() {};
	Super.prototype = $$.DOM.prototype;
	$$.Txt.prototype = new Super();
})();

$$.Img = function(url,css){
	$$.DOM.call(this);
	var that=this;
	this.css = $$.extends({}, [this.css, {
		fontSize: 12,
		fontWeight: "normal",
		fontFamily: "微软雅黑",
		color: "#ffffff",
		textAlign: "center"
	}, css]);
}
(function() {
	var Super = function() {};
	Super.prototype = $$.DOM.prototype;
	$$.Img.prototype = new Super();
})();