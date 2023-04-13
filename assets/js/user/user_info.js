$(function() {
    
    form.verify({
        nickname: function(value) {
            if (value > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })


    initUserInfo();
})

var form = layui.form;

// 初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            form.val('formUserInfo', res.data)
            // console.log(res)
        }
    })
}

// 重置用户基本信息
$('#btnReset').on('click', function(e) {
    e.preventDefault();
    initUserInfo();
})

// 重新提交用户信息
$('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            // console.log(res)
            if (res.status !==0) {
                return layui.layer.msg('更新用户信息失败！')
            }
            layui.layer.msg('更新用户信息成功！')
            window.parent.getUserInfo();
        }
    })
})