(function(global){
  'use strict';

  var JSON = global.JSON;

  // @private
  function whatType(o) {
    return Object.prototype.toString.call(o).slice(8,-1).toLowerCase();
  }

  function checkFileExtension(str) {
    return (!/.(json|html?|xml|txt)$/.test(str) || /.json$/.test(str)) ?
    'json' : /.xml$/.test(str) ? 'xml' : /.html?$/.test(str) ? 'html' : 'text';
  }

  if (typeof Object.assign != 'function') {
    Object.assign = function (o) {
      'use strict';
      var output = o || {};
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) { output[nextKey] = source[nextKey]; }
          }
        }
      }
      return output;
    };
  }

  // Ajax 기본 옵션
  var defaults = {
    url: '',
    method: 'GET',
    body: null,
    dataType: 'json',
  };

  /**
   * @constructor Ajax
   * @param {object|string} options 옵션 객체 또는 통신 URL
   */
  function Ajax(options) {
    if  ( whatType(options) === 'string' ) {
      options = {
        url: options,
        dataType: checkFileExtension(options)
      };
    }
    this.config = Object.assign({}, defaults, options);
    this._init();
  }

  /**
   * @prototype
   */
  (function(){
    'use strict';

    this._init = function(){
      var config = this.config;
      var data = JSON.stringify(config.body);

      this.xhr = new XMLHttpRequest();
      this.xhr.open(config.method, config.url);
      this.xhr.onreadystatechange = this._check.bind(this);
      this.xhr.send(/(post|put)/i.test(config.method) && data);

      this.success = function(data) { console.log(data); };
      this.fail = function(error) { console.error(error); };
    };

    this._check = function(){
      var xhr = this.xhr;
      var dataType = this.config.dataType.toLowerCase();
      if ( (xhr.status === 200 || xhr.status === 304) && xhr.readyState === 4 ) {
        var data = dataType === 'xml' ? xhr.responseXML : (xhr.response || xhr.responseText);
        this.success( dataType === 'json' ? JSON.parse(data) : data, xhr);
      }
      if ( xhr.status >= 400 && xhr.readyState === 4) {
        var error_message = xhr.responseURL + '\n통신에 실패했습니다. 원인을 확인하세요.'
        this.fail(error_message);
      }
    };

    this.then = function(success, fail){
      this.success = whatType(success) === 'function' ? success : this.success;
      this.fail = whatType(fail) === 'function' ? fail : this.fail;
    };

  }).call(Ajax.prototype);

  /**
   * @utilility ajax
   * @param {string | object} options 통신 URL 또는 옵션 객체
   */
  function ajax(options) {
    return new Ajax(options);
  }

  ajax.get = function(url) {
    return new Ajax({
      url: url,
      method: 'GET',
      dataType: checkFileExtension(url)
    });
  };

  ajax.post = function(url, data) {
    return new Ajax({
      url: url,
      method: 'POST',
      body: data,
      dataType: 'json',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
  };

  ajax.put = function(url, data) {
    return new Ajax({
      url: url,
      method: 'PUT',
      body: data,
      dataType: 'json',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
  };

  ajax.delete = function(url) {
    return new Ajax({
      url: url,
      method: 'DELETE'
    });
  };

  Object.defineProperty(global, 'ajax', {value: ajax});
  Object.freeze(global.ajax);

})(window);