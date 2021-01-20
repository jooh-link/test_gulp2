$(document).ready(function(){

    var $faq_tab = $(".faq #tab");
    var $faq_tab_btns = $faq_tab.find(".btns a");
    var $faq_tab_boxs = $faq_tab.find(".boxs dl");


    //FAQ 탭메뉴
    $faq_tab_btns.on("click focusin",function(e){
        e.preventDefault();

        var isOn = $(this).hasClass();

        if(isOn) return;
        var target = $(this).attr("href");
        activation($faq_tab_btns, $faq_tab_boxs, $(this), target);
    });

    //탭메뉴 활성화 함수
    function activation(btns, boxs, el,target){
        btns.removeClass("on");
        boxs.hide();

        el.addClass("on");
        $(target).show();
    }


    //FAQ 토글메뉴
    $(".faq .boxs dt").on("click",function(e){
        e.preventDefault();

        var isOn = $(this).hasClass("on");
        
        $(".faq .boxs dt").removeClass("on");
        $(".faq .boxs dd").slideUp();

        if(isOn){
            $(this).removeClass("on");
            $(this).next("dd").slideUp();
            return;
        }

        $(this).addClass("on");
        $(this).next("dd").slideDown();
    })

});