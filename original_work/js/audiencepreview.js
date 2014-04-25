function gfnAudiencePreview(_path) {
	$('#targetPreview').empty();					
	$.ajax({
		url : _path + "/target/getTargetInfo.htm",
		type : "POST",
		data : {
			id : $("#sb_adaccount").val(),
			adminIndex : $("#sb_admin").val(),
			targetid: $("#target").val()
		},
		dataType : "json",
		beforeSend : function() {
			createAjaxLoading();
		},
		success : function(data) {
			var arrTargetContext = new Array();
			arrTargetContext['countries'] 				= "who live in ?";
			arrTargetContext['regions'] 				= "who live in ?";
			arrTargetContext['cities'] 					= "who live in ?";
			arrTargetContext['zips'] 					= "who live in zip code ?";
			arrTargetContext['locales'] 				= "who speak ?";
			arrTargetContext['keywords'] 				= "who like ?";
			arrTargetContext['user_adclusters'] 		= "who are in the broad category ?";
			arrTargetContext['genders'] 				= "who are ?";
			
			arrTargetContext['age_min'] 				= "age ? ";
			arrTargetContext['age_max'] 				= "between the ages of ? and ? inclusive ";
			
			arrTargetContext['user_event'] 				= "whose birthday is today";
			arrTargetContext['connections'] 			= "who are connected to ?";
			arrTargetContext['excluded_connections'] 	= "who are not already connected to ?";
			arrTargetContext['friends_of_connections'] 	= "whose friends are already connected to ?";
			arrTargetContext['college_networks'] 		= "who are at ?";
			arrTargetContext['work_networks'] 			= "who work at ?";
			arrTargetContext['education_statuses'] 		= "who are in ?";
			
			arrTargetContext['college_years_start'] 	= "who are in the classes of ?";
			arrTargetContext['college_years_end'] 		= "who are in the classes of ? or ? ";
			
			arrTargetContext['college_majors'] 			= "majoring in ?";							
			arrTargetContext['relationship_statuses'] 	= "who are ?";
			
			var arrRelationship = new Array();
			arrRelationship['1'] = "Single";
			arrRelationship['2'] = "In a Relationship";
			arrRelationship['3'] = "Married";
			arrRelationship['4'] = "Engaged";
			arrRelationship['6'] = "Not specified";							
			
			var age_max = "older";
			var age_min = "0";
			var college_years_start = "0";
			var college_years_end = "0";
			$.each(data, function(key, value) {
				//key 별로 특이사항 체크 하여 처리
				switch(key) {			
				case "relationship_statuses":
					if(value) {
						var valueRelation = "";
						var splitRelationship = value.split(",");
						if(splitRelationship.length > 0) {
							if(splitRelationship[0] == "0") {
								valueRelation = "";
							}else {
								for(i = 0; i < splitRelationship.length; i++) {
									if(splitRelationship[i] && splitRelationship[i] > 0)
										valueRelation += arrRelationship[splitRelationship[i]] + ",";
								}
								valueRelation = valueRelation.substr(0, valueRelation.length-1);
							}
						}else {
							valueRelation = value;
						} 
						value = valueRelation;
					}
					break;
				case "age_max":
					if(value) {
						age_max = value;
						$('#target_age_min').text('age '+age_min+' to '+age_max);
					}
					break;
				case "age_min":
					if(value) {
						age_min = value;
						value = value + " to " + age_max;
					}
					break;
				case "college_years_start":
					if(value) {
						college_years_start = value;
					}
					break;
				case "college_years_end":
					if(value && college_years_start != value) {
						college_years_end = value;
						$('#target_college_years_start').text('who are in the classes of '+college_years_start+' or '+college_years_end);										
					}
					break;
				case "genders":
					if(value) {
						if(value == "1") {
							value = "male";
						}else {
							value = "female";
						}
					}
					break;
				case "education_statuses":
					if(value) {
						switch(value) {
						case "1":
							value = "In High School";
							break;
						case "2":
							value = "College Grad";
							break;
						case "3":
							value = "In College";
							break;
						}
					}
				}
				
				if(key == "age_max" ||  key == "college_years_end")
					;
				else
					lfnTargetContext(key, value);
			}); 
			
			function lfnTargetContext(key, value) {
				var context 	= arrTargetContext[key];
				if(value != "" && context) {									
					$('#targetPreview').append("<li id='target_"+key+"'>"+context.replace("?", value) + "</li>");
				}
				
			}
			
		},
		complete: function () {
			removeAjaxLoading();
		},
		error: function(x, e) {
			console.log(x + e);
		}
	});
}