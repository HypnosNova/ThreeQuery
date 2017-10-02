var [scene, renderer, camera] = $$.init({
	clearColor: 0xf0edf2
}, {}, {
	type: "OrthographicCamera"
});
$$.animate();
camera.position.z = 1000;
camera.lookAt(scene.position);

var body = new $$.Body();
scene.add(body);

var width = $$.getWorldWidth() * 4;
var video = new $$.Video("media/header.webm", {
	width: width,
	height: width / 2
});
video.video.autoplay = "autoplay";
video.video.loop = "loop";
body.add(video);

var row = new $$.Set({
	width: width * 2,
	height: width / 34,
	backgroundColor: "rgba(2,25,72,.3)"
});
row.position.set(0, width / 17, 1);
body.add(row);
var img = new $$.Img("img/logo.png", {
	width: width / 25,
	height: width / 55
});
img.position.set(-width / 8.9, 0, 1);
row.add(img);

var ow = new $$.Img("img/ow.png", {
	width: width / 4,
	height: width / 4 / 973 * 574
});
ow.position.set(0, width / 62, 1);
body.add(ow);

var text1 = new $$.Txt("游戏", {
	fontSize: width / 90,
	width: width / 25,
	height: width / 50,
	fontWeight: "bold"
});
text1.position.set(-width / 10, 0, 1);
row.add(text1);

var text1 = new $$.Txt("商城", {
	fontSize: width / 90,
	width: width / 25,
	height: width / 50,
	fontWeight: "bold",
	color: "rgba(255,255,255,0.7)"
});
text1.position.set(-width / 10 + width / 70, 0, 1);
row.add(text1);

var text1 = new $$.Txt("电竞", {
	fontSize: width / 90,
	width: width / 25,
	height: width / 50,
	fontWeight: "bold",
	color: "rgba(255,255,255,0.7)"
});
text1.position.set(-width / 10 + width / 35, 0, 1);
row.add(text1);

var row2 = new $$.Set({
	width: width * 0.90,
	height: width / 25,
	backgroundColor: "rgba(40,53,79,.9)"
});
row2.position.set(0, width / 21.7, 1);
body.add(row2);

var owcn = new $$.Img("img/owcn2.png", {
	width: width / 25 * 203 / 60,
	height: width / 25,
});
owcn.position.set(-width / 10.91, 0, 1);
row2.add(owcn);

var css = {
	fontSize: width / 90,
	width: width * 0.063,
	height: width / 25,
	fontWeight: "bold",
	color: "rgba(255,255,255,0.7)"
};
var dataArr = ["游戏", "英雄", "活动", "视频图片", "新闻", "下载", "生涯数据", "电子竞技", "论坛"];
for(var i in dataArr) {
	var text = new $$.Txt(dataArr[i], css);
	text.position.set(-width / 11 + width / 35 + width * 0.0158 * i, 0, 2);
	row2.add(text);
	text.element.onEnter = function(obj) {
		var theText = obj.object.parent;
		theText.css.backgroundColor = "rgba(255,255,255,.1)";
		theText.css.color = "#ffffff";
		theText.update();
	};
	text.element.onLeave = function(obj) {
		var theText = obj.object.parent;
		theText.css.backgroundColor = "rgba(0,0,0,0)";
		theText.css.color = "rgba(255,255,255,0.7)";
		theText.update();
	};
}
css = {
	fontSize: width / 90,
	width: width * 0.063,
	height: width / 25,
	fontWeight: "bold",
	color: "rgba(255,255,255,0.7)",
	backgroundColor: "#f7931e"
};
var text = new $$.Txt("购买", css);
text.position.set(width * 0.1046, 0, 2);
row2.add(text);
text.element.onEnter = function(obj) {
	var theText = obj.object.parent;
	theText.css.backgroundColor = "#f7a32e";
	theText.css.color = "#ffffff";
	theText.update();
};
text.element.onLeave = function(obj) {
	var theText = obj.object.parent;
	theText.css.backgroundColor = "#f7931e";
	theText.css.color = "rgba(255,255,255,0.7)";
	theText.update();
};
css = {
	fontSize: width / 90,
	width: width * 0.1,
	height: width / 35,
	fontWeight: "bold",
	color: "#333",
	backgroundColor: "#f7931e"
};
var text = new $$.Txt("立即购买", css);
text.position.set(0, -width * 0.006, 1);
body.add(text);
text.element.onEnter = function(obj) {
	var theText = obj.object.parent;
	theText.css.backgroundColor = "#f7a32e";
	theText.update();
};
text.element.onLeave = function(obj) {
	var theText = obj.object.parent;
	theText.css.backgroundColor = "#f7931e";
	theText.update();
};
var goty = new $$.Img("img/goty.png", {
	width: width / 10,
	height: width / 50 * 4
});
goty.position.set(width * 0.11, -width / 20, 1);
body.add(goty);

//下面是第二块内容
text = new $$.Txt("新闻公告", {
	fontStyle: "italic",
	color: "#405275",
	fontSize: width / 50,
	width: width,
	height: width / 40,
});
text.position.set(0, -width * 0.071, 2);
body.add(text);

var img = new $$.Img("img/left.jpg", {
	width: width / 2.65,
	height: width / 696 / 2.65 * 306
});
img.position.set(-width * 0.05, -width * 0.099, 1);
body.add(img);
var row = new $$.Set({
	width: width / 2.65,
	height: width / 34,
	backgroundColor: "rgba(0,0,0,0.75)"
});
row.position.set(0, -0.017 * width, 1);
img.add(row);

