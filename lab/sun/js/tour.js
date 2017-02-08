var GALAXY_TOUR = [
  {"rx":-0.18605511827781787,"ry":-2.464222597755626,"z":1.1,"travelTime":5000,"restTime":4000,"message":"This is the Sun, our home star."},
  {"rx":1.4395420537811414,"ry":6.281532559509658,"z":5.148607771018531,"travelTime":4000,"restTime":3000,"message":"It would take 18 years for a jet airplane to fly to the sun.","callback":displaySunEarthDiagram},
  {"rx":0.8369933670834534,"ry":1.837770087331788,"z":30.937978822676058,"travelTime":4000,"restTime":5000,"message":"The furthest man-made object, Voyager 1, is now almost 17 light hours away."}, 
  {"rx":0.6424544063335803,"ry":-0.0031800804774647718,"z":198.23179619362583,"travelTime":3000,"restTime":5000,"message":"This is the length of one light year, the distance that light can travel in a year."},  
  {"rx":0.503337952515914,"ry":-0.9904961225532652,"z":432.34847195438465,"travelTime":4000,"restTime":8000,"message":"These are the stars closest to our solar system.<br>The nearest star system, Alpha Centauri, is 4.3 light years away."},
  {"rx":0.0019755752638865747,"ry":0.23341774437325485,"z":1210.7034532510997,"travelTime":4000,"restTime":5000,"message":"Named stars that astronomers have studied are highlighted here."},
  {"rx":0.5522785678088462,"ry":1.324151395815386,"z":1672.4214873346518,"travelTime":5000,"restTime":5000,"message":"You're seeing the actual density and location of over 100,000 stars in this view."},
  {"rx":-0.4155179986306899,"ry":2.5204046098483026,"z":31782.290495394205,"travelTime":5000,"restTime":5000,"message":"Blue, hotter burning stars reside closer to the galactic plane.", "callback":highlightStarHeat},
  {"rx":-0.12216429754294249,"ry":1.9989722678912,"z":79999.99999999994,"travelTime":5000,"restTime":5000,"message":"All of which are in the Milky Way... which has 200 to 400 billion stars in total.", "callback":highlightMilkyWay},
  {"rx":0,"ry":0,"z":1.1,"travelTime":10000,"restTime":6000,"message":"Go forth and explore. Click, drag and zoom with your mouse."},  
];

var cinematic_width = 75;

var Tour = function(stops) {

  this.current = 0;
  this.states = stops;
  this.touring = false;
  this.timingBuffer = 0;
  this.timers = [];

  this.domElement = $('<div id="theater" />')
    .css({
      display: 'none',
      position: 'fixed',
      zIndex: 9998,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 100 + '%',
      height: 100 + '%'
    })
    .html('<div class="top-bar"></div><div class="bottom-bar"></div><div class="message" style="display: none;"></div>');

  this.top = this.domElement.find('.top-bar');
  this.bottom = this.domElement.find('.bottom-bar');
  this.content = this.domElement.find('.message');
  // this.content.html('<p>' + this.states[0].message + '</p>');

};

// Statics
Tour.Easing = TWEEN.Easing.Sinusoidal.InOut;
Tour.Duration = 250;
Tour.meta = $('#meta');
Tour.timeouts = [];

