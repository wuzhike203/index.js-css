var chr1 = "\ue66d",
    chr2 = "\ue66e";

function addOnload(fun){
    //把函数添加到window.onload
    var old_onload = window.onload;
    if(!old_onload){
        window.onload = fun;
    }else{
        window.onload = function(){
            old_onload();
            fun();
        };
    }
}


//保存底部信息栏位于浏览器底部
function set_height(){
    var nav = document.getElementsByTagName("nav")[0];
    var bottom = document.getElementById("bottom");
    var content = document.getElementById("content");
    var hs = nav.offsetHeight+bottom.offsetHeight+content.offsetHeight;
    if(window.innerHeight>=hs){
        bottom.style.position = "fixed";
    }else{
        bottom.style.position = "relative";
        
    }
}

var gAjax = {
    /* ajax 全局变量 */
    "type": "get",
    "url": "",
    "async": true,   
    "data": "",

    "headers": {},
    "contentType": "application/x-www-form-urlencoded",

    "error": "",
    "success": "",
    "complete": "",
}

function ajax(obj){
    // ajax
    var copy_gAjax = {};
    for(var i in gAjax){
        copy_gAjax[i] = (obj[i]) ? obj[i] : gAjax[i];
    }

    // 判断copy_gAjax每项数据的合法性
    if( !copy_gAjax["url"]){
        return false;
    }

    // 创建 ajax 对象
    var xhr = new XMLHttpRequest();

    // success, error, complete 的回调函数
    xhr.onreadystatechange = function(){
        if(xhr.readystate == 4){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 303){
                // success
                if(typeof copy_gAjax["success"] == "function"){
                    copy_gAjax["success"](xhr.responseText);
                }
            }else{
                // error
                if(typeof copy_gAjax["error"] == "function"){
                    copy_gAjax["error"]();
                }
            }
            
            // complete
            if(typeof copy_gAjax["complete"] == "function"){
                copy_gAjax["complete"]();
            }
        }
    };

    // xhr.open
    xhr.open(copy_gAjax["type"], copy_gAjax["url"], copy_gAjax["async"]);

    // 设置 http 头
    for(var header in copy_gAjax["headers"]){
        xhr.setRequestHeader(header, copy_gAjax["headers"][header]);
    }
    xhr.setRequestHeader("Content-Type", copy_gAjax["contentType"]);

    // xhr.send
    xhr.send(copy_gAjax["data"]);
}


function serialize(form){
    /*
     *  序列化表单: form
     * */ 
    // 判断 form 是否为表单
    if(! "elements" in form){return false;}

    var parts = [],
        tars = form.elements;
    for(var i=0; i<tars.length; i++){
        if(!tars[i].name || tars[i].name == "password2"){
            // 1、如果表单元素的name不存在
            // 2、是隐藏的
            // 3、是验证密码一致的表单
            // 直接跳过
            continue;
        }
        switch(tars[i].type){
            case "button":
                // button直接跳过
                break;
            case "checkbox":
                // 未被选中的复选框直接跳过
                if(!tars[i].checked){ break; }
            case "radio":
                // 未被选中的单选按钮直接跳过
                if(!tars[i].checked){break;}
            case "password":
                // 如果是密码类型，使用md5加密
                if(tars[i].type == "password"){  
                    var passwd_md5 = hex_md5(tars[i].value);
                    parts.push(encodeURIComponent(tars[i].name)+"="+passwd_md5);
                    break;}
            default:
                parts.push(encodeURIComponent(tars[i].name)+"="+encodeURIComponent(tars[i].value));
        }
    }
    return parts.join("&");
}

function isHidden(elem){
    // 判断元素是否隐藏
    var flag;
    for(var i=elem; i && i.nodeName != "BODY"; i=i.parentNode){
        if((getStyle(i,"display") == "none" && i.nodeName != "INPUT") || i.hidden ){
            return true;
        }
        if(getStyle(i,"visiblity") == "hidden"){
            flag = 1;
        }
    }

    if(flag){
        return (getStyle(elem,"visiblity") == "visible") ? false : true;
    }
    return false;
}