text = new $$.Txt("9月29日-10月5日国庆免费周，畅玩版直降70元！", {
	fontStyle: "italic",
	color: "#ffffff",
	fontSize: width / 80,
	width: width,
	height: width / 70,
	fontWeight: 400
});
text.position.set(-width * 0.01, 0, 2);
row.add(text);

var img = new $$.Img("img/right.jpg", {
	width: width / 2.65,
	height: width / 696 / 2.65 * 306
});
img.position.set(width * 0.05, -width * 0.099, 1);
body.add(img);

var row = new $$.Set({
	width: width / 2.65,
	height: width / 34,
	backgroundColor: "rgba(0,0,0,0.75)"
});
row.position.set(0, -0.017 * width, 1);
img.add(row);
text = new $$.Txt("全新地图：渣客镇 | 现已上线", {
	fontStyle: "italic",
	color: "#ffffff",
	fontSize: width / 80,
	width: width,
	height: width / 70,
	fontWeight: 400
});
text.position.set(-width * 0.0242, 0, 2);
row.add(text);

var img = new $$.Img("img/news1.png", {
	width: width / 4.8,
	height: width / 4.8 / 938 * 142
});
img.position.set(0, -width * 0.132, 3);
body.add(img);

var img = new $$.Img("img/news2.png", {
	width: width / 4.8,
	height: width / 4.8 / 938 * 142,
	opacity: 0
});
img.position.set(0, -width * 0.132, 4);
body.add(img);
img.element.onEnter = function(obj) {
	new TWEEN.Tween(obj.object.material).to({
		opacity: 1
	}, 300).start();
}
img.element.onLeave = function(obj) {
	new TWEEN.Tween(obj.object.material).to({
		opacity: 0
	}, 300).start();
}

//第三块---------------------------------------------------------------
var gifArr = [];
var img = new $$.Img("img/gif1.jpg", {
	width: width * 2,
	height: width * 2 / 2560 * 690
});
img.position.set(0, -width * 0.215, 1);
body.add(img);
gifArr.push(img);
var img = new $$.Img("img/gif2.jpg", {
	width: width * 2,
	height: width * 2 / 2560 * 690,
	opacity: 0
});
img.position.set(0, -width * 0.215, 1);
body.add(img);
gifArr.push(img);
var img = new $$.Img("img/gif3.jpg", {
	width: width * 2,
	height: width * 2 / 2560 * 690,
	opacity: 0
});
img.position.set(0, -width * 0.215, 1);
body.add(img);
gifArr.push(img);

text = new $$.Txt("为未来而战", {
	fontStyle: "italic",
	color: "#ffffff",
	fontSize: width / 20,
	width: width/3,
	height: width / 18,
	fontWeight: 400
});
text.position.set(0, -width * 0.169, 2);
body.add(text);

var articleCss={
	color: "#ffffff",
	fontSize: width / 54,
	width: width,
	height: width / 48,
	fontWeight: 400
}
text = new $$.Txt("军人、科学家、冒险家、奇人异士。", articleCss);
text.position.set(0, -width * 0.185, 2);
body.add(text);
text = new $$.Txt("在人类陷入空前危机之时，来自全球各个国家的特种精英们，为了结束战争、重铸秩序而团结", articleCss);
text.position.set(0, -width * 0.1975, 2);
body.add(text);
text = new $$.Txt("在了一起。他们，就是守望先锋。", articleCss);
text.position.set(0, -width * 0.203, 2);
body.add(text);
text = new $$.Txt("英雄们最终结束了这场危机，人类文明在随后的数十年内和平共存并迎来了一个探索、革新和", articleCss);
text.position.set(0, -width * 0.2155, 2);
body.add(text);
text = new $$.Txt("发现的新时代。尽管如此，守望先锋在多年后逐渐被人们所遗忘，最终难逃被解散的命运。", articleCss);
text.position.set(0, -width * 0.221, 2);
body.add(text);
text = new $$.Txt("如今，世界各地争端再起，人们都翘首期待着新英雄的出现，或旧英雄的归来。", articleCss);
text.position.set(0, -width * 0.239, 2);
body.add(text);
text = new $$.Txt("你愿意与我们共同抗争吗？", articleCss);
text.position.set(0, -width * 0.2515, 2);
body.add(text);


$$.Loader.onLoadComplete = function() {
	var tweenG1 = new TWEEN.Tween(gifArr[0].element.material).to({
		opacity: 1
	},2000).delay(5000).onComplete(function() {
		tweenG2.start();
		tweenG4.start();
	});
	var tweenG2 = new TWEEN.Tween(gifArr[1].element.material).to({
		opacity: 1
	},2000).delay(5000).onComplete(function() {
		tweenG3.start();
		tweenG5.start();
	});
	var tweenG3 = new TWEEN.Tween(gifArr[2].element.material).to({
		opacity: 1
	},2000).delay(5000).onComplete(function() {
		tweenG1.start();
		tweenG6.start();
	});
	var tweenG4 = new TWEEN.Tween(gifArr[0].element.material).to({
		opacity: 0
	},2000).delay(5000);
	var tweenG5 = new TWEEN.Tween(gifArr[1].element.material).to({
		opacity: 0
	},2000).delay(5000);
	var tweenG6 = new TWEEN.Tween(gifArr[2].element.material);
	tweenG6.to({
		opacity: 0
	},2000).delay(5000);
	tweenG1.start();
}