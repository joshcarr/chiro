/*
 * chiro
 * https://github.com/joshcarr/chiro
 *
 * Copyright (c) 2013 Josh Carr
 * Licensed under the MIT license.
 */

(function($) {


var Expose = function() {
  var _element  = null,  // jquery selector MUST return array of dom elements from which the first el is taken
  _padding      = 0,
  _coords      = [];

  function getWidth(el) {
    return el.offsetWidth;
  }

  function getHeight(el) {
    return el.offsetHeight;
  }

  function getLeft(el) {
    if (el.offsetParent){ return el.offsetLeft + getLeft(el.offsetParent); }
    return el.offsetLeft;
  }

  function getTop(el) {
    if (el.offsetParent){ return el.offsetTop + getTop(el.offsetParent); }
    return el.offsetTop;
  }

  function getRight(el) {
    return getLeft(el) + getWidth(el);
  }

  function getBottom(el) {
    return getTop(el) + getHeight(el);
  }


  /**
   * calculate coordinates for the help elements
   * */
  function _calcCoords() {
    // use the first element jQuery finds
    var el = jQuery(_element)[0],
    coords = {};
    coords.t = getTop(el)     - _padding;
    coords.r = getRight(el)   + _padding;
    coords.b = getBottom(el)  + _padding;
    coords.l = getLeft(el)    - _padding;
    coords.w = getWidth(el)   + _padding * 2;
    coords.h = getHeight(el)  + _padding * 2;
    return coords;
  }

  function _drawTop() {
    var cover = ( 0 === jQuery('#exposeTop').length ) ?
                jQuery('<div id="exposeTop" class="expose"></div>').appendTo("body")
                : jQuery('#exposeTop');
    cover.css({
      'position' : 'absolute',
      'top' : '0px',
      'height' : Math.max(0, _coords.t) + 'px'
    });
  }

  function _drawBottom() {
    var cover = ( 0 === jQuery('#exposeBottom').length ) ?
                jQuery('<div id="exposeBottom" class="expose"></div>').appendTo("body")
                : jQuery('#exposeBottom');
    var top = Math.max(0, _coords.b),
        height = document.documentElement.scrollHeight - top ;
    cover.css({
      'position' : 'absolute',
      'top' : top + 'px',
      'height' : height + 'px'
    });
  }

  function _drawLeft() {
    var cover = ( 0 === jQuery('#exposeLeft').length) ?
                jQuery('<div id="exposeLeft" class="expose"></div>').appendTo("body")
                : jQuery('#exposeLeft');

    cover.css({
      'position' : 'absolute',
      'top' : _coords.t + 'px',
      'width' : Math.max(0, _coords.l) + 'px',
      'height' : _coords.h + 'px'
    });
  }

  function _drawRight() {
    var cover = (0 === jQuery('#exposeRight').length) ?
                 jQuery('<div id="exposeRight" class="expose"></div>').appendTo("body")
                 : jQuery('#exposeRight');
    cover.css({
      'position' : 'absolute',
      'top' : _coords.t + 'px',
      'left' : _coords.r + 'px',
      'height' : _coords.h + 'px'
    });
  }

  function _drawHighlight() {
    var cover = ( 0 === jQuery('#exposeHighlight').length) ?
                jQuery('<div id="exposeHighlight"></div>').appendTo("body")
                : jQuery('#exposeHighlight');
    cover.css({
      'position' : 'absolute',
      'top' : _coords.t + 'px',
      'left' : _coords.l + 'px',
      'height' : _coords.h + 'px',
      'width' : _coords.w + 'px'
    });
  }

  function _drawCover() {
    _drawTop();
    _drawBottom();
    _drawLeft();
    _drawRight();
    // _drawHighlight();
  }

  // public functions
  return {
    draw: function(element, padding) {
      _element  = element;
      _padding  = padding;
      _coords   = _calcCoords();
      _drawCover();
    },

    refresh: function() {
      _coords = _calcCoords();
      _drawCover();
    },

    getCoords: function() {
      return _coords;
    }
  };

};

  var Chiro = function ( options ) {
    // body...
  };

  if (typeof define == 'function' && define.amd){
    define(function() { return Chiro; });
  } else {
    window.Chiro = Chiro;
  }



  // Collection method.
  $.fn.chiro = function() {
    return this.each(function() {

      var expose = new Expose();
      expose.draw( $(this), 5 );



      $(window).on('resize', function () {
        expose.refresh();
      });

    });
  };

}(jQuery));
