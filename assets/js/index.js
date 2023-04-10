$(function() {
    getUserInfo();
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     console.log(res)
        //     if (res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！") {
        //         // 1.强制清除本地存储
        //         localStorage.removeItem('token');
        //         // 2.不允许登录
        //         location.href = 'login.html'
        //     }
        // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first);
    }
}

// 实现退出功能
$('#btnLogout').on('click', function() {
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 1.清除本地存储
        localStorage.removeItem('token')
        // 2.跳转页面
        location.href = '/login.html'

        layer.close(index);
      });  
})
