/**
 * @author alteredq / http://alteredqualia.com/
 */
/*
///Gyroscope对象陀螺仪,听名字很神奇,一个陀螺仪对象的抽象基类.应该适用于移动端的.应该是将这个对象作为某个Object3D对象的子对象,
/// 根据3d陀螺仪的数据,更新绑定对象的坐标,方位之类的.
///
*/
///<summary>Gyroscope</summary>
THREE.Gyroscope = function () {

	THREE.Object3D.call( this );	//调用Object3D对象的call方法,将原本属于Object3D的方法交给当前对象Gyroscope来使用.

};
/*************************************************
****下面是Gyroscope对象的方法属性定义,继承自Object3D
**************************************************/
THREE.Gyroscope.prototype = Object.create( THREE.Object3D.prototype );

/*
///updateMatrixWorld方法对当前对象及其父对象和子对象的matrix属性应用全局位移,旋转,缩放变换.
///NOTE: 在updateMatrixWorld方法中如果参数force为true,将对其父对象的子对象应用同样的全局变换.
*/
///<summary>updateMatrixWorld</summary>
///<param name ="force" type="Boolean">true或者false</param>
///<returns type="Object3D">返回新的Object3D对象</returns>		
THREE.Gyroscope.prototype.updateMatrixWorld = function ( force ) {

	this.matrixAutoUpdate && this.updateMatrix();

	// update matrixWorld

	if ( this.matrixWorldNeedsUpdate || force ) {

		if ( this.parent ) {

			this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			this.matrixWorld.decompose( this.translationWorld, this.quaternionWorld, this.scaleWorld );
			this.matrix.decompose( this.translationObject, this.quaternionObject, this.scaleObject );

			this.matrixWorld.compose( this.translationWorld, this.quaternionObject, this.scaleWorld );


		} else {

			this.matrixWorld.copy( this.matrix );

		}


		this.matrixWorldNeedsUpdate = false;

		force = true;

	}

	// update children

	for ( var i = 0, l = this.children.length; i < l; i ++ ) {

		this.children[ i ].updateMatrixWorld( force );	//更新父对象的所有子对象

	}

};

THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3();	//位置变换世界坐标三维向量
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3();	//位置变换对象坐标三维向量
THREE.Gyroscope.prototype.quaternionWorld = new THREE.Quaternion();	//旋转变换世界坐标三维向量
THREE.Gyroscope.prototype.quaternionObject = new THREE.Quaternion();	//旋转变换对象坐标三维向量
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3();		//缩放变换世界坐标三维向量
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3();	//缩放变换对象坐标三维向量