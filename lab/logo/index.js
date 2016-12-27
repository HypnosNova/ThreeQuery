window.cancelRequestAnimFrame = (function() {
	return window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		clearTimeout
})();

var canvas, gl,
	ratio,
	cw,
	ch,
	colorLoc,
	drawType,
	numLines = 100000;
var target = [];
var id;
var isScroll = false;

var imageURLArr = ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/facebook.png",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/google.png",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/instgram.png",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/pinterest.png",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/twitter.png",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/github.png",

]
var snsNameArr = ["Facebook", "Google+", "Instagram", "Pinterest", "Twitter", "GitHub"];
var myLinkAccount = ['https://www.facebook.com/kenjiSpecial', 'https://plus.google.com/u/1/109436453854978092848/about', 'https://instagram.com/kenji_special/', 'https://www.pinterest.com/kenjispecial/', 'https://twitter.com/kenji_special', 'https://github.com/kenjiSpecial']

var perspectiveMatrix
var randomTargetXArr = [],
	randomTargetYArr = [];
drawType = 0;
var count = 0;

var footerDom = document.getElementById("main-footer");
var footerContainer = document.getElementById('footer-container');
var boxTopDom = document.getElementById('box_top_text');
var boxFrontDom = document.getElementById('box_front_text');
var boxBottomDom = document.getElementById('box_bottom_text');

window.onload = init();

function init() {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');

	for(var ii = 0; ii < imageURLArr.length; ii++) {
		var image = new Image();
		image.crossOrigin = "Anonymous";
		image.src = imageURLArr[ii];

		image.onload = onLoadImageHandler.bind(this, image, canvas, ctx, ii);
	}
};

function onLoadImageHandler(image, canvas, ctx, number) {
	//console.log(image);
	var size = image.width;
	canvas.width = size;
	canvas.height = size;

	ctx.drawImage(image, 0, 0)
	var imageData = ctx.getImageData(0, 0, size, size);

	var data = imageData.data;
	target[number] = [];

	for(var ii = 0; ii < data.length; ii += 4) {
		if(data[ii] == 0) {
			var pixNumber = ii / 4;
			var xPos = pixNumber % size;
			var yPos = parseInt(pixNumber / size);
			var pos = {
				x: xPos / size - .5,
				y: -yPos / size + 0.5
			};
			target[number].push(pos);
		}

	}

	count++;

	if(count == imageURLArr.length) {
		setText();
		footerDom.style.display = "block";

		loadScene();
	}
	//
	//loadScene();

}

function setText() {
	var topDrawType = drawType - 1 < 0 ? snsNameArr.length - 1 : drawType - 1;
	var botDrawType = drawType + 1 > snsNameArr.length - 1 ? 0 : drawType + 1;

	boxTopDom.innerHTML = snsNameArr[topDrawType];
	boxTopDom.href = myLinkAccount[topDrawType];

	boxFrontDom.innerHTML = snsNameArr[drawType];
	boxFrontDom.href = myLinkAccount[drawType];

	boxBottomDom.innerHTML = snsNameArr[botDrawType];
	boxBottomDom.href = myLinkAccount[botDrawType];
}

/**
 * Initialises WebGL and creates the 3D scene.
 */
function loadScene() {
	canvas = document.getElementById("c");
	gl = canvas.getContext("experimental-webgl");

	if(!gl) {
		alert("There's no WebGL context available.");
		return;
	}

	cw = window.innerWidth;
	ch = window.innerHeight;
	canvas.width = cw;
	canvas.height = ch;
	gl.viewport(0, 0, canvas.width, canvas.height);

	var vertexShaderScript = document.getElementById("shader-vs");
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderScript.text);
	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		alert("Couldn't compile the vertex shader");
		gl.deleteShader(vertexShader);
		return;
	}

	var fragmentShaderScript = document.getElementById("shader-fs");
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderScript.text);
	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		alert("Couldn't compile the fragment shader");
		gl.deleteShader(fragmentShader);
		return;
	}

	gl.program = gl.createProgram();
	gl.attachShader(gl.program, vertexShader);
	gl.attachShader(gl.program, fragmentShader);
	gl.linkProgram(gl.program);
	if(!gl.getProgramParameter(gl.program, gl.LINK_STATUS)) {
		alert("Unable to initialise shaders");
		gl.deleteProgram(gl.program);
		gl.deleteProgram(vertexShader);
		gl.deleteProgram(fragmentShader);
		return;
	}
	gl.useProgram(gl.program);
	var vertexPosition = gl.getAttribLocation(gl.program, "vertexPosition");
	gl.enableVertexAttribArray(vertexPosition);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);

	gl.enable(gl.BLEND);
	gl.disable(gl.DEPTH_TEST);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// ------------------

	setup();

	// ------------------

	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	var fieldOfView = 30.0;
	var aspectRatio = canvas.width / canvas.height;
	var nearPlane = 1.0;
	var farPlane = 10000.0;
	var top = nearPlane * Math.tan(fieldOfView * Math.PI / 360.0);
	var bottom = -top;
	var right = top * aspectRatio;
	var left = -right;

	var a = (right + left) / (right - left);
	var b = (top + bottom) / (top - bottom);
	var c = (farPlane + nearPlane) / (farPlane - nearPlane);
	var d = (2 * farPlane * nearPlane) / (farPlane - nearPlane);
	var x = (2 * nearPlane) / (right - left);
	var y = (2 * nearPlane) / (top - bottom);
	perspectiveMatrix = [
		x, 0, a, 0,
		0, y, b, 0,
		0, 0, c, d,
		0, 0, -1, 0
	];

	var modelViewMatrix = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	];
	var vertexPosAttribLocation = gl.getAttribLocation(gl.program, "vertexPosition");
	gl.vertexAttribPointer(vertexPosAttribLocation, 3.0, gl.FLOAT, false, 0, 0);
	var uModelViewMatrix = gl.getUniformLocation(gl.program, "modelViewMatrix");
	var uPerspectiveMatrix = gl.getUniformLocation(gl.program, "perspectiveMatrix");
	gl.uniformMatrix4fv(uModelViewMatrix, false, new Float32Array(perspectiveMatrix));
	gl.uniformMatrix4fv(uPerspectiveMatrix, false, new Float32Array(modelViewMatrix));
	animate();

	window.addEventListener("mousewheel", onScrollEventHandler);
	window.addEventListener("DOMMouseScroll", onScrollEventHandler);

	window.addEventListener("resize", onResizeHandler);
}
var count = 0;
var cn = 0;

