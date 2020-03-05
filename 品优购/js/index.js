window.addEventListener('load', function () {
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 停止定时器
        clearInterval(timer);
        timer = null;//清空定时器
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 开启定时器
        timer = this.setInterval(function () {
            // 手动调用点击右侧按钮事件
            arrow_r.click();
        }, 2000);
    });
    // 动态生成小圆圈，有几个图片就生成几个
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号,通过自定义属性来做
        li.setAttribute('index', i);
        // 把li插入到Ol里
        ol.appendChild(li);
        // 点击小圆圈,点哪个亮哪个,排它思想
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 5.点击小圆圈,移动图片,当然移动的是ul
            // ul移动的距离是小圆圈索引号index*图片宽度focus.offsetWidth  注意是负值
            var index = this.getAttribute('index');
            // 当我们点击了某个小li  就要把这个li 的索引号给num
            num = index;
            // 当我们点击了某个小li  就要把这个li 的索引号给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ul里面第一个小li类名设置为current
    ol.children[0].className = 'current';
    // 6.克隆第一张图片(li)放到Ul最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮,图片滚动一张
    var num = 0;
    var circle = 0;
    // flag节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {//回调函数是执行完毕才触发
                flag = true;
            });
            // 8.点击右侧按钮,小圆圈跟随一起变化 再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle等于ol.children.length,说明走到克隆的那张图,就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 先清除其余小圆圈的current类名
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 8.点击右侧按钮,小圆圈跟随一起变化 再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle<0,说明第一张图,改成最后一个小圆圈 
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });
    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10.自动播放轮播图
    var timer = this.setInterval(function () {
        // 手动调用点击右侧按钮事件
        arrow_r.click();
    }, 2000);
})
$(function () {
    // 当我们点击了li  此时不需要执行页面滚动事件的li的背景选择 添加current
    //节流阀  互斥锁
    var flag = true;
    var toolTop = $(".recom").offset().top;
    xianshi();
    function xianshi() {
        if ($(document).scrollTop() >= toolTop) {
            $(".cebian").fadeIn();
        } else {
            $(".cebian").fadeOut();
        }
    }
    $(window).scroll(function () {
        xianshi();
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".cebian li").eq(i).addClass("bgc").siblings("li").removeClass("bgc");
                }
            })
        }
    });
    $(".cebian li").click(function () {
        flag = false;
        // $(this).index()   当前的索引号   每个都有w这个类，所以用它
        var dis = $(".floor .w").eq($(this).index()).offset().top;
        //是body和html元素做动画，document不是元素
        $("body,html").stop().animate({
            scrollTop: dis
        }, function () {
            flag = true;
        });//写在回调函数里，滚动完才会触发
        $(this).addClass("bgc").siblings("li").removeClass("bgc");
    })
})