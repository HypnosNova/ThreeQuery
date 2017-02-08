(function() {

  // reference to window
  var root = window;

  // globals taken from scss
  var border_width = 1;
  var padding = 30;

  // Loading variables
  var ready = false;
  var count = 0;
  var timer = null
  var dragged = false;

  // SVG loadables
  var $soundOn, $soundOff, $heatvision, $tour, $home;

  // jQuery elements
  var $domElement = $('#minimap');
  var $minimap = $domElement.find('#zoom-levels');
  var $volume = $domElement.find('#volume').load(updateCount);
  var $about = $domElement.find('#about').load(updateCount);
  // var $tour = $domElement.find('#tour').load(updateCount);
  // var $heatvision = $domElement.find('#heatvision').load(updateCount);
  // var $sound = $domElement.find('#sound').load(updateCount);
  // var $soundoff = $domElement.find('#soundoff').load(updateCount);
  // var $backdrop = $domElement.find("#zoom-backdrop");
  var $cursor = $domElement.find('#zoom-cursor');

  // Calculation variables
  var POWER = 3;
  var position = 0; // The default position of the cursor, as a pct (%).
  var curve = function(t) {
    return Math.pow(t, 1 / POWER);
  };
  var curve_inverse = function(t) {
    return Math.pow(t, POWER);
  };

  var $window = $(window);

  function clickEvent( e ){
    // console.log('touched outside');
    var id = $(e.target).attr('id');

    if (dragged || (id !== 'css-world' && id !== 'css-camera' && id !== 'glContainer')) {
      dragged = false;
      return;
    }

    unfocus();
  }

  function touchEvent( e ){
    var event = e.originalEvent;
    var id = $(event.target).attr('id');

    if (dragged || (id !== 'css-world' && id !== 'css-camera' && id !== 'glContainer')) {
      dragged = false;
      return;
    }

    unfocus();    
  }

  $window.click( clickEvent );

  $window
    .resize(function() {
      if (!ready) {
        // If not all images are loaded then we need to halt this procedure
        // and time it out.
        if (timer) {
          updateCount();
          clearTimeout(timer);
        }
        timer = setTimeout(function() {
          if( firstTime == false )
            $window.trigger('resize');
        }, 500);

        return;

      }

      var offset = $volume.outerHeight() + $about.outerHeight() + padding;
      var h = $domElement.height() - offset;

      $minimap.height(h - border_width * 2);

    // // Now that we're ready fade in the entire minimap.
    if (!$domElement.hasClass('ready')) {
      $domElement.addClass('ready');
    }

    })
    .bind('mouseup', onWindowMouseUp)
    .bind('touchend', onWindowMouseUp)
    .trigger('resize');

  // Exports

  // Create an initializer

  var initializeMinimap = root.initializeMinimap = function() {

    this.updateMinimap();

  };

  // A means to update the minimap

  var updateMinimap = root.updateMinimap = function() {

    if (!root.camera) {
      return;
    }

    var normal = cmap(root.camera.position.target.z, 1.1, 40000, 0, 1);
    position = cmap(curve(normal), 0, 1, 0, 100);
    updateCursorPosition(true);

  };

  var setScrollPosition = root.setScrollPositionFromTouch = function( touch ){
    var y = (touch.pageY - $minimap.offset().top);
    position = cmap(y, 0, $minimap.height(), 0, 100);
    updateCursorPosition();
  }

  var setMinimap = root.setMinimap = function(b) {
    dragged = !!b;
  };

  var showSunButton = root.showSunButton = function() {
    // $home.css({
    //   height: 25 + 'px'
    // });
    // setTimeout(function() {
    //   $window.trigger('resize');
    // }, 250);
    
    if ($home) {
      // console.log("show home button");
      // $home.fadeIn();
      $home.css({opacity:1.0,display:'inline'});
    }
  };

  var hideSunButton = root.hideSunButton = function() {
    // $home.fadeOut();
    // $home.css({
    //   height: 0
    // });
    // setTimeout(function() {
    //   $window.trigger('resize');
    // }, 250);
    if ($home) {
      $home.fadeOut();
    }
  };

  /**
   * Setup the dragging functionality for the minimap
   */

  $minimap
    .bind('mousedown', onElementMouseDown);

  $minimap
    .bind('touchstart', onElementTouchStart);

  // $home
  //   .css({
  //     height: 0,
  //     overflow: 'hidden'
  //   })
  //   // .tip('Center camera on the sun.')
  //   .click(function(e) {
  //     // markers[0].$.trigger('click');
  //     unfocus(true);
  //   });

  $about
    .click(function(e) {

      var line_height = 20;
      e.preventDefault();

      $detailContainer.addClass('about');

      $('#css-container').css('display', 'none');

      $.get('detail/about.html', function(data) {
        $('#detailBody').html(data);
      });

      $('#detailTitle').find('span').html('100,000 Stars');

      $detailContainer.css({
        paddingTop: line_height * 3 + 'px'
      });

      $detailContainer.fadeIn();

    });

  var muted = localStorage.getItem('sound') === '0';

  $.get('./images/icons/sound-on.svg', function(resp) {
    $soundOn = $(resp).find('svg').addClass('icon')
      .css({
        display: muted ? 'none' : 'block'
      })
      .click(function(e) {
        e.preventDefault();
        $soundOn.css({ display: 'none' });
        muteSound();
        if ($soundOff) {
          $soundOff.css({ display: 'inline-block' });
        }
      });
    $volume.append($soundOn);
  });

  $.get('./images/icons/sound-off.svg', function(resp) {
    $soundOff = $(resp).find('svg').addClass('icon')
      .css({
        display: !muted ? 'none' : 'block'
      })
      .click(function(e) {
        e.preventDefault();
        $soundOff.css({ display: 'none' });
        unmuteSound();
        if ($soundOn) {
          $soundOn.css({ display: 'inline-block' });
        }
      });
      $volume.append($soundOff);
  });

  $.get('./images/icons/big-tour.svg', function(resp) {

    $tour = $(resp).find('svg').addClass('icon')
      .attr('id', 'tour-button')
      .tip('Take a tour.')
      .click(function(e) {
        e.preventDefault();
        tour.start();
      });
    $iconNav.append($tour);

    $.get('./images/icons/heat-vision.svg', function(resp) {

      $heatvision = $(resp).find('svg').addClass('icon')
        .click(function(e) {
          e.preventDefault();
          toggleHeatVision();
        })
        .hover(function(e) {
          $tour.trigger('mouseleave', [true]);
        }, function(e) {
          $tour.trigger('mouseenter');
        })
        .tip('Toggle Spectral Index.');
      $iconNav.append($heatvision);

      $.get('./images/icons/center-sun.svg', function(resp) {
        $home = $(resp).find('svg').addClass('icon')
          .tip('Center camera position to the Sun.')
          .hover(function(e) {
            $tour.trigger('mouseleave', [true]);
          }, function(e) {
            $tour.trigger('mouseenter');
          })
          .click(function(e) {
            e.preventDefault();
            unfocus(true);
          })
          .css({
            display: 'none'
          });
        $iconNav.append($home);
      });

    });

  });

  function onElementMouseDown(e) {

    var y = (e.pageY - $minimap.offset().top);
    position = cmap(y, 0, $minimap.height(), 0, 100);

    updateCursorPosition();

    $window
      .bind('mousemove', drag);
  }

  function onElementTouchStart(e){
    var event = e.originalEvent;
    var touch = event.touches[0];

    var y = (touch.pageY - $minimap.offset().top);
    position = cmap(y, 0, $minimap.height(), 0, 100);

    updateCursorPosition();    
    root.scrollbaring = true;
    // $window
    //   .bind('touchmove', dragTouch);    
  }

  function drag(e) {
    var y = (e.pageY - $minimap.offset().top);
    position = cmap(y, 0, $minimap.height(), 0, 100);

    updateCursorPosition();

  }

  function dragTouch(e){    
    var event = e.originalEvent;
    if( event.touches.length != 1 )
      return;    

    // event.preventDefault();    
    // event.stopImmediatePropagation();
    // Make sure the document doesn't scroll
    // document.body.scrollTop = document.body.scrollLeft = 0;
  }

  function onWindowMouseUp(e) {
    // console.log('minimap end');
    $window
      .unbind('mousemove', drag);
    $window
      .unbind('touchmove', dragTouch);
  }

  function updateCursorPosition(silent) {

    $cursor.css({
      top: position + '%'
    });
    if (!silent) {
      updateCameraPosition();
    }

  }

  function updateCameraPosition() {

    if (root.camera) {
      var normal = position / 100;
      root.camera.position.target.z = cmap(curve_inverse(normal), 0, 1, 1.1, 40000);
      root.camera.position.target.pz = root.camera.position.target.z;
    }

  }

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  function cmap(v, i1, i2, o1, o2) {
    return Math.max(Math.min(map(v, i1, i2, o1, o2), o2), o1);
  }

  function unfocus(home) {
    $('#detailContainer').fadeOut();
    $('#css-container').css('display', 'block');
    if (!!home) {
      centerOnSun();
      setTimeout(hideSunButton, 500);
      zoomOut(555);
    } else {
      // zoomOut();
    }
  }

  function updateCount() {
    if (count < 3) {
      count++;
    } else if (!ready) {
      ready = true;
    }
  }

})();