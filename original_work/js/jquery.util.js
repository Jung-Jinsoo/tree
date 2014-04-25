//IE에서 console.log에러 방지 
var console = window.console || {log:function(){}};

(function($){ 
    $.fn.extend({ 
        centerLayer: function () {
        	this.css({
                "z-index" : "99",
        		"position": "absolute",
                "top": ((($(parent).height() - $(this).outerHeight()) / 2) + $(parent).scrollTop() + "px"),
                "left": ((($(parent).width() - $(this).outerWidth()) / 2) + $(parent).scrollLeft() + "px")
            });
        	return this; 
        }
    });
    
    $.fn.extend({     	
        centerLayerThis: function (ex) {
        	this.css({
        		"z-index" : "99",
                "position": "absolute",
                "top": ((ex[3] /2) - ($(this).outerHeight() / 2)) + $(window).scrollTop() + "px",
                "left": ((ex[0] / 2) - ($(this).outerWidth()/2)) + $(window).scrollLeft() + "px"                 	
            });
        	return this; 
        }
    });   
    
    $.fn.extend({ 
        topPositionLayer: function () {
        	this.css({
                "z-index" : "99",
        		"position": "absolute",
                "top": (100 + $(parent).scrollTop()) + "px",
                "left": ((($(parent).width() - $(this).outerWidth()) / 2) + $(parent).scrollLeft() + "px")
            });
        	return this; 
        }
    });

    $.fn.extend({     	
        topPositionLayerThis: function (ex) {
        	this.css({
        		"z-index" : "99",
                "position": "absolute",
                "top": (100 + $(window).scrollTop()) + "px",
                "left": ((ex[0] / 2) - ($(this).outerWidth()/2)) + $(window).scrollLeft() + "px"                 	
            });
        	return this; 
        }
    });    
    
    $.fn.extend({
    	readOnly: function () {
    		this.prop('readOnly', true),	
    		this.css("background","#eee")
    	}
    });

})(jQuery);

function resizeLayer(_ele_id, _width, _height) {
	var element = "#"+_ele_id;
	
	if($(element).attr('id')) {
		$(element).css({
			"width" : _width + "px",
			"height" : _height + "px"
		});
	}
	
	if($(element, parent.document).attr('id')) {
		$(element, parent.document).css({
			"width" : _width + "px",
			"height" : _height + "px"
		});
	}
	
}

function removeElement(_ele_id) {
	var element = "#"+_ele_id;
	var overlayelement = "#div_createOverLay";
	var ajaxloadingelement = "#div_createAjaxLoading";
	
	if($(ajaxloadingelement).attr('id')) {
		$(ajaxloadingelement).remove();
	}
	
	if($(ajaxloadingelement, parent.document).attr('id')) {
		$(ajaxloadingelement, parent.document).remove();
	}
	
	if($(overlayelement).attr('id')) {
		$(overlayelement).remove();
	}
	
	if($(overlayelement, parent.document).attr('id')) {
		$(overlayelement, parent.document).remove();
	}
	
	if(document.getElementById(_ele_id)) {
		$(element).remove();
	}else {
		$(element, parent.document).remove();
	}
}

function removeElement2(_ele_id) {
	var element = "#"+_ele_id;
	var overlayelement = "#div_createOverLay";
	var ajaxloadingelement = "#div_createAjaxLoading";
	
	if($(ajaxloadingelement).attr('id')) {
		$(ajaxloadingelement).remove();
	}
	
	if($(ajaxloadingelement, parent.document).attr('id')) {
		$(ajaxloadingelement, parent.document).remove();
	}
	
	if($(overlayelement).attr('id')) {
		$(overlayelement).remove();
	}
	
	if(document.getElementById(_ele_id)) {
		$(element).remove();
	}else {
		$(element, parent.document).remove();
	}
}

