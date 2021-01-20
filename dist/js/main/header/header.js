$(document).ready(function(){

    var $header = $("#header");
    var $gnb_li = $("#gnb>li");
    var $sub = $gnb_li.find(".sub");
    var speed = 500;


    //스킵메뉴
    $("#skipNavi a").on("focusin",function(){
        $(this).css({top: 0});
    });

    $("#skipNavi a").on("focusout",function(){
        $(this).css({top: -30});
    });

    //GNB 2depth 메뉴
    $gnb_li.on("mouseenter focusin",function(){
        openSub(this);
    });

    $gnb_li.on("mouseleave focusout",function(){
        closeSub(this);
    });

    //스크롤시 header 상단 고정
    $(window).on("scroll",function(){
        var header_ht = $header.outerHeight();
        var scr_top = $(this).scrollTop();
        
        if(scr_top > header_ht){
            $header.addClass("fix");
        }else{
            $header.removeClass("fix");
        }
    });


    function openSub(el){
        var ht = $sub.outerHeight();
        var bg = $sub.css("background-color");
        var posY = $header.outerHeight();

        /*
            - 1depth 메뉴 안 다른 a들로 마우스를 움직일 때마다 .bgGnb가 계속 생성되는 문제
              (mouseleave 해야 생성된 .bgGnb 지워짐)
            -- 1. bgGnb가 있는지 판단
            -- 2. 있다면 또 생성 안함
        */

        //.length -> 값이 없으면 false값 반환
        var isBgGnb = $(".bgGnb").length;

        if(!isBgGnb){
            //false면 = .bgGnb가 없으면 생성
            $header.prepend(
                $("<div class='bgGnb'>")
                    .css({
                        width: "100%",
                        height: ht,
                        backgroundColor: bg,
                        borderBottom: "1px solid #aaa",
                        position: "absolute",
                        left: 0, top: posY,
                        display: "none"
                    })
            )
        }

        $(el).children("a").addClass("on");
        $(el).children(".sub").stop().slideDown(speed);
        $(".bgGnb").stop().slideDown(speed);
    }

    function closeSub(el){
        $(el).children("a").removeClass("on");
        $(el).children(".sub").stop().slideUp(0);
        $(".bgGnb").stop().slideUp(0, function(){
            $(this).remove();
        });
    }

});