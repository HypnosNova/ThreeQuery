var targets = {
	sphere: [],
	helix: []
};
var objects = [];

var letterArr = ["a", "a", "a", "a", "a", "a",
	"b", "b",
	"c", "c", "c",
	"d", "d", "d", "d",
	"e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
	"f", "f",
	"g", "g",
	"h", "h", "h", "h", "h", "h",
	"i", "i", "i", "i", "i", "i", "i",
	"j",
	"k",
	"l", "l", "l", "l",
	"m", "m", "m",
	"n", "n", "n", "n", "n", "n",
	"o", "o", "o", "o", "o", "o", "o",
	"p", "p",
	"q",
	"r", "r", "r", "r", "r", "r",
	"s", "s", "s", "s", "s", "s",
	"t", "t", "t", "t", "t", "t", "t", "t", "t",
	"u", "u", "u",
	"v",
	"w", "w",
	"x",
	"y", "y",
	"z",
]
var arrTmp = ["a", "p", "l", "e"];

function transform(targets, duration) {
	TWEEN.removeAll();
	for(var i = 0; i < objects.length; i++) {
		var object = objects[i];
		var target = targets[i];
		new TWEEN.Tween(object.position)
			.to({
				x: target.position.x,
				y: target.position.y,
				z: target.position.z
			}, Math.random() * duration + duration)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();
		new TWEEN.Tween(object.rotation)
			.to({
				x: target.rotation.x,
				y: target.rotation.y,
				z: target.rotation.z
			}, Math.random() * duration + duration)
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();
	}
	new TWEEN.Tween(this)
		.to({}, duration * 2)
		.start();
}

function createLetters() {
	var roundedRectShape = new THREE.Shape();
	(function roundedRect(ctx, x, y, width, height, radius) {
		ctx.moveTo(x, y + radius);
		ctx.lineTo(x, y + height - radius);
		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
		ctx.lineTo(x + width - radius, y + height);
		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
		ctx.lineTo(x + width, y + radius);
		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
		ctx.lineTo(x + radius, y);
		ctx.quadraticCurveTo(x, y, x, y + radius);
	})(roundedRectShape, 0, 0, 50, 50, 10);
	var extrudeSettings = {
		amount: 8,
		bevelEnabled: true,
		bevelSegments: 4,
		steps: 4,
		bevelSize: 3,
		bevelThickness: 2
	};
	var geometry = new THREE.ExtrudeGeometry(roundedRectShape, extrudeSettings);
	//var textures = ["a","b", "e","i", "l","n", "p", "r", "s", "t", "w", "y"];
	var textures = ["a","p", "p","l", "e","a","p", "p","l", "e","p","i", "n", "e","p","e", "a", "r","s","t", "r", "a","w","b", "e", "r", "r", "y","g","r","a","p","e","s","l","e","m","o","n"];
	var len=textures.length;
	for(var i = 0; i < len; i++) {
		var ri=rndInt(textures.length)
		var letter = textures[ri];
		var texture = $$.global.RESOURCE.textures["img/" + letter + ".jpg"];
		textures.splice(ri,1);
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(0.0195, 0.0195);
		var word = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
			color: 0x55ff99,
			map: texture,
		}));
		word.scale.set(1, 1, 0.5);
		word.letter = letter;

		word.onEnter = function(obj) {
			obj.object.material.emissive.setHex(0xff0000);
		}
		word.onLeave = function(obj) {
			obj.object.material.emissive.setHex(0);
		}
		word.onClick = function(obj) {
			obj.object.onEnter = null;
			obj.object.onLeave = null;
			obj.object.onClick = null;
			console.log(obj.object.letter)
			wordInput += obj.object.letter;
			$(".typingArea").text(wordInput);
			var tween = new TWEEN.Tween(obj.object.position)
				.to({
					y: -2000
				}, 2000).start();
			setTimeout(function() {
				scene.remove(obj.object);
			}, 3000);

		}
		word.position.y = Math.random() * 3000 - 1500;
		word.position.x = Math.random() * 3000 - 1500;
		word.position.z = Math.random() * 3000 - 1500;

		scene.add(word);
		objects.push(word);
	}
}

function createShape() {
	// sphere
	var vector = new THREE.Vector3();
	for(var i = 0, l = objects.length; i < l; i++) {
		var phi = Math.acos(-1 + (2 * i) / l);
		var theta = Math.sqrt(l * Math.PI) * phi;
		var object = new THREE.Object3D();
		object.position.x = 200 * Math.cos(theta) * Math.sin(phi);
		object.position.y = 200 * Math.sin(theta) * Math.sin(phi);
		object.position.z = 200 * Math.cos(phi);
		vector.copy(object.position).multiplyScalar(2);
		object.lookAt(vector);
		targets.sphere.push(object);
	}
	// helix
	var vector = new THREE.Vector3();
	for(var i = 0, l = objects.length; i < l; i++) {
		var phi = i * 0.3 + Math.PI;
		var object = new THREE.Object3D();
		object.position.x = 200 * Math.sin(phi);
		object.position.y = -(i * 8) + 200;
		object.position.z = 200 * Math.cos(phi);
		vector.x = object.position.x * 2;
		vector.y = object.position.y;
		vector.z = object.position.z * 2;
		object.lookAt(vector);
		targets.helix.push(object);
	}
}

function rndInt(x) {
	return Math.floor(Math.random() * x);
}
$.fn.extend({
	animateCss: function(animationName,callback) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		this.addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
			if(callback){
				callback();
			}
		});
	}
});

var wordQ = "",
	wordInput = "";
var picArr = ["apple", "pear", "strawberry", "pineapple","grapes","lemon"];

function oneQuestion(str) {
	$(".typingArea").text("");
	wordQ = str;
	wordInput = "";
	$(".picContainer img").attr("src", "svg/" + str + ".svg");
	$(".picContainer").animateCss("bounceInLeft");
}