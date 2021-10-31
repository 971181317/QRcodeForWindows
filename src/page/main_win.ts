(function () {
    //加载界面
    $("#loading").animate({
        opacity: 0.5
    }, 2000, function () {
        $("#app").animate({
            opacity: 1
        }, 2000);
        $("#loading").animate({
            opacity: 0
        }, 1000, function () {
            //删除loading
            $(this).remove();
        });
    });
    // 实时转换二维码
    //加载界面
    $("#loading").animate({
        opacity: 0.5
    }, 2000, function () {
        $("#app").animate({
            opacity: 1
        }, 2000);
        $("#loading").animate({
            opacity: 0
        }, 1000, function () {
            //删除loading
            $(this).remove();
        });
    });
    // 实时转换二维码
    $("#qrcode-text").bind('input propertychange', async function () {
        let text = $("#qrcode-text").val();
        let result = await (<any>window).qrcode.getQrcodeImg(text);
        $("#qrcode img").attr("src", result);
        // var qrcode = new QRCode("qrcode", {
        //     width: 200,
        //     height: 200,
        //     colorDark: '#000000',
        //     colorLight: '#ffffff',
        //     correctLevel: QRCode.CorrectLevel.H
        // });
        // qrcode.makeCode(text);
    });
    // 保存图片
    $("#save-qrcode").click(() => {
        var url = $("#qrcode img").attr("src"); // 获取图片地址
        var a = $("#download-a");
        a.attr("href", url); // 填充url
        a[0].dispatchEvent(new MouseEvent('click')) // 触发鼠标点击事件
    })
})();
