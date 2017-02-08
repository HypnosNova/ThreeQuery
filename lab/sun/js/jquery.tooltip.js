/**
 * @author jonobr1 / http://jonobr1.com
 */

(function($) {

  $.fn.tip = function(message) {

    var duration = 200;
    var $this = this;

    var tip = $('<div class="tip" />')
      .css({
        position: 'absolute'
      })
      .html('<div>' + message + '</div>');

    var $window = $(window);

    var over = function() {

      var $elem = $this.parent();

      var rect = $elem[0].getBoundingClientRect();
      var offset = $elem.offset();
      var width = $elem.width();
      var height = $elem.height();

      tip
        .css({
          display: 'none',
          top: rect.bottom + 'px',
          left: 20 + 'px'
        })
        // .appendTo(document.body)
        .appendTo($elem)
        .fadeIn(duration);

    };

    var out = function(e, forced) {

      if ($this.attr('id') == 'tour-button' && !forced) {
        return;
      }

      tip.fadeOut(duration);

    };

    this.hover(over, out).click(function(e) {
      e.preventDefault();
      out(e, true);
    });

    return this;

  };

})(jQuery);