function getStyle(elem, property){
    /*
     *  获取元素css样式表中的值
     * */
    if(elem.style[property]){
        // 元素style的property存在
        return elem.style[property];
    }else if(window.getComputedStyle){
        // IE9+
        return window.getComputedStyle(elem,false)[property];
    }else if(elem.currentStyle){
        // IE8-
        return elem.currentStyle[property];
    }
}

function getElementsByName(elem, nameValue){
    /*
     *  所以浏览器支持：document.getElementsByName
     *  获取 elem 后代name属性 == nameValue 的元素
     * */
    var arr = [],
        elems = elem.getElementsByTagName("*");
    for(var i=0; i<elems.length; i++){
        if(elems[i].name == nameValue){
            arr.push(elems[i]);
        }
    }
    return arr;
}

function createSpan(obj,con){
    // 在input后面加入说明信息
    var spans = nextSiblings(obj,"state");
    if(spans.length>0){
        spans[0].innerHTML = con;
    }else{
        var sp = document.createElement("span");
        sp.className = "iconfont state";
        sp.innerHTML = con;
        obj.parentNode.appendChild(sp);
    }
}

function read_data(data,obj){
    /* 
     * 读取json格式数据，并填充数据到obj 
     * */
    if(typeof data =="string" || typeof data =="number"){
        if(obj.tagName == "INPUT"){
			if(obj.type && obj.type == "checkbox"){
				if(data==1){
                    obj.value = 1;
                    obj.checked = true;
				}else{
                    obj.value = 0;
                    obj.checked = false;
				}
			}else if(obj.type == "radio"){
               if(obj.value == data){obj.checked = true;}
			}else{
			    obj.value = data;
			}
		}else if(obj.tagName == "SELECT"){
            obj.value = data;
        }else{
            obj.innerHTML = data;
		}
    }else if(data instanceof Array){
        if(obj.type == "select"){
			if(!obj.querySelector("[name='encryption']")){
			for(var i=0;i<data.length;i++){
				if(obj.querySelector("option[value='"+data[i]+"']").length<=0){
                    var opt = document.createElement("option");
                    opt.value = data[i];
                    opt.innerHTML = data[i];
                    obj.appendChild(opt);
				}
			}
			}
		}else{
            var childs = get_childNodes(obj);
            var num = childs.length;
			for(var k=0;k<data.length;k++){
		        if(k>=num){
                    obj.appendChild(childs[0].closeNode(true));
                    childs = get_childNodes(obj);
				}
				arguments.callee(data[k],childs[k]);
                childs[k].getElementsByClassName("index")[0].innerHTML(k+1);
		    }
		}
    }else if(data instanceof Object){
        for(var j in data){
            var tmp_id = document.getElementById(j);
            var tmp_class = obj.getElementsByClassName(j);
            var tmp_name = obj.querySelectorAll("[name='"+j+"']");
            if(tmp_name[0] && tmp_name[0].type == "radio"){
                for(var m=0;m<tmp_name.length;m++){
                    if(tmp_name[m].value == data[j]){tmp_name=tmp_name[m];break;}
                }
            }else if(tmp_name[0]){
                tmp_name = tmp_name[0];
            }
            var obj2 = tmp_id?tmp_id:(tmp_class.length?tmp_class[0]:(tmp_name?tmp_name:""));
            
			if(obj2){
                //alert(data[j]);
                arguments.callee(data[j],obj2);
			}
        }
    }
}

