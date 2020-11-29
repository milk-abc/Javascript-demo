//参数：obj:要执行动画的对象;speed:移动的速度(正数向右);target:目标位置;attr:样式
//callback:回调函数
function move(obj,attr,target,speed,callback) {
    clearInterval(obj.timer);
    var current=parseInt(getStyle(obj,attr));
    if(current>target){
        speed=-speed;
    }
    //添加一个timer属性
    obj.timer=setInterval(function () {
        //获取box1原来的offsetLeft值
        var oldValue=parseInt(getStyle(obj,attr));
        //在旧值的基础上增加
        var newValue=oldValue+speed;
        if ((speed<0 && newValue<target) || (speed>0 && newValue>target)){
            newValue=target;
        }
        obj.style[attr]=newValue+"px";
        //当元素移动到800px时，停止
        if (newValue===target){
            clearInterval(obj.timer);
            callback && callback();
        }
    },30);
}
function getStyle(obj,name) {
    if(window.getComputedStyle){
        //正常浏览器的方式，具有getComputedStyle方法
        return getComputedStyle(obj,null)[name];
    }else{
        //IE8的方式，没有getComputedStyle方法
        return obj.currentStyle[name];
    }
}