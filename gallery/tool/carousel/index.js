var [scene, renderer, camera] = $$.init({}, {}, {
	fov: 45
});
$$.animate();
var stats, positions, group, planes, slides, len;
var select = 0;
var tweenTime = 800;
var planeWidth = 300;
var planeHeight = 190;
var dx = 300;
var dz = 400;
var show = 4;
var deltaRotation = 20;
var half = 0;
var tweening = false;
var manifest = [{
		src: "img/1.jpg",
		id: "image0"
	},
	{
		src: "img/2.jpg",
		id: "image1"
	},
	{
		src: "img/3.jpg",
		id: "image2"
	},
	{
		src: "img/4.jpg",
		id: "image3"
	},
	{
		src: "img/5.jpg",
		id: "image4"
	},
	{
		src: "img/0.jpg",
		id: "image5"
	},
	{
		src: "img/6.jpg",
		id: "image6"
	},
	{
		src: "img/7.jpg",
		id: "image7"
	},
	{
		src: "img/8.jpg",
		id: "image8"
	},
];

function init() {
	camera.position.set(0, 100, 1000);
	scene.add(camera);

	// CAROUSEL GROUP
	group = new THREE.Object3D();
	group.position.y = planeHeight / 2;
	scene.add(group);

	// PRELOADER
	var preloader = new THREE.Object3D();
	preloader.position.set(0, 100, 0);
	scene.add(preloader);

	var preloaderBg = new THREE.Mesh(new THREE.PlaneGeometry(500, 30, 1, 1), new THREE.MeshBasicMaterial({
		color: 0x0f0f2e,
		transparent: true
	}));
	preloader.add(preloaderBg);

	var preloaderLine = new THREE.Mesh(new THREE.PlaneGeometry(494, 24, 1, 1), new THREE.MeshBasicMaterial({
		color: 0x00e5e5,
		transparent: true
	}));
	preloaderLine.position.set(0, 0, 1);
	preloaderLine.scale.x = 0;
	preloader.add(preloaderLine);

	// IMAGE PRELOADER
	var textureArr=[];
	for(var i in manifest){
		textureArr.push(manifest[i].src);
	}
	$$.Loader.loadTexture(textureArr);
	$$.Loader.onProgress=handleImageLoadProgress;
	$$.Loader.onLoadComplete=handleImageLoadComplete;

	function handleImageLoadProgress(item,loaded,total) {
		new TWEEN.Tween(preloaderLine.scale).to({
			x: loaded/total
		},500).start();
	}

	function handleImageLoadComplete(event) {
		new TWEEN.Tween(preloaderBg.material).to({
			opacity: 0,
		},500).delay(500).start();
		
		new TWEEN.Tween(preloaderLine.material).to({
			opacity: 0,
		},500).delay(500).start().onComplete(removePreloader);
		setTimeout(createPlanes, 1000);
	}

	function removePreloader() {
		scene.remove(preloader);
	}

	// PLANES
	function createPlanes() {
		len = manifest.length;
		planes = [];
		slides = [];

		half = Math.floor((len - 1) / 2);
		positions = [];
		var i, id = 0,
			n = 0;
		for(i = select; i < select + len; i++) {
			id = i;
			if(i >= len) id -= len;
			positions[id] = n;
			n++;
		}

		for(i = 0; i < len; i++) {
			// texture, material
			slides[i] = {
				side: 1,
				dif: 0,
				rotation: 0
			};
			var img_texture = $$.Loader.RESOURCE.textures[manifest[i].src];
			img_texture.needsUpdate = true;
			var img_material = new THREE.MeshBasicMaterial({
				map: img_texture,
				depthWrite: true,
				depthTest: true,
				transparent: true
			});

			// mesh / plane
			var plane = new THREE.Mesh(new THREE.PlaneGeometry(planeWidth, planeHeight), img_material);
			plane.overdraw = true;
			plane.position.x = i * dx;
			group.add(plane);

			planes[i] = plane;
			plane.index=i;
			plane.onClick=function(obj){
				var i=obj.object.index;
				if(slides[i].dif <= show) {
					gotoImage(i);
				}
			}
		}

		window.addEventListener('mousewheel', wheel, false);
		updatePlanes(true);
	}

	function wheel(event) {
		mouseWheel(event);
		event.preventDefault();
	}

}