function read_html(obj,json){
    /* 
     * 从网页中读取json数据
     * 数据在JSON中分4类：
     * ko_json: [key] = {}, kl_json: [key] = []
     * o_json: {} , l_json: []
     *
     * 如果希望某个数据加入到json数据中，就让其class 包含上述4中之一。
     * 所有表单元素如：input, selector, testarea等自动被加入，
     *
     * 示例一：
     *      <div class="o_json">
     *          <input type="text" name="music" value="love">
     *      </div>
     *      输出为：
     *          { "music": "love"}
     * 示例二：
     *      <div class="wuji ko_json">
     *          <input type="text" name="music" value="love">
     *      </div>
     *      输出为：
     *          "wuji": { "music": "love"}
     *
     * 注意：
     *      1、表单元素的name必须存在，否则不会被加入
     *      2、普通元素：如果是ko_josn或kl_json，这种带有key的
     *          则key的选择依据是：
     *              一、元素的ID存在，则为其ID
     *              二、元素ID不存在，则为其第一个className
     * */
	if(obj.getElementsByTagName("input").length>0 
            || obj.getElementsByTagName("select").length>0 
            || obj.getElementsByTagName("textarea").length>0){
        // 如果元素Obj的里面还有表单元素，才继续读取；

		for(var i=obj.firstChild; i; i=i.nextSibling){
            // 从元素obj的第一个子元素开始，直至最后一个元素
            if(i.tagName == "INPUT" || i.tagName == "SELECT" || i.tagName == "TEXTAREA"){
                // 如果这个子元素为表单元素, 且name存在，就开始填充json数据
                // 填充规则：1、如果是单选按钮，但未被选择，绕过
                //           2、如果是多选按钮，选择为1，未选择为0
                //           3、其他的就是：[name] = value
                var name = i.name,val;
                if(name){
                    switch(i.type){
                        case "radio":
                            if(!i.checked){break;}
                        case "checkbox":
                            val = i.checked?1:0;
                            json[name] = val;break;
                        default:
                            val = i.value;
                            json[name] = val;
                    }
                }
            }else{
                // 如果这个子元素为普通元素,则查看其位于哪一种节点：
                // ko_json, kl_json, o_json, l_json
                var mth = i.className ? 
                        i.className.match(/ko_json|kl_json|o_json|l_json/) : "", 
                    json2 = json,
                    key = i.id ? i.id :
                        (i.className ? i.className.split(/\s+/)[0] : "");
                if(mth){
                    switch(mth[0]){
                        case "ko_json":
                            json2 = {};json[key] = json2;break;
                        case "kl_json":
                            json2 = [];json[key] = json2;break;
                        case "o_json":
                            json2 = {};json.push(json2);break;
                        case "l_json":
                            json2 = [];json.push(json2);break;
                    }
                }
                if("getElementsByTagName" in i){
                    arguments.callee(i,json2);
                }
            }
        }
	    return json;
	}
}

function animation(elem, attrName, newAttrValue, time){
    /* 动画 
     * elem: 相关的元素
     * attrName: 属性名称
     * newAttrValue: 新的属性值
     * time: 动画时间
     * */

    // 40ms变化一次，根据人眼暂留时间决定。
    // n : 变化的次数
    var n=parseInt(time/40),i=1;
    // 获取当前属性值
    var oldAttrValue = parseFloat(getStyle(elem, attrName));
    var DValue = (parseFloat(newAttrValue) - oldAttrValue)/n;

    var attr_timeout = setTimeout(change,40);
    function change(){
        i++;
        elem.style[attrName] = oldAttrValue + i*DValue+"px";
        if(--n>1){
            attr_timeout = setTimeout(change,40);
        }else{
            clearTimeout(attr_timeout);
        }
    }
}

