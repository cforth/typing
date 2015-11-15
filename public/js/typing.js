---
---
{% assign lines = site.data.articles.lines %}

//创建成绩统计对象
var counter = {
    num: 0,                //正确的字符总数
    backNum: 0,            //退格数
    errorNum: 0,           //错字数
    times: 0,              //耗费的时间（单位为秒）
};


//创建文章对象
var articles = {
    lines: "{{lines}}",
    index: 0,
    p_key: function() {
        return this.lines[this.index];
    }
};


//根据key_num更新成绩统计对象c
function update_counter(key_num, c) {
    if(c.num > 0 && key_num != 20) {
        if(key_num == 8) {
            c.num -= 1;
            c.backNum += 1;
        } else {
            c.num += 1;
        }
    } else if (c.num == 0) {
        if(key_num != 8 && key_num != 20) {
            c.num += 1;
        }
    }
}


//比较两个字符是否相同
function compare_key(keyboard_key, articles_key) {
    if(keyboard_key == articles_key) {
        return true;
    } else {
        return false;
    }
}


$(function(){
    var timerSwitch = false;
    var key, key_id;
    
    //在读取到键盘按键时触发
    $('#text').keydown(function (e) {
       
       //在键盘按键首次摁下时，启动计时器，更新耗费时间和打字速度
        if(timerSwitch == false) {
            $('body').everyTime('1s', function(){
                counter.times += 1;
                $("#times").text((counter.times).toString() + " 秒");               
                $("#speed").text((counter.num * 60 / counter.times).toFixed(0).toString() + " KPM");                
            });
            timerSwitch = true;
        }
        
        //根据按键字符更新成绩统计对象中的总字数和退格数
        update_counter(e.which, counter);
        //更新文章中的index
        articles.index = counter.num - 1;
        
        //更新网页中的成绩统计
        $("#num").text(counter.num);
        $("#backNum").text(counter.backNum);
        
    });
    
    //比较当前打字的字符是否与文章中对应字符相同
    $('#text').keypress(function(e) {
        key = String.fromCharCode(e.charCode);
        //将回车键替换成空格键处理
        if (e.charCode == 13) {
            key = " ";
        }
        key_id = "#" + counter.num;
        if(compare_key(key, articles.p_key())) {
            $(key_id).css("color","blue");
        } else {
            $(key_id).css("color","red");
            //更新错字数，未完成!!
            counter.errorNum += 1;
            $("#errorNum").text(counter.errorNum);
        }
    });
});
