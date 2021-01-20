$(document).ready(function(){

    //젼역변수
    var $section = $("#insta");
    var $banner = $section.find(".banner");
    var $banner_ul = $banner.find("ul");
    var $prev = $banner.find(".prev");
    var $next = $banner.find(".next");

    var timer;
    var speed = 500;
    var isDone = true;
    
    
    //처음 브라우저 로딩시
    var curPos = getSlideWid();
    var i = curPos;
    $banner_ul.find("li").last().prependTo($banner_ul);
    // 로딩시 자동롤링 시작
    timer = setInterval(move,20);
    
    //브라우저 리사이즈시
    $(window).on("resize",function(){
        curPos = getSlideWid();
        $banner_ul.css({marginLeft : curPos});
    });

    //마우스 호버 이벤트
    $banner.on("mouseenter",function(){
        clearInterval(timer);
    });

    //마우스 아웃 이벤트
    $banner.on("mouseleave",function(){
        timer = setInterval(move,20);
    });

    //다음 버튼을 클릭 시
    $next.on("click",function(e){
        e.preventDefault();

        if(isDone){
            isDone = false;
            next();
        }
    });

    //이전 버튼 클릭 시
    $prev.on("click",function(e){
        e.preventDefault();

        if(isDone){
            isDone = false;
            prev();
        }
    });


    //현재 li의 넓이값을 바탕으로 ul의 초기 위치값을 반환하는 함수 정의
    function getSlideWid(){
        var result = $banner_ul.find("li").outerWidth();
        result = parseInt(result);
        result = -result;   
        return result;
    }

    //자동롤링 함수 정의
    function move(){
        if(i <= curPos*2){
            i = curPos;
            $banner_ul.children("li").first().appendTo($banner_ul);
        }else{
            i-=1.3;
        }
        // console.log(i);
        $banner_ul.css({marginLeft: i});
    }

    //다음 이동 함수
    function next(){        
        $banner_ul.stop().animate({marginLeft: curPos*2},speed,function(){
            $(this).find("li").first().appendTo($(this));
            $(this).css({marginLeft: curPos});
            i = curPos;  
            isDone = true;
        });
    }

    //이전 이동 함수
    function prev(){
        $banner_ul.stop().animate({marginLeft: 0},speed,function(){
            $(this).find("li").last().prependTo($(this));
            $(this).css({marginLeft: curPos});
            i = curPos;
            isDone = true;
        });
    }

});