function SplitImg(){
    /* 初始化切割对象 */
    // split_img DOM对象
    var split_img = document.getElementById("split_img");
    var img_container = split_img.getElementsByClassName("img_container")[0];
    var win = split_img.getElementsByClassName("win")[0];
    var img = split_img.getElementsByTagName("img")[0];

    var flag = 0, side_flag = "";   //side_flag:边移动的标志，flag：整体移动的标志

    // 计算鼠标移动量
    var oldX, oldY;         //鼠标坐标
    var dx=0, dy=0;         //变化量

    // 计算窗口新参数
    var left_origin, top_origin, bottom_origin, right_origin;  //窗口原始边宽
    var left_new, top_new, bottom_new, right_new;              //窗口新边宽
    // 窗口最大宽度，窗口最大高度
    var max_width, max_height;

    // img_name, img_size, func:用于发送图片及回调
    var img_name="", img_size=0, func={};

    split_img.init = function(){
        /* split_img 初始化
         * 一、容器显示
         * 二、获取容器宽度和高度，只有窗口显示时，才能确定
         *     因为：窗口未显示时，offset没有占用viewport的任何空间，故=0
         * 三、设置win底边和右边的宽度(因border的CSS不能按百分比设置宽度)
         *
         * */
        this.style.display = "block";
        max_width = img_container.offsetWidth; 
        max_height = img_container.offsetHeight;
        win.style.borderTopWidth = "0px";
        win.style.borderLeftWidth = "0px";
        win.style.borderBottomWidth = max_height - 100 +"px";
        win.style.borderRightWidth = max_width - 100 + "px";
    };

    split_img.hide = function(){
        /* 对象隐藏 */
        this.style.display = "none";
    };

    split_img.show = function(src){
        /* 
         * 对象显示：只需要一个src，
         * */
        img.src = src;
        this.init();
    };

    document.body.addEventListener("mouseup", function(){
        /* 
         * 松开鼠标 
         * 为什么要在body上监视松开鼠标事件？
         * 因为鼠标有可能滑出win，
         * */
        flag = 0, side_flag = "";
    });

    document.body.addEventListener("mousedown" ,function(event){
        /* 当按下鼠标时，记录鼠标当前位置 */
        var e = event || window.event;
        oldX = e.clientX, oldY = e.clientY;
    });

    win.onmousedown = function(event){
        /* 一、按下鼠标时, 确定是边移动，还是整体移动：
         *      正常情况下flag = 1;
         *      如果是上边按下，则side_flag = "n_side"
         *      如果是下边按下，则side_flag = "s_side"
         *      如果是左边按下，则side_flag = "w_side"
         *      如果是右边按下，则side_flag = "e_side"
         *      存在side_flag时，就是边移动，否则就是整体移动
         * 二、记录窗口原始数据
         * 三、窗口新参数设置为-1
         * */
        var e = event || window.event;
        var eTarget = e.target?e.target:e.srcElement;

        // 确定事件标志
        flag = 1;
        switch(eTarget.className){
            case "n_side":
                side_flag = "n_side"; break;
            case "e_side":
                side_flag = "e_side"; break;
            case "s_side":
                side_flag = "s_side"; break;
            case "w_side":
                side_flag = "w_side"; break;
            default:
                side_flag = "";
        }

        // 记录窗口原始数据：四边宽度：left, top, bottom, right
        left_origin = win.style.borderLeftWidth ?
                parseInt(win.style.borderLeftWidth) : 0;            //窗口的左边的原始宽度
        top_origin = win.style.borderTopWidth ?
                parseInt(win.style.borderTopWidth) : 0;               //窗口的上边的原始宽度
        bottom_origin = win.style.borderBottomWidth ?
                parseInt(win.style.borderBottomWidth) : 0;       //窗口的下边的原始宽度
        right_origin = win.style.borderRightWidth ?
                parseInt(win.style.borderRightWidth) : 0;        //窗口的右边的原始宽度
        // 窗口新数据改为-1
        left_new = -1, top_new = -1, bottom_new = -1, right_new = -1;
    };

    document.body.addEventListener("mousemove" ,function(event){
        /* 
         * 一、当移动鼠标时，记录鼠标的移动量
         * 二、计算鼠标的移动量
         * 三、根据鼠标的移动量，确定win窗口的四边宽度变化量
         * 四、显示win窗口
         * */
        var e = event || window.event;
        var x = e.clientX, y = e.clientY;
        dx = x - oldX, dy = y- oldY;
        // 根据dx, dy ，flag , side_flag 确定width_new, height_new, left_new, top_new
        // 如果side_flag 存在，说明是边移动，然后，如果flag存在，说明是整体移动
        if(side_flag){
            switch(side_flag){
                case "n_side":
                    // 如果鼠标y方向移动量增加,则上边宽度增加
                    top_new = top_origin + dy;
                    top_new = top_new<0 ? 0 :
                                ( top_new>(max_height-bottom_origin) ?
                                    (max_height-bottom_origin):top_new );
                    break;
                case "e_side":
                    // 如果鼠标x方向移动量增加，则右边宽度减少，
                    right_new = right_origin - dx; 
                    right_new = right_new<0?0:(right_new>(max_width-left_origin)?(max_width-left_origin):right_new);
                    break;
                case "s_side":
                    // 如果鼠标y方向移动量增加，则下边宽度减少，
                    bottom_new = bottom_origin - dy;
                    bottom_new = bottom_new<0?0:(bottom_new>(max_height-top_origin)?(max_height-top_origin):bottom_new);
                    break;
                case "w_side":
                    // 如果鼠标x方向移动量增加，则左边宽度增加
                    left_new = left_origin + dx; 
                    left_new = left_new<0?0:(left_new>(max_width - right_origin)?(max_width - right_origin):left_new);
                    break;
            }
        }else if(flag){
            // 整体移动
            /* 条件：四边宽度>=0
             *
             *   left_origin + dx >=0;
             *   right_origin - dx >=0;
             *   ------> -left_origin =< dx <= right_origin
             *   top_origin +dy >= 0;
             *   bottom_origin -dy >= 0;
             *   ------> -top_origin =< dy <= bottom_origin
             * */
            dx = (dx>right_origin)?right_origin:((dx<-left_origin)?-left_origin:dx);
            dy = (dy>bottom_origin)?bottom_origin:((dy<-top_origin)?-top_origin:dy);

            left_new = left_origin + dx;
            right_new = right_origin - dx;
            top_new = top_origin + dy;
            bottom_new = bottom_origin - dy;
        }
        // 显示明亮图片
        if(flag){
            split_img.winShow();
        }
    });

    split_img.winShow = function(){
        /* 显示小窗口图片 */
        // 四个参数中，改变了的就用新的，否则用原始的
        bottom_new = (bottom_new != -1)?bottom_new:bottom_origin;
        right_new = (right_new != -1)?right_new:right_origin;
        left_new = (left_new != -1)?left_new:left_origin;
        top_new = (top_new != -1)?top_new:top_origin;
        //窗口四边宽度
        win.style.borderBottomWidth = bottom_new+"px";
        win.style.borderRightWidth = right_new+"px";
        win.style.borderLeftWidth = left_new+"px";
        win.style.borderTopWidth = top_new+"px";
    };

    split_img.onclick = function(event){
        /* 点击事件，主要是提交和取消 */
        var e = event || window.event;
        var eTarget = e.target?e.target:e.srcElement;
        if(eTarget.className.indexOf("give_up")>-1){
            // 取消
            split_img.hide();
        }
        if(e.target.className.indexOf("submit")>-1){
            // 提交
            split_img.submit();
        }
    };

    split_img.initSubmit = function(img_n, img_s, fun){
        /* 
         * 初始化提交 
         * 确定img_name：图片名称, img_size：要保存的图片大小,如：500(单位：KB)
         * func：提交之后的回调函数
         * */
        img_name = img_n, img_size = img_s, func = fun;
        if(!img_name || !func){alert("请提供图片名称或回调函数.");return false;}
    };

    split_img.submit = function(){
        /* 
         * 提交到后台 
         *返回新图片的url
         * */
        var con = "";
        // 用户标识
        u = location.search;
        u = u?(u + "&"):"?";
        con += u;
        // 裁切之后的图片尺寸
        con += "left=" + left_new;
        con += "&top=" + top_new;
        con += "&width=" + (win.offsetWidth - left_new - right_new);
        con += "&height="+(win.offsetHeight - top_new - bottom_new);
        // 图片的名称，图片原始尺寸
        // (通过原始尺寸与裁切之后的尺寸的比例，计算正真的裁切尺寸)
        if(!img_name || !func){alert("请提供图片名称或回调函数.");return false;}
        con += "&img_name="+img_name;
        con += "&img_width="+max_width;
        con += "&img_size="+img_size;

        var form_data = new FormData();
        form_data.append("img",img.src.match(/base64[,](.+)/)[1]);
        createAjax("split_img"+con,form_data,function(data){
             if(func){func(data);};
        });
    };
}

