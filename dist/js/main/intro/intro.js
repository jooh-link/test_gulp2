$(document).ready(function(){
    
    var pos2 = $("#intro").offset().top;
    // var pos3 = $("#intro ul").offset().top;
    
    $(window).on("scroll",function(){
        var scroll = $(this).scrollTop();
        var currentPos = scroll - pos2;

        var customs = [
            {
                item: "#intro .left .pic",
                css: {transform: "translateY("+(currentPos*1.5)+"px)"},
                init: {transform: "translateY(0px)"}
            },
            {
                item: "#intro .left h2",
                css: {transform: "translateY("+(-currentPos / 2)+"px) rotate(90deg)"},
                init: {transform: "translateY(0px) rotate(90deg)"}
            },
            {
                item: "#intro .right article",
                css: {transform: "translateY("+(-currentPos)+"px)"},
                init: {transform: "translateY(0px)"}
            },
            // {
            //     item: ".box2",
            //     css: {transform: "translateY("+(currentPos*2)+"px)"},
            //     init: {transform: "translateY(0px)"}
            // },
            // {
            //     item: ".box3",
            //     css: {transform: "rotate("+currentPos+"deg)"},
            //     init: {transform: "rotate(0deg)"}
            // },
            // {
            //     item: ".box4",
            //     css: {transform: "translateX("+(-currentPos/2)+"px)"},
            //     init: {transform: "translateX(0px)"}
            // }
        ];

        custom_motion(scroll, customs);
    });

    function custom_motion(scroll, customs){
        if(scroll >= pos2 - 100){
            $(customs).each(function(){
                $(this.item).css(this.css);
            });
        }else if(scroll >= pos2 + 500) {
            $("#intro").fadeOut();
        }else {
            $(customs).each(function(){
                $(this.item).css(this.init);
            });
        }
    }

});