//________________________________________________________ MOUSE WHEEL
function mouseWheel(event) {
	var delta = 0;
	if(!event) event = window.event; /* IE  */
	if(event.wheelDelta) { /* IE, Opera. */
		delta = event.wheelDelta / 120;
	} else if(event.detail) { /* Mozilla */
		delta = -event.detail;
	}

	if(delta && tweening === false) gotoDir(delta / Math.abs(delta));
}

//________________________________________________________ GOTO DIRECTION < >
function gotoDir(direction) {
	select++;
	if(select >= len) select = 0;

	var id = 0;
	for(var i = 0; i < len; i++) {
		id = positions[i];
		id += direction;

		if(id < 0) id = len - 1;
		else if(id >= len) id -= len;

		positions[i] = id;
	}

	updatePlanes(false);
}

//________________________________________________________ UPDATE POSITIONS
function updatePlanes(fast) {
	var plane_x, plane_z;
	var tween = true;
	var sAlpha = 1;
	var showDetails;
	var tweenRatio = 1;
	var rot = 0;
	var id = 0;
	var time = tweenTime;

	if(fast === true) time = 0;
	var delayScale = 0;
	if(fast === false) delayScale = 0;

	for(var i = 0; i < len; i++) {
		id = positions[i];
		showDetails = false;

		if(id === 0) { // selected
			plane_x = id * dx;
			tween = true;
			sAlpha = 1;
			showDetails = true;
			rot = 0;
			slides[i].side = 0;
			slides[i].dif = 0;
		} else if(id <= half) { // right side
			plane_x = id * dx;

			if(id <= show) sAlpha = 1;
			else sAlpha = 0;

			if(id > show + 3) tween = false;
			else tween = true;

			rot = -id * deltaRotation;

			slides[i].side = 1;
			slides[i].dif = id;
		} else { // left side
			id = -(id - len);
			plane_x = -id * dx;

			if(id <= show) sAlpha = 1;
			else sAlpha = 0;

			if(id > show + 3) tween = false;
			else tween = true;

			rot = id * deltaRotation;

			slides[i].side = 2;
			slides[i].dif = id;
		}

		if(time !== 0) {
			if(tween === true) tweenRatio = 1;
			else tweenRatio = 0;
		}

		plane_z = id * dz;
		planes[i].visible = tween;

		new TWEEN.Tween(planes[i].position).to({
			x: plane_x,
			z: -plane_z,
		}, time * tweenRatio).delay(delayScale * id * tweenTime / 3).start();

		new TWEEN.Tween(planes[i].rotation).to({
			y: rot * Math.PI / 180,
		}, time * tweenRatio).delay(delayScale * id * tweenTime / 3).start();

		new TWEEN.Tween(planes[i].material).to({
			opacity: sAlpha,
		}, time * tweenRatio).delay(delayScale * id * tweenTime / 3).start();

		tweening = true;
		setTimeout(resetTween, time * 75/1000);
	}
}

function resetTween() {
	tweening = false;
}

function gotoImage(id) {
	select = id;
	var i, dir;

	if(slides[id].side === 0) {
		console.log("click action");
	} else {
		if(slides[id].side === 1) {
			dir = -1;
		} else {
			dir = 1;
		}

		for(i = 0; i < slides[id].dif; i++) {
			setTimeout(gotoDir, i * 100, dir);
		}
	}
}

// Init
window.addEventListener('load', init, false);

$$.actionInjections.push(TWEEN.update);