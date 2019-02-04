(function(global, document){

  // @private
  function getStyle(el, prop, pseudo) {
    return window.getComputedStyle(el, pseudo)[prop];
  }
  function setStyle(el, prop, value) {
    return el.style[prop] = value;
  }

  // @constructor
  function Dom(selector, context){
    try {
      if (typeof selector === 'string') {
        var _els = (context || document).querySelectorAll(selector);
        var i = 0, l = _els.length;
        for (; i<l; ++i) { this[i] = _els[i]; }
        this.length = l;
      } else if (selector && selector.nodeType === 1) {
        this[0] = selector;
        this.length = 1;
      } else {
        this.length = 0;
      }
    } catch(e) {
      console.error(e.message);
    }
  }

  // @static__methods
  Dom.each = function(list, callback) {
    var count = list.length;
    for (var i=0; i<count; i++) { callback(list[i], i); }
  };
  Dom.map = function(list, callback) {
    return [].map.call(list, callback);
  };
  Dom.template = function(list, callback) {
    return list.slice().map(callback).join('');
  };

  // @prototype
  // @instance__methods
  (function(){
    this.version = '0.0.1';
    this.each = function(callback) {
      Dom.each(this, callback);
    };
    this.on = function(type, handler) {
      Dom.each(this, function(item, i) {
        item.addEventListener(type, handler);
      });
    };
    this.off = function(type, handler) {
      Dom.each(this, function(item, i) {
        item.removeEventListener(type, handler);
      });
    };
    this.hasClass = function(name) {
      return this[0].classList.contains(name);
    };
    this.addClass = function(name) {
      var names = name.split(' ');
      Dom.each(this, function(item, i) {
        Dom.each(names, function(name) {
          item.classList.add(name);
        });
      });
      return this;
    };
    this.removeClass = function(name) {
      Dom.each(this, function(item, i) {
        name ? item.classList.remove(name) : item.className = '';
      });
      return this;
    };
    this.toggleClass = function(name) {
      Dom.each(this, function(item, i) {
        if (item.classList.contains(name)) {
          item.classList.remove(name);
        } else {
          item.classList.add(name);
        }
      });
      return this;
    };
    this.eq = function(index) {
      return new Dom(this[index]);
    };
    this.text = function(text) {
      if (!text) { return this[0].textContent; }
      Dom.each(this, function(item, i) {
        item.textContent = text;
      });
    };
    this.html = function(html) {
      if (!html) { return this[0].innerHTML; }
      Dom.each(this, function(item, i) {
        item.innerHTML = html;
      });
    };
    this.prepend = function(html_code) {
      Dom.each(this, function(item, i) {
        item.insertAdjacentHTML('afterbegin', html_code);
      });
      return this;
    };
    this.append = function(html_code) {
      Dom.each(this, function(item, i) {
        item.insertAdjacentHTML('beforeend', html_code);
      });
      return this;
    };
    this.insertBefore = function(html_code) {
      Dom.each(this, function(item, i) {
        item.insertAdjacentHTML('beforebegin', html_code);
      });
      return this;
    };
    this.insertAfter = function(html_code) {
      Dom.each(this, function(item, i) {
        item.insertAdjacentHTML('afterend', html_code);
      });
      return this;
    };
    this.css = function(prop, value) {
      if (!value) { return getStyle(this[0], prop); }
      Dom.each(this, function(item, i) {
        var getValue = getStyle(item, prop);
        if (/^(\+=|-=)/.test(value)) {
          var currentValue = global.parseFloat(getValue, 10);
          var operator = value.substr(0, 2); // += , -=
          var unit = /px/.test(getValue) ? 'px' : /rem/.test(getValue) ? 'rem' : /em/.test(getValue) ? 'em' : '';
          value = global.parseFloat(value.substr(2),10);
          value = currentValue + (operator === '+=' ? value : -value) + unit;
        }
        setStyle(item, prop, value);
      });
      return this;
    }
    this.width = function(value) {
      if(!value) { return global.parseFloat(getStyle(this[0], 'width')); }
      Dom.each(this, function(item, i) {
        item.style.width = typeof value === 'string' ? value : value + 'px';
      });
    };
    this.height = function(value) {
      if(!value) { return global.parseFloat(getStyle(this[0], 'height')); }
      Dom.each(this, function(item, i) {
        item.style.height = typeof value === 'string' ? value : value + 'px';
      });
    };
    this.innerWidth = function() {
      return this[0].clientWidth;
    };
    this.innerHeight = function() {
      return this[0].clientHeight;
    };
    this.outerWidth = function(include) {
      var el = this[0];
      var margin = 0;
      if (include) {
        var ml = global.parseFloat(getStyle(el, 'margin-left'),10);
        var mr = global.parseFloat(getStyle(el, 'margin-right'),10);
        margin = ml + mr;
      }
      return el.offsetWidth + margin;
    };
    this.outerHeight = function(include) {
      var el = this[0];
      var margin = 0;
      if (include) {
        var mt = global.parseFloat(getStyle(el, 'margin-top'),10);
        var mb = global.parseFloat(getStyle(el, 'margin-bottom'),10);
        margin = mt + mb;
      }
      return el.offsetHeight + margin;
    };
    this.scrollWidth = function() {
      return this[0].scrollWidth;
    };
    this.scrollHeight = function() {
      return this[0].scrollHeight;
    };

  }).call(Dom.prototype);

  // 공개
  Object.defineProperty(global, 'Dom', {
    value: function(selector, context) {
      return new Dom(selector, context);
    }
  });

  // global.Dom 스태틱 메서드 추가
  global.Dom.each = Dom.each;
  global.Dom.map = Dom.map;
  global.Dom.template = Dom.template;

  // global.Dom 프리징(Freezing)
  Object.freeze(global.Dom);

}(window, document));