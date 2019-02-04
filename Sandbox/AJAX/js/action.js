(function(global, ajax) {
    'use strict';

    function ajaxDemo () {
        // XMLHttpRequest 객체 생성 참조
        var xhr = new XMLHttpRequest();

        // .open 메서드 사용 통신 설정 xhr.open(method, url, async)
        // xhr.open('GET', '../data/ajax-desc.txt', false);

        //비동기 통신 설정
        xhr.open('GET', '../data/ajax-desc.txt');

        // 서버에서 응답이 올 경우, 이벤트를 감지하여 처리하는 이벤트 핸들링 설정
        xhr.onreadystatechange = function() {
            //통신 요청에 따른 응답이 오면 처리 (비동기)
            if( (xhr.status === 200 || xhr.status === 304) && xhr.readyState === 4 ) {
                console.info('Finish: ', xhr.status);
                console.info('Complete: ', xhr.readyState);
                print_area.textContent = xhr.responseText;
            } else {
                console.info('xhr.status: ', xhr.status);
                console.info('xhr.readyState: ', xhr.readyState);
                // console.warn('통신 실패')
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

        // 대기중.. 

        //통신 요청에 따른 응답이 오면 처리
    //     if( xhr.status === 200 || xhr.status === 304 ) {
    //         print_area.textContent = xhr.responseText;
    //     } else {
    //         console.warn('통신 실패')
    //     }
    }

    // 이 밑에 라이브러리 코드 쓰면 위처럼 function ajaxDemo() {} 쓸 필요 없음. 
    // call_btn.addEventListener('click', ajaxDemo);
    call_btn.addEventListener('click', function() {
        ajax({
            url: '../AJAX/data/ajax-desc.txt',
            dataType: 'text'
        }).then(function(data){
            print_area.textContent = data;
        })
    });

})(window, ajax);