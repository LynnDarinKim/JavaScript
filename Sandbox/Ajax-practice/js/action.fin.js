// TEXT
;(function(global, ajax){
  'use strict';

  function ajaxDemo () {
    // XMLHttpRequest 객체 생성 참조
    var xhr = new XMLHttpRequest();

    // .open() 메서드 사용 통신 설정
    // 동기 통신 설정
    // xhr.open('GET', '../data/ajax-desc.txt', false);

    // 비동기 통신 설정
    xhr.open('GET', '../data/ajax-desc.txt');

    // 서버에서 응답이 올 경우, 이벤트를 감지하여 처리하는 이벤트 핸들링 설정
    xhr.onreadystatechange = function(){
      // 통신 요청에 따른 응답이 오면 처리 (비동기)
      if ( (xhr.status === 200 || xhr.status === 304) && xhr.readyState === 4 ) {
        console.info('Finish : xhr.status:', xhr.status);
        console.info('Complete : xhr.readyState:', xhr.readyState);
        print_area.textContent = xhr.responseText;
      } else {
        console.info('xhr.status:', xhr.status);
        console.info('xhr.readyState:', xhr.readyState);
        // console.warn('통신 실패');
      }
    };

    // 서버에 요청
    xhr.send();
  }

  // call-ajax-data-button 버튼을 참조
  var call_btn = document.querySelector('.call-ajax-data-button');
  var print_area = document.querySelector('.print-area');
  var callAjaxData = function() {
    // xhr.send();

    // 대기중...

    // // 통신 요청에 따른 응답이 오면 처리
    // if ( xhr.status === 200 || xhr.status === 304) {
    //   print_area.textContent = xhr.responseText;
    // } else {
    //   console.warn('통신 실패');
    // }

  };

  // call_btn.addEventListener('click', ajaxDemo);
  call_btn.addEventListener('click', function() {
    ajax({
      url: '../data/ajax-desc.txt',
      dataType: 'text'
    }).then(function(data){
      print_area.textContent += data;
    });
  });

}) // (window, ajax);

// HTML
;(function(global, $, ajax){
  'use strict';

  var $links = $('nav a');
  var $main  = $('main.content');

  var ajaxCallHTML = function(e) {
    e.preventDefault();
    var href = this.getAttribute('href');
    $links.each(function(link){
      if ( link.classList.contains('is-active') ) {
        link.classList.remove('is-active');
      }
    });
    this.classList.add('is-active');
    // Ajax
    ajax.get(href).then(function(data){
      $main.html(data);
    });

  };

  $.each($links, function(link, index){
    var $link = $links.eq(index);
    $link.on('click', ajaxCallHTML);
  });

}) // (window, Dom, ajax);

