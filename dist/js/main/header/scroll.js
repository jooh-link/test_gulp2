$(document).ready(function(){

    //전역 변수 설정
    var $btns = $("#navi li");
    var $boxs = $(".myScroll");
    var speed = 1000;
    var len = $btns.length;
    var posArr;
    var baseLine = -150;

    
    //처음 로딩시
    setPos();

    //브라우저 리사이즈시 다시 세로 위치값 갱신
    $(window).on("resize",setPos);

    //네비 버튼 클릭시 해당 섹션으로 이동
    $btns.find("a").on("click",function(e){
        e.preventDefault();
        moveScroll(this);
    });

    //스크롤시 현재 위치 섹션에 해당하는 버튼 활성화
    $(window).on("scroll",function(){
        var scroll = $(this).scrollTop();
        activateBtn(scroll);
    });


    //각 섹션 위치값
    function setPos(){
        posArr = [];
        for(var i=0; i<len; i++){
            posArr.push( $boxs.eq(i).offset().top );
        }
        console.log(posArr);
    }

    //클릭한 네비버튼에 해당하는 섹션 위치로 스크롤 이동
    function moveScroll(el){
        var target = $(el).attr("href");
        var targetPos = $(target).offset().top;
        $("html, body").stop().animate({ scrollTop : targetPos }, speed);
    }

    //버튼, 박스모션 활성화
    function activateBtn(scroll){
        for(var i=0; i<len; i++){
            if( scroll >= posArr[i] + baseLine ){
                $btns.find("a").removeClass("on");
                $btns.eq(i).find("a").addClass("on");

                $boxs.removeClass("on");
                $boxs.eq(i).addClass("on");
            }
        }
    }

});
