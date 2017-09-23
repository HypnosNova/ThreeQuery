var list = {
	"3D实例": {
		"游戏": [
			[ "Entanglement", "games/entanglement/index" ],
			[ "手势识别的2048", "games/2048/index" ],
			[ "纪念碑谷第一关", "games/hypeometry/level1" ],
			[ "纪念碑谷第二关", "games/hypeometry/level2" ],
			[ "纪念碑谷第三关", "games/hypeometry/level3" ],
		],
		"工具": [
			[ "图片轮播", "tool/carousel/index" ],
		],
		"其他": [
			[ "五星红旗", "other/flag/index" ],
			[ "iWeb峰会“PPT”", "other/iWebPPT/index" ],
			[ "元素周期表（非css3d）", "other/table/index" ],
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
