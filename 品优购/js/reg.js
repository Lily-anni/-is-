window.onload = function () {
    var regtel = /^1[3|4|5|7|8]\d{9}$/;//手机号码的正则表达式
    var regqq = /^[1-9][0-9]{4,}$/;
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    regexp(tel, regtel);//手机号验证
    regexp(qq, regqq);
    //表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = ' <i class="success_icon"></i>恭喜您输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = ' <i class="success_icon"></i>格式不正确，请重新输入';
            }
        }
    }
} 