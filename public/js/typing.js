---
---
{% assign lines = site.data.articles.lines %}

//创建成绩统计对象
var counter = {
    num: 0,
    backNum: 0,
    times: 0,
    inc: function() {
        this.times += 1;
    }
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


//更新文章对象中的当前字符
function update_articles(num) {
    articles.index = num - 1;
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
    var key, key_num, key_id;
    
    //在读取到键盘按键时触发
    $('#text').keydown(function (e) {
       
       //在键盘按键首次摁下时，启动计时器
        if(timerSwitch == false) {
            $('body').everyTime('1s', function(){
                counter.inc();
                $("#times").text((counter.times).toString() + " 秒");               
                $("#speed").text((counter.num * 60 / counter.times).toFixed(0).toString() + " KPM");                
            });
            timerSwitch = true;
        }
        
        //根据按键字符更新成绩统计对象中的总字数和退格数
        key_num = e.which;
        update_counter(key_num, counter);
        //更新文章中的index
        update_articles(counter.num);
        
        //更新网页中的成绩统计
        $("#num").text(counter.num);
        $("#backNum").text(counter.backNum);
        
    });
    
    //比较当前打字的字符是否与文章中对应字符相同
    $('#text').keypress(function(e) {
        key = String.fromCharCode(e.charCode);
        key_id = "#" + counter.num;
        if(compare_key(key, articles.p_key())) {
            $(key_id).css("color","blue");
        } else {
            $(key_id).css("color","red");
        }
    });
});
