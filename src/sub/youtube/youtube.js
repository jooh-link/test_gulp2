$(document).ready(function(){

    //브라우저 로딩시 youtube 데이터 호출 및 DOM생성
    callData({
        target: ".youtube #vidGallery",
        key: "AIzaSyBTF1_ZkAVLj8U7aI-sbnCkT3A-NfisURo",
        count: 9,
        playList: "PLyTEYy1NrOZpuilIB9qGqsdfsQ3tWIazT"
    });

    //영상 썸네일 클릭시 팝업 생성 및 유튜브 영상 호출
    $("body").on("click","article a",function(e){
        e.preventDefault();

        var videoId = $(this).attr("href");

        createPop({
            width: "70%",
            bg: "rgba(0,0,0,0.9)",
            vidId: videoId
        });
    });

    //팝업 닫기 버튼 클릭시 팝업 제거
    $("body").on("click",".pop .close",function(e){
        e.preventDefault();

        $(this).parent(".pop").fadeOut(500,function(){
            $(this).remove();
        });
    });

    //유튜브 데이터 호출해서 json 데이터로부터 DOM 생성함수
    function callData(opt){
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            dataType: "jsonp",
            data: {
                part: 'snippet',
                key: opt.key,
                maxResults: opt.count,
                playlistId: opt.playList
            }
        })
        .success(function(data){
            var item = data.items;
            console.log(item);

            $(item).each(function(index,data){
                var i = index + 1;

                var desc = data.snippet.description;
                var len = desc.length;
                var date = data.snippet.publishedAt.split("T")[0];

                (len > 200) ? desc = desc.substr(0,150) + "..." : desc;

                $(opt.target)
                    .append(
                        $("<article>")
                            .append(
                                $("<div class='wrap'>")
                                    .append(
                                        $("<em>").text("0"+i),
                                        $("<h2>").text(data.snippet.title),
                                        $("<span>").text(date),
                                    ),
                                $("<a href='#' class='pic'>")
                                    .attr({href: data.snippet.resourceId.videoId})
                                    .css({backgroundImage: "url("+data.snippet.thumbnails.high.url+")"}),
                                $("<div class='desc'>")
                                    .append(
                                        $("<p>").text(desc)
                                    )
                            )
                    )
            })
        })
        .error(function(err){
            console.log(err);
        })
    }

    //외부에서 영상 id값을 받아서 동적으로 유튜브 영상 팝업 생성 함수
    function createPop(opt){
        $("body")
            .append(
                $("<aside class='pop'>")
                    .css({
                        width: "100%",
                        height: "100%",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        backgroundColor: opt.bg,
                        display: "none"
                    })
                    .append(
                        $("<a href='#' class='close'>")
                            .text('Close')
                            .css({
                                position: "absolute",
                                right: 20,
                                top: 20,
                                color: "#fff"
                            }),
                        $("<iframe>")
                            .attr({
                                src: "https://www.youtube.com/embed/"+opt.vidId,
                                width: opt.width,
                                height: 600,
                                frameborder: 0,
                                allowfullscreen: true
                            })
                            .css({
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            })
                    )
            )
        $(".pop").fadeIn(500);
    }

});