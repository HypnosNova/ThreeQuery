/**
 * @author jonobr1 / http://jonobr1.com
 */

(function() {

  var root = this;
  var previousDetector = root.has || {};

  // Let's do a bunch of navigator detections shall we?

  var ua = root.navigator.userAgent;

  var has = {

    // Mobile Detection

    Android: !!ua.match(/Android/ig),
    Blackberry: !!ua.match(/BlackBerry/ig),
    iOS: !!ua.match(/iPhone|iPad|iPod/ig),
    Opera: !!ua.match(/Opera Mini/ig),
    Windows: !!ua.match(/IEMobile/ig),
    WebOS: !!ua.match(/webOS/ig),

    // Browser Detection

    Arora: !!ua.match(/Arora/ig),
    Chrome: !!ua.match(/Chrome/ig),
    Epiphany: !!ua.match(/Epiphany/ig),
    Firefox: !!ua.match(/Firefox/ig),
    InternetExplorer: !!ua.match(/MSIE/ig),
    Midori: !!ua.match(/Midori/ig),
    Opera: !!ua.match(/Opear/ig),
    Safari: !!ua.match(/Safari/ig),

    webgl: (function() { try { return !!window.WebGLRenderingContext && !!(document.createElement('canvas').getContext('webgl') || document.createElement('canvas').getContext('experimental-webgl')); } catch(e) { return false; } })(),

    noConflict: function() {
      return previousDetector;
    }

  };

  has.mobile = has.Android || has.Blackberry || has.iOS || has.Opera || has.Windows || has.WebOS;

  root.has = has;

})();

Detector = has;


Detector.getWebGLErrorMessage = function (message) {

  var element = document.createElement( 'div' );
  element.id = 'webgl-error-message';
  element.style.fontFamily = 'arial';
  element.style.fontSize = '13px';
  element.style.fontWeight = 'normal';
  element.style.textAlign = 'center';
  element.style.background = '#000000';
  element.style.color = '#ffffff';
  element.style.padding = '1.5em';
  element.style.width = '840px';
  element.style.height = '630px';
  element.style.margin = '2em auto';
  element.style.zIndex = '500000';
  element.style.position = 'absolute';
  element.style.pointerEvents = 'all';
  element.style.overflow = 'scroll';

  if ( ! this.webgl ) {

   element.innerHTML = message || [
     'Either your graphics card or your browser does not support WebGL. Please try again on a Windows, Mac, or Linux computer using <a href="http://www.google.com/chrome/" style="color:#ffffff; text-decoration:underline; text-transform:capitalize">Google Chrome</a><br>',
     'or another <a href="http://www.khronos.org/webgl/wiki_1_15/index.php/Getting_a_WebGL_Implementation" style="color:#ffffff; text-decoration:underline; text-transform:none"> WebGL-Compatible browser</a>. You can watch a video preview of the experiment below:',
     '<p><iframe style="margin-top:4em;" id="trailer" width=800 height=600 src="http://www.youtube.com/embed/TU6RAjABX40" frameborder="0" allowfullscreen></iframe></p>',
   ].join( '\n' );

   var youtube = $('#trailer');

   var $window = $(window);
   var $element = $(element);

   $window
     .resize(function(e) {

       // console.log('resizing');
       $element
         .width( $window.width() )
         .height( $window.height() );
       // youtube
       //  .width($window.width())
       //  .height($window.height());

     })
     .trigger('resize');

  }

  return element;

};

Detector.addGetWebGLMessage = function ( message ) {

  var parent, id, element;

  parameters = window.parameters || {};

  parent = parameters.parent !== undefined ? parameters.parent : document.body;
  id = parameters.id !== undefined ? parameters.id : 'oldie';

  element = Detector.getWebGLErrorMessage(message);
  element.id = id;

  $(element).css({
   border: 0,
   padding: 0,
  });

  parent.appendChild( element );

};
