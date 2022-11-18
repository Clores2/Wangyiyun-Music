function remSize() {
    //获取当前设备的宽度，由于谷歌和IE不一样所以我们两种都要考虑
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    //按照Iphone的屏幕宽度750px
    // 识别屏幕宽度，不能太大或者太小
    if (deviceWidth >= 750) deviceWidth = 750;
    if (deviceWidth <= 320) deviceWidth = 320;
    //通过屏幕大小设置字体大小
    // 这里让1rem=100px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + "px";
    //默认字体大小
    document.querySelector('body').style.fontSize = 0.3 + "rem";
}

remSize();

//窗口发生变化时调用
window.onresize = function () {
    remSize();
}