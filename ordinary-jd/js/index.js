window.onload = function(){
    searchEffect();
    timeBack();
    bannerEffext();
};
// 头部搜索块的js效果
function searchEffect(){
    // 1、获取当前banner的高度
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    // console.log(bannerHeight);
    var search = document.querySelector(".jd_search");
    // 2、获取当前屏幕滚动时，banner滚动出屏幕的距离
    window.onscroll = function(){
        // 不知道从Chrome哪个版本开始，页面最外层的滚动放到document上面去了，而不是body，所以获取需要用document.documentElement.scrollTop
        var offsetTop = document.body.scrollTop + document.documentElement.scrollTop;
        var opacity = 0;
        // 3、计算比例值。获取透明度，设置背景颜色样式
        if(offsetTop < bannerHeight){
            opacity = offsetTop/bannerHeight;
            console.log(offsetTop+":"+opacity);
            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }

    }
}
// 倒计时效果
function timeBack() {
    //1、 获取用于展示时间的span
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    // 2、设置初始倒计时时间，以秒为单位
    var totalTime = 3700;  //1*60*60
    // 3、开始定时器
    var timeId = setInterval(function(){
        totalTime--;
        // 判断倒计时时间是否已完成
        if(totalTime < 0){
            clearInterval(timeId);
            retutn;
        }
        // 小时
        var hour = Math.floor(totalTime/3600);
        // 分钟
        var minute = Math.floor(totalTime%3600/60);
        // 秒
        var second = Math.floor(totalTime%60);

        // console.log(hour+":"+minute+":"+second);

        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);

        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = Math.floor(minute%10);

        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);
    },1000);
}
// 轮播图思路：
// 1、在收尾添加图片

//  2、修改页面结构
//  3、修改对应的样式
//  4、设置默认的偏移，默认应该显示索引的图片
function bannerEffext(){
    // 1、设置轮播图页面的结构
    //     a、在开始位置添加原始的最后一张图片
    //     b、在末尾位置添加原始的第一张图片
    // 1.1获取轮播图结构
    var banner = document.querySelector(".jd_banner");
    // 1.2获取图片容器
    var imgBox = banner.querySelector("ul:first-of-type");
//    1.3获取原始的第一章图片
     var first = imgBox.querySelector("li:first-of-type");
//    1.4获取原始的最后一张图片
    var last = imgBox.querySelector("li:last-of-type");
//     1.5在收尾插入两张图片 cloneNode 复制一份。直接append是剪切
//        如果不在首尾加图片的话，就很生硬
//     参数true表示复制里面的内容一起，为false表示只复制当前节点
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

    // 2.设置对应的样式
//   2.1获取所有的li元素
    var list = imgBox.querySelectorAll("li");
    // 2.2获取li的数量
    var count = list.length;
    // 2.3获取banner的宽度
    var bannerWidth = banner.offsetWidth;
    // 2.4设置图片盒子的宽度
    imgBox.style.width = count*bannerWidth+"px";
    // 2.5设置每一个li（图片）的宽度
    for(var i = 0;i<list.length;i++){
        list[i].style.width = bannerWidth+'px';
    }

    // 定义图片的索引  图片已经有了一个宽度的索引
    var index = 1;
    // 3.设置默认的偏移
    imgBox.style.left = - bannerWidth + "px";
//    4.当屏幕发生变化时，重新计算屏幕宽度
    window.onresize = function () {
        // 4.1获取banner的宽度,覆盖全局宽度值
        bannerWidth = banner.offsetWidth;
        // 4.2设置图片盒子的宽度
        imgBox.style.width = count*bannerWidth+"px";
        // 4.3设置每一个li（图片）的宽度
        for(var i = 0;i<list.length;i++){
            list[i].style.width = bannerWidth+'px';
        }
        // 4.4.重新设置默认的偏移
        imgBox.style.left = - index*bannerWidth + "px";
    }

    // 实现点标记
    var setIndicator=function(index){
        var indicators = banner.querySelector("ul:last-of-type").querySelectorAll("li");

        // 先清除当前li元素添加的active 样式
        for(var i=0;i<indicators.length;i++){
            indicators[i].classList.remove("active");
        }
        // 为当前的li添加样式
        indicators[index-1].classList.add("active");
    }



//   5. 实现自动轮播
    var timeId = null;
    var startTime = function () {
        timeId = setInterval(function () {
            //5.1变换索引
            index ++ ;
            //5.2添加过渡效果
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = - index * bannerWidth +"px";
            //    5.4判断是否到最后一张
            setTimeout(function () {
                if(index == count -1 ){
                    index = 1;
                    // 如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果
                    imgBox.style.transition = "none";
                    //    偏移到指定的位置
                    imgBox.style.left = (-index*bannerWidth) + "px";
                }
            },500);
        },2000);
    }
    startTime();
//   6. 实现手指轮播
    var tartX,moveX,distanceX;
    // 标记当前过度效果是否已经执行完毕
    var isEnd = true;
    // 为图片添加触摸事件--触摸开始
    imgBox.addEventListener("touchstart",function (e) {
        // 清除定时器
        clearInterval(timeId);
        // 获取当前手指的起始位置
        startX = e.targetTouches[0].clientX;
    });
    // 为图片添加触摸事件--滑动过程
    imgBox.addEventListener("touchmove",function (e) {
        if(isEnd){
            moveX = e.targetTouches[0].clientX;
            // 计算坐标差异
            distanceX = moveX-startX;
            imgBox.style.transition = "none";
            console.log(distanceX);
            //    实现元素的偏移
            //    本次的滑动操作应该基于之前轮播图已经偏移的距离
            imgBox.style.left = -index *bannerWidth + distanceX + "px";
        }
    })
    // 添加触摸结束事件
    imgBox.addEventListener("touchend",function (e) {
        // 松开手指，标记当前过渡效果正在执行
        isEnd = false;
        // 获取当前滑动的距离，判断距离是否超出指定的范围 100px
        if(Math.abs(distanceX) > 100){
            if(distanceX > 0 ){//上一张
                index--;
            }else{
                index++;
            }
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left = -index*bannerWidth+"px";
        //    回弹
        }else if(Math.abs(distanceX) > 0){
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left = -index*bannerWidth+"px";
        }
    //  将上一次move所产生的数据重置为0
        startX = 0;
        moveX = 0;
        distanceX = 0;
    //    重新开启定时器
        startTime();
    });
//    webkitTransitionEnd:可以监听当前元素的过度效果执行完毕，当一个元素的过度效果执行完毕的时候，会触发这个事件
    imgBox.addEventListener("webkitTransitionEnd",function () {
    //    如果到了最后一张，回到索引1
        if(index == count-1){
            index = 1;
            //    清除过度
            imgBox.style.transition = "none";
            //    设置偏移
            imgBox.style.left = -index * bannerWidth +"px";
        }else if(index == 0){
            //    如果到了第一张，回到索引count-2
            index = count-2;
            //    清除过度
            imgBox.style.transition = "none";
            //    设置偏移
            imgBox.style.left = -index * bannerWidth +"px";
        }

        setIndicator(index);

        setTimeout(function () {
            isEnd = true;
            //如果不清除的话，定时器会越来越多
            clearInterval(timeId);
            startTime();
        },500);

    })
}





