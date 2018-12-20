var tabFilter,menu=[],liIndex,curNav,delMenu;
layui.define(["element","jquery"],function(exports){
	var element = layui.element,
		$ = layui.jquery,
		layId,
		Tab = function(){
			this.tabConfig = {
				closed : true,
				openTabNum : 10,
				tabFilter : "bodyTab"
			}
		};

	//显示左侧菜单
	if($(".navBar").html() == ''){
		var _this = this;
		$(".navBar").html(navBar(navs)).height($(window).height()-109);
		element.init();  //初始化页面元素
		$(window).resize(function(){
			$(".navBar").height($(window).height()-109);
		});
	}

	//参数设置
	Tab.prototype.set = function(option) {
		var _this = this;
		$.extend(true, _this.tabConfig, option);
		return _this;
	};

	//通过title获取lay-id
	Tab.prototype.getLayId = function(title){
		$(".layui-tab-title.top_tab li").each(function(){
			if($(this).find("cite").text() == title){
				layId = $(this).attr("lay-id");
			}
		});
		return layId;
	}
	//通过title判断tab是否存在
	Tab.prototype.hasTab = function(title){
		var tabIndex = -1;
		$(".layui-tab-title.top_tab li").each(function(){
			if($(this).find("cite").text() == title){
				tabIndex = 1;
			}
		})
		return tabIndex;
	}

	//右侧内容tab操作
	var tabIdIndex = 0;
	Tab.prototype.tabAdd = function(_this){
		/*if(window.sessionStorage.getItem("menu")){
			menu = JSON.parse(window.sessionStorage.getItem("menu"));
		}*/
		var that = this;
		var closed = that.tabConfig.closed,
			openTabNum = that.tabConfig.openTabNum;
			tabFilter = that.tabConfig.tabFilter;
		// $(".layui-nav .layui-nav-item a").on("click",function(){
			if(_this.find("i.iconfont,i.layui-icon").attr("data-icon") != undefined){
				var title = '';
				if(that.hasTab(_this.find("cite").text()) == -1 && _this.siblings("dl.layui-nav-child").length == 0){
					if($(".layui-tab-title.top_tab li").length == openTabNum){
						layer.msg('只能同时打开'+openTabNum+'个选项卡哦。不然系统会卡的！');
						return;
					}
					tabIdIndex++;
					if(_this.find("i.iconfont").attr("data-icon") != undefined){
						title += '<i class="iconfont '+_this.find("i.iconfont").attr("data-icon")+'"></i>';
					}else{
						title += '<i class="layui-icon">'+_this.find("i.layui-icon").attr("data-icon")+'</i>';
					}
					title += '<cite>'+_this.find("cite").text()+'</cite>';
					title += '<i class="layui-icon layui-unselect layui-tab-close" data-id="'+tabIdIndex+'">&#x1006;</i>';
					element.tabAdd(tabFilter, {
				        title : title,
				        content :"<iframe id='iframeCon' src='"+$('#pageContext').val()+_this.attr("data-url")+"' data-id='"+tabIdIndex+"'></frame>",
				        id : new Date().getTime()
				    })

					//当前窗口内容
					var curmenu = {
						"icon" : _this.find("i.iconfont").attr("data-icon")!=undefined ? _this.find("i.iconfont").attr("data-icon") : _this.find("i.layui-icon").attr("data-icon"),
						"title" : _this.find("cite").text(),
						"href" : _this.attr("data-url"),
						"layId" : new Date().getTime()
					}
					menu.push(curmenu);
					//window.sessionStorage.setItem("menu",JSON.stringify(menu)); //打开的窗口
					//window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));  //当前的窗口
					element.tabChange(tabFilter, that.getLayId(_this.find("cite").text()));
					CustomRightClick();
				}else{
					//当前窗口内容
					var curmenu = {
						"icon" : _this.find("i.iconfont").attr("data-icon")!=undefined ? _this.find("i.iconfont").attr("data-icon") : _this.find("i.layui-icon").attr("data-icon"),
						"title" : _this.find("cite").text(),
						"href" : _this.attr("data-url"),
						"layId" : new Date().getTime()
					}
					//window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));  //当前的窗口
					element.tabChange(tabFilter, that.getLayId(_this.find("cite").text()));
					CustomRightClick();
				}
			}
		// })
	}
	$("body").on("click",".top_tab li",function(){
		//切换后获取当前窗口的内容
		/*var curmenu = '';
		var menu = JSON.parse(window.sessionStorage.getItem("menu"));
		curmenu = menu[$(this).index()-1];
		if($(this).index() == 0){
			window.sessionStorage.setItem("curmenu",'');
		}else{
			window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
			if(window.sessionStorage.getItem("curmenu") == "undefined"){
				//如果删除的不是当前选中的tab,则将curmenu设置成当前选中的tab
				if(curNav != JSON.stringify(delMenu)){
					window.sessionStorage.setItem("curmenu",curNav);
				}else{
					window.sessionStorage.setItem("curmenu",JSON.stringify(menu[liIndex-1]));
				}
			}
		}*/
		element.tabChange(tabFilter,$(this).attr("lay-id")).init();
		CustomRightClick();
	})

	//删除tab
	$("body").on("click",".top_tab li i.layui-tab-close",function(){
		//删除tab后重置session中的menu和curmenu
		liIndex = $(this).parent("li").index();
		//var menu = JSON.parse(window.sessionStorage.getItem("menu"));
		//获取被删除元素
		delMenu = menu[liIndex-1];
		//var curmenu = window.sessionStorage.getItem("curmenu")=="undefined" ? "undefined" : window.sessionStorage.getItem("curmenu")=="" ? '' : JSON.parse(window.sessionStorage.getItem("curmenu"));
		/*if(JSON.stringify(curmenu) != JSON.stringify(menu[liIndex-1])){  //如果删除的不是当前选中的tab
			// window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
			curNav = JSON.stringify(curmenu);
		}else{
			if($(this).parent("li").length > liIndex){
				window.sessionStorage.setItem("curmenu",curmenu);
				curNav = curmenu;
			}else{
				window.sessionStorage.setItem("curmenu",JSON.stringify(menu[liIndex-1]));
				curNav = JSON.stringify(menu[liIndex-1]);
			}
		}*/
		menu.splice((liIndex-1), 1);
		//window.sessionStorage.setItem("menu",JSON.stringify(menu));
		element.tabDelete("bodyTab",$(this).parent("li").attr("lay-id")).init();
	});

	/**
	* 注册并绑定右键菜单
	* @constructor
	*/
	function CustomRightClick() {
	    //屏蔽Tab右键菜单
	    $('.layui-tab-title li').on('contextmenu', function () {
	        return false;
	    });
	    $('.layui-tab-title, .layui-tab-title li').click(function () {
	        $('.rightmenu').hide();
	    });
	    $('.layui-tab-title li').on('contextmenu', function (e) {
	        var popupmenu = $(".rightmenu");
	        l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX - 200;
	        t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : 41;
	        popupmenu.css({left: l, top: t}).show();
	        return false;
	    });
	}

	//注册tab右键菜单点击事件
	$(".rightmenu li").click(function() {
	    var currentActiveTabID = $("li[class='layui-this']").attr('lay-id');// 获取当前激活的选项卡ID
	    var tabtitle = $(".layui-tab-title li");
	    var allTabIDArr = [];
	    $.each(tabtitle, function(i) {
	    	allTabIDArr[i] = $(this).attr("lay-id");
	    });
	    
	  //去掉空id
	    for(var i = 0;i<allTabIDArr.length;i++){
	        if(allTabIDArr[i]==''||allTabIDArr[i]==null||typeof(allTabIDArr[i])==undefined){
	        	allTabIDArr.splice(i,1);
	            i=i-1;
	        }
	    }

	    switch ($(this).attr("data-type")) {
	        case "closethis"://关闭当前，如果开启了tab可关闭，实际意义不大
	        	if(currentActiveTabID != ""){
	        		element.tabDelete("bodyTab",currentActiveTabID).init();
	        	}
	            break;
	        case "closeall"://关闭所有
	        	$.each(allTabIDArr, function (i, item) {
	        		element.tabDelete("bodyTab",item).init();
	    	    });
	            break;
	        case "closeothers"://关闭非当前
	            $.each(allTabIDArr, function (i) {
	                var tmpTabID = allTabIDArr[i];
	                if (currentActiveTabID != tmpTabID){
	                	element.tabDelete("bodyTab",tmpTabID).init();	                	
	                }
	            });
	            break;
	        case "closeleft"://关闭左侧全部
	            var index = $.inArray(currentActiveTabID, allTabIDArr);
	            var index1 = allTabIDArr.slice(0, index);
	            var num1 = index - 1;
	            for(var j=0;j<=num1;j++) {
	            	element.tabDelete("bodyTab", index1[j]).init();
	            }
	            break;
	        case "closeright"://关闭右侧全部
	            var index = $.inArray(currentActiveTabID, allTabIDArr);
	            var index2 = allTabIDArr.slice(index + 1);
//	            if(index2.length != 0){
//	            	element.tabDelete("bodyTab", index2).init();
//	            }
	            for(var k=allTabIDArr.length-1;k>index;k--){
	            	element.tabDelete("bodyTab", allTabIDArr[k]).init();
	            }
	            break;
	        case "refresh":
	        	// 重新加载iFrame，实现更新。注意：如果你不是使用的iFrame则无效，具体刷新实现自行处理                          
	        	//document.getElementById(currentActiveTabID).contentWindow.location.reload(true);//这种方式也可以，下面这个也可以
	             refreshiFrame();
	             break;
	        default:
	            $('.rightmenu').hide();
	    }
	    $('.rightmenu').hide();
	});
	
	var bodyTab = new Tab();
	exports("bodyTab",function(option){
		return bodyTab.set(option);
	});
});

/*
*重新加载iFrame，实现更新
*/
function refreshiFrame() {
    var $curFrame = $('iframe:visible');
    $curFrame.attr("src",$curFrame.attr("src"));    
    return false;
}