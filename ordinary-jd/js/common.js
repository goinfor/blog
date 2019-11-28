var common={
    tab:function(obj,callback){
        if(!obj || typeof obj != "object"){
            return;
        }
        var startX,startY,startTime;
        obj.addEventListener("touchstart",function(e){
            if(e.targetTouches.length>1){
                return;
            }
            startTime=Date.now();
            startX=e.targetTouches[0].clientX;
            startY=e.targetTouches[0].clientY;

        });
        obj.addEventListener("touchend",function (e) {
            if(e.changedTouches.length>1){
                return;
            }
            if(Date.now()-startTime>150){
                return;
            }
            var endX=e.changedTouches[0].clientX;
            var endY=e.changedTouches[0].clientY;

            if(Math.abs(endX-startX)>6 || Math.abs(endY-startY)>6){
                return;
            }
            callback && callback(e);
        })
    }
}