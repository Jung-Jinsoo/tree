/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */

var locationIndex = 0;
var jsonLocationObj = [];


function addJsonLocationObj(_data) {
	var jsonLocationConstruct = { 
			"index":"" + locationIndex + "",
			"include" : {
				"name":"" + _data.name + "",
				"key":""+_data.key+"",
				"country_code":""+_data.country_code+"",
				"region":""+_data.region+"",
				"region_id":""+_data.region_id+"",
				"supports_city":""+_data.supports_city+"",
				"supports_region":""+_data.supports_region+"",
				"type":""+_data.type+"",
				"radius":"",
				"distance_unit":"mile"
			}, 
			"exclude": []
	};
	
	jsonLocationObj.push(jsonLocationConstruct);
}
function createAutocomplateGeo(_data) {
	var resultConvertJsonToString = JSON.stringify(_data);

	//console.log(_data);
	
	var $element = $("#locations");	
	
	var country = $.grep(countryJson, function(e) {
		return e.code == _data.country_code;
	});
	
	var popdiv = "<div class='addGeoOption' id='addGeoOption'><ul><li>EXCLUSION TARGETING</li><li><span class='extargeting'>Exclude Locations</span></li></ul></div>";
	var tag = '<li class=addLiGeo index='+locationIndex+' json_data=\''+resultConvertJsonToString+'\'>';
	switch(_data.type) {
	case "region":
		tag += '<div class=addGeoAutoComplateSpan>'+country[0].name+'</div>';
		tag += '<span id=locations_closebtn class=location_closebtn index='+locationIndex+'>x</span>';
		tag += '<span id=locations_value class=addGeoAutoComplateSpanChild>'+_data.name+'</span>';
		tag += popdiv;	
		tag += '<span id=locations_addbtn class=addbtn index='+locationIndex+'>&gt;</span>';
		tag += '<span id=locations_region_key class=addSpanHidden>'+_data.key+'</span>';
		break;
	case "city":
		tag += '<div class=addGeoAutoComplateSpan>'+country[0].name+'</div>';
		tag += '<span id=locations_closebtn class=location_closebtn index='+locationIndex+'>x</span>';
		tag += '<span id=locations_value class=addGeoAutoComplateSpanChild>'+_data.name+'</span>';
		tag += "<div class='addGeoCityOption' id='addGeoCityOption'><ul><li>INCLUDE NEARBY</li><li><span class='nearby' value=''>"+_data.name+"</span></li><li><span class='nearby' value='10'>"+_data.name+" +10 miles</span></li><li><span class='nearby' value='25'>"+_data.name+" +25 miles</span></li><li><span class='nearby' value='50'>"+_data.name+" +50 miles</span></li></ul><ul><li>EXCLUSION TARGETING</li><li><span class='extargeting'>Exclude Locations</span></li></ul></div>";;
		tag += '<span id=locations_addbtn class=addbtn index='+locationIndex+'>&gt;</span>';
		tag += '<span id=locations_city_key class=addSpanHidden>'+_data.key+'</span>';
		break;
	case "country":
		tag += '<div class=addGeoAutoComplateSpan>'+_data.name+'</div>';
		tag += '<span id=locations_closebtn class=location_closebtn index='+locationIndex+'>x</span>';
		tag += '<span id=locations_value class=addGeoAutoComplateSpanChild>All '+_data.name+'</span>';
		tag += popdiv;		
		tag += '<span id=locations_addbtn class=addbtn index='+locationIndex+'>&gt;</span>';
		tag += '<span id=locations_country_key class=addSpanHidden>'+_data.key+'</span>';
		break;
	case "zip":
		tag += '<div class=addGeoAutoComplateSpan>'+country[0].name+', '+_data.region+'</div>';
		tag += '<span id=locations_closebtn class=location_closebtn index='+locationIndex+'>&gt;</span>';
		tag += '<span id=locations_value class=addGeoAutoComplateSpanChild>'+_data.primary_city+', '+_data.name+'</span>';
		tag += popdiv;		
		tag += '<span id=locations_addbtn class=addbtn index='+locationIndex+'>&gt;</span>';
		tag += '<span id=locations_zip_key class=addSpanHidden>'+_data.key+'</span>';
		break;
	}
	tag += '</li>';	
	
	$element.parent().before(tag);	
	$element.val('');
}

