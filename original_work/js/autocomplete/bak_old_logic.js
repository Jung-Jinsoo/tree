/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */
$(function () {
	$('#locations').focus().autocomplete("${pageContext.request.contextPath }/target/geosearch.htm", {
		matchContains : true,
		max : 30,
		mustMatch : true,
		multiple : true,
		dataType : 'json',
		scrollHeight : 250,
		width : 390,
		parse : function(data) {
			var array = new Array();
			var cnt = 0;
			if (data) {
				if (data[0].data != null) {
					if (data[0].data.length != 0) {
						for ( var j = 0; j < data[0].data.length; j++) {
							if (data[0].data[j].length != 0) {
								if(data[0].data[j].type == "country") {
									array[cnt] = {data : data[0].data[j]};
									cnt++;
								}else {
									if((data[0].data[j].type == "city" && data[0].data[j].supports_city) || (data[0].data[j].type == "region" && data[0].data[j].supports_region))  {
										array[cnt] = {data : data[0].data[j]};
										cnt++;
									}
									
								}
							}
						}
					}
				}
				return array; 
			}
			return new Array();
		},
		formatItem : function(row, i, n) {
			msg = "";
			switch(row.type) {
			case "country":
				msg = row.name + "<span>Country</span>";
				break;
			case "region":
				msg = row.name + ", " + row.country_code + "<span>State</span>";
				break;
			case "zip":
				msg = row.name + ", " + row.primary_city + ", " + row.country_code  + "<span>Zip Code</span>";
				break;
			case "city":
				msg = row.name;
				
				if(row.region)
					msg +=  ", " + row.region;
				if(row.country_code)
					msg +=  ", " + row.country_code;
				msg += "<span>City</span>";
				
				break;
			}
			result = msg;
			return result;
		}
	});

	$("#locations").result(function(event, data, result, formatted) {
		if (data) {
			$('#locations').validationEngine('hide');
			addJsonLocationObj(data);
			createAutocomplateGeo(data);
			locationIndex++;			
		} 
	});
});