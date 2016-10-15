/*
 * 身份信息，资金明细js
 * 16-09-30 @ Bob.wu
 * */


    /*
     * classList
     * IE8- not support
     * */
    var oClassList = {
        re: function(cName){
            // 正则类
            return new RegExp("\s*" + cName + "\s*");
        },
        add: function(cName){
            // 增加类
            if(! oClassList.contains.call(this, cName) ){
                this.className += (" " + cName);
            }
        },
        remove: function(cName){
            // 删除类
            this.className = this.className.replace(oClassList.re(cName), " ");
        },
        contains: function(cName){
            // 判断类
            return (this.className.search(oClassList.re(cName)) != -1) ? true : false;
        },
        toggle: function(cName){
            // 切换类
            if(oClassList.contains.call(this, cName)){
                oClassList.remove.call(this, cName);
            }else{
                oClassList.add.call(this, cName);
            }
        }
    }
	

    /*
     *  window
     *  classList
     * */ 
    window.classList = {};
    for(var i in oClassList){
        window.classList[i] = function(i){
            return function(elem, cName){
                if(elem.classList){
                    return elem.classList[i](cName);
                }else{
                    return oClassList[i].call(elem, cName);
                }
            };
        }(i);
    }

/*
 * event
 * IE8- DOM2级事件处理程序：attach, detach
 * */
var EventUtil = {
    addHandler: function(elem, type, handler){
        // 添加事件处理程序
        if(elem.addEventListener){
            elem.addEventListener(type, handler, false);
        }else if(elem.attachEvent){
            elem.attachEvent("on" + type, handler);
        }else{
            elem["on" + type] = handler;
        }
    },
    removeHandler: function(elem, type, handler){
        // 移除事件处理程序
        if(elem.removeEventListener){
            elem.removeEventListener(type, handler, false);
        }else if(elem.detachEvent){
            elem.detachEvent("on" + type, handler);
        }else{
            elem["on" + type] = null;
        }
    },
    getEvent: function(event){
        // 获取事件对象
        return event ? event : window.event;
    },
    getTarget: function(event){
        // 获取事件目标
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        // 阻止事件默认行为
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        // 阻止事件进一步传播
        if(evnet.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
};

var moneyDetail = document.getElementById("tpay_moneyDetail");
EventUtil.addHandler(moneyDetail, "click", billYesNo);

function billYesNo(event){
    /* 已付账单和未付账单切换显示 */
    var e = EventUtil.getEvent(event);
    var eTarget = EventUtil.getTarget(e);

    if( eTarget.nodeName == "A"){
        var subConYes = getElementsByClassName(moneyDetail, "tpay_subConYes")[0];
        var subConNo = getElementsByClassName(moneyDetail, "tpay_subConNo")[0];
        var tpay_item1 = getElementsByClassName(moneyDetail, "tpay_item1")[0];

        if( classList.contains(eTarget.parentNode, "tpay_billYes") ){
            classList.remove( subConYes, "tpay_hide");
            classList.add(subConNo, "tpay_hide");
            // 字体颜色切换
            classList.remove(
                    getElementsByClassName(tpay_item1, "tpay_colorT")[0], 
                    "tpay_colorT");
            classList.add( eTarget, "tpay_colorT");
        }
        if( classList.contains(eTarget.parentNode, "tpay_billNo")){
            classList.add(subConYes, "tpay_hide");
            classList.remove(subConNo, "tpay_hide");
            // 字体颜色切换
            classList.remove(
                    getElementsByClassName(tpay_item1, "tpay_colorT")[0], 
                    "tpay_colorT");
            classList.add(eTarget, "tpay_colorT");
        }
    }
}

function getElementsByClassName(elem, cName){
    /* IE8- 不支持此方法 */
    if( "getElementsByClassName" in elem ){
        return elem.getElementsByClassName(cName);
    }else{
        var resu = [], 
            elems = elem.getElementsByTagName("*"), 
            len = elems.length;
        for( var i=0; i<len; i++){
            if( classList.contains(elems[i], cName) ){
                resu.push(elems[i]);
            }
        }
        return resu;

    }
}

