$(document).ready(function(){

    var num = /[0-9]/;
    var eng = /[a-zA-z]/
    var spc = /[~!@#$%^&*()_+|{}<>?;:=-\]\[]/;

    //회원가입 폼 인증처리
    $("input[type=submit]").on("click",function(e){

        if(!isAgree("terms1Agree") || !isAgree("terms2Agree")){
            e.preventDefault();
        }else if(!isId("id")) {
            e.preventDefault();
        }else if(!isPwd("pwd1","pwd2")){
            e.preventDefault();
        }else{
            if(!isTxt("userName") ||
                !isTxt("email") || !isSelect("domain") ||
                !isSelect("phone1") || !isTxt("phone2") || !isTxt("phone3") ||
                !isCheck("gender")){
                    alert("회원정보 필수항목 중 입력하지 않은 항목이 있습니다.");
            }
            if(!isTxt("userName")) e.preventDefault();
            if(!isTxt("email") || !isSelect("domain")) e.preventDefault();
            if(!isSelect("phone1") || !isTxt("phone2") || !isTxt("phone3")) e.preventDefault();
            if(!isCheck("gender")) e.preventDefault();
        }
    });

    //약관 체크박스 인증함수
    function isAgree(name){
        var isChk = $("input[name='"+name+"']").is(":checked");
        var msg = $("input[name='"+name+"']").parent().find(".msg").text();

        if(!isChk){
            alert(msg);
            $("input[name='"+name+"']").focus();
            $("input[name='"+name+"']").parent().parent().addClass("error");
            return false;
        }else{
            $("input[name='"+name+"']").parent().parent().removeClass("error");
            return true;
        }
    }

    //아이디 인증함수
    function isId(name, min, max){
        if(min == undefined) min = 4;
        if(max == undefined) max = 16;

        var txt = $("[name='"+name+"']").val();
        var msg1 = $("[name='"+name+"']").attr("placeholder");
        var msg2 = $("[name='"+name+"']").parent().find("p").first().text();

        //입력 안 했을시
        if(txt == ""){
            alert(msg1);    //아이디를 입력해주세요.
            $("[name='"+name+"']").focus();
            $("[name='"+name+"']").addClass("error");
            $("[name='"+name+"']").parent().prev("th").addClass("error");
            return false;

        //입력 했을시
        } else{
            if(txt.length < min || txt.length >= max
                || !eng.test(txt) || !num.test(txt)){
                alert(msg2);    //아이디는 4~16자 영문과 숫자를 조합해야 합니다.
                $("[name='"+name+"']").focus();
                $("[name='"+name+"']").addClass("error");
                $("[name='"+name+"']").parent().prev("th").addClass("error");
                $("[name='"+name+"']").parent().find("p").first().addClass("error");
                return false;
                
            //조건 통과
            } else{
                $("[name='"+name+"']").removeClass("error");
                $("[name='"+name+"']").parent().prev("th").removeClass("error");
                $("[name='"+name+"']").parent().find("p").removeClass("error");
                $("[name='"+name+"']").parent().find("p").last().addClass("pass");
                //사용 가능한 아이디입니다."
                return true;
            }
        }
    }

    //비밀번호 인증함수
    function isPwd(name1, name2, min, max){
        if(min == undefined) min = 6;
        if(max == undefined) max = 16;

        var pwd1 = $("input[name='"+name1+"']").val();
        var pwd2 = $("input[name='"+name2+"']").val();
        var msg1 = $("input[name='"+name1+"']").attr("placeholder");
        var msg2 = $("input[name='"+name2+"']").parent().find("p").text();

        var i=0;

        //입력 안 했을시
        if(pwd1 == ""){
            alert(msg1);  //비밀번호를 입력해주세요.
            $("input[name='"+name1+"']").focus();
            $("input[name='"+name1+"']").addClass("error");
            $("input[name='"+name1+"']").parent().prev("th").addClass("error");
            return false;

        //입력 했을시
        } else{

            //두 비번 동일
            if(pwd1 === pwd2){
                $("input[name='"+name2+"']").parent().find("p").removeClass("error");

                // (pwd1.length >= min && pwd1.length <= max) ? i++ : alert("비밀번호는 "+min+"~"+max+"자리 사이로 입력하세요.");
                // (spc.test(pwd1)) ? i++ : alert("비밀번호에 특수문자를 포함하세요.");
                // (num.test(pwd1)) ? i++ : alert("비밀번호에 숫자를 포함하세요.");
                // (eng.test(pwd1)) ? i++ : alert("비밀번호에 영문을 포함하세요.");
                
                //다 통과시
                if(pwd1.length >= min && pwd1.length <= max &&
                    spc.test(pwd1) && num.test(pwd1) && eng.test(pwd1)){
                        $("input[name='"+name1+"']").removeClass("error");
                        $("input[name='"+name2+"']").removeClass("error");
                        $("input[name='"+name1+"']").parent().prev("th").removeClass("error");
                        $("input[name='"+name2+"']").parent().prev("th").removeClass("error");
                        $("input[name='"+name1+"']").parent().find("li").removeClass("error");
                        return true;
                        
                //하나라도 통과 못 했을시
                }else{
                    alert("비밀번호는 영문 대소문자/숫자/특수문자를 조합하여 "+min+"~"+max+"자리 사이로 입력하세요.");
                    $("input[name='"+name1+"']").focus();
                    $("input[name='"+name1+"']").addClass("error");
                    $("input[name='"+name1+"']").parent().prev("th").addClass("error");
                    $("input[name='"+name1+"']").parent().find("li").addClass("error");
                }

            //두 비번 동일하지 않을시
            }else{
                alert(msg2);    //비밀번호가 일치하지 않습니다.
                $("input[name='"+name2+"']").focus();
                $("input[name='"+name2+"']").addClass("error");
                $("input[name='"+name2+"']").parent().prev("th").addClass("error");
                $("input[name='"+name2+"']").parent().find("p").addClass("error");
                return false;
            }
        }
    }
    
    //text 인증함수
    function isTxt(name){
        var txt = $("[name='"+name+"']").val();

        if(txt == ""){
            $("[name='"+name+"']").focus();
            $("[name='"+name+"']").parent().prev("th").addClass("error");
            $("[name='"+name+"']").parent().find("p").addClass("error");
            return false;
        }else{
            $("[name='"+name+"']").parent().prev("th").removeClass("error");
            $("[name='"+name+"']").parent().find("p").removeClass("error");
            return true;
        }
    }

    //select 인증함수
    function isSelect(name){
        var sel = $("select[name='"+name+"']").children("option:selected").val();

        if(sel == ""){
            $("select[name='"+name+"']").parent().prev("th").addClass("error");
            $("select[name='"+name+"']").parent().find("p").addClass("error");
            return false;
        }else{
            $("select[name='"+name+"']").parent().prev("th").removeClass("error");
            $("select[name='"+name+"']").parent().find("p").removeClass("error");
            return true;
        }
    }

    //check + radio 인증함수
    function isCheck(name){
        var isChk = $("input[name='"+name+"']").is(":checked");

        if(!isChk){
            $("input[name='"+name+"']").parent().prev("th").addClass("error");
            $("input[name='"+name+"']").parent().find("p").addClass("error");
            return false;
        }else{
            $("input[name='"+name+"']").parent().prev("th").removeClass("error");
            $("input[name='"+name+"']").parent().find("p").removeClass("error");
            return true;
        }
    }
    
});