var canvas;

function clock() {
	canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	var ctx = canvas.getContext('2d');
	if(ctx) {
		//设置字体样式
		ctx.font = "30px Courier New";
		//设置字体填充颜色
		ctx.fillStyle = "blue";
		//从坐标点(50,50)开始绘制文字
		ctx.fillText("CodePlayer+中文测试", 50, 50);
	}
	return canvas;
}