function time60(obj, origin_con){
    /* 在一个元素上(通常为一个button对象)
     * 显示60秒倒计时
     * origin_con: 倒计时结束时，元素应该显示什么内容
     * */
    var time = 60;
    origin_con = origin_con ? origin_con : "获取验证码";
    obj.disabled = true;
    var time_inter = setInterval(function(){
        obj.innerHTML = --time+"秒后发送";
        if(time <= 0){
            clearInterval(time_inter);
            obj.innerHTML = origin_con;
            obj.disabled = false;
        }
    },1000);
}

function authPhone(phone){
    //手机号码验证
    if(!phone || !phone.match(/^\d{11}$/)){return false;}
    var d_23g = [133,153,180,181,189];
    var d_4g = [173,177];
    var l_2g = [130,131,132,155,156];
    var l_3g = [185,186];
    var l_4g = [176,185];
    var y_2g = [134,135,136,137,138,139,150,151,152,158,159,182,183,184];
    var y_3g = [157,187,188];
    var y_4g = [178,184];
    var virtual_p = [170];
    var mac_list = d_23g.concat(d_4g,l_2g,l_3g,l_4g,y_2g,y_3g,y_4g,virtual_p);
    for(var i=0;i<mac_list.length;i++){
        if(phone.match(/^\d{3}/)[0] == mac_list[i]){
            return true;
        }
    }
    return false;
}