function interestsAppend(data) {
	var interests = data;
	// console.log(data);
	
	$('#suggestDiv').empty();
	$.ajax({
		url : "/target/interests.htm",
		data : {
			q : interests
		},
		type : "GET",
		dataType : "json",
		success : function(data) {
			var interestList = data;
			for ( var i = 0; i < data.length; i++) {
			/*	if (interestList[i].description == null) {
					$('#suggestDiv').append("<input type='checkbox' id='chk" + i + "' name='chk' value='" + interestList[i].name + "'><label class='intername' for='chk" + i + "''>" + interestList[i].name + "</label>" + "<div class='description'> </div>");
				} else {*/
					$('#suggestDiv').append("<div class='suggestValue'><input type='checkbox' id='chk" + i + "' name='chk' value='" + interestList[i].name + "'><label class='intername' for='chk" + i + "''>" + interestList[i].name + "</label>" + "<div class='description numbers'>" +number_format(interestList[i].audience_size)+ " Users</div><span id='suggestions_key' class='addSpanHidden'>"+interestList[i].id+"</span></div>");
			//	}
			}
		}
	});
}
function createAutocomplateGeoExclude(_data) {
	var $element = $("#excludelocations");
		
	$element.parent().before('<li class=addLi id="customLi"><span id=excludelocations_value  class=addAutoComplateSpan>'+_data.name+'</span><span id=excludelocations_closebtn class=closebtn>x</span><span id=excludelocations_key class=addSpanHidden>'+_data.key+'</span><span id=excludelocations_type class=addSpanHidden>'+_data.type+'</span></li>');	
	$element.val('').focus();
}

