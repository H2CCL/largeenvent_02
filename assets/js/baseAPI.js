$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://www.liulongbin.top:3007' + options.url;

        // 统一为有权限的接口，设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        // 统一挂在complete回调函数
        options.complete = function(res) {
            console.log(res)
            if (res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！") {
                // 1.强制清除本地存储
                localStorage.removeItem('token');
                // 2.不允许登录
                location.href = 'login.html'
            }
        }
    })
})