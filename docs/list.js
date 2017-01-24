var list = {

	"指引": {
		"快速入门": [
			[ "框架简介 | Introduction of ThreeQuery", "指引/介绍/introduce" ],
			[ "快速创建一个场景 | Create a scene", "指引/介绍/createAScene" ],
			[ "我们要VR效果！ | We want VR effect", "指引/介绍/vrEffect" ],
			[ "场景内的事件 | Events in scene", "指引/介绍/event" ]
		]
	},

	"API文档": {

		"核心": [
			[ "$$", "$$/index" ],
			[ "$$.Component", "404" ],
			[ "$$.Controls", "$$/controls" ],
			[ "$$.global", "404" ],
			[ "$$.Move", "$$/move" ],
			[ "$$.settings", "404" ]
		],
//		"组件": [
//		  [ "绘制文字图片", "404" ],
//		  [ "计时器Timer", "404" ],
//		],
//		"拓展": [
//		  [ "TrackBallControls", "404" ],
//		  [ "OrbitContro;s", "404" ]
//		],
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