// Proto
Tour.prototype = {

  getState: function() {

    var camera_state = {
      rx: camera.rotation.x,
      ry: camera.rotation.y,
      z: camera.position.z
    };

    var state;

    for (var m in this.states) {
      var s = this.states[m];
      if (camera_state.z === s.z) {
        state = s;
        break;
      }
    }

    return state || camera_state;

  },

  start: function() {
    var _this = this, next;
    if( _this.current == 0 ){
      next = $('<a href="#" />')
      .html('Stop')
      .click(function(e) {
        e.preventDefault();
        _this.stop();
        // _this.next(true);
      });
    }
    
    _this.current = 0;
    _this.touring = false;
    _this.timingBuffer = 0;

    //  clear out everything if tour restarts
    _this.content.html('');
    Tour.meta.fadeOut();
    _this.domElement.fadeOut();

    var p = Tour.meta.find('p').html(next);
    Tour.meta.css({
      marginLeft: - Tour.meta.width() / 2 + 'px'
    });

    this.show(function() {

      camera.__tour = this.touring = true;
      this.current = 0;
      this.next(true);

    });

    //  close the detail container if it's open
    $detailContainer.fadeOut();
    centerOn( new THREE.Vector3(0,0,0) );
    if( markers.length > 0 )
      markers[0].select();  
    camera.position.target.x = 0;

    toggleHeatVision( false );

    return this;

  },

  stop: function() {

    this.hide();

    camera.__tour = false;
    this.touring = false;

    rotateX = rotating.rotation.x;
    rotateY = rotating.rotation.y;
    TWEEN.removeAll();

    return this;

  },

  show: function(callback) {

    var _this = this;

    this.domElement.appendTo(document.body).fadeIn(function() {

      Tour.meta.fadeIn();

      // Tour.meta.animate({
      //   marginBottom: cinematic_width + 'px'
      // }, Tour.Duration, 'swing');

      _this.bottom.animate({
        marginBottom: 0
      }, Tour.Duration, 'swing');

      _this.top.animate({
        marginTop: 0
      }, Tour.Duration, 'swing', function() {

        if (callback) {
          callback.call(_this);
        }

      });

    });

    return this;

  },

  hide: function(callback) {

    var _this = this;

    Tour.meta.fadeOut();

    // Tour.meta.animate({
    //   marginBottom: 0
    // }, Tour.Duration, 'swing');

    this.bottom.animate({
      marginBottom: - cinematic_width + 'px'
    }, Tour.Duration, 'swing');

    this.top.animate({
      marginTop: - cinematic_width + 'px'
    }, Tour.Duration, 'swing', function() {

      _this.domElement.fadeOut();

      if (callback) {
        callback.call(_this);
      }

    });

    return this;

  },

  showMessage: function( message, duration, callback ){    

    var _this = this;
    _this.show();    

    var onStart = function(){
      // console.log("starting message");
      _this.content.html('<p><span>' + message + '</span></p>');
      _this.content.fadeIn();

      var next = $('<a href="#" />')
      .html('Skip')
      .click(function(e) {
        e.preventDefault();
        _this.hide();
        Tour.meta.fadeOut();
        _this.timingBuffer = 0.0;
        _this.clearTimers();        
        firstTime = false;
        $(window).trigger('resize');
      });      
      var p = Tour.meta.find('p').html(next);
      Tour.meta.css({
        marginLeft: - Tour.meta.width() / 2 + 'px'
      });
    };
    _this.timers.push( window.setTimeout( onStart, _this.timingBuffer + 1000.0 ) );

    var onFinished = function(){
      // console.log("ending messages");
      _this.content.fadeOut( function(){
        if( callback )
          callback();
        //_this.hide();
      });      
    }

    _this.timingBuffer += duration + 1000.0;
    _this.timers.push( window.setTimeout( onFinished, _this.timingBuffer ) );

    // console.log( 'setting timeouts ', _this.timers );

    return this;
  },

  clearTimers: function(){    
    for( var i in this.timers ){
      var timer = this.timers[i];
      window.clearTimeout( timer );
    }
    // console.log( 'clearing timeouts ', this.timers );
  },

  endMessages: function(){
    var _this = this;
    var timer = window.setTimeout( function(){
      _this.hide();
    }, _this.timingBuffer + 1000.0 );
    _this.timers.push( timer );
  },

  next: function(continuous) {

    var _this = this;
    var state = this.state = this.states[this.current];

    _.each(Tour.timeouts, clearTimeout);

    if (this.current === this.states.length - 1) {
      //Tour.meta.find('a').html('Stop');
    }

    if (!state) {
      this.stop();
      return this;
    }
    this.current++;

    if( state.callback )
      this.arrivalCallback = state.callback;
    else
      this.arrivalCallback = undefined;

    if (this.content.css('display') != 'none') {
      this.content.fadeOut(function() {
        _this.content.html('<p><span>' + state.message + '</span></p>');
      });
    } else {
      this.content.html('<p><span>' + state.message + '</span></p>');
    }

    this.rotating_tween = new TWEEN.Tween(rotating.rotation)
      .to({
        x: state.rx,
        y: state.ry
      }, state.travelTime)
      .easing(Tour.Easing)
      .start();

    this.camera_tween = new TWEEN.Tween(camera.position)
      .to({
        z: state.z
      }, state.travelTime)
      .easing(Tour.Easing)
      .onComplete(function() {
        camera.position.target.z = camera.position.z;
        if( _this.arrivalCallback )
          _this.arrivalCallback();
        _this.content.fadeIn(function() {
          Tour.timeouts.push(setTimeout(function() {
            if (continuous) {
              _this.next(true);
            }
          }, state.restTime));
        });
      })
      .start();

    return this;

  },

  previous: function(continuous) {

    return this;

  }

};

// Method for saving out JSON objects of the tour
var getTourState = function(t1, t2, msg) {
  return JSON.stringify({
    rx: rotating.rotation.x,
    ry: rotating.rotation.y,
    z: camera.position.z,
    travelTime: t1 || 1500,
    restTime: t2 || 3000,
    message: msg || ''
  });
};