function loadTargeting(_adsId, _accountId, _mode, _targeting_seq, targetgroupseq) {	
	 if(document.getElementById('create_targeting')) {
		 removeOverLay();
		 removeElement('create_targeting');
	 }else {
		 createOverLayParent();
		 $('body', parent.document).append('<iframe id="create_targeting" style="width:700px;height:680px;"></iframe>');
		 $('#create_targeting', parent.document).attr("src", "/target/register.htm?adsId="+_adsId+"&accountId="+_accountId+"&mode="+_mode+"&targeting_seq="+_targeting_seq+"&targetgroupseq="+targetgroupseq);
		 $('#create_targeting', parent.document).centerLayer();
	 }
}

function adGroupCreate(adtype,bidtype) {
	createOverLay();
	$('body').append('<iframe id="ifrm_createAdGroup" style="width:840px;height:680px;"></iframe>');
	$('#ifrm_createAdGroup').attr("src", "/ad/adGroupCreate.htm?adtype="+adtype+"&bidtype="+bidtype);
	$('#ifrm_createAdGroup').topPositionLayer();
}

function adGroupCreateManage(_campaign_group_id, adtype,_view) {
	createOverLay();
	$('body').append('<iframe id="ifrm_createAdGroup" style="width:855px;height:680px;"></iframe>');
	$('#ifrm_createAdGroup').attr("src", "/managead/addGroupCreate.htm?campaign_group_id="+_campaign_group_id+"&adtype="+adtype+"&view="+_view);	
	$('#ifrm_createAdGroup').topPositionLayer();
}

function createTargeting(_adsId, _accountId) {	
	 if(document.getElementById('create_targeting')) {
		 removeOverLay();
		 removeElement('create_targeting');
	 }else {
		 createOverLayParent();
		 $('body', parent.document).append('<iframe id="create_targeting" style="width:710px;height:680px;"></iframe>');
		 $('#create_targeting', parent.document).attr("src", "/target/create.htm");
		 $('#create_targeting', parent.document).centerLayer();
	 }
}

function modifyTargeting(_adsId, _accountId, _count) {	
	 if(document.getElementById('modify_targeting')) {
		 removeOverLay();
		 removeElement('modify_targeting');  //tkdrb
		// removeElement2("modify_targeting");
	 }else {
		 createOverLayParent();
		 $('body', parent.document).append('<iframe id="modify_targeting" style="width:700px;height:680px;"></iframe>');
		 $('#modify_targeting', parent.document).attr("src", "/target/modify.htm?adsId="+_adsId+"&accountId="+_accountId+"&count="+_count);
		 $('#modify_targeting', parent.document).centerLayer();
	 }
}

function loadCustomAudience(_adsId, _accountId, _id) {	
	if(document.getElementById('create_custom_audience')) {
		removeOverLay();
		removeElement('create_custom_audience');
	}else {
		createOverLayParent();		
		var url = "/ad/new_audience.htm";
		if(_id) {
			url = "/ad/edit_audience.htm";
		}
		$('body', parent.document).append('<iframe id="create_custom_audience" style="width:515px;height:550px;"></iframe>');
		$('#create_custom_audience', parent.document).attr("src", url+"?&id="+_id+"&crtAdminIdx="+_adsId+"&adAccountId="+_accountId);
		$('#create_custom_audience', parent.document).centerLayer();
	}
}

function loadTargetingGroup(_adsId, _accountId, _id) {	
	if(document.getElementById('create_targeting_group')) {
		removeOverLay();
		removeElement('create_targeting_group');
	}else {
		createOverLayParent();		
		$('body', parent.document).append('<iframe id="create_targeting_group" style="width:700px;height:520px;"></iframe>');
		$('#create_targeting_group', parent.document).attr("src", "/target/targeting_group.htm?id="+_id+"&adaccount="+_accountId+"&adsId="+_adsId);
		$('#create_targeting_group', parent.document).centerLayer();
	}
}
 
