// TEXT
;(function(global, ajax){
  'use strict';

}) // (window, ajax);

// HTML
;(function(global, $, ajax){
  'use strict';

  var $links = $('nav a');
  var $main = $('main.content');

  var ajaxCallHTML = function(e) {
    e.preventDefault();
    var href = this.getAttribute('href');
    $links.each(function(link){
      if (link.classList.contains('is-active')) {
        link.classList.remove('is-active');
      }
    });
    this.classList.add('is-active');
    //Ajax
    ajax.get(href).then(function(data){
      $main.html(data);
    });
  };
  
  $.each($links, function(link, index) {
    var $link = $links.eq(index);
    $link.on('click', ajaxCallHTML)
  });

}) (window, Dom, ajax);

// XML
;(function(global, $, ajax){
  'use strict';

}) // (window, Dom, ajax);

// 템플릿
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

// JSON
;(function(global, $, ajax){
  'use strict';

})(window, Dom, ajax);