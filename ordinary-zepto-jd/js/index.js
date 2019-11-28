// 使用zepto实现轮播图效果
$(function(){
   // 1.添加收尾两张图片
   // 2.重新设置图片盒子和的宽度和图片的宽度
   // 3.开启定时器，实现自动轮播
   // 4.添加移动端的滑动事件，实现手动轮播
   //  5.添加过渡效果结束之后的监听

//    获取轮播图元素
    var banner=$(".jd_banner");
    var bannerWidth=banner.width();
//    获取图片盒子
    var imgBox=banner.find("ul:first-of-type");
    // 获取点标记
    var indicators=banner.find("ul:eq(1)").find("li");
//    获取首尾两张图片
    var first=imgBox.find("li:first-of-type");
    var last=imgBox.find("li:last-of-type");
//    将两张图片添加到首尾位置
    imgBox.append(first.clone());
    // jquery的方式在某一项前插入元素
    last.clone().insertBefore(first);
//    设置图片盒子的宽度
    var lis=imgBox.find("li");
//    设置li标签的宽度
    var count=lis.length;
    imgBox.width(count*bannerWidth);
    // 设置li标签的宽度
    lis.each(function (index,value) {
        $(lis[index]).width(bannerWidth);
    });
//    设置默认偏移
    imgBox.css("left",-bannerWidth);

//    定义图片索引
    index=1;
//    开启定时器
    //图片轮播的方法
    var imgAnimation=function(){
        imgBox.animate(
            {"left":-index*bannerWidth},
            200,
            "ease-in-out",
            function(){
                //        动画执行完毕之后的回调
                //         判断当前索引位置是否是最后一张
                if(index==count-1){
                    index=1;
                    //    让它瞬间移动到索引1的位置
                    imgBox.css("left",-index*bannerWidth);
                }else if(index==0){
                    index=count-2;
                    imgBox.css("left",-index*bannerWidth);
                }
                //    设置点标记  (可以一次移除多个元素的class元素)
                indicators.removeClass("active").eq(index-1).addClass("active");
            });
    };
    var timeId=setInterval(function () {
        index++;
        // 开启过渡
        // 设置定位
        imgAnimation();
    },2000);


    
//    左滑动事件
    imgBox.on("swipeLeft",function () {
        clearInterval(timeId);
        index++;
        imgAnimation();
    });
//    右滑动事件
    imgBox.on("swipeRight",function(){
        clearInterval(timeId);
        index--;
        imgAnimation();
    });
});
















