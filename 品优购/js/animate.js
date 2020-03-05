function animate(obj, target, callback) {//callback=function(){}，定时器结束的时候调用
    //当我们不断的点击按钮，这个按钮速度会越来越快，因为开启了太多定时器
    //解决方案是  让我们元素只有一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {//用对象属性给不同的元素指定不同的定时器
        //步长值写到定时器里面，把步长值改为整数，不要出现小数的问题
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止动画，本质是停止定时器
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        } else {
            //把每次加1  这个步长值改为一个慢慢变小的值   步长公式：（目标值-现在的位置）/10
            obj.style.left = obj.offsetLeft + step + 'px';//需赋值给div.style.left，必须有定位才可以设置这个属性
        }
    }, 15);
}