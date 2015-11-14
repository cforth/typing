function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function() {
            x += 1;
            return x;
        }
    }
}


$(function(){
    var num = 0;
    var backNum = 0;
    var counter = create_counter();
    var times = 0;
    var timerSwitch = false;
    
    $('#text').keydown(function (e) {
        
        if(timerSwitch == false) {
            $('body').everyTime('1s', function(){
                $("#times").text((counter.inc()).toString() + " 秒");
                times += 1;
                $("#speed").text((num * 60 / times).toFixed(0).toString() + " KPM");
                
            });
            timerSwitch = true;
        };
        
        var key = e.which;
        if(num > 0) {
            if(key == 8) {
                num -= 1;
                backNum += 1;
            } else {
                num += 1;
            }
        } else if (num == 0) {
            if(key != 8) {
                num += 1;
            }
        }
        $("#num").text(num);
        $("#backNum").text(backNum);
        
    });
});
