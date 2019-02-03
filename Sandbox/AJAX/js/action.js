(function(global) {
    'use strict';

    // XMLHttpRequest 객체 생성 참조
    var xhr = new XMLHttpRequest();

    // .open 메서드 사용 통신 설정 xhr.open(method, url, async)
    xhr.open('GET', '../data/ajax-desc.txt', false);

    // 서버에 요청
    // xhr.send();

    // call-ajax-data-button 버튼을 참조
    var call_btn = document.querySelector('.call-ajax-data-button');
    var print_area = document.querySelector('.print-area');

    var callAjaxData = function() {
        xhr.send();

        // 대기중.. 

        //통신 요청에 따른 응답이 오면 처리
        if( xhr.status === 200 || xhr.status === 304 ) {
            print_area.textContent = xhr.responseText;
        } else {
            console.warn('통신 실패')
        }
    }

    call_btn.addEventListener('click', callAjaxData);

})(window);