function authEmail(email){
    //email地址验证
    return /^\w+[@]\w+[.](com|net|cn)/.test(email)
}

function authMac(mac){
    //mac地址验证
    return /^([\da-f]{2}[:]){5}[\da-f]{2}$/.test(mac);
}

function authGeo(geo){
    // 百度地理位置lng,lat
    return /^[(][\d.]{3,15}[,][\d.]{3,15}[)]$/.test(geo);
}

function authChar(val, len){
    // 下划线, 字母, 数字, 中文验证, 
    // len:指定最小长度
    if(/^\d+$/.test(val)){
        alert("不能全为数字!");return false;
    }

    // 默认最小长度为3
    var leng = len?len:3;
    var m = val.match(/^[_\w\u4e00-\u9f00]+$/);
    if(m && m[0].length>=leng){
        return true;
    }else{
        return false;
    }
}

function set_requireds(reqs,f){
    var fg = f?1:0;
    for(var i=0;i<reqs.length;i++){
        reqs[i].flag = fg;
    }
}

function drawC(cvs,color,width){
    /* 绘制静态圆环 
     * cvs: canvas元素
     * color：圆环颜色
     * width：圆环宽度
     * 圆环半径默认为：cvs宽度的1/3
     *
     * 从正上方开始绘制
     * */ 
    var ctx = cvs.getContext("2d");
    ctx.restore();
    ctx.save();
    var origin = -1.55;
    //绘图状态
    ctx.translate(cvs.width/2,cvs.height/2);
    ctx.lineWidth = width?width:20;
    ctx.strokeStyle = color?color:"#9ad8aa";
    ctx.arc(0,0,cvs.width/3,origin,6.26+origin);
    ctx.stroke();
    ctx.beginPath();
}