function loadCampaign(_adsId, _accountId, _mode, _campaign_id) {
	if(document.getElementById('create_campaign')) {
		removeOverLay();
		removeElement('create_campaign');
	}else {		
		createOverLayParent();
		$('body', parent.document).append('<iframe id="create_campaign" style="width:700px;height:380px;"></iframe>');
		$('#create_campaign', parent.document).attr("src", "/ads_campaign/insert.htm?adsId="+_adsId+"&accountId="+_accountId+"&mode="+_mode+"&campaign_id="+_campaign_id);
		$('#create_campaign', parent.document).centerLayer();		 
	}
}

function createConversionTracking(_adsId, _accountId, _id, _name, _category, _mode) {
	createOverLayParent();
	$('body', parent.document).append('<iframe id="ifrm_createConversionTracking" style="width:540px;height:420px;"></iframe>');
	$('#ifrm_createConversionTracking', parent.document).attr("src", "/target/createConversionTracking.htm?adsid="+_adsId+"&accountid="+_accountId+"&id="+_id+"&name="+_name+"&category="+_category+"&mode="+_mode);
	$('#ifrm_createConversionTracking', parent.document).centerLayer();
}

/*function emailCheck(_email, _gubun) {  //이메일인증
	createOverLayParent();
	$('body', parent.document).append('<iframe id="ifrm_emailCheck" style="width:580px;height:420px;"></iframe>');
	$('#ifrm_emailCheck', parent.document).attr("src", "/ads_member/emailcheck.htm?email="+_email+"&gubun="+_gubun);
	$('#ifrm_emailCheck', parent.document).centerLayer();
}*/

function removeConversionTrackingCode() {
	removeElement('ifrm_createConversionTracking');
}

function createBillingSource(_id) {
	createOverLay();
	$('body').append('<iframe id="ifrm_createBillingSource" style="width:700px;height:600px;"></iframe>');
	$('#ifrm_createBillingSource').attr("src", "/member/registBilling.htm?id=" + _id);
	$('#ifrm_createBillingSource').centerLayer();
}

function removeBillingSource() {
	removeElement('ifrm_createBillingSource');
}

function createLostPassword() {
	createOverLay();
	$('body').append('<iframe id="ifrm_createLostPassword" style="width:600px;height:300px;"></iframe>');
	$('#ifrm_createLostPassword').attr("src", "/member/lost_password.htm");
	$('#ifrm_createLostPassword').centerLayer();
}

function removeLostPassword() {
	removeElement('ifrm_createLostPassword');
}

function createConversionTrackingCode(_contents) {
	createOverLay();
	$('body').append('<div id="createConversionTrackingCode" style="width:500px;height:300px;"><h3>Configure Conversion Pixel Code</h3><p>Copy the code below and paste it between <head> and </head> in the page of the website where you want to track conversions.</p><textarea style="border:1px solid #666;width:490px;height:250px;" onclick="this.select();">'+_contents+'</textarea><a href="javascript:removeElement(\'div_createOverLay\');removeElement(\'createConversionTrackingCode\');">x</a></div>');
	$('#createConversionTrackingCode').centerLayer();
}

function createAjaxLoading(_gubn) {
	hideBudgetDiv();
	if(_gubn == undefined)
		createOverLay();
	
	if($('#div_createAjaxLoading').length < 1) {
		$('body').append('<div id="div_createAjaxLoading" class="ajaxlodingimg">Loding...</div>');
		$('#div_createAjaxLoading').centerLayer();
	}
}

function createAjaxLoadingParent(){
	hideBudgetDiv();
	createOverLayParent();
	$('body', parent.document).append('<div id=div_createAjaxLoadingParent class=ajaxlodingimg>Loding...</div>');
	$('#div_createAjaxLoadingParent', parent.document).centerLayer();
}

function createAjaxLoadingThis() {	
	hideBudgetDiv();
	var arrPageSizes = getPageSize();
	createOverLay();	
	if($('#div_createAjaxLoading').length < 1) {		
		$('body').append('<div id="div_createAjaxLoading" class="ajaxlodingimg">Loding...</div>');
		$('#div_createAjaxLoading').centerLayerThis(arrPageSizes);
	}
}

