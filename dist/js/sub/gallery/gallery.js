$(document).ready(function(){

    /* -------------------- 전역변수 -------------------- */
    var url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";
    var url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
    var key = "2893729b0b81f79643b9249cf1409f44";


    /* -------------------- 이벤트연결 -------------------- */
    getFlickr(url, key, 30);

    //리스트 썸네일 클릭시 레이어팝업 생성
    $("body").on("click","#imgGallery ul li a",function(e){
        e.preventDefault();

        var src = $(this).attr("href");
        createPop(src);
    });

    $("body").on("click",".pop .close",function(e){
        e.preventDefault();

        $(this).parent().fadeOut(500,function(){
            $(this).remove();
        })
    });

    //검색버튼 클릭시 검색결과 호출
    $("#search button").on("click",function(){
        var tags = $(this).prev().val();
        getFlickr(url_search, key, 30, tags);
    });


    /* -------------------- 함수정의 -------------------- */
    //flickr 데이터 호출 + DOM 생성함수
    function getFlickr(url, key, num, tags){
        $.ajax({
            url: url,
            dataType: "json",
            data: {
                api_key : key,
                per_page : num,
                format : "json",
                nojsoncallback : 1,
                tags : tags,
                tagmode : "any",
                privacy_fliter : 5
            }
        })
        .success(function(data){
            var item = data.photos.photo;
            console.log(item);

            $("#search ul").empty();
            $("#imgGallery ul").empty();

            $(item).each(function(index,data){

                var title = this.title;
                var len = title.length;
                (len > 22) ? title = title.substr(0,17) + "..." : title;
                if(!title) title = "No Title";

                var i = index + 1;
                if(i < 10) i = "0"+(index + 1);

                $("#search ul")
                .append(
                    $("<li>")
                        .append(
                            $("<span class='index'>").text(i),
                            $("<p class='title'>").text(title)
                        )
                )

                $("#imgGallery ul")
                    .append(
                        $("<li>")
                            .append(
                                $("<a>")
                                    .attr({
                                        href : "https://live.staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_b.jpg"
                                    })
                                    .append(
                                        $("<img>")
                                            .attr({
                                                src: "https://live.staticflickr.com/"+this.server+"/"+this.id+"_"+this.secret+"_m.jpg",

                                                onerror : "javascript:this.parentNode.parentNode.style='display:none'"
                                                // <img>의 에러 이벤트 (이미지엑박) - this(img)의 부모(a)의 부모(li)의 스타일 속성을 display: none으로 설정
                                            }),
                                        $("<em>")
                                    ),
                                $("<span class='index'>").text(i),
                                $("<p class='title'>").text(title),
                                // $("<i class='far fa-heart'>")
                                /*
                                $("<div class='writer'>")
                                    .append(
                                        $("<img>")
                                            .attr({
                                                src : "http://farm"+this.farm+".staticflickr.com/"+this.server+"/buddyicons/"+this.owner+".jpg"
                                            }),
                                        $("<span>").text(this.owner)
                                    )
                                */
                                
                            )
                    )
            })
        })
        .error(function(err){
            console.log(err);
        })
    }

    //팝업 생성 함수
    function createPop(imgSrc){
        $("body")
            .append(
                $("<aside class='pop'>")
                    .append(
                        $("<img>").attr("src", imgSrc),
                        $("<a href='#' class='close'>").text("CLOSE")
                    )
            )
        $(".pop").fadeIn(500);
    }

});