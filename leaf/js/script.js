// Generated by CoffeeScript 1.7.1
var alignChildren, checkResize, elements, getPlatform, init, makeSquare, rows;

$('img').each(function() {
  if (!$(this).attr('src')) {
    return $(this).attr('src', window.app_url + 'assets/image/dummies/dummy-rectangular.jpg');
  }
});

getPlatform = function() {
  return window.getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/'/g, '').replace(/"/g, '');
};

rows = {
  'mod-row': ['card', 'tile'],
  'mod-lists .clearfix': ['pull-left', 'pull-right']
};

alignChildren = function(rows) {
  var children, row, _results;
  if (rows == null) {
    rows = {};
  }
  _results = [];
  for (row in rows) {
    children = rows[row];
    _results.push($('.' + row).each(function() {
      var child, parent, tallest, _i, _len, _results1;
      parent = $(this);
      tallest = false;
      _results1 = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        child = children[_i];
        parent.find('.' + child).each(function() {
          var height, obj;
          obj = $(this);
          obj.css('height', 'auto');
          height = obj.outerHeight();
          if (height > tallest) {
            return tallest = height;
          }
        });
        if (tallest) {
          _results1.push((function() {
            var _j, _len1, _results2;
            _results2 = [];
            for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
              child = children[_j];
              _results2.push(parent.find('.' + child).css('height', tallest));
            }
            return _results2;
          })());
        } else {
          _results1.push(void 0);
        }
      }
      return _results1;
    }));
  }
  return _results;
};

elements = ['resize', 'circle'];

makeSquare = function(elements, angle) {
  var element, _i, _len, _results;
  if (elements == null) {
    elements = ['resize'];
  }
  if (angle == null) {
    angle = 'height';
  }
  _results = [];
  for (_i = 0, _len = elements.length; _i < _len; _i++) {
    element = elements[_i];
    _results.push($('.' + element).each(function() {
      var obj, reset, value;
      obj = $(this);
      if (angle === 'height') {
        value = obj.innerWidth();
        console.log(value);
        reset = 'width';
      } else {
        value = obj.outerHeight();
        reset = 'height';
      }
      return obj.css(angle, value);
    }));
  }
  return _results;
};

checkResize = function() {
  return $(window).resize(function() {
    clearTimeout(window.counter);
    return window.counter = setTimeout(function() {
      makeSquare(elements);
      alignChildren(rows);
      return window.platform = getPlatform();
    }, 500);
  });
};

init = function() {
  setTimeout(function() {
    makeSquare(elements);
    return alignChildren(rows);
  }, 25);
  return checkResize();
};

init();