function animate() {

	id = requestAnimationFrame(animate);
	drawScene();
}

function drawScene() {
	draw();

	gl.lineWidth(1);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.drawArrays(gl.LINES, 0, numLines);

	gl.flush();
}

// ===================================
var coefficient = .4;
var targetCoefficient = .01;

var vertices,
	velocities,
	freqArr,
	thetaArr,
	velThetaArr,
	velRadArr,
	boldRateArr;

// -------------------------------

function setup() {

	vertices = [];

	// -------------------------------

	for(var ii = 0; ii < numLines; ii++) {
		vertices.push(0, 0, 1.83);
		vertices.push(0, 0, 1.83);

		var randomPos = target[drawType][parseInt(target[drawType].length * Math.random())];
		randomTargetXArr.push(randomPos.x);
		randomTargetYArr.push(randomPos.y);
	}

	vertices = new Float32Array(vertices);
	randomTargetXArr = new Float32Array(randomTargetXArr);
	randomTargetYArr = new Float32Array(randomTargetYArr);

}

// -------------------------------

// -------------------------------

function draw() {
	cn += .1;

	var i, n = vertices.length,
		p, bp;
	var px, py;
	var pTheta;
	var rad;
	var num;

	coefficient += (targetCoefficient - coefficient) * .1;

	for(i = 0; i < numLines * 2; i += 2) {
		count += .3;
		bp = i * 3;
		// copy old positions

		vertices[bp] = vertices[bp + 3];
		vertices[bp + 1] = vertices[bp + 4];

		num = parseInt(i / 2);
		//pTheta = thetaArr[num];

		//rad = velRadArr[num];// + Math.cos(pTheta + i * freqArr[i]) *  boldRateArr[num];

		//pTheta = pTheta + velThetaArr[num];
		//thetaArr[num] = pTheta;
		//var pos = target[parseInt(target.length * Math.random())];
		var targetPosX = randomTargetXArr[num];
		var targetPosY = randomTargetYArr[num];
		//va
		px = vertices[bp + 3];
		px += (targetPosX - px) * coefficient + (Math.random() - .5) * coefficient;
		vertices[bp + 3] = px;

		py = vertices[bp + 4];
		py += (targetPosY - py) * coefficient + (Math.random() - .5) * coefficient;
		vertices[bp + 4] = py;
	}
}

// -------------------------------

function onScrollEventHandler(event) {
	if(isScroll) return;
	var delta = event.wheelDelta;
	var rotate;
	var tansY;

	isScroll = true;
	if(delta < 0) {
		drawType -= 1;
		if(drawType < 0) drawType += imageURLArr.length;
		rotate = -90;
		transY = 15;
	} else {
		drawType = (drawType + 1) % imageURLArr.length;
		rotate = 90;
		transY = -15;
	}

	coefficient = .3;
	randomTargetXArr = [];
	randomTargetYArr = [];

	// -------------------------------

	for(var ii = 0; ii < numLines; ii++) {
		var randomPos = target[drawType][parseInt(target[drawType].length * Math.random())];
		randomTargetXArr.push(randomPos.x);
		randomTargetYArr.push(randomPos.y);
	}

	vertices = new Float32Array(vertices);
	randomTargetXArr = new Float32Array(randomTargetXArr);
	randomTargetYArr = new Float32Array(randomTargetYArr);

	TweenLite.to(footerContainer, .3, {
		rotationX: rotate,
		y: transY,
		ease: Back.easeOut,
		onComplete: onTweenCompleteHandler
	});

	setTimeout(function() {
		isScroll = false;
	}, 600);
}

function onTweenCompleteHandler(arguments) {
	setText();

	TweenLite.set(footerContainer, {
		rotationX: 0,
		y: 0
	});
}

function onResizeHandler(event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

}

window.addEventListener("keypress", function(event) {
	if(event.charCode == 99) {
		cancelRequestAnimFrame(id);
	}
});

window.addEventListener("click", function(event) {
	if(isScroll) return;
	var rotate;
	var tansY;

	isScroll = true;
	drawType = (drawType + 1) % imageURLArr.length;
	rotate = 90;
	transY = -15;

	coefficient = .3;
	randomTargetXArr = [];
	randomTargetYArr = [];

	// -------------------------------

	for(var ii = 0; ii < numLines; ii++) {
		var randomPos = target[drawType][parseInt(target[drawType].length * Math.random())];
		randomTargetXArr.push(randomPos.x);
		randomTargetYArr.push(randomPos.y);
	}

	vertices = new Float32Array(vertices);
	randomTargetXArr = new Float32Array(randomTargetXArr);
	randomTargetYArr = new Float32Array(randomTargetYArr);

//	TweenLite.to(footerContainer, .3, {
//		rotationX: rotate,
//		y: transY,
//		ease: Back.easeOut,
//		onComplete: onTweenCompleteHandler
//	});

	setTimeout(function() {
		isScroll = false;
	}, 600);
});