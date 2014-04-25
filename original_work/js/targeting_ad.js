var autocomplete_option = {matchContains : true, max : 30, mustMatch : true, multiple : false, scrollHeight : 220, width : 310};
var cityCheck 			= 'false';
var regionsCheck		= 'false';
var country_code 		= ''; 
$(function() {
	$("#frm_targeting").validationEngine('attach', {
		onValidationComplete: function(form, status) {
			if(status) {
				if($("#targeting_seq").val()==''){
					$("#targeting_seq").val('0');
				}
				getSubmitValue('countries');
				getSubmitValue('cities');
				getSubmitValue('regions');				
				getSubmitValue('keywords');
				getSubmitValue('locales');
				getSubmitValue('college_networks');
				getSubmitValue('college_majors');
				getSubmitValue('work_networks');				
				getSubmitValue('connections');				
				getSubmitValue('excluded_connections');				
				getSubmitValue('friends_of_connections');				

				$('input[id=checkboxCategorie]:checkbox').each(function (k, y) {
					var checkboxChecked = $(this).prop('checked');
					if(checkboxChecked  == true) {
						var tempValue = $(this).val().split("|");
						$('#user_adclusters').val($('#user_adclusters').val() + tempValue[1] + ",");
						$('#user_adclusters_id').val($('#user_adclusters_id').val() + tempValue[0] + ",");					
					}
				});
				
				$('#user_adclusters').val($('#user_adclusters').val().substr(0, $('#user_adclusters').val().length-1));
				$('#user_adclusters_id').val($('#user_adclusters_id').val().substr(0, $('#user_adclusters_id').val().length-1));
				
				var url = "/target/proc.htm";
				if($('#group').val() == '1' && $('#mode').val() == 'individual')
					url = "/managead/ad_create_targetModifyProc.htm";
				else if($('#group').val() == '1') 
					url = "/managead/ad_create_targetGroupModifyProc.htm";
				else if($('#group').val() == '2') 
					url = "/managead/ad_create_targetGroupInsertProc.htm";
				
				var  relationship= ""; 
				$('input[name=relationship_stat]:checkbox').each(function () {
					if(!$('#relationship_statuses0').is(':checked')) {
						if($(this).is(':checked')){
							relationship += $(this).val()+",";		
						}
					}
				});
				relationship = relationship.substring(0, relationship.length-1);
				$('#relationship_statuses').val(relationship);

				$.ajax({
					url : url,
					type : "POST",
					data : $("#frm_targeting").serialize(),
					dataType : "html",
					beforeSend : function() {
						createAjaxLoadingThis();
					},
					success : function(data) {
						console.log(data);
						removeAjaxLoading();
						removeAjaxLoadingParent();							
						if(data != null&& data.length > 0) {
							createErrPageIframe(data);
						} else {							
							createAjaxLoadingParent();
							if($('#group').val() == '1')
								parent.document.location.reload();
							else
								parent.document.location.reload();
								
							removeElement('create_targeting');
						}
					}
				});
			}
		}
	});	
	
	
	
	$("#countries").focus().autocomplete("/target/search_countries.htm", autocomplete_option);
	$("#cities").autocomplete("/target/get_facebookAutocompleteSearch.htm?type=adcity", {
		matchContains : true, //not start with the characters we input
		mustMatch : true,					
		multiple: false,
		width : 310,
		extraParams : {
			country :  function() { return country_code; }
		}
	});
	
	$("#cities").result(function(event, data, formatted) {
		if (data) { 
			createAutocomplateLi("cities", data[0], data[1]);	
		}
	});
	$('#keywords').focus().autocomplete("/target/get_facebookAutocompleteSearch.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val()+"&type=adkeyword", autocomplete_option);
	$('#locales').focus().autocomplete("/target/get_facebookAutocompleteSearch.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val()+"&type=adlocale", autocomplete_option);
	$('#regions').focus().autocomplete("/target/get_facebookAutocompleteSearch.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val()+"&type=adregion", autocomplete_option);		
	$('#college_networks').focus().autocomplete("/target/get_facebookAutocompleteSearch.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val()+"&type=adcollege", autocomplete_option);
	$('#college_majors').focus().autocomplete("/target/get_facebookAutocompleteSearch.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val()+"&type=adcollegemajor", autocomplete_option);
	$('#work_networks').focus().autocomplete("/target/get_facebookAutocompleteSearch.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val()+"&type=adworkplace", autocomplete_option);		
	$('#connections').autocomplete("/target/get_facebookconnection.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val(), autocomplete_option);	
	$('#excluded_connections').autocomplete("/target/get_facebookconnection.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val(), autocomplete_option);	
	$('#friends_of_connections').autocomplete("/target/get_facebookconnection.htm?adsid="+$('#sb_admin').val()+"&accountId="+$('#sb_adaccount').val(), autocomplete_option);	
	
	
	$("#keywords").result(function(event, data, formatted) {		
		if (data) {			
			createAutocomplateLi("keywords", data[0], data[0]);
		}
	});
	
	$("#locales").result(function(event, data, formatted) {
		if (data) { 
			createAutocomplateLi("locales", data[0], data[1]);
		}
	});
	
	$("#regions").result(function(event, data, formatted) {
		if (data) { 
			createAutocomplateLi("regions", data[0], data[1]);
		}
	});
	
	$("#college_networks").result(function(event, data, formatted) {
		if (data) { 
			createAutocomplateLi("college_networks", data[0], data[1]);
		}
	});
	
	$("#college_majors").result(function(event, data, formatted) {
		if (data) { 
			createAutocomplateLi("college_majors", data[0], data[0]);
		}
	});
	
	$("#work_networks").result(function(event, data, formatted) {
		if (data) { 
			createAutocomplateLi("work_networks", data[0], data[1]);
		}
	});
	
	$("#connections").result(function(event, data, formatted) {
		if (data) {			
			createAutocomplateLi("connections", data[0], data[1]);
		}
	});
	$("#excluded_connections").result(function(event, data, formatted) {
		if (data) { 			
			createAutocomplateLi("excluded_connections", data[0], data[1]);
		}
	});
	$("#friends_of_connections").result(function(event, data, formatted) {
		if (data) { 			
			createAutocomplateLi("friends_of_connections", data[0], data[1]);
		}
	});	
	
	$("#countries").result(function(event, data, formatted) {			
		if (data) {			
			cityCheck = data[3];
			regionsCheck = data[2];			
			createAutocomplateLi("countries", data[0], data[1]);
			checkCountries();
		}		
	});	
	
	$('select[name=education_statuses]').change(function () {
		var thisValue = $(this).val(); 
		switch (thisValue) {
		case "2":
			$('#divcollege_networks').css('display', 'block');
			$('#divcollege_majors').css('display', 'block');
			$('#divcollege_years').css('display', 'block');
			break;
		case "3":
			$('#divcollege_networks').css('display', 'block');
			$('#divcollege_majors').css('display', 'block');
			$('#divcollege_years').css('display', 'none');
			break;
		default:
			$('#divcollege_networks').css('display', 'none');
			$('#divcollege_majors').css('display', 'none');
			$('#divcollege_years').css('display', 'none');
			break;
		}
	});	

	$('.closebtn').live("click", function () {
		var this_ele = $(this);
		this_ele.parent().remove();
		checkCountries();
		
		if(this_ele.attr('id') == "countries_closebtn") {
			if($('#countries_closebtn').size() == 1) {
				$('span[id="cities_value"]').parent().remove();
				$('#zips').val('');
				$('#radioCountrie0').prop('checked', true);
			}
		}
		
	});	
	
	$('input[name="radiocountrie"]:radio').click(function () {
		var thisValue = $(this).val();
		
		switch(thisValue) {
			case "1":
				$('#divRegions').show();
				$('#divCities').hide();
				$('#divZips').hide();
				break;
			case "2":
				startCitiesAutoComplate();
				$('#divRegions').hide();
				$('#divCities').show();
				$('#divZips').hide();
				break;
			case "3":
				$('#divRegions').hide();
				$('#divCities').hide();
				$('#divZips').show();
				break;
			default:
				$('#divRegions').hide();
				$('#divCities').hide();
				$('#divZips').hide();
				break;
		}
	});
});

function returnValue(_value) {
	var returnValue = new Array();
	var splitValue = "";
	if(_value.length > 0) {
		splitValue = _value.split(", ");		
	}
	
	return splitValue;
}

function createAutocomplateLi(_ele, _data, _data_key) {
	var ele = "#" + _ele;
	var countries_city="",countries_regions=""; 
	
	if(_ele == "countries") {
		countries_city = "<span id='"+_ele+"_city' class='addSpanHidden'>"+cityCheck+"</span>";
		countries_regions = "<span id='"+_ele+"_regions' class='addSpanHidden'>"+regionsCheck+"</span>";
	}
		
	$(ele).parent().before('<li class=addLi><span id='+_ele+'_value  class=addAutoComplateSpan>'+_data+'</span><span id='+_ele+'_closebtn class=closebtn>x</span><span id='+_ele+'_key class=addSpanHidden>'+_data_key+'</span>'+countries_city+countries_regions+'</li>');	
	$(ele).val('');
}
function createAutocomplateLiCustom(_ele, _data, _data_key) {
	var ele = "#" + _ele;
		
	$(ele).parent().before('<li class=addLi id="customLi"><span id='+_ele+'_value  class=addAutoComplateSpan>'+_data+'</span><span id='+_ele+'_closebtn class=closebtn>x</span><span id='+_ele+'_key class=addSpanHidden>'+_data_key+'</span></li>');	
	$(ele).val('');
}


function getSubmitValue(_ele) {
	var ele_val = _ele + "_value";
	var ele_key = _ele + "_key";
	var return_val = "";
	var return_key = "";
	
	$('span[id="'+ele_val+'"]').each(function () {
		return_val += $(this).text() + ",";
	});
	$('span[id="'+ele_key+'"]').each(function () {
		return_key += $(this).text() + ",";		
	});
	
	//countries占쏙옙野껋럩��city占쏙옙regions 占싼됵옙占쏙옙占쏙옙��
	if(_ele == "countries") {
		var ele_city 		= _ele + "_city";
		var ele_regions 	= _ele + "_regions";
		var return_city 	= "";
		var return_regions 	= "";
		
		$('span[id="'+ele_city+'"]').each(function () {
			return_city += $(this).text() + ",";
		});
		$('span[id="'+ele_regions+'"]').each(function () {
			return_regions += $(this).text() + ",";
		});
				
		return_city = return_city.substring(0, return_city.length-1); 
		return_regions = return_regions.substring(0, return_regions.length-1);
		
		$('#'+ele_city).val(return_city);
		$('#'+ele_regions).val(return_regions);	
	}
	
	return_val = return_val.substring(0, return_val.length-1); 
	return_key = return_key.substring(0, return_key.length-1); 		
	
	$('#'+ele_val).val(return_val);	
	$('#'+ele_key).val(return_key);	
}

function startCitiesAutoComplate() {
	country_code = $('span[id="countries_key"]').text();
}

function checkCountries() {
	if($('span[id="countries_value"]').size() == 1) {
		$('#divCountrieChoice').show();
		$('#liCountrie0').show();
		$('#liCountrie1').hide();
		$('#liCountrie2').hide();
		$('#liCountrie3').hide();		

		if($('span[id="countries_regions"]').text() == "true")
			$('#liCountrie1').show();
		else
			$('#liCountrie1').hide();
			
		if($('span[id="countries_city"]').text() == "true")
			$('#liCountrie2').show();
		else
			$('#liCountrie2').hide();
			
		if($('span[id="countries_key"]').text() == "US")
			$('#liCountrie3').show();
		else
			$('#liCountrie3').hide();

	}else {
		$('#divCountrieChoice').hide();
		$('#divRegions').hide();
		$('#divCities').hide();
		$('#divZips').hide();
		
		$('#divRegions .addLi').remove();
		$('#divCities .addLi').remove();
		$('#zips').val('');
	}
}