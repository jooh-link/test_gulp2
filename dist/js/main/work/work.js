$(document).ready(function(){

    var $section = $("#work");
    var $cont_li = $section.find(".content ul li");
    var $slider = $section.find(".slider");
    var $slider_li = $slider.find("li");

    var $navi_li = $section.find(".navi li");
    var $prev = $section.find(".prev");
    var $next = $section.find(".next");
    var $start = $section.find(".start");
    var $stop = $section.find(".stop");
    var $curIndex = $section.find(".index strong");
    var $totalIndex = $section.find(".index span");

    var speed = 1000;
    var len = $slider_li.length;
    var i = 0;
    var isDone = true;
    var timer;


    //처음 브라우저 로딩시
    startRolling();
    //totalIndex값 구하기 = 슬라이드수
    $totalIndex.text("0"+len);

    //다음 버튼 클릭시
    $next.on("click",function(e){
        e.preventDefault();
        stopRolling();

        if(isDone){
            isDone = false;
            i = $slider_li.filter(".on").index();
            (i == len-1) ? i=0 : i++;
            nextSlide(i);
        }
    });

    //이전 버튼 클릭시
    $prev.on("click",function(e){
        e.preventDefault();
        stopRolling();

        if(isDone){
            isDone = false;
            i = $slider_li.filter(".on").index();
            (i == 0) ? i= len-1 : i--;
            prevSlide(i);
        }
    });

    //네비 버튼 클릭시
    $navi_li.on("click",function(e){
        e.preventDefault();
        stopRolling();
        
        if(isDone){
            isDone = false;
            var curNum = $slider_li.filter(".on").index();
            i = $(this).index();
            (curNum > i) ? prevSlide(i) : nextSlide(i);
            activation(i);
        }
    });

    //재생 버튼 클릭시
    $start.on("click",function(e){
        e.preventDefault();
        startRolling()
    });

    //정지 버튼 클릭시
    $stop.on("click",function(e){
        e.preventDefault();
        stopRolling();
    });


    function nextSlide(index){
        $slider_li.not(".on").css({left: "100%"});

        $slider_li.filter(".on").stop().animate({left: "-100%"},speed,function(){
            $(this).css({left: "100%"}).removeClass("on");
        });

        $slider_li.eq(index).stop().animate({left: "0%"},speed,function(){
            $(this).addClass("on");
            isDone = true;
        });

        activation(i);
    }

    function prevSlide(index){
        $slider_li.not(".on").css({left: "-100%"});

        $slider_li.filter(".on").stop().animate({left: "100%"},speed,function(){
            $(this).css({left: "-100%"}).removeClass("on");
        });

        $slider_li.eq(index).stop().animate({left: "0%"},speed,function(){
            $(this).addClass("on");
            isDone = true;
        });

        activation(i);
    }

    function activation(index){
        $cont_li.removeClass("on");
        $cont_li.eq(index).addClass("on");

        $slider_li.removeClass("on");
        $slider_li.eq(index).addClass("on");

        $navi_li.find("a").removeClass("on");
        $navi_li.eq(index).children("a").addClass("on");

        $curIndex.text("0"+(index+1));
    }

    function startRolling(){
        $start.addClass("on");
        $stop.removeClass("on");

        timer = setInterval(function(){
            (i == len-1) ? i=0 : i++;
            if(isDone){
                isDone = false;
                nextSlide(i);
                activation(i);
            }
        },8000);
    }

    function stopRolling(){
        $stop.addClass("on");
        $start.removeClass("on");
        clearInterval(timer);
    }

});