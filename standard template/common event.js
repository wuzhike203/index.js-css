// 本页面统计页面公共的事件
序号    事件名称    容器            触发按钮    相关对象
=======================================================
1       关闭        js-close-ctn    js-close
3       hover                       js-hover    js-hover-con
4       tab         js-tab-ctn      js-tab      js-tab-con       
5       slide       js-slide-ctn    js-slide    js-slide-con


// 1. close
$(document.body).on("click", ".js-close-ctn", function(e){
	if($(e.target).hasClass("js-close")){
		$(this).hide();
	}
});


// 3. hover
$(document.body).on("mouseover", ".js-hover", function(e){
	$(this).find(".js-hover-con").show();
});
$(document.body).on("mouseout", ".js-hover", function(e){
	$(this).find(".js-hover-con").hide();
});

// 4. tab
$(document.body).on("click", ".js-tab", function(e){
	var _eTar = $(e.currentTarget);
	var _ctn = _eTar.parents(".js-tab-ctn");
	
	if(_ctn.length > 0){
		var _next = _ctn.find(".js-tab-con").eq(_ctn.find(".js-tab").index(_eTar));
		
		if(_next.length > 0){
			_ctn.find(".js-tab-con").hide();
			_next.show();
			
			// class 切换
			_ctn.find(".js-tab.active").removeClass("active");
			_eTar.addClass("active");
		}
	}
});

// 6. select
$(document.body).on("click", ".js-select", function(e){
    var _eTar = $(e.target),
        _ctn  = $(this), 
        _ul   = _ctn.find("js-select-ul"),

    if(_eTar.hasClass("js-select-input")){
        // When click input or .input, show select-ul
        if(_ul.length > 0){
            _ul.show();
        }
    }else if(_eTar.hasClass("js-select-li") ||
        _eTar.is("li")){
        // 1 赋值
        var value = _eTar.html();
        // fill input value by the html of the li
        var _input = _ctn.find(".js-select-input");

        // input or .input
        if(_input.is("input")){
            _input.val(value);
        }else{
            _input.html(value);
        }

        // 2 隐藏
        _ul.hide();
    }
});
// 点击其他区域时, 
$(document.body).on("click", function(e){
	var _eTar = $(e.target);
	
    if(_eTar.parents(".js-select").length < 1 && (!_eTar.hasClass("js-select"))){
        $(".js-select-ul").hide();
    }
});

// 7. toggle
$(document.body).on("click", ".js-toggle", function(e){
	var _eTar = $(this);
	
	if(_eTar.hasClass("js-toggle")){
		var _hide_node = _eTar.parent().find(".js-toggle-con");
		if(_hide_node.length < 1){
			_hide_node = _eTar.parent().parent();
		}
		
		_hide_node.toggle();
	}
});
// 点击其他区域时, js-toggle-con 隐藏
$(document.body).on("click", function(e){
	var _eTar = $(e.target);
	
	if(_eTar.parents(".js-toggle").length < 1 && (!_eTar.hasClass("js-toggle"))){
		$(".js-toggle-con").hide();
	}
});