// XML
;(function(global, $, ajax){
  'use strict';

  var $menu = $('.ediya-menu');

  // Ajax <- XML
  ajax.get('/data/ediya-menu.xml').then(function(xmlDoc){

    // XML -> 데이터 추출
    var names = xmlDoc.querySelectorAll('name');
    names = $.map(names, function(name){ return name.textContent; });
    var widths = xmlDoc.querySelectorAll('width');
    widths = $.map(widths, function(width){ return width.textContent; });
    var heights = xmlDoc.querySelectorAll('height');
    heights = $.map(heights, function(height){ return height.textContent; });
    var kos = xmlDoc.querySelectorAll('ko');
    kos = $.map(kos, function(ko){ return ko.textContent; });
    var ens = xmlDoc.querySelectorAll('en');
    ens = $.map(ens, function(en){ return en.textContent; });
    var descs = xmlDoc.querySelectorAll('desc');
    descs = $.map(descs, function(desc){ return desc.textContent; });
    var display = xmlDoc.querySelectorAll('display-criteria');
    display = $.map(display, function(criteria){
      var items = criteria.querySelectorAll('item');
      var keyMaps = $.map(items, function(item) {
        var key = item.querySelector('key').textContent;
        var value = item.querySelector('value').textContent;
        return [ key, value ];
      });
      return keyMaps;
    });

    // 추출한 데이터 -> 템플릿 바인딩
    var template = $.template(names, function(name, i){
      var templ = '\
        <li class="ediya-menu__item">\
          <a href="#">\
            <figure>\
              <img src="https://raw.githubusercontent.com/yamoo9/assets/master/images/ediya/'+ names[i] +'.png" alt width="'+ widths[i] +'" height="'+ heights[i] +'">\
              <figcaption>'+ kos[i] +'</figcaption>\
            </figure>\
          </a>\
          <div hidden class="ediya-menu__item--detail">\
              <strong class="ediya-menu__item--name">'+ kos[i] +'<span lang="en">'+ ens[i] +'</span></strong>\
              <p>'+ descs[i] +'</p>\
              <div class="ediya-menu__item--multi-column is-2"><p>\
        ';

      templ += $.template(display, function(item, index){
        if (i === index) {
          return $.template(item, function(it){
            var key = it[0];
            var value = it[1];
            return '<span>'+ key +'<b>('+ value +')</b></span>';
          });
        }
      });

      templ += '</p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';

      return templ;

    });

    $menu.html(template);

  });


  /*

    var template = '\
                    <li class="ediya-menu__item">\
                      <a href="#">\
                        <figure>\
                          <img src="https://raw.githubusercontent.com/yamoo9/assets/master/images/ediya/'+ name +'.png" alt width="'+ width +'" height="'+ height +'">\
                          <figcaption>'+ ko +'</figcaption>\
                        </figure>\
                      </a>\
                      <div hidden class="ediya-menu__item--detail">\
                          <strong class="ediya-menu__item--name">'+ ko +'<span lang="en">'+ en +'</span></strong>\
                          <p>'+ desc +'</p>\
                          <div class="ediya-menu__item--multi-column is-2"><p>\
                    ';

    template += _.template(display, function(item){
      return '<span>'+ item[0] +'<b>('+ item[1] +')</b></span>';
    });

    template += '</p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';

  */

}) // (window, Dom, ajax);

// JSON
;(function(global, $, ajax){
  'use strict';

  var $menu = $('.ediya-menu');

  // JSON -> Ajax 비동기 통신
  ajax.get('/data/ediya-menu.json').then(function(data){
    var templ = $.template(data, function(item){
      // JSON -> 데이터 값 추출
      var figure = item.figure;
      var detail = item.detail;
      var name = figure.name;
      var width = figure.width;
      var height = figure.height;
      var ko = detail.ko;
      var en = detail.en;
      var desc = detail.desc;
      var display = detail.display_criteria;
      // 데이터 추출 값 -> 템플릿 바인딩
      var template = '\
        <li class="ediya-menu__item">\
          <a href="#">\
            <figure>\
              <img src="https://raw.githubusercontent.com/yamoo9/assets/master/images/ediya/'+ name +'.png" alt width="'+ width +'" height="'+ height +'">\
              <figcaption>'+ ko +'</figcaption>\
            </figure>\
          </a>\
          <div hidden class="ediya-menu__item--detail">\
              <strong class="ediya-menu__item--name">'+ ko +'<span lang="en">'+ en +'</span></strong>\
              <p>'+ desc +'</p>\
              <div class="ediya-menu__item--multi-column is-2"><p>\
          ';

      template += $.template(display, function(item){
        return '<span>'+ item[0] +'<b>('+ item[1] +')</b></span>';
      });

      template += '</p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';
      return template;
    });
    $menu.html(templ);
  });

  /*

    var template = '\
                    <li class="ediya-menu__item">\
                      <a href="#">\
                        <figure>\
                          <img src="https://raw.githubusercontent.com/yamoo9/assets/master/images/ediya/'+ name +'.png" alt width="'+ width +'" height="'+ height +'">\
                          <figcaption>'+ ko +'</figcaption>\
                        </figure>\
                      </a>\
                      <div hidden class="ediya-menu__item--detail">\
                          <strong class="ediya-menu__item--name">'+ ko +'<span lang="en">'+ en +'</span></strong>\
                          <p>'+ desc +'</p>\
                          <div class="ediya-menu__item--multi-column is-2"><p>\
                    ';

    template += _.template(display, function(item){
      return '<span>'+ item[0] +'<b>('+ item[1] +')</b></span>';
    });

    template += '</p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';

  */


})(window, Dom, ajax);