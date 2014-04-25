var autocomplete_option = {matchContains : true, max : 30, mustMatch : true, multiple : false, scrollHeight : 220, width : 310};
var cityCheck 			= 'false';
var regionsCheck		= 'false';
var country_code 		= ''; 
$(function() {
	$("#base_targeting").validationEngine('attach', {
		onValidationComplete: function(form, status) {
			if(status) {
				getSubmitValue('locations');
				getSubmitValue('interests');
				getSubmitValue('locales');
				getSubmitValue('college_networks');
				getSubmitValue('college_majors');
				getSubmitValue('work_networks');				
				getSubmitValue('connections');				
				getSubmitValue('excluded_connections');				
				getSubmitValue('friends_of_connections');
				getSubmitValue('life_events');
				getSubmitValue('politics');
				getSubmitValue('markets');
				getSubmitValue('industries');
				getSubmitValue('income');
				getSubmitValue('net_worth');
				getSubmitValue('home_type');
				getSubmitValue('home_ownership');
				getSubmitValue('home_value');
				getSubmitValue('ethnic_affinity');
				getSubmitValue('generation');
				getSubmitValue('household_composition');
				getSubmitValue('moms');
				getSubmitValue('office_type');
				getSubmitValue('family_statuses');
				getSubmitValue('education_schools');
				getSubmitValue('work_employers');
				getSubmitValue('interests');
				
				locationgetSubmitValue('locations');
				
				var locationInfo = JSON.stringify(jsonLocationObj);
				$('#locations_info').val(locationInfo);
	
				document.getElementById('base_targeting').action = "/target/subdivisionTarget.htm";
				document.getElementById('base_targeting').submit();
			}
		}
	});	
	
	$('#interests').autocomplete("/target/get_facebookAutocompleteSearch.htm?adsId="+$('#adsid').val()+"&accountId="+$('#adaccountid').val()+"&type=adinterest", autocomplete_option);
	$('#locales').autocomplete("/target/get_facebookAutocompleteSearch.htm?adsId="+$('#adsid').val()+"&accountId="+$('#adaccountid').val()+"&type=adlocale", autocomplete_option);
	$('#college_networks').autocomplete("/target/get_facebookAutocompleteSearch.htm?adsId="+$('#adsid').val()+"&accountId="+$('#adaccountid').val()+"&type=adcollege", autocomplete_option);
	$('#college_majors').autocomplete("/target/get_facebookAutocompleteSearch.htm?adsId="+$('#adsid').val()+"&accountId="+$('#adaccountid').val()+"&type=adcollegemajor", autocomplete_option);
	$('#work_networks').autocomplete("/target/get_facebookAutocompleteSearch.htm?adsId="+$('#adsid').val()+"&accountId="+$('#adaccountid').val()+"&type=adworkplace", autocomplete_option);		
	$('#connections').autocomplete("/target/get_facebookconnection.htm?adsId="+$('#adsid').val()+"&accountId="+$('#adaccountid').val(), autocomplete_option);	
	$('#excluded_connections').autocomplete("/target/get_facebookconnection.htm?adsId="+$('#adsid').val()+"&accountId="+$('#adaccountid').val(), autocomplete_option);	
	$('#friends_of_connections').autocomplete("/target/get_facebookconnection.htm?adsId="+$('#adsid').val()+"&accountId="+$('#adaccountid').val(), autocomplete_option);	

	//interests
	$("#interests").result(function(event, data, formatted) {		
		
		if (data) {			
			createAutocomplateLi("interests", data[0], data[1]);	
			$('#suggest').show();
		}
	});
	
	$("#locales").result(function(event, data, formatted) {
		if (data) { 
			createAutocomplateLi("locales", data[0], data[1]);
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
		
		if(this_ele.attr('id')=="interests_closebtn"){
			$('span[id="interests_key"]').each(function () {
				return_key += $(this).text() + ",";
			});
			
			interestsAppend(return_key);
			
			if($('#interests_closebtn').size() == 0) {
				$('#suggest').hide();
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
				$('#divRegions ul .addLi').remove();
				$('#divCities ul .addLi').remove();
				$('#zips').val();
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
	
	if(_ele == "interests"){
		var ele_key = "interests_key";
		var return_key = "";
		
		$('span[id="'+ele_key+'"]').each(function () {
			return_key += $(this).text() + ",";
		});
		interestsAppend(return_key);
	}
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
		//console.log(this.childNodes[0].nodeValue);
		return_val += this.childNodes[0].nodeValue + ",";
	});
	$('span[id="'+ele_key+'"]').each(function () {
		//console.log($(this).text());
		return_key += $(this).text() + ",";		
	});
	
	return_val = return_val.substring(0, return_val.length-1); 
	return_key = return_key.substring(0, return_key.length-1); 		
	
	$('#result_'+ele_val).val(return_val);	
	$('#result_'+ele_key).val(return_key);	
}



function locationgetSubmitValue(_ele) {
	var city_key = "";
	var regions_key= "";
	var countries_key = "";
	var zip_key="";

	$('span[id="locations_city_key"]').each(function () {
		city_key +=$(this).text()+",";
	});
	$('span[id="locations_region_key"]').each(function () {
		regions_key +=$(this).text()+",";
	});
	$('span[id="locations_country_key"]').each(function () {
		countries_key += $(this).text()+",";
	});
	$('span[id="locations_zip_key"]').each(function () {
		zip_key += $(this).text()+",";
	});
	

	
	
	//return_type = return_type.substring(0, return_type.length-1); 
	city_key = city_key.substring(0, city_key.length-1); 		
	countries_key = countries_key.substring(0, countries_key.length-1); 		
	regions_key = regions_key.substring(0, regions_key.length-1); 		
	zip_key = zip_key.substring(0, zip_key.length-1); 		
	
	//$('#locations_type').val(return_type); 
	$('#cities_key').val(city_key);
	$('#regions_key').val(regions_key);	
	$('#countries_key').val(countries_key);	
	$('#zips').val(zip_key);	
	
	
	
	var exclude_type="";
	var exclude_key="";
	
	
	$('span[id="excludelocations_type"]').each(function () {
		exclude_type += this.childNodes[0].nodeValue + ",";
	});
	$('span[id="excludelocations_key"]').each(function () {
		//console.log($(this).text());
		exclude_key += this.childNodes[0].nodeValue + ",";		
	});
	exclude_type = exclude_type.substring(0, exclude_type.length-1); 		
	exclude_key = exclude_key.substring(0, exclude_key.length-1); 		
	$('#exclude_key').val(exclude_key);	
	$('#exclude_type').val(exclude_type);	
	
	
}

function interestsAppend(data){
	var interests = data.substring(0, data.length-1); 
	//console.log(data);
	//console.log('interests : '+data);
	$('#suggestLi').empty();
	$.ajax({
		url : "/target/interests.htm",
		data : {
			q : interests
		},
		type : "GET",
		dataType : "json",
		success : function(data) {
			var interestList=data;
			for(var i=0; i<data.length; i++){
				if(interestList[i].description==null){	
					$('#suggestLi').append("<div class='suggestdiv'><input type='checkbox' id='chk"+i+"' name='chk' value='"+interestList[i].name+"'><label class='intername' for='chk"+i+"''>"+interestList[i].name+"</label>"+"<div class='description'> </div></div>");
				}else{
					$('#suggestLi').append("<div class='suggestdiv'><input type='checkbox' id='chk"+i+"' name='chk' value='"+interestList[i].name+"'><label class='intername' for='chk"+i+"''>"+interestList[i].name+"</label>"+"<div class='description'>"+interestList[i].description+"</div></div>");
				}
			}
		}
	});
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
		if($('span[id="countries_city"]').text() == "true")
			$('#liCountrie2').show();
		if($('span[id="countries_key"]').text() == "US")
			$('#liCountrie3').show();		

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