$(function() {
    var layer = layui.layer;

    // 1.1获取裁剪的DOM元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 为上传按钮注册点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    // 为文件选择框绑定change事件
    $('#file').on('change', function(e) {
        // console.log(e)
        var filelist = e.target.files;
        if (filelist.length ===0) {
            return layer.msg('请选择图片！')
        }
        var file = e.target.files[0];
        var imageURL = URL.createObjectURL(file);
        $image.cropper('destroy')
        .attr('src', imageURL)
        .cropper(options)
    })

    // 为确定按钮添加点击事件
    $('#btnUpload').on('click',function() {
        // 1.要拿到用户裁剪之后的头像
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

        // 2.调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('上传头像失败！')
                }
                layer.msg('上传头像成功！')
                window.parent. getUserInfo()
            }
        })
    })
})