function drawGauge(cvs,pre,cur,col1,col2,width){
    /* 圆环动态增加或减少 
     * cvs: cvs元素
     * pre：之前的角度(0 - 1)
     * cur：现在的角度(0 - 1)
     * col1：前景色
     * col2：背景色
     * width：圆环宽度
     * 圆环半径默认为：cvs宽度的1/3
     *
     * 从正上方开始绘制
     * */
    if(pre == cur){return;}

    var ctx = cvs.getContext("2d");
    ctx.restore();
    ctx.save();

    // 增加还是减少，圆弧参数
    var flag = (cur>pre)?false:true;
    // 每次变化的角度
    var da = (cur>=pre)?0.05:-0.05;
    // 变化的时间间隔
    var min_time = 20;

    // 绘制的起点：正上方
    var origin = -1.55;
    pre = (pre-Math.floor(pre))*Math.PI*2+origin;
    cur = (cur-Math.floor(cur))*Math.PI*2+origin;
    // 绘图状态: 线宽，描绘的颜色
    ctx.translate(cvs.width/2,cvs.height/2);
    ctx.lineWidth = width?width:16;
    ctx.strokeStyle = (cur>pre)?(col1?col1:"#fcc0af"):(col2?col2:"#9ad8aa");
    
    var tmp = pre,num=0;
    var tt = setInterval(function(){
        ctx.arc(0,0,cvs.width/3,tmp,tmp+da,flag);
        ctx.stroke();
        tmp += da;
        if(Math.abs(tmp-cur)<=Math.abs(da)){
            clearInterval(tt);
            ctx.arc(0,0,cvs.width/3,tmp,cur,flag);
            ctx.stroke();
        }
      
   },min_time);
   ctx.beginPath();
}


function joinUrl(url,search){
    /* 连接url与查询字符串 */
    if(/[?]/.test(url)){
        return url+"&"+search;
    }else{
        return url+"?"+search;
    }
}

function ifImg(txt){
    /* 
     * 由给定的图片路径，判断是否为图片
     * 如果是图片，则返回图片的扩展名
     * 如果不是，
     * */
    var img_list = [".jpeg",".png",".gif",".jpg"];
    var extention_name = txt.match(/[.]\w{3,5}$/);
    if(extention_name && img_list.indexOf(extention_name[0].toLowerCase())>-1){
        return extention_name;
    }else{
        return false;
    }
}

function surePosByOffset(elem , origin_style ,origin_off , off){
    // 根据元素elem的 offset 确定元素的位置  : 主要用于元素移动时
    // elem:元素 , 
    // origin_style = [origin_style_left,origin_style_top]
    // origin_style_left:元素初始style_left , origin_style_top:元素初始style_top
    // origin_off = [origin_offX,origin_offY]
    // origin_offx : 元素初始offsetLeft , origin_offy : 元素初始offsetTop
    // off = [offL,offT]
    // offset 和 style 之间的换算
    elem.style.left = (arguments[3][0] + arguments[1][0]- arguments[2][0]) + "px";
    elem.style.top = (arguments[3][1] + arguments[1][1]- arguments[2][1]) + "px";
}

function sureMovable(elem){
    //确保元素可以移动
    // 只有元素的style .left 和 top 起作用时，才可移动：即：positon:aboslute 或 relative
    if(!elem.style.position || elem.style.position == "static"){
        elem.style.position = "relative";
    }
}