function createAjaxLoadingOnly() {
	hideBudgetDiv();
	var arrPageSizes = getPageSize();
	$('body').append('<div id="div_createAjaxLoading" class="ajaxlodingimg">Loding...</div>');
	$('#div_createAjaxLoading').centerLayerThis(arrPageSizes);
}

function removeAjaxLoading(_gubn) {
	if(_gubn == undefined){
		removeElement('div_createAjaxLoading');
	}else {
		$('#div_createAjaxLoading').remove();
	}
}

function removeAjaxLoadingParent() {
	removeElement('div_createAjaxLoadingParent');
}

function hideBudgetDiv() {
	//미배정, 초과배정 팝업이 있으면 createOverLay 호출시 닫는다.
	if(document.getElementById('allocate_budget_div'))
		$('#allocate_budget_div').hide();
	if(document.getElementById('exceed_budget_div')) 
		$('#exceed_budget_div').hide();
}

function createOverLay() {
	hideBudgetDiv();	
	var arrPageSizes = getPageSize();
	$('body').append('<div id="div_createOverLay" style="width:100%;height:'+arrPageSizes[1]+'px;"></div>');
}

function createOverLayParent() {
	hideBudgetDiv();
	var arrPageSizes = getPageSizeParent();
	$('body', parent.document).append('<div id="div_createOverLay" style="width:'+arrPageSizes[0]+'px;height:'+arrPageSizes[1]+'px;"></div>');
}

function createOverLayError() {
	var arrPageSizes = getPageSize();
	$('body').append('<div id="div_createOverLayError" style="width:'+arrPageSizes[0]+'px;height:'+arrPageSizes[1]+'px;"></div>');
}

function removeOverLay() {
	removeElement('div_createOverLay');
	removeElement('div_createOverLayError');
}

function setCampaignSummary(_adsId, _campaignId) {	
	$.ajax({
		url : "/ads_campaign/getCampaignInfoJson.htm",
		type : "GET",
		data : {
			adsId : _adsId,
			campaignId : _campaignId
		},
		dataType : "json",
		success : function(data) {
			if(data.campaign_id != "0") {
				var start_time 	= data.start_time; //시작일
				var end_time 	= data.end_time; 	//종료일
				var budget 		= data.budget; 	//예산
				var spent 		= data.spent; 		//지출
				var remaining 	= 0; 				//남은예산
				
				
				if(typeof(end_time) == "undefined")
					end_time = "on going";
				else
					end_time = end_time.substring(0, 10);
				
				remaining = budget - spent;
				
				$('#div_campaign_summary').html(start_time.substring(0,10) + " ~ " + end_time + "<div> Budget: " + number_format(budget) + ", Remaining Budget: " + number_format(remaining) + "</div>");
			}
		},
		error : function(x, e) {
			console.log(x + e);
		}
	});	
}

function getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth; 
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = xScroll;		
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
};