function createAutocompleteInterest(data, key){
	var return_key = "";

	$('#interestUl').children('.addLi:last').after('<li class=addLi><span id=interests_value  class=addAutoComplateSpan>'+data+'</span><span id=interests_closebtn class=closebtn>x</span><span id=interests_key class=addSpanHidden>'+key+'</span></li>');	

	$('span[id="interests_value"]').each(function () {
		return_key += $(this).text() + ",";
	});
	
	
	interestsAppend(return_key);

}
$(function() {

	 $("input:checkbox[name=chk]").live('click', function() {
		 
		var key=$(this).parent().find("span").text();
		createAutocompleteInterest($(this).val(), key);
	});
	 
	 $('.closebtn').live("click", function() {
			var this_ele = $(this);
			this_ele.parent().remove();

			if (this_ele.attr('id') == "interests_closebtn") {
				var return_key ="";
				$('span[id="interests_value"]').each(function() {
				return_key += $(this).text() + ",";
				});

				interestsAppend(return_key);

				if ($('#interests_closebtn').size() == 0) {
					$('#suggest').hide();
				}
			}
		});
	$('#locations').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=locations',
		onSelect : function(suggestion) {
			
			if (suggestion) {
				$('#locations').validationEngine('hide');
				addJsonLocationObj(suggestion);
				createAutocomplateGeo(suggestion);
				locationIndex++;			
			} 
			$('#locations').val('');
		},
		onHint : function(hint) {
			$('#locations_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
	$('#excludelocations').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=locations',
		onSelect : function(suggestion) {
			
			if (suggestion) {
				$('#excludelocations').validationEngine('hide');
			//	addJsonLocationObj(suggestion);
				createAutocomplateGeoExclude(suggestion);
			} 
			$('#excludelocations').val('');
		},
		onHint : function(hint) {
			$('#excludelocations_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
	
	$('#interests').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=interests',
		onSelect : function(suggestion) {
			if(suggestion){
				var return_key="";
				$('#interestUl').children('.addLiInput').before('<li class=addLi><span id=interests_value  class=addAutoComplateSpan>'+suggestion.name+'</span><span id=interests_closebtn class=closebtn>x</span><span id=interests_key class=addSpanHidden>'+suggestion.key+'</span></li>');	
				$('#suggest').show();
				interestsAppend(suggestion.name);
			}
			$('#interests').val('');
		},
		onHint : function(hint) {
			$('#interests_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
	$('#locales').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=locales',
		onSelect : function(suggestion) {
			if(suggestion){
			//	console.log('ssss'+suggestion);
				$('#locales').parent().before('<li class=addLi><span id=locales_value  class=addAutoComplateSpan>' + suggestion.name + '</span><span id=locales_closebtn class=closebtn>x</span><span id=locales_key class=addSpanHidden>' + suggestion.key + '</span></li>');

			}
			$('#adlocal').val('');
		},
		onHint : function(hint) {
			$('#locales_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
	$('#education_schools').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=collegenetworks',
		onSelect : function(suggestion) {
			if(suggestion){
				$('#education_schools').parent().before('<li class=addLi><span id=education_schools_value  class=addAutoComplateSpan>' + suggestion.name + '</span><span id=education_schools_closebtn class=closebtn>x</span><span id=education_schools_key class=addSpanHidden>' + suggestion.key + '</span></li>');

			}
			$('#college_networks').val('');
		},
		onHint : function(hint) {
			$('#college_networks_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
	$('#education_majors').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=collegemajors',
		onSelect : function(suggestion) {
			if(suggestion){
				$('#education_majors').parent().before('<li class=addLi><span id=education_majors_value  class=addAutoComplateSpan>' + suggestion.name + '</span><span id=education_majors_closebtn class=closebtn>x</span><span id=education_majors_key class=addSpanHidden>' + suggestion.key + '</span></li>');

			}
			$('#education_majors').val('');
		},
		onHint : function(hint) {
			$('#education_majors_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
	$('#work_employers').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=worknetworks',
		onSelect : function(suggestion) {
			if(suggestion){
					$('#work_employers').parent().before('<li class=addLi><span id=work_employers_value  class=addAutoComplateSpan>' + suggestion.name + '</span><span id=work_employers_closebtn class=closebtn>x</span><span id=work_employers_key class=addSpanHidden>' + suggestion.key + '</span></li>');
				
			}
			$('#work_employers').val('');
		},
		onHint : function(hint) {
			$('#work_employers_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
	$('#connections').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=connection',
		onSelect : function(suggestion) {			
			if(suggestion){
				$('#connections').parent().before('<li class=addLi><span id=connections  class=addAutoComplateSpan>' + suggestion.name + '</span><span id=connections_closebtn class=closebtn>x</span><span id=connections_key class=addSpanHidden>' + suggestion.key + '</span></li>');
				
			}
			$('#connections').val('');
		},
		onHint : function(hint) {
			$('#connections_hint').val(hint); 
		},
		onInvalidateSelection : function() {
		}
	});
	$('#excluded_connections').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=connection',
		onSelect : function(suggestion) {
			if(suggestion){
				$('#excluded_connections').parent().before('<li class=addLi><span id=excluded_connections  class=addAutoComplateSpan>' + suggestion.name + '</span><span id=excluded_connections_closebtn class=closebtn>x</span><span id=excluded_connections_key class=addSpanHidden>' + suggestion.key + '</span></li>');
				
			}
			$('#excluded_connections').val('');
		},
		onHint : function(hint) {
			$('#excluded_connections_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
	$('#friends_of_connections').autocomplete({
		responseTime : 2000,
		serviceUrl : '/ac/search.htm?searchtype=connection',
		onSelect : function(suggestion) {
			if(suggestion){
				$('#friends_of_connections').parent().before('<li class=addLi><span id=friends_of_connections  class=addAutoComplateSpan>' + suggestion.name + '</span><span id=friends_of_connections_closebtn class=closebtn>x</span><span id=friends_of_connections_key class=addSpanHidden>' + suggestion.key + '</span></li>');
				
			}
			$('#friends_of_connections').val('');
		},
		onHint : function(hint) {
			$('#friends_of_connections_hint').val(hint);
		},
		onInvalidateSelection : function() {
		}
	});
});