//创建一个可以使元素移动的函数
// 需要一个全局变量来保存当前准备移动的元素对象:wujiMover 和 wujiMoveFlag 同时按下鼠标的标志
var wujiMover,wujiMoveFlag , wujiMoveSubFlag;
//document
document.addEventListener("mouseup",function(event){
    //释放鼠标
    wujiMoveFlag = false , wujiMoveSubFlag = false;
    //销毁对象
    wujiMover = null;
});

document.addEventListener("mousemove",function(event){
    //鼠标移动
    var e= event || window.event;
    if(wujiMoveFlag){
        // 只有当在元素上按下鼠标时，才有效
        //e.clientX  , e.clientY   :鼠标相对于浏览器的位置
        //调用元素自己的方法:获取元素相对于浏览器的位置 ， 计算元素的位置
        wujiMover.getOffset([e.clientX,e.clientY]);
        wujiMover.surePosByOffset([wujiMover.cliX,wujiMover.cliY]);
    }
});

function moveElem(elem,subElem){
    //接受一个元素对象，使其可以被鼠标拖动
    //elem:要移动的元素，
    //subElem：子元素。如果存在子元素，则要求只能当鼠标在子元素上才可以移动父元素
    //设一个全局变量，wujiMoveSubFlag:当鼠标在子元素上的时候，才为true;
    var new_obj = new Object();
    new_obj.elem = elem;
    //确保元素可以移动
    sureMovable(new_obj.elem);

    //按下鼠标的时候，确定鼠标相对于元素中的位置：offsetX , offsetY
    new_obj.offX = 0,new_obj.offY = 0;
    // 元素移动过程中，保存元素相对于浏览器的位置信息
    new_obj.cliX = 0,new_obj.cliY = 0;
    // 元素的offsetLeft 和 offsetTop 与 style.left 和 style.top 之间的关系
    //当元素移动时，他们的差值应该保持不变。
    //最开始时，元素的style.left 和 style.top ，offsetLeft 和 offsetHeight 的值
    new_obj.origin_offX = new_obj.elem.offsetLeft , new_obj.origin_offY = new_obj.elem.offsetTop ;
    new_obj.origin_style_left = new_obj.elem.style.left?parseInt(new_obj.elem.style.left):0 ;
    new_obj.origin_style_top = new_obj.elem.style.top?parseInt(new_obj.elem.style.top):0 ;

    new_obj.surePosByOffset = function(off){
        // 根据元素elem的offset 确定元素的位置
        // 对象自己的surePosByOffset
        // 相当于python 中的偏函数
        // off = [offx,offy]
        surePosByOffset(new_obj.elem,
                [new_obj.origin_style_left,new_obj.origin_style_top],
                [new_obj.origin_offX,new_obj.origin_offY],
                arguments[0]);
    };

    new_obj.getOffset = function(client){
        // 接受一个坐标：鼠标相对于浏览器的位置 , 返回元素相对于浏览器的位置
        // client = [clientx,clienty]
        //鼠标相对于浏览器的位置 - 鼠标相对于元素的位置 = 元素相对于浏览器的位置
        this.cliX = arguments[0][0] - this.offX , this.cliY = arguments[0][1] - this.offY;
    };

    new_obj.elem.addEventListener("mousedown",function(event){
        // 确定可以移动的标志
        if(wujiMoveSubFlag){
            // 如果存在子元素，则要确定鼠标是否在子元素上
            // 在元素上按下鼠标时，flag = true , 同时把此对象加入到wujiMover中
            wujiMoveFlag = true , wujiMover = new_obj;
            var e= event || window.event;
            //按下的时候，确定鼠标相对于元素中的位置：offsetX , offsetY
            new_obj.offX = e.offsetX, new_obj.offY = e.offsetY;
        }
    });

    if(subElem){
        //如果存在子元素
        subElem.addEventListener("mousedown",function(event){
            wujiMoveSubFlag = true;
        });
    }
}


function myInterval(func,second){
    //接受一个函数对象，1、立即执行 ， 2、加入setInterval
    func();
    return setInterval(func,second);
}

