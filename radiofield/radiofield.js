(function($){
	
	var d_t_imag_path ="imgs/d_t.gif";
	
	//radiofield入口 调用时有两种方式
	$.fn.radiofield = function(){
		var method = arguments[0];
		var methods = $.fn.radiofield.methods
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(typeof(method) =='object' || !method){
			method = methods.init;
		}else {
			return this;
		}
		return method.apply(this, arguments);
	};
	/*
		参数设置
		optionList 选项列表数组里面是对象主要包括三个参数 [{"value":"","text":"","tip":""}]
		valueField:"value",
		textField:"text",
		textFieldTip:"tip",提示
		canSelected:"canSelected" 是否可选 1：可选, 0:不可选,
		modeType:"1",模式 只要有可编辑，只读模式
		newline:true,是否换行显示
		selected:null,选中哪一个根据value的值取确定
		onChange:null,选项改变后要做的操作
	
	*/
	$.fn.radiofield.defaultSetting = {
		optionList:[],
		valueField:"value",
		textField:"text",
		textFieldTip:"tip",
		canSelected:"canSelected",
		modeType:"1",
		isHorizontal:false,
		distance:"10px",
		selected:null,
		onChange:null,
		
	
	
	
	};
	
	$.fn.radiofield.methods = {
		init: function(options){
			return this.each(function(){
				var _this = $(this);
				var settings = _this.data('params');
				settings = $.extend({}, $.fn.radiofield.defaultSetting, options);
				
				_this.data('params',settings);
				var modeType = settings['modeType'];
				var isHorizontal = settings['isHorizontal'];
				if(modeType == 1){
					if(isHorizontal){
						_this.radiofield("drawRadiofieldEditHorizontalLayout");
					}else{
						_this.radiofield("drawRadiofieldEditVerticalLayout");
					}
					
				}else if (modeType == 0){
					_this.radiofield("drawRadiofieldReadOnlyLayout");
				}
				
			});
		},
		
		//EditVerticalLayout
		drawRadiofieldEditVerticalLayout: function(){
			var _this = $(this);
			var params = _this.data('params');
			var optionList = params['optionList'];
			var valueField = params['valueField'];
			var textField = params['textField'];
			var textFieldTip = params['textFieldTip'];
			var canSelected = params['canSelected'];
			var selected = params['selected'];
			var newline = params['newline'];
			var distance = params['distance'];
			
			var drawHtmlTable = $('<table cellspacing="0" cellpadding="0" border="0" align="left" />');
			
			for(var i = 0; i < optionList.length; i++){
				var option = optionList[i]
				var id = option[valueField];
				var text = option[textField];
				var textTip = option[textFieldTip]
				var canValue = option[canSelected];
				var drawHtmlTr = $('<tr/>');
				var drawHtmlTdImg = null;
				var drawHtmlTdText = null;
				var drawHtmlTdTip = null;
				var imgClass = "";
				var tdClass = "";
				if(canValue == 1){
					if(selected == id ){
						imgClass="radio_select";
					}else{
						imgClass="radio_unselect";
					}
					tdClass = "can_select_radio";
					drawHtmlTdText = $('<td valign="middle" nowrap="" class="can_select_radio"><a class="HL_Arial_13_grey_nul" href="javascript:void(0)">'+text+'</a></td>');
				}else {
					imgClass = "radio_unselect_disable";
					drawHtmlTdText = $('<td valign="middle" nowrap="" class="Arial_13_grey_lightA">'+text+'</td>');
				}
				
				drawHtmlTdImg = $('<td valign="middle" class="'+tdClass+' radio_'+id+'"><img width="14" height="14" src="'+d_t_imag_path+'" class="'+imgClass+'" ></td>');
				drawHtmlTdImg.data("value",id);
				drawHtmlTdText.data('value',id);
				drawHtmlTr.append(drawHtmlTdImg);
				drawHtmlTr.append('<td valign="middle"><img width="5px" height="3" src="'+d_t_imag_path+'"/></td>');
				
				if(textTip){
					drawHtmlTdTip = $('<td width="5" height="10" nowrap = "nowrap"></td><td nowrap="nowrap"><img class="showTip" width="10" height="14" src="imgs/d_t.gif" class="smartform_icon_info" style="cursor: pointer;background: url(imgs/icon_info.png) no-repeat;"></td>');
					drawHtmlTdTip.find('img').data("tip",textTip);
				}
				
				drawHtmlTr.append(drawHtmlTdText);
				drawHtmlTr.append(drawHtmlTdTip);
				drawHtmlTable.append('<tr><td colspan="10" height="'+distance+'" nowrap></td></tr>');
				drawHtmlTable.append(drawHtmlTr);
			}
			
			_this.empty().append(drawHtmlTable);
			_this.radiofield('initEvent');
		},
		//EditHorizontalLayout
		drawRadiofieldEditHorizontalLayout: function(){
			var _this = $(this);
			var params = _this.data('params');
			var optionList = params['optionList'];
			var valueField = params['valueField'];
			var textField = params['textField'];
			var textFieldTip = params['textFieldTip'];
			var canSelected = params['canSelected'];
			var selected = params['selected'];
			var newline = params['newline'];
			var distance = params['distance'];
			
			var drawHtmlTable = $('<table cellspacing="0" cellpadding="0" border="0" align="left" />');
			var drawHtmlTr = $('<tr />');
			for(var i = 0; i < optionList.length; i++){
				var option = optionList[i]
				var id = option[valueField];
				var text = option[textField];
				var textTip = option[textFieldTip]
				var csValue = option[canSelected];
				var drawHtmlTdImg = null;
				var drawHtmlTdText = null;
				var drawHtmlTdTip = null;
				var imgClass = "";
				var tdClass = "";
				if(i>0){
					drawHtmlTr.append('<td width="'+distance+'" height="10" nowrap = "nowrap"></td>');
				}
				if(csValue == 1){
					if(selected == id ){
						imgClass = "radio_select";
					}else{
						imgClass = "radio_unselect";
					}
					tdClass = "can_select_radio";
					drawHtmlTdText = $('<td valign="middle" nowrap="" class="can_select_radio"><a class="HL_Arial_13_grey_nul" href="javascript:void(0)">'+text+'</a></td>');
				}else {
					imgClass = "radio_unselect_disable";
					drawHtmlTdText = $('<td valign="middle" nowrap="" class="Arial_13_grey_lightA">'+text+'</td>');
				}
				
				drawHtmlTdImg = $('<td valign="middle" class="'+tdClass+' radio_'+id+'"><img width="14" height="14" src="'+d_t_imag_path+'" class="'+imgClass+'" ></td>');
				drawHtmlTdImg.data("value",id);
				drawHtmlTdText.data('value',id);
				drawHtmlTr.append(drawHtmlTdImg);
				drawHtmlTr.append('<td valign="middle"><img width="5px" height="3" src="'+d_t_imag_path+'"/></td>');
				
				if(textTip){
					drawHtmlTdTip = $('<td width="5" height="10" nowrap = "nowrap"></td><td nowrap="nowrap"><img class="showTip" width="10" height="14" src="imgs/d_t.gif" class="smartform_icon_info" style="cursor: pointer;background: url(imgs/icon_info.png) no-repeat;"></td>');
					drawHtmlTdTip.find('img').data("tip",textTip);
				}
				drawHtmlTr.append(drawHtmlTdText);
				drawHtmlTr.append(drawHtmlTdTip);
				
			}
			drawHtmlTable.append(drawHtmlTr);
			_this.empty().append(drawHtmlTable);
			_this.radiofield('initEvent');
		},
		
		//ReadOnlyLayout
		drawRadiofieldReadOnlyLayout: function(){
		
			
		
		},
		
		initEvent:function(){
			var _this = $(this);
			_this.find('.can_select_radio').on("click",function(){
				var v = $(this).data("value");
				var params = _this.data('params');
				if(params.selected != v){
					_this.radiofield("select",v);
				}
			});
			
			_this.find('.showTip').on("click", function(o){
				var tip = $(this);
				var tipText = tip.data("tip");
				tip.showTip(tipText,0,0,"200px");
			});
		},
		
		select: function(optionId){
			return this.each(function(){
				var _this = $(this);
				var params = _this.data('params');
				var modeType = params.modeType;
				if(modeType == 0){return false;}
				_this.radiofield("doSel",optionId);
			});
		
		},
		
		clearSelect: function(){
			var _this = $(this);
			var params = _this.data('params');
			_this.find(".radio_select").removeClass("radio_select").addClass("radio_unselect");
			params.selected=null;
		},
		
		doSel: function(optionId){
			var _this = $(this);
			var params = _this.data('params');
			var sel = null;
			if(optionId){
				sel = optionId
			}else {
				sel = params.selected;
			}
			if(sel != null){
				_this.find(".radio_select").removeClass("radio_select").addClass("radio_unselect")
				.end().find(".radio_"+sel+" img").removeClass("radio_unselect").addClass("radio_select");
				params.selected = sel;
				var onChange = params.onChange;
				if(onChange == null){return ;}
				if(typeof onChange=="function"){
				  $.proxy(onChange,_this)(sel);
			    }else{
				  eval("$.proxy("+onChange+",_this)(sel)");
			    }    
			}
		
		
		},
		
		changeMode: function(modeType){},
		
		getValue:function(){
			var _this = $(this);
			var params = _this.data('params');
			return params.selected;
		}
		
		
	
	};

	 /**对象绑定类型的插件*/
	$.fn.extend({
	    showTip:function(tipInfo,leftOffset,topOffset,widthOffset){	
	    	var tipObj=$("#tip_info_div");	
	    	var _this=$(this).after(tipObj);	
	    	tipObj.parent().css({"position":"relative","z-index":"99"});	    	
	    	var left=_this.position(true).left;	
	    	var top=0;
	    	var width = "200px";
	    	if(!$.support.leadingWhitespace){
	    		left=left+tipObj.parent().width();	    		
	    		top=-(_this.height()+3);
	    	}else{
	    		left=left+10;
	    		top=-30;
	    	}
	    	
	    	left =leftOffset?(left+leftOffset):left;
	    	top =topOffset?(top+topOffset):top;
	    	width = widthOffset ? widthOffset : width;
	    	tipObj.find("div.tip_content").html(tipInfo).end().find("div.tip_content_div").css({"left":left,top:top,"width":width}).end().show();	    	
	        $(document).off("click.tip").on("click.tip",function(e){	   
	        	 var ev = e || window.event;
                 var target = ev.target || ev.srcElement;
                 var clickTarget=$(target); 
                 var tipSource=tipObj.prev(); 
	        	 if(clickTarget.closest(tipSource).length==0){
	        	 	tipObj.parent().css({"position":"","z-index":""});
	                tipObj.appendTo("body").hide();
	                $(document).off("click.tip");
	             }
	        });
	    }
	});
   
	
})(jQuery)