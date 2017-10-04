var list = {
	"初级实例": {
		"框架相关": [
			[ "空的框架", "framework/001空的框架" ],
			[ "在指定的div里渲染", "framework/002在指定的div里渲染" ],
			[ "一个静止的立方体", "framework/003一个静止的立方体" ],
			[ "一个会转动的立方体", "framework/004一个会转动的立方体" ],
			[ "加入光源", "framework/005加入光源" ],
			[ "试一试VR效果", "framework/006试一试VR效果" ],
			[ "加载图片资源", "framework/007加载图片资源" ],
			[ "球形轨道控制器", "framework/008球形轨道控制器" ],
			[ "视野控制器", "framework/009视野控制器" ],
			[ "手机传感器控制器", "framework/010手机传感器控制手机页面的相机角度" ],
			[ "全屏与非全屏切换", "framework/011全屏与非全屏切换" ],
			[ "物体的各类事件", "framework/012物体的各类事件" ],
			[ "天空盒子", "framework/013天空盒子" ],
			[ "天空球", "framework/014天空球" ],
			[ "大海", "framework/015大海" ],
			[ "文字", "framework/016文字" ],
			[ "加载中文字体", "framework/017加载字体ttf" ],
			[ "第一人称视角", "framework/018第一人称视角" ],
			[ "中心点事件", "framework/019中心点事件" ],
			[ "镜子", "framework/020镜子" ],
			[ "画2D文字", "framework/021在物体上画2D文字" ],
			[ "粒子", "framework/022粒子" ],
			[ "计时器", "framework/023计时器" ],
			[ "调用摄像头", "framework/024调用摄像头" ],
			[ "简单tween动画", "framework/025简单tween动画" ],
			[ "全景视频", "framework/026视频" ],
			[ "全景VR视频", "framework/027全景VR" ],
			[ "场景切换过渡效果", "framework/028场景切换过渡效果" ],
			[ "场景渲染到纹理", "framework/029场景渲染到纹理" ],
		]
	},
	"Shader为主的例子": {
		"主要部分是着色器": [
			[ "万圣节效果的时间特效", "games/shader/clock" ],
		]
	}
	"高级实例": {
		"游戏": [
			[ "Entanglement", "games/entanglement/index" ],
			[ "手势识别的2048", "games/2048/index" ],
			[ "纪念碑谷第一关", "games/hypeometry/level1" ],
			[ "纪念碑谷第二关", "games/hypeometry/level2" ],
			[ "纪念碑谷第三关", "games/hypeometry/level3" ],
		],
		"工具": [
			[ "图片轮播", "tool/carousel/index" ],
			[ "二维码", "tool/qrcode/index" ],
		],
		"其他": [
			[ "五星红旗", "other/flag/index" ],
			[ "iWeb峰会“PPT”", "other/iWebPPT/index" ],
			[ "元素周期表（非css3d）", "other/table/index" ],
			[ "守望先锋官网仿制", "other/overwatch/index" ],
			[ "公司的办公室", "other/office/index" ],
			[ "几何体爆炸", "other/exploration/index" ],
			[ "平板电脑", "other/pad/index" ]
		]
	}
	
};

var pages = {};

for ( var section in list ) {

	pages[ section ] = {};

	for ( var category in list[ section ] ) {

		pages[ section ][ category ] = {};

		for ( var i = 0; i < list[ section ][ category ].length; i ++ ) {

			var page = list[ section ][ category ][ i ];
			pages[ section ][ category ][ page[ 0 ] ] = page[ 1 ];

		}

	}

}