function getPageSizeParent() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (parent.document.body.scrollHeight > parent.document.body.offsetHeight){ // all but Explorer Mac
		xScroll = parent.document.body.scrollWidth;
		yScroll = parent.document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = parent.document.body.offsetWidth;
		yScroll = parent.document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		if(parent.document.documentElement.clientWidth){
			windowWidth = parent.document.documentElement.clientWidth; 
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (parent.document.documentElement && parent.document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = parent.document.documentElement.clientWidth;
		windowHeight = parent.document.documentElement.clientHeight;
	} else if (parent.document.body) { // other Explorers
		windowWidth = parent.document.body.clientWidth;
		windowHeight = parent.document.body.clientHeight;
	}	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = xScroll;		
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
};


function number_format (number, decimals, dec_point, thousands_sep) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +     bugfix by: Michael White (http://getsprink.com)
	  // +     bugfix by: Benjamin Lupton
	  // +     bugfix by: Allan Jensen (http://www.winternet.no)
	  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	  // +     bugfix by: Howard Yeend
	  // +    revised by: Luke Smith (http://lucassmith.name)
	  // +     bugfix by: Diogo Resende
	  // +     bugfix by: Rival
	  // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
	  // +   improved by: davook
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +      input by: Jay Klehr
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +      input by: Amir Habibi (http://www.residence-mixte.com/)
	  // +     bugfix by: Brett Zamir (http://brett-zamir.me)
	  // +   improved by: Theriault
	  // +      input by: Amirouche
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // *     example 1: number_format(1234.56);
	  // *     returns 1: '1,235'
	  // *     example 2: number_format(1234.56, 2, ',', ' ');
	  // *     returns 2: '1 234,56'
	  // *     example 3: number_format(1234.5678, 2, '.', '');
	  // *     returns 3: '1234.57'
	  // *     example 4: number_format(67, 2, ',', '.');
	  // *     returns 4: '67,00'
	  // *     example 5: number_format(1000);
	  // *     returns 5: '1,000'
	  // *     example 6: number_format(67.311, 2);
	  // *     returns 6: '67.31'
	  // *     example 7: number_format(1000.55, 1);
	  // *     returns 7: '1,000.6'
	  // *     example 8: number_format(67000, 5, ',', '.');
	  // *     returns 8: '67.000,00000'
	  // *     example 9: number_format(0.9, 0);
	  // *     returns 9: '1'
	  // *    example 10: number_format('1.20', 2);
	  // *    returns 10: '1.20'
	  // *    example 11: number_format('1.20', 4);
	  // *    returns 11: '1.2000'
	  // *    example 12: number_format('1.2000', 3);
	  // *    returns 12: '1.200'
	  // *    example 13: number_format('1 000,50', 2, '.', ' ');
	  // *    returns 13: '100 050.00'
	  // Strip all characters but numerical ones.	
	  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');	  
	  var n = !isFinite(+number) ? 0 : +number,
	    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	    s = '',
	    toFixedFix = function (n, prec) {
	      var k = Math.pow(10, prec);
	      return '' + Math.round(n * k) / k;
	    };
	  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	  if (s[0].length > 3) {
	    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	  }
	  if ((s[1] || '').length < prec) {
	    s[1] = s[1] || '';
	    s[1] += new Array(prec - s[1].length + 1).join('0');
	  }
	  
	  return s.join(dec);
}

function createErrPage(data) {
	createOverLayParent();
	$('body', parent.document).append('<iframe id="ifrm_errPage" style="width:600px;height:300px;"></iframe>');
	$('#ifrm_errPage', parent.document).contents().find('html').html(data);
	$('#ifrm_errPage', parent.document).centerLayer();
}

function createErrPageIframe(data) {
	var arrPageSizes = getPageSize();
	createOverLay();
	$('body').append('<iframe id="ifrm_errPage" style="width:600px;height:300px;"></iframe>');
	$('#ifrm_errPage').contents().find('html').html(data);
	$('#ifrm_errPage').centerLayerThis(arrPageSizes);
}

function removeErrPage() {
	removeElement('ifrm_createConversionTracking');
	removeElement('ifrm_errPage');
	// removeElement('ifrm_errPage');
}

function createOffer(_adsId, _accountId, _pageid) {
	createOverLayParent();
	$('body', parent.document).append('<iframe id="ifrm_createOffer" style="width:700px;height:640px;"></iframe>');
	$('#ifrm_createOffer', parent.document).attr("src", "/ad/offerform.htm?adsId="+_adsId+"&accountId="+_accountId+"&pageid="+_pageid);
	$('#ifrm_createOffer', parent.document).topPositionLayer();
}

function removeOffer() {
	removeElement('ifrm_createOffer');
}

function roundXL(n, digits) {
	if (digits >= 0) return parseFloat(n.toFixed(digits)); // 소수부 반올림

	digits = Math.pow(10, digits); // 정수부 반올림
	var t = Math.round(n * digits) / digits;

	return parseFloat(t.toFixed(0));	
}

//_value가 1000보다 크면 1000으로 나눈 후 number_format을 태운 후 "K"를 붙여서 return
function thousandTrans(_value) {
	if(_value > 1000) 
		_value = number_format(Math.round(_value / 10)/100, 2) + "K";
			
	return _value;
}

function gfnUndefinedZeroReturn(_value) {
	if(_value) 			
		return _value;
	else
		return 0;
}

function gfnPlusZero(_val) {
	if(_val > 9)
		return _val;
	else
		return "0" + _val;
}

function closeError () {
	removeOverLay();
	removeErrPage();
	parent.document.location.reload();
}

function overlay(name) {
	var arrPageSizes = getPageSize();
	$('body').append('<div id="'+name+'" style="width:'+arrPageSizes[0]+'px;height:'+arrPageSizes[1]+'px;width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: #000;opacity: 0.6;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";"></div>');
}

function removeOverlay(name) {
	removeElement(name);
}

//function createPgCharge(_adsId, _accountId, _clientId) {
function createPgCharge(_accountId) {
	createOverLayParent();
	$('body').append('<iframe id="ifrm_createPgCharge" style="width:700px;height:300px;"></iframe>');
	//$('#ifrm_createPgCharge').attr("src", "/member/registBudget.htm?sb_admin="+_adsId+"&sb_adaccount="+_accountId+"&clientId="+_clientId);
	$('#ifrm_createPgCharge').attr("src", "/member/registBudget.htm?&facebook_sb_adaccount="+_accountId);
	$('#ifrm_createPgCharge').centerLayer();
}

function depositPreview(_agencyId) {
	createOverLayParent();
	$('body').append('<iframe id="ifrm_depositPreview" style="width:800px;height:500px;"></iframe>');
	$('#ifrm_depositPreview').attr("src", "/member/listDepositManage.htm?&agency_id="+_agencyId);
	$('#ifrm_depositPreview').topPositionLayer();
}

function createAutoCharge(_adsId, _accountId, _clientId) {
	createOverLayParent();
	$('body').append('<iframe id="ifrm_createAutoCharge" style="width:700px;height:300px;"></iframe>');
	$('#ifrm_createAutoCharge').attr("src", "/member/registAutoCharge.htm?sb_admin="+_adsId+"&sb_adaccount="+_accountId+"&clientId="+_clientId);
	$('#ifrm_createAutoCharge').centerLayer();
}

function createAdGroup(_manage_id, _id, _gubn) {
	createOverLay();
	$('body').append('<iframe id="ifrm_createAdGroup" style="width:860px"></iframe>');
	$('#ifrm_createAdGroup').attr("src", "/managead/ad_create_adGroup.htm?manageid="+_manage_id+"&id="+_id+"&gubn=" + _gubn);
	$('#ifrm_createAdGroup').topPositionLayer();
}

function createCampaignGroup(_adsId, _accountId, _id) {
	createOverLay();
	$('body').append('<iframe id="ifrm_createCampaignGroup" style="width:700px;height:500px;"></iframe>');
	$('#ifrm_createCampaignGroup').attr("src", "/managead/ad_create_campaignGroup.htm?id="+_id+"&sb_admin="+_adsId+"&sb_adaccount="+_accountId);
	$('#ifrm_createCampaignGroup').topPositionLayer();
}

function modifyCampaignGroup(_adsId, _accountId) {
	createOverLay();
	$('body').append('<iframe id="ifrm_modifyCampaignGroup" style="width:700px;height:550px;"></iframe>');
	$('#ifrm_modifyCampaignGroup').attr("src", "/managead/modifyCampaignGroup.htm?sb_admin="+_adsId+"&sb_adaccount="+_accountId);
	$('#ifrm_modifyCampaignGroup').topPositionLayer();
}
function modifyTargetGroupAdform(_adsId, _accountId, _count, _mode) {
	createOverLay();
	$('body').append('<iframe id="ifrm_createTargetGroup" style="width:700px;height:750px;"></iframe>');
	$('#ifrm_createTargetGroup').attr("src", "/managead/ad_create_targetGroup.htm?targetAdd=3&sb_admin="+_adsId+"&sb_adaccount="+_accountId+"&count="+_count);
	$('#ifrm_createTargetGroup').topPositionLayer();
}
function modifyTargetGroupAdformfirst(_adsId, _accountId, _count, _mode) { //adform 타겟 수정
	createOverLay();
	$('body').append('<iframe id="ifrm_createTargetGroup" style="width:700px;height:750px;"></iframe>');
	$('#ifrm_createTargetGroup').attr("src", "/managead/ad_create_targetGroup.htm?targetAdd=4&sb_admin="+_adsId+"&sb_adaccount="+_accountId+"&count="+_count);
	$('#ifrm_createTargetGroup').topPositionLayer();
}
function createTargetGroup(mode, campaignGroupId, targetingGroupSeq, adsetName, adsetBudget) {
	$('#ifrm_createTargetGroup').remove();
	createOverLay();
	$('body').append('<iframe id="ifrm_createTargetGroup" style="width:700px;height:600px;"></iframe>');
	$('#ifrm_createTargetGroup').attr("src", "/managead/ad_create_targetGroup.htm?mode="+mode+"&targeting_group_seq="+targetingGroupSeq+"&campaign_group_id="+campaignGroupId+"&adset_budget="+adsetBudget+"&adset_name="+adsetName);
	$('#ifrm_createTargetGroup').topPositionLayer();
}

function editAdgroupTargeting(campaignGroupId, targetingGroupSeq, targetingSeq) {
	$('#ifrm_createTargetGroup').remove();
	createOverLay();
	$('body').append('<iframe id="ifrm_createTargetGroup" style="width:700px;height:600px;"></iframe>');
	$('#ifrm_createTargetGroup').attr("src", "/managead/ad_create_targetGroup.htm?mode=edit_adgroup_targeting&targeting_group_seq="+targetingGroupSeq+"&campaign_group_id="+campaignGroupId+"targeting_seq="+targetingSeq);
	$('#ifrm_createTargetGroup').topPositionLayer();
}

function createAdsTarget(targetAdd, adaccountId) {
	$('#ifrm_createTargetGroup').remove();
	createOverLay();
	$('body').append('<iframe id="ifrm_createTargetGroup" style="width:700px;height:600px;"></iframe>');
	$('#ifrm_createTargetGroup').attr("src", "/managead/ad_create_targetGroup.htm?mode=add_targeting_group&targetAdd="+targetAdd);
	$('#ifrm_createTargetGroup').topPositionLayer();
}

function createAdGroupPreview(_id) {
	createOverLay();
	createAjaxLoadingOnly();
	$('body').append('<iframe id="ifrm_createAdGroupPreview" style="width:600px;height:600px;overflow:hidden;" scrolling="no"></iframe>');
	$('#ifrm_createAdGroupPreview').attr("src", "/managead/adGroupPreview.htm?id=" + _id);
	$('#ifrm_createAdGroupPreview').topPositionLayer();
}




function modifyAdSet(_adsId, _accountId, _count) {
	createOverLay();
	$('body').append('<iframe id="ifrm_adTargetcreate" style="width:700px;height:750px;"></iframe>');
	$('#ifrm_modifyTargetGroup').attr("src", "/target/modifyTargetGroup.htm?sb_admin="+_adsId+"&sb_adaccount="+_accountId+"&count="+_count);
	$('#ifrm_modifyTargetGroup').topPositionLayer();
}


function adGroupPreview(_count, _type, _pagetype) {	
	createOverLay();
	if(_pagetype == "desktopfeed" || _pagetype == "all"){
		$('body').append('<iframe id="ifrm_adGroupPreview" style="width:700px;height:750px;border:0px;"></iframe>');
	}else{
		$('body').append('<iframe id="ifrm_adGroupPreview" style="width: 591px; height: 539px;border:0px;"></iframe>');
	}
	$('#ifrm_adGroupPreview').attr("src", "/managead/adPreview.htm?count="+_count+"&type="+_type+"&pagetype="+_pagetype);
	$('#ifrm_adGroupPreview').topPositionLayer();
}

//object 소팅 함수. - aaa.sort(dynamicSort("소팅하고 싶은 키"));
function dynamicSort(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

function activeAdSet(_id, _group_id) {
	$.ajax({
		type:"POST"
		, async :true
		, url : "/managead/activeAdSet.htm"
		, dataType : "json"
		, data:{ 
			id : _id,
			group_id : _group_id
		},beforeSend : function() {
			createAjaxLoading();
		},
		complete: function () {
			setStartStatusObject('adset', _id);
			removeAjaxLoading();
		}
		, error: function(request, status, error) { }		
	});	
}

function pauseAdSet(_id, _group_id) {
	$.ajax({
		type:"POST"
		, async :true
		, url : "/managead/pauseAdSet.htm"
		, dataType : "json"
		, data:{ 
			id : _id,
			group_id : _group_id
		},beforeSend : function() {
			createAjaxLoading();
		},
		complete: function () {
			setStartStatusObject('adset', _id);
			removeAjaxLoading();			
		}
		, error: function(request, status, error) { }
	});	
}

function pauseAd(_id, _group_id) {
	$.ajax({
		type:"POST"
		, async :true
		, url : "/managead/pauseAd.htm"
		, dataType : "json"
		, data:{ 
			id : _id,
			group_id : _group_id
		},beforeSend : function() {
			createAjaxLoading();
		},
		complete: function () {
			setStartStatusObject('adgroup', _id);
			removeAjaxLoading();
		}
		, error: function(request, status, error) { }		
	});		
}

function activeAd(_id, _group_id) {
	$.ajax({
		type:"POST"
		, async :true
		, url : "/managead/activeAd.htm"
		, dataType : "json"
		, data:{ 
			id : _id,
			group_id : _group_id
		},beforeSend : function() {
			createAjaxLoading();
		},
		complete: function () {
			setStartStatusObject('adgroup', _id);
			removeAjaxLoading();
		}
		, error: function(request, status, error) { }		
	});		
}


function pauseAdGroup(_id, _group_id) {
	$.ajax({
		type:"POST"
		, async :true
		, url : "/managead/pauseAdGroup.htm"
		, dataType : "json"
		, data:{ 
			id : _id,
			group_id : _group_id
		},beforeSend : function() {
			createAjaxLoading();
		},
		complete: function () {
			setStartStatusObject('adset', _id);
			removeAjaxLoading();
		}
		, error: function(request, status, error) { }		
	});		
}

function setAllocateEqualBudget(_sb_admin, _sb_adaccount, _group_id, _budget_type) {
	$.ajax({
		type:"POST"
		, async :true
		, url : "/managead/setAllocateEqualBudget.htm"
		, dataType : "json"
		, data:{ 
			sb_admin : _sb_admin,
			sb_adaccount : _sb_adaccount,
			group_id : _group_id,
			type : _budget_type
		},beforeSend : function() {
			createAjaxLoading();
		},
		complete: function () {
			$(document).attr('location', '/managead/manage.htm?id='+_group_id);
		}
		, error: function(request, status, error) { }		
	});
}

//adgroup의 상태값을 가져온다. 
function lfn_check_ad_status_regist() {
	console.log("lfn_check_ad_status_regist");
	var checkAdStatus = 0;
	
	$('input[name=adgroupIdValue]').each(function () {
		var $this = $(this);
		var adgroupid = $(this).val();
		var seq = $(this).attr('seq');
		var status = $(this).attr('status');
		$.ajax({
			url : "/managead/adStatusCheck.htm",
			type : "POST",
			data : {
				seq : seq					
			},
			dataType : "json",
			success : function(data) {
				//lfn_set_ad_status($this, data);
					
			},
			error : function(x, e) {
				console.log(x + e);
			}
		});
		checkAdStatus++;
	});
	if(checkAdStatus == 0) {
		clearInterval(ad_status_regist_timer);
	}
}