layui.define('jquery', function(exports){
  "use strict";
  
  	var $ = layui.$,
  	HT =function(){
		this.config = {
			limit 	: 10
			,limits	: [2, 10,20,30,40,50,60,70,80,90]
			,timeout	: 1000
			,sucCode	: 1000
//			,ROOT 	: root + '/'
		}
	};
  
	//参数设置
	HT.prototype.set = function(option) {
		var _this = this;
		$.extend(true, _this.config, option);
		return _this;
	};
	
	HT.prototype.opt = function(option) {
		var _this = this;
		return _this.config[option];
	};
	
	HT.prototype.emptyFn = function() {
		alert('此功能暂时未能实现');
	};
	
	Date.prototype.Format = function(formatStr)    
	{    
	    var str = formatStr;    
	    var Week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];   
	   
	    str=str.replace(/yyyy|YYYY/,this.getFullYear());    
	    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));    
	   
	   	
	   	var m = this.getMonth()+1;	// m is between 1 and 12
	    str=str.replace(/MM/,m>9?m.toString():'0' + m);    
	    str=str.replace(/M/g,m);    
	   
	    str=str.replace(/w|W/g,Week[this.getDay()]);    
	   
	    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());    
	    str=str.replace(/d|D/g,this.getDate());    
	   
	    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());    
	    str=str.replace(/h|H/g,this.getHours());    
	    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());    
	    str=str.replace(/m/g,this.getMinutes());    
	   
	    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());    
	    str=str.replace(/s|S/g,this.getSeconds());    
	   
	    return str;    
	};    
	
	HT.prototype.date = function(curDate, formatStr) {
		if(!!!curDate)
			return "";
		var format = 'yyyy-MM-dd hh:mm:ss', date = new Date(curDate);
		return date.Format(format);
	};
	
	HT.prototype.state = function(state) {
		var msg = '';
   	  	if(state == '1')
   		  msg = '<span style="color: green;font-weight:bolder;">启用</span>';
   	  	else if(state == '0')
   		  msg = '<span style="color: red;font-weight:bolder;">禁用</span>';
   	  	else if(state == '2')
   	  		msg = '<span style="color: black;font-weight:bolder;">删除</span>';
   	  	return msg;
	};
	
	HT.prototype.userType = function(state) {
		var msg = '';
		if(state == '0')
			msg = '<span style="color: blue;font-weight:bolder;">系统</span>';
		else if(state == '1')
			msg = '<span style="color: black;font-weight:bolder;">导入</span>';
		else if(state == '2')
			msg = '<span style="color: green;font-weight:bolder;">自定义</span>';
		return msg;
	};
	
	$(document).on("click",".layui-table-body table.layui-table tbody tr", function () {
	    var index = $(this).attr('data-index');
	    var tableBox = $(this).parents('.layui-table-box'), tableDiv;
	    //存在固定列
	    if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length>0) {
	        tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
	    } else {
	        tableDiv = tableBox.find(".layui-table-body.layui-table-main");
	    }
	    var checkCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
	    var radioCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-radio div.layui-form-radio I");

	    if (checkCell.length > 0 && radioCell.length == 0) {
	        checkCell.click();
	        //添加选中tr样式
	        //checkCell.parents("tr").toggleClass("lightblue");
	    }
	    if (radioCell.length > 0 && checkCell.length == 0) {
	    	radioCell.click();
	    	//添加选中tr样式
	    	//radioCell.parents("tr").addClass("lightblue");
	    	//radioCell.parents("tr").siblings("tr").removeClass("lightblue");
	    }
	});

	$(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox, td div.laytable-cell-radio div.layui-form-radio", function (e) {
	    e.stopPropagation();
	});
	
	var ht = new HT();
	exports('ht', function(options){
		return ht.set(options);
	});
})