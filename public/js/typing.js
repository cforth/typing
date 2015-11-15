//创建成绩统计对象
var counter = {
    num: 0,
    backNum: 0,
    times: 0,
    inc: function() {
        this.times += 1;
    }
};

$(function(){
    var timerSwitch = false;
    
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
        };
        
        //根据按键字符更新成绩统计对象中的总字数和退格数
        var key = e.which;
        if(counter.num > 0) {
            if(key == 8) {
                counter.num -= 1;
                counter.backNum += 1;
            } else {
                counter.num += 1;
            }
        } else if (counter.num == 0) {
            if(key != 8) {
                counter.num += 1;
            }
        }
        $("#num").text(counter.num);
        $("#backNum").text(counter.backNum);
        
    });
});
