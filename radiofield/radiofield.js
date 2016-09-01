(function($){
	
	var d_t_imag_path ="imgs/d_t.gif";
	
	//radiofield��� ����ʱ�����ַ�ʽ
	$.fn.radiofield = function(){
		var method = arguments[0];
		var methods = $.fn.radiofield.methods
		if(methodd[method]){
			method = methods;
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(method typeof 'object' || !method){
			method = methods.init;
		}else {
			return this;
		}
		return method.apply(this,arguments);
	};
	/*
		��������
		optionList ѡ���б����������Ƕ�����Ҫ������������ [{"value":"","text":"","tip":""}]
		valueField:"value",
		textField:"text",
		textFieldTip:"tip",��ʾ
		modeType:"1",ģʽ ֻҪ�пɱ༭��ֻ��ģʽ
		newline:true,�Ƿ�����ʾ
		selected:null,ѡ����һ������value��ֵȡȷ��
		onChange:null,ѡ��ı��Ҫ���Ĳ���
	
	*/
	$.fn.radiofield.defaultSetting = {
		optionList:[],
		valueField:"value",
		textField:"text",
		textFieldTip:"tip",
		canSelected:"canSelected";
		modeType:"1",
		newline:true,
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
				if(modeType == 1){
					$.fn.radiofield("drawRadiofieldEditLayout");
				}else if (modeType == 0 || modeType == 2 || modeType == 3){
					$.fn.radiofield("drawRadiofieldReadOnlyLayout");
				}
				
			});
		},
		
		drawRadiofieldReadOnlyLayout: function(){},
		
		drawRadiofieldEditLayout: function(){
			var _this = $(this);
			var params = _this.data('params');
			var optionList = params['optionList'];
			var valueField = params['valueField'];
			var textField = params['textField'];
			var textFieldTip = params['textFieldTip'];
			var canSelected = params['canSelected'];
			var selected = params['selected'];
			var newline = params['newline'];
			var dropHtml = [];
			
			dropHtml.push('<table cellspacing="0" cellpadding="0" border="0" align="left">');
			for(var i = 0; i < optionList.length; i++){
				var option = optionList[i]
				var id = option[valueField];
				var text = option[textField];
				var textTip = option[textFieldTip]
				var canSelected = option[canSelected];
				dropHtml.push('<tr id="radio_selected">');
				if(canSelected == 1){
					if(selected == id ){
						dropHtml.push('<td valign="middle" class="radio_'+id+'"><img width="14" height="14" src="'+d_t_imag_path+'" class="radio_select" ></td>');
					}else{
						dropHtml.push('<td valign="middle" class="radio_'+id+'"><img width="14" height="14" src="'+d_t_imag_path+'" class="radio_unselect" ></td>');
					}
				}else {
					dropHtml.push('<td valign="middle" class="radio_'+id+'"><img width="14" height="14" src="'+d_t_imag_path+'" class="radio_unselect_disable" ></td>');
				}
				dropHtml.push('<td valign="middle"><img width="5px" height="3" src="'+d_t_imag_path+'"/></td>');
				if(textTip){
					dropHtml.push('<td valign="middle" nowrap=""><a class="HL_Arial_13_grey_nul" href="javascript:void(0)">'+text+'</a></td>');
					dropHtml.push('<td width="5" height="10" nowrap = "nowrap"></td>');
					dropHtml.push('<td nowrap="nowrap"><img id="showTip" width="10" height="14" src="/resources/components/smartform/../d_t.gif" class="smartform_icon_info" style="cursor: pointer;background: url(/resources/graphics/icon_info.png) no-repeat;"></td>');
				}else{
					dropHtml.push('<td valign="middle" nowrap=""><a class="HL_Arial_13_grey_nul" href="javascript:void(0)">'+text+'</a></td>');
				}
				
				dropHtml.push('</tr>');
			}
			
			dropHtml.push('</table>');
			
		},
		
		select: function(optionId){},
		
		clearSelect: function(){},
		
		doSel: function(optionId){},
		
		changeMode: function(modeType){},
		
		getValue:function(){}
		
		
	
	}

})(jQuery)