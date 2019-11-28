window.onload=function () {
    var ct_cLeft=document.querySelector(".ct_cLeft");
    var leftHeight=ct_cLeft.offsetHeight;
    var ulBox=ct_cLeft.querySelector("ul:first-of-type");
    var lis=ulBox.querySelectorAll("li");

    var ulBoxHeight=ulBox.offsetHeight;
    //设置静止状态下的最大的top值
    var maxTop=0;
    //  设置静止状态下最小的top值
    var minTop=leftHeight-ulBoxHeight;
    //设置滑动状态下的最大的top值；
    var maxBounceTop=maxTop+100;
    //设置滑动状态下的最小的top值；
    var minBounceTop=minTop-100;

    // 实现滑动
    var startY=0;
    var moveY=0;
    var distanceY=0;
    var currentY=0;

    ulBox.addEventListener("touchstart",function (e) {
        startY=e.targetTouches[0].clientY;
    });
    ulBox.addEventListener("touchmove",function (e) {
        moveY=e.targetTouches[0].clientY;
        distanceY=moveY-startY;
        //判断滑动时候是否超出指定的滑动区间
        console.log(leftHeight);
        console.log(ulBoxHeight);
        console.log(minBounceTop);
        console.log(minTop);
        if((currentY+distanceY) > maxBounceTop || currentY + distanceY < minBounceTop){
            return;
        }
        ulBox.style.transition="none";
        ulBox.style.top=(currentY+distanceY)+"px";
    });
    ulBox.addEventListener("touchend",function (e) {
        if(currentY+distanceY < minTop){
            ulBox.style.transition="top 0.5s ease-in-out";
            ulBox.style.top=minTop+"px";
            currentY=minTop;
        }else if(currentY+distanceY > maxTop){
            ulBox.style.transition="top 0.5s ease-in-out";
            ulBox.style.top=maxTop+"px";
            currentY=maxTop;
        }else{
            // 记录当前滑动的距离
            currentY+=distanceY;
        }

    });

    // 绑定移动端的tap事件
    // $(ulBox).on("tap",function(e){
    //     for(var i=0;i<lis.length;i++){
    //         lis[i].index=i;
    //         lis[i].classList.remove("active");
    //     }
    //     var li=e.target.parentNode;
    //     var liHeight=li.offsetHeight;
    //     li.classList.add("active");
    //
    //     var index=li.index;
    //     ulBox.style.transition="top 0.5s ease-in-out";
    //     if(-index*liHeight < minTop){
    //         ulBox.style.top=minTop+"px";
    //         currentY=minTop
    //     }else{
    //         ulBox.style.top=-index*liHeight+"px";
    //         currentY=-index.liHeight;
    //     }
    //
    // })

    /*绑定fastclick*/
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
            FastClick.attach(document.body);
        }, false);
    }

    ulBox.addEventListener("click",function(e){
        /*1.修改li元素的样式：将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
        for(var i=0;i<lis.length;i++){
            lis[i].index=i;
            lis[i].classList.remove("active");
        }
        /*为当前被单击的li元素添加样式*/
        var li=e.target.parentNode;
        var liHeight=li.offsetHeight;
        li.classList.add("active");

        /*2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值*/
        /*获取当前li元素的索引值*/
        var index=li.index;
        /*开启过渡*/
        ulBox.style.transition="top .5s";
        /*设置偏移*/
        if(-index*liHeight < minTop){
            /*只能偏移到minTop位置*/
            ulBox.style.top=minTop+"px";
            currentY=minTop;
        }
        else{
            ulBox.style.top=-index*liHeight+"px";
            currentY=-index*liHeight;
        }
    })

    //刚开始没有效果是因为ul梅雨高度
    var iscroll=new IScroll(".ct_hostCategory",{
        mouseWheel:true
    });

};












