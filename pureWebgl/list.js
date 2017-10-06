var list = {
	"原生WebGL实例": {
		"基础部分": [
			[ "空的框架", "demo/0" ],
			[ "画个纯色三角形", "demo/1" ],
			[ "画个渐变色三角形", "demo/2" ],
			[ "矩阵的使用", "demo/3" ],
			[ "一个会转动的三角形", "demo/4" ],
			[ "一个会转动的立方体", "demo/5" ],
		]
	},
	
	
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
