$(document).ready(function(){

    var $tab = $("#news .tab");
    var $btns = $tab.find(".btns a");
    var $boxs = $tab.find("dd");

    $btns.on("click focusin",function(e){
        e.preventDefault();

        var isOn = $(this).hasClass("on");
        
        if(isOn) return;
        var target = $(this).attr("href");
        activation(target, $(this));
    });

    function activation(target, el){
        $btns.removeClass("on");
        $boxs.fadeOut(500).removeClass("on");

        el.addClass("on");
        $(target).fadeIn(500).addClass("on");
    }
 
});