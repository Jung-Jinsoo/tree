var autocomplete_option = {
	matchContains : true,
	max : 30,
	mustMatch : true,
	multiple : false,
	scrollHeight : 220,
	width : 310
};
var cityCheck = 'false';
var regionsCheck = 'false';
var country_code = '';
$(function() {
	$("#base_targeting").validationEngine('attach', {
		onValidationComplete : function(form, status) {
			
			if($(".addLiGeo").size() == 0){
				$('html, body').animate({scrollTop: 0}, 500);
				$("#locations").validationEngine('showPrompt', '* This field is required');
				return false;
			}
			
			if (status) {
				getSubmitValue('locations');
				getSubmitValue('interests');
				getSubmitValue('locales');
				getSubmitValue('education_schools');
				getSubmitValue('education_majors');
				getSubmitValue('work_employers');
				getSubmitValue('connections');
				getSubmitValue('excluded_connections');
				getSubmitValue('friends_of_connections');
				
				// location2 추가 -> createAds 타겟추가 시
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

				locationgetSubmitValue('locations');
				
				$('input[id=checkboxCategorie]:checkbox').each(function(k, y) {
					var checkboxChecked = $(this).prop('checked');
					if (checkboxChecked == true) {
						var tempValue = $(this).val().split("|");
						var tempCategory = $(this).attr("categories_name");
						
						$('#'+tempCategory).val($('#'+tempCategory).val() + tempValue[1] + ",");
						$('#'+tempCategory+'_key').val($('#'+tempCategory+'_key').val() + tempValue[0] + ",");
						
						$('#user_adclusters').val($('#user_adclusters').val() + tempValue[1] + ",");
						$('#user_adclusters_id').val($('#user_adclusters_id').val() + tempValue[0] + ",");
					}
				});

				
				var locationInfo = JSON.stringify(jsonLocationObj);
				$('#locations_info').val(locationInfo);

				if ($("#targetAdd").val() == '1') { // adcreate 타겟추가
					document.getElementById('base_targeting').action = "/target/subdivisionTarget.htm?targetAdd=1";
					document.getElementById('base_targeting').submit();
				}

				if ($("#targetAdd").val() == '2') {
					var num = $("input[name=name]:last",parent.document).attr("id").split("adName");
				     num = eval(num[1])+1;
				  // adform 타겟 추가
					
					var relationship = "";
					$('input[name=relationship_statuses]:checkbox').each(function() {
						if (!$('#relationship_statuses0').is(':checked')) {
							if ($(this).is(':checked')) {
								relationship += $(this).val() + ",";
							}
						}
					});
					relationship = relationship.substring(0, relationship.length - 1);

					var customaudiences_val = "";
					var customaudiences_id = "";
					$('input[name="customaudiences"]:checkbox').each(function() {
						if ($(this).is(':checked')) {
							customaudiences_val += $("#customaudiencesname_" + $(this).val()).text() + ",";
							customaudiences_id += $(this).val() + ",";
						}
					});
					customaudiences_val = customaudiences_val.substring(0, customaudiences_val.length - 1);
					customaudiences_id = customaudiences_id.substring(0, customaudiences_id.length - 1);

					var excludedcustom_val = "";
					var excludedcustom_id = "";
					$('input[name="excludedcustom"]:checkbox').each(function() {
						if ($(this).is(':checked')) {
							excludedcustom_val += $("#excludedcustomname_" + $(this).val()).text() + ",";
							excludedcustom_id += $(this).val() + ",";
						}
					});

					excludedcustom_val = excludedcustom_val.substring(0, excludedcustom_val.length - 1);
					excludedcustom_id = excludedcustom_id.substring(0, excludedcustom_id.length - 1);
					/*
					 * $('#user_adclusters').val($('#user_adclusters').val().substr(0,
					 * $('#user_adclusters').val().length-1));
					 * $('#user_adclusters_id').val($('#user_adclusters_id').val().substr(0,
					 * $('#user_adclusters_id').val().length-1));
					 */
					count = $("[id^='targetGroup']:last",parent.document).attr("id").split("targetGroup");
					count = eval(count[1])+1;
					
					var html = "<tr class='targetGroup" + count + "' id='targetGroup" + count + "'>";
					html += "<th scope='row' class='first'>";
					html += "<div class='target-group-info-wrap'>";
					if ($('#genders').val() == "1") {
						html += "<div id='age_type" + count + "' class='background-wrap  age_type2'>";
					} else if ($('#genders').val() == "2") {
						html += "<div id='age_type" + count + "' class='background-wrap'>";
					} else {
						html += "<div id='age_type" + count + "' class='background-wrap age_type1'>";
					}
					html += "<div class='btn-wrap'>";
					html += "<button type='button' class='btn-modify2' name='targetGroupModify' value='" + count + "'>수정하기</button>";
					html += "<button type='button' class='btn-remove' name='targetGroupDelete' value='" + count + "'>삭제하기</button>";
					html += "<button type='button' class='btn-magnifier' name='targetview' value='" + count + "'>자세히보기</button>	";																												
					html += "<div style='display: none;' id='alert_budget_daily' class='bubble-target-detail-view'>";
					html += "<span class='icon_arrow'></span>";
					html += "</div>";
					html += "</div>";
					html += "</div>";
					html += "<div class='detail-info'>";
					html += "<ul>";
					html += "<li>";
					html += "<span class='adsetname" + count + "'>" + $("#campaign_name", parent.document).val() + "_" + count + "</span>";
					html += "<button type='button' class='btn-modify' name='adSetNameModify' value='" + count + "'>Modify</button>";
																					
					html += "<div id='adSetNameModify" + count + "' style='display: none;' class='adSetNameModify'>";
					html += "<div class='wrap_modifided'>";
					html += "<div class='modifided'>";
					html += "<label for='adSetName" + count + "'>Name</label><input type='text' name='adsetname' class='inp_modified' id='adSetName" + count + "' value='" + $('#campaign_name', parent.document).val() + "_" + count + "' />";
					html += "</div>";
					html += "<div class='btn_box'>";
					html += "<button type='button' class='btn_checks' name='adSetNameClose' value='" + count + "'>Save</button>";
					html += "</div>";
					html += "</div>";
					html += "<span class='icon_arrow'></span>";
					html += "</div>";
					html += "</li>";
					
					html += "<li>Budget : ";											
					if($('#daily_budget', parent.document).val()  >0){
						html += "<span class='numbers budgetspantype'> (Daily)</span>";
						html += "<br/>";
						html += "<span class='budget-arrow'>└─ </span><span class='numbers budgetspan budget"+count+"'>"+$('#daily_budget', parent.document).val()+"</span><button type='button' class='btn-modify' name='adSetBudgetModify' value='"+count+"'>modify</button>";
					}else if($('#lifetime_budget', parent.document).val()  >0){
						html += "<span class='numbers budgetspantype'> (Lifetime)</span>";
						html += "<br/>";
						html += "<span class='budget-arrow'>└─ </span><span class='numbers budgetspan budget"+count+"'>"+$('#lifetime_budget', parent.document).val()+"</span><button type='button' class='btn-modify' name='adSetBudgetModify' value='"+count+"'>modify</button>";
					}
																															
					html += "<div id='adSetBudgetModify"+count+"' style='display: none;' class='adSetBudgetModify'>";
					html += "<div class='wrap_modifided'>";
					html += "<div class='modifided'>";
					html += "<label for='adSetBudget"+count+"'>Budget</label>";
					html += "<input type='text' class='inp_modified validate[custom[onlyNumberSp]]' name='budget' id='adSetBudget"+count+"' />";
					html += "</div>";
					html += "<div class='btn_box'>";
					html += "<button type='button' class='btn_checks' name='adSetBudgetClose' value='"+count+"'>Save</button>";
					html += "</div>";
					html += "</div>";
					html += "<span class='icon_arrow'></span>";	
					html += "</div>";
					html += "</li>";
					
					html += "<li class='location' id='countriesspan" + count + "'>"+ $('#result_locations_value').val() + "</li>";
					age = "ALL";
					html += "<li id='agespan" + count + "'> age : ";
					if ($('#age_min').val() != "" && $('#age_max').val() != "") {
						html += $('#age_min').val() + " ~ " + $('#age_max').val();
					} else if ($('#age_min').val() == "" && $('#age_max').val() != "") {
						html += "~" + $('#age_max').val();
					} else if ($('#age_min').val() != "" && $('#age_max').val() == "") {
						html += $('#age_min').val() + " ~ ";
					}
					html += "</li>";
					
					if ($('#genders').val() == "1") {
						html += "<li id='gendersspan" + count + "'>gender : Men</li>";
					} else if ($('#genders').val() == "2") {
						html += "<li id='gendersspan" + count + "'>gender : Women</li>";
					} else {
						html += "<li id='gendersspan" + count + "'>gender : ALL</li>";
					}
					html += "</li>";

					html +="<li>";
					html += "reach : <span class='nenbers' id='nenberss'></span><br/>";
					html += "<input type='hidden' name='interests' id='interests" + count + "' value='" + $('#interests').val() + "'>";
					html += "<input type='hidden' name='interests_key' id='interests_key" + count + "' value='" + $('#result_interests_key').val() + "'>";
					html += "<input type='hidden' name='user_adclusters_id' id='user_adclusters_id" + count + "' value='" + $('#user_adclusters_id').val() + "'>";
					html += "<input type='hidden' name='user_adclusters' id='user_adclusters" + count + "' value='" + $('#user_adclusters').val() + "'>";
					html += "<input type='hidden' name='excluded_connections' id='excluded_connections" + count + "' value='" + $('#result_excluded_connections_value').val() + "'>";
					html += "<input type='hidden' name='connections_key' id='connections_key" + count + "' value='" + $('#result_connections_key').val() + "'>";
					html += "<input type='hidden' name='connections' id='connections" + count + "' value='" + $('#result_connections_value').val() + "'>";
					html += "<input type='hidden' name='excluded_connections_key' id='excluded_connections_key" + count + "' value='" + $('#result_excluded_connections_key').val() + "'>";
					html += "<input type='hidden' name='friends_of_connections' id='friends_of_connections" + count + "' value='" + $('#result_friends_of_connections_value').val() + "'>";
					html += "<input type='hidden' name='friends_of_connections_key' id='friends_of_connections_key" + count + "' value='" + $('#result_friends_of_connections_key').val() + "'>";
					html += "<input type='hidden' name='locales' id='locales" + count + "' value='" + $('#result_locales_value').val() + "'>";
					html += "<input type='hidden' name='locales_key' id='locales_key" + count + "' value='" + $('#result_locales_key').val() + "'>";
					html += "<input type='hidden' name='education_schools' id='education_schools" + count + "' value='" + $('#result_education_schools_value').val() + "'>";
					html += "<input type='hidden' name='education_schools_key' id='education_schools_key" + count + "' value='" + $('#result_education_schools_key').val() + "'>";
					html += "<input type='hidden' name='education_majors' id='education_majors" + count + "' value='" + $('#result_education_majors_value').val() + "'>";
					html += "<input type='hidden' name='education_majors_key' id='education_majors_key" + count + "' value='" + $('#result_education_majors_key').val() + "'>";
					html += "<input type='hidden' name='work_employers' id='work_employers" + count + "' value='" + $('#result_work_employers_value').val() + "'>";
					html += "<input type='hidden' name='work_employers_key' id='work_employers_key" + count + "' value='" + $('#result_work_employers_key').val() + "'>";
					html += "<input type='hidden' name='relationship_statuses' id='relationship_statuses" + count + "' value='" + relationship + "'>";
					html += "<input type='hidden' name='age_min' id='age_min" + count + "' value='" + $('#age_min').val() + "'>";
					html += "<input type='hidden' name='age_max' id='age_max" + count + "' value='" + $('#age_max').val() + "'>";
					html += "<input type='hidden' name='genders' id='genders" + count + "' value='" + $('#genders').val() + "'>";
					html += "<input type='hidden' name='education_statuses' id='education_statuses" + count + "' value='" + $('#education_statuses').val() + "'>";
					html += "<input type='hidden' name='college_years_start' id='college_years_start" + count + "' value='" + $('#college_years_start').val() + "'>";
					html += "<input type='hidden' name='college_years_end' id='college_years_end" + count + "' value='" + $('#college_years_end').val() + "'>";
					html += "<input type='hidden' name='user_event' id='user_event" + count + "' value='" + $('#result_user_event').val() + "'>";
					html += "<input type='hidden' name='customaudiences' id='customaudiences" + count + "' value='" + customaudiences_id + "'>";
					html += "<input type='hidden' name='customaudiencesname' id='customaudiencesname" + count + "' value='" + customaudiences_val + "'>";
					html += "<input type='hidden' name='excludedcustom' id='excludedcustom" + count + "' value='" + excludedcustom_id + "'>";
					html += "<input type='hidden' name='excludedcustomname' id='excludedcustomname" + count + "' value='" + excludedcustom_val + "'>";
					html += "<input type='hidden' name='user_os' id='user_os" + count + "' value='" + $('input[name=user_os]', parent.document).val() + "'>";
					html += "<input type='hidden' name='wireless_carrier' id='wireless_carrier" + count + "' value='" + $('input[name=wireless_carrier]', parent.document).val() + "'>";
					html += "<input type='hidden' name='user_device' id='user_device" + count + "' value='" + $('input[name=user_device]', parent.document).val() + "'>";
					html += "<input type='hidden' name='locations' id='locations" + count + "' value='" + $('#result_locations_value').val() + "'>";
					html += "<input type='hidden' name='locations_info' id='locations_info" + count + "' value='" + $('#locations_info').val() + "'>";
					html += "<input type='hidden' name='exclude_key' id='exclude_key" + count + "' value='" + $('#exclude_key').val() + "'>";
					html += "<input type='hidden' name='exclude_type' id='exclude_type" + count + "' value='" + $('#exclude_type').val() + "'>";
					html += "<input type='hidden' name='cities_key' id='cities_key" + count + "' value='" + $('#cities_key').val() + "'>";
					html += "<input type='hidden' name='cities' id='cities" + count + "' value='" + $('#cities').val() + "'>";
					html += "<input type='hidden' name='regions' id='regions" + count + "' value='" + $('#regions').val() + "'>";
					html += "<input type='hidden' name='regions_key' id='regions_key" + count + "' value='" + $('#regions_key').val() + "'>";
					html += "<input type='hidden' name='zips' id='zips" + count + "' value='" + $('#zips').val() + "'>";
					html += "<input type='hidden' name='countries_key' id='countries_key" + count + "' value='" + $('#countries_key').val()  + "'>";
					html += "<input type='hidden' name='countries_value' id='countries_value" + count + "' value='" + $('#result_locations_value').val() + "'>";
					html += "<input type='hidden' name='countries_city' id='countries_city" + count + "' value='" +  $('#cities_key').val() + "'>";
					html += "<input type='hidden' name='countries_regions' id='countries_regions" + count + "' value='" + $('#regions_key').val()  + "'>";
					
					html += "<input type='hidden' name='life_events' id='life_events" + count + "' value='" +  $('#life_events').val() + "'>";
					html += "<input type='hidden' name='life_events_key' id='life_events_key" + count + "' value='" + $('#life_events_key').val()  + "'>";
					html += "<input type='hidden' name='politics' id='politics" + count + "' value='" +  $('#politics').val() + "'>";
					html += "<input type='hidden' name='politics_key' id='politics_key" + count + "' value='" + $('#politics_key').val()  + "'>";
					html += "<input type='hidden' name='industries' id='industries" + count + "' value='" +  $('#industries').val() + "'>";
					html += "<input type='hidden' name='industries_key' id='industries_key" + count + "' value='" + $('#industries_key').val()  + "'>";
					html += "<input type='hidden' name='ethnic_affinity' id='ethnic_affinity" + count + "' value='" +  $('#ethnic_affinity').val() + "'>";
					html += "<input type='hidden' name='ethnic_affinity_key' id='ethnic_affinity_key" + count + "' value='" + $('#ethnic_affinity_key').val()  + "'>";
					html += "<input type='hidden' name='generation' id='generation" + count + "' value='" +  $('#generation').val() + "'>";
					html += "<input type='hidden' name='generation_key' id='generation_key" + count + "' value='" + $('#generation_key').val()  + "'>";
					html += "<input type='hidden' name='family_statuses' id='family_statuses" + count + "' value='" +  $('#family_statuses').val() + "'>";
					html += "<input type='hidden' name='family_statuses_key' id='family_statuses_key" + count + "' value='" + $('#family_statuses_key').val()  + "'>";
					html += "<input type='hidden' name='behaviors' id='behaviors" + count + "' value='" +  $('#behaviors').val() + "'>";
					html += "<input type='hidden' name='behaviors_key' id='behaviors_key" + count + "' value='" + $('#behaviors_key').val()  + "'>";
					
					html += "</li></ul></div></div></th>";

					$("[id^='page_types']", parent.document).each(function(index) {
						number = $(this).attr("id").split("page_types");
						number = eval(number[1]);
						
						html += "<td class='adgroup_" + number + " targetgroup_" + count + "'>";		
						html += "<div class='info-data-wrap tds_" + count + "_" + number+ "'>";							
						html += "<ul id='campaignListUl' class='list_campaign'>";
						html += "<li>";
						html += "<span class='adName" +num + "'>" + $('#campaign_name', parent.document).val() + "_" +num + "</span>";
						html += "<button type='button' class='btn-modify' name='adNameModify' value='" +num + "'>modify</button>";																				
									
						html += "<div id='adNameModify" +num + "' style='display: none;' class='adNameModify'>";
						html += "<div class='wrap_modifided'>";
						html += "<div class='modifided'>";
						html += "<label for='adNamet" +num + "'>Name</label>";
						html += "<input type='text' class='inp_modified' name='name' id='adName" +num + "' value='"+$('#campaign_name', parent.document).val() +"_"+num+"'  style='width:250px;'/>";
						html += "<input type='hidden' id='adGroupStatus" +num + "' name='adGroupStatus' value='Y' />";
						html += "</div>";
						html += "<div class='btn_box'>";
						html += "<button type='button' class='btn_checks' name='adNameClose' value='" +num + "'>Save</button>";
						html += "</div>";
						html += "</div>";
						html += "<span class='icon_arrow'></span>";		
						html += "</div>";
						html += "</li>";
						
						html += "<li>";
						html += "<span>Bid : </span>";	 
						html += "<span id='adBidView"+num+"'>";
						if($('#bid_type',parent.document).val() != 'ABSOLUTE_OCPM' && $('#bid_type',parent.document).val() != '6'){
							html += $('#clicks',parent.document).val()+"( "+$('#bid_type',parent.document).val()+")";
						}else{
							html += "oCPM";
						}
						html += "</span>";

						html += "<button type='button' class='btn-modify' name='adBidModify' value='"+num+"'>modify</button>";									
						html += "<div id='adBidModify"+num+"' style='display: none;'>";
						html += "<div class='wrap_modifided bid'>";
						html += "<div class='modifided'>";
						html += "<span id='bidtext"+num+"' style='float:left; line-height:29px;'>Bid</span>"; 
						
						if($('#bid_type',parent.document).val() != 'ABSOLUTE_OCPM' && $('#bid_type',parent.document).val() != '6'){
							html += "<input type='text' name='bid1' id='adBid1"+num+"' value='"+$('#clicks',parent.document).val()+"'  style='display: block;'/>";
							html += "<input type='text' name='bid2' id='adBid2"+num+"' value='"+$('#reach',parent.document).val()+"' style='display: none;' />";
							html += "<input type='text' name='bid3' id='adBid3"+num+"' value='"+$('#impressions',parent.document).val()+"' style='display: none;' />";
							html += "<input type='text' name='bid4' id='adBid4"+num+"' value='"+$('#actions',parent.document).val()+"' style='display: none;' />";
						}else{
							html += "<input type='text' name='bid1' id='adBid1"+num+"' value='"+$('#clicks',parent.document).val()+"'  style='display: block;'/>";
							html += "<input type='text' name='bid2' id='adBid2"+num+"' value='"+$('#reach',parent.document).val()+"' style='display: block;'/>";
							html += "<input type='text' name='bid3' id='adBid3"+num+"' value='"+$('#impressions',parent.document).val()+"' style='display: block;' />";
							html += "<input type='text' name='bid4' id='adBid4"+num+"' value='"+$('#actions',parent.document).val()+"' style='display: block;' />";
						}
						html += "<input type='hidden' name='bid_type' id='adBidType"+num+"' value='"+$('#bid_type',parent.document).val()+"' />";
						if($('#bid_type',parent.document).val() != 'ABSOLUTE_OCPM' && $('#bid_type',parent.document).val() != '6'){
							html += "<div class='ocpm-radio-wrap ocpmdiv"+num+"' style='display: none;'>";
						}else{
							html += "<div class='ocpm-radio-wrap ocpmdiv"+num+"' style='display: block;'>";
						}
						html += "<p>"; 
						if($('#bid_type',parent.document).val() == 'ABSOLUTE_OCPM' ){
							html += "<input type='radio' id='default_manual"+num+"' name='manual_radio"+num+"' value='default' count='"+num+"'><label for='default_manual"+num+"'>Use default bids (recommended)</label>";
							html += "</p>";
							html += "<p>";
							html += "<input type='radio' id='set_manual"+num+"' name='manual_radio"+num+"' checked='checked' value='setup' count='"+num+"'><label for='set_manual"+num+"'>Manually set up bids</label>";
						}else{
							html += "<input type='radio' id='default_manual"+num+"' name='manual_radio"+num+"' checked='checked' value='default' count='"+num+"'><label for='default_manual"+num+"'>Use default bids (recommended)</label>";
							html += "</p>";
							html += "<p>";
							html += "<input type='radio' id='set_manual"+num+"' name='manual_radio"+num+"' value='setup' count='"+num+"'><label for='set_manual"+num+"'>Manually set up bids</label>";
						}
						html += "</p>";
						html += "</div>";
						html += "</div>";
						html += "<div class='btn_bid_list'>";

						if($("#adtype",parent.document).val() == '12' || ($("#adtype",parent.document).val() == '31' && $('#bid_type',parent.document).val() == 'CPA') || $("#adtype",parent.document).val() == '21' ){
							if($('#bid_type',parent.document).val() == 'CPA'){
								html += "<button type='button' class='cpa adbidtype active' value='CPA' count='"+num+"'><span class='screen_out'>CPA</span></button>";
							}else{
								html += "<button type='button' class='cpa adbidtype' value='CPA' count='"+num+"'><span class='screen_out'>CPA</span></button>";
							}
						}
						if($('#bid_type',parent.document).val() == 'CPC'){
							html += "<button type='button' class='cpc adbidtype active' value='CPC' count='"+num+"'><span class='screen_out'>CPC</span></button>";
						}else{
							html += "<button type='button' class='cpc adbidtype' value='CPC' count='"+num+"'><span class='screen_out'>CPC</span></button>";
						}
						if($("#adtype",parent.document).val() != '41' && $("#adtype",parent.document).val() != '42'){
							if($('#bid_type',parent.document).val() == 'CPM'){
								html += "<button type='button' class='cpm adbidtype active' value='CPM' count='"+num+"'><span class='screen_out'>CPM</span></button>";
							}else{
								html += "<button type='button' class='cpm adbidtype' value='CPM' count='"+num+"'><span class='screen_out'>CPM</span></button>";
							}
						}
						if($("#adtype",parent.document).val() != '12'){
							if($('#bid_type',parent.document).val() == 'ABSOLUTE_OCPM' || $('#bid_type',parent.document).val() == '6'){
								html += "<button type='button' class='ocpm adbidtype active' value='ABSOLUTE_OCPM' count='"+num+"'><span class='screen_out'>OCPM</span></button>";		
							}else{
								html += "<button type='button' class='ocpm adbidtype' value='ABSOLUTE_OCPM' count='"+num+"'><span class='screen_out'>OCPM</span></button>";		
							}
						}
						html += "</div>";
						html += "<div class='btn_box'>";
						html += "<button type='button' class='btn_checks' name='adBidClose' value='"+num+"'>Save</button>";
						html += "</div>";
						html += "</div>";
						html += "</div>";
						html += "</li>";
						
						html += "<li>";
						html += "Recommended bid ";
						html += "</br>";

						if($('#bid_type',parent.document).val() != "CPC"){
							html += "<span class='recommendCPC recommendCPC"+num+"' style='display: none;'></span>";
						}else{
							html += "<span class='recommendCPC recommendCPC"+num+"'></span>";
						}
						if($('#bid_type',parent.document).val() != "CPM"){
							html += "<span class='recommendCPM recommendCPM"+num+"' style='display: none;'></span>";
						}else{
							html += "<span class='recommendCPM recommendCPM"+num+"'></span>";
						}
						if($('#bid_type',parent.document).val() != "CPA"){
							html += "<span class='recommendCPA recommendCPA"+num+"' style='display: none;'></span>";
						}else{
							html += "<span class='recommendCPA recommendCPA"+num+"'></span>";
						}
						html += "<span id='recommendbidtype"+num+"'>";
						
						if($('#bid_type',parent.document).val() != 'ABSOLUTE_OCPM' && $('#bid_type',parent.document).val() != '6'){
							html += "( "+$('#bid_type',parent.document).val()+")";
						}else{
							html += "oCPM";
						}
						html += "</span>";
						html += "</li>";
						html += "</ul>"; 									
						html += "<button type='button' class='btn-pause' count='" +num + "'>Pause Ads</button>";								
						html += "</div>";
						html += "</td>";
																
						num++;

					});
					html += "</tr>";
					
					$('.addtargetGroup', parent.document).before(html);
					$("[id^='targetGroup']", parent.document).each(function(index) {
						targetcount = $(this).attr("id").split("targetGroup");
						targetcount = eval(targetcount[1]);
						if (index % 2 == 1) {
							$("[id^='adGroups']", parent.document).each(function(index) {
								adcount = $(this).attr("id").split("adGroups");
								adcount = eval(adcount[1]);
								if (index % 2 == 1) {
									$(".tds_" + targetcount + "_" + adcount, parent.document).removeClass("bg-white");
								} else {
									$(".tds_" + targetcount + "_" + adcount, parent.document).addClass("bg-white");
								}
							});
						} else {
							$("[id^='adGroups']", parent.document).each(function(index) {
								adcount = $(this).attr("id").split("adGroups");
								adcount = eval(adcount[1]);
								if (index % 2 == 1) {
									$(".tds_" + targetcount + "_" + adcount, parent.document).addClass("bg-white");
								} else {
									$(".tds_" + targetcount + "_" + adcount, parent.document).removeClass("bg-white");
								}
							});
						}
					});
					parent.resetAdsBudget();
					parent.recommendBidtargetAdd();
					parent.getTargetReachForLastestTargetingGroup();
					parent.recommendBidtargetAdd();
					removeElement('ifrm_createTargetGroup');

					document.getElementById('base_targeting').action = "/target/subdivisionTarget.htm?targetAdd=2";
					document.getElementById('base_targeting').submit();
				}	

				var customaudiences_val = "";
				var customaudiences_id = "";
				$('input[name="customaudiences"]:checkbox').each(function() {
					if ($(this).is(':checked')) {
						customaudiences_val += $("#customaudiencesname_" + $(this).val()).text() + ",";
						customaudiences_id += $(this).val() + ",";
					}
				});
				customaudiences_val = customaudiences_val.substring(0, customaudiences_val.length - 1); // 커스텀,
																										// 익스클루드
																										// 커스텀
																										// 안들어갔음..
																										// //릴레이션쉽
																										// 체크
																										// 다시하기all
																										// 일때
				customaudiences_id = customaudiences_id.substring(0, customaudiences_id.length - 1);
				$('#result_custom_audiences').val(customaudiences_val);
				$('#result_custom_audiences_key').val(customaudiences_id);

				var excludedcustom_val = "";
				var excludedcustom_id = "";
				$('input[name="excludedcustom"]:checkbox').each(function() {
					if ($(this).is(':checked')) {
						excludedcustom_val += $("#excludedcustomname_" + $(this).val()).text() + ",";
						excludedcustom_id += $(this).val() + ",";
					}
				});
				excludedcustom_val = excludedcustom_val.substring(0, excludedcustom_val.length - 1);
				excludedcustom_id = excludedcustom_id.substring(0, excludedcustom_id.length - 1);
				$('#result_excluded_custom_audiences').val(excludedcustom_val);
				$('#result_excluded_custom_audiences_key').val(excludedcustom_id);

				$('#user_adclusters').val($('#user_adclusters').val().substr(0, $('#user_adclusters').val().length - 1));
				$('#user_adclusters_id').val($('#user_adclusters_id').val().substr(0, $('#user_adclusters_id').val().length - 1));

				var total = $("[class^='target_item']", parent.document).length;
				$('#target_add', parent.document).remove();

				var user_event = '';
				if ($('#user_event').is(':checked'))
					user_event = 1;

				$.ajax({
					url : "/target/proc.htm",
					type : "POST",
					data : $("#base_targeting").serialize(),
					dataType : "json",
					beforeSend : function() {
						createAjaxLoadingThis();
				},
					success : function(data) {
						removeAjaxLoading();
						removeAjaxLoadingParent();

						if (data.mode == 'create_targeting_group') {
							var targetingGroupSeq = data.seq;
							var adsetBudget = data.adsetBudget;
							var adsetName = data.adsetName;
							//console.log("targetingGroupSeq:" + targetingGroupSeq + ", adsetBudget:" + adsetBudget + ", adsetName:" + adsetName);
							$.ajax({
								url : "/managead/ad_create_targetGroupInsertProc.htm",
								type : "POST",
								data : {
									campaign_group_id : $("#campaign_group_id").val(),
									targeting_group_seq : targetingGroupSeq,
									budget : adsetBudget,
									adsetname : adsetName
								},
								dataType : "json",
								beforeSend : function() {
									createAjaxLoadingThis();
								},
								success : function(data) {
									removeAjaxLoading();
									removeAjaxLoadingParent();
									parent.document.location.reload();
									removeElement('ifrm_createTargetGroup');
								}
							});
						} else if (data.mode == 'edit_targeting_group') {
							removeElement('ifrm_createTargetGroup');
						} else if (data.mode == 'edit_adgroup_targeting') {
							// $('title_indiviual').hide();
							parent.document.location.reload();
							// removeElement('ifrm_createTargetGroup');
						} else if (data.mode == 'edit_targeting_base' || data.mode == 'create_targeting_base') {
							parent.create_targeting_group.location.reload(true);
							removeElement('ifrm_createTargetGroup');
						}
					}
				});
			}
		}
	});

	$('select[name=education_statuses]').change(function() {
		var thisValue = $(this).val();
		switch (thisValue) {
		case "2":
			$('#diveducation_schools').css('display', 'block');
			$('#diveducation_majors').css('display', 'block');
			$('#divcollege_years').css('display', 'block');
			break;
		case "3":
			$('#diveducation_schools').css('display', 'block');
			$('#diveducation_majors').css('display', 'block');
			$('#divcollege_years').css('display', 'none');
			break;
		default:
			$('#diveducation_schools').css('display', 'none');
			$('#diveducation_majors').css('display', 'none');
			$('#divcollege_years').css('display', 'none');
			break;
		}
	});

	$('.closebtn').live("click", function() {
		var this_ele = $(this);
		this_ele.parent().remove();
		checkCountries();

		if (this_ele.attr('id') == "countries_closebtn") {
			if ($('#countries_closebtn').size() == 1) {
				$('span[id="cities_value"]').parent().remove();
				$('#zips').val('');
				$('#radioCountrie0').prop('checked', true);
			}
		}
	});

	$('input[name="radiocountrie"]:radio').click(function() {
		var thisValue = $(this).val();

		switch (thisValue) {
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
	if (_value.length > 0) {
		splitValue = _value.split(", ");
	}

	return splitValue;
}

function createAutocomplateLi(_ele, _data, _data_key) {
	var ele = "#" + _ele;
	var countries_city = "", countries_regions = "";

	if (_ele == "countries") {
		countries_city = "<span id='" + _ele + "_city' class='addSpanHidden'>" + cityCheck + "</span>";
		countries_regions = "<span id='" + _ele + "_regions' class='addSpanHidden'>" + regionsCheck + "</span>";
	}

	$(ele).parent().before('<li class=addLi><span id=' + _ele + '_value  class=addAutoComplateSpan>' + _data + '</span><span id=' + _ele + '_closebtn class=closebtn>x</span><span id=' + _ele + '_key class=addSpanHidden>' + _data_key + '</span>' + countries_city + countries_regions + '</li>');
	$(ele).val('');
}
function createAutocomplateLiCustom(_ele, _data, _data_key) {
	var ele = "#" + _ele;

	$(ele).parent().before('<li class=addLi id="customLi"><span id=' + _ele + '_value  class=addAutoComplateSpan>' + _data + '</span><span id=' + _ele + '_closebtn class=closebtn>x</span><span id=' + _ele + '_key class=addSpanHidden>' + _data_key + '</span></li>');
	$(ele).val('');
}

function getSubmitValue(_ele) { 
	var ele_val = _ele + "_value";
	var ele_key = _ele + "_key";
	var return_val = "";
	var return_key = "";

	$('span[id="' + ele_val + '"]').each(function() {
		// console.log(this.childNodes[0].nodeValue);
		return_val += this.childNodes[0].nodeValue + ",";
	});
	$('span[id="' + ele_key + '"]').each(function() {
		// console.log($(this).text());
		return_key += $(this).text() + ",";
	});

	return_val = return_val.substring(0, return_val.length - 1);
	return_key = return_key.substring(0, return_key.length - 1);

	$('#result_' + ele_val).val(return_val);
	$('#result_' + ele_key).val(return_key);
	//alert($('#result_interests_key').val());
	//alert($('#result_interests_value').val());
}

function locationgetSubmitValue(_ele) {
	var city_key = "";
	var regions_key = "";
	var countries_key = "";
	var zip_key = "";

	$('span[id="locations_city_key"]').each(function() {
		city_key += $(this).text() + ",";
	});
	$('span[id="locations_region_key"]').each(function() {
		regions_key += $(this).text() + ",";
	});
	$('span[id="locations_country_key"]').each(function() {
		countries_key += $(this).text() + ",";
	});
	$('span[id="locations_zip_key"]').each(function() {
		zip_key += $(this).text() + ",";
	});

	// return_type = return_type.substring(0, return_type.length-1);
	city_key = city_key.substring(0, city_key.length - 1);
	countries_key = countries_key.substring(0, countries_key.length - 1);
	regions_key = regions_key.substring(0, regions_key.length - 1);
	zip_key = zip_key.substring(0, zip_key.length - 1);

	// $('#locations_type').val(return_type);
	$('#cities_key').val(city_key);
	$('#regions_key').val(regions_key);
	$('#countries_key').val(countries_key);
	$('#zips').val(zip_key);

	var exclude_type = "";
	var exclude_key = "";

	$('span[id="excludelocations_type"]').each(function() {
		exclude_type += this.childNodes[0].nodeValue + ",";
	});
	$('span[id="excludelocations_key"]').each(function() {
		// console.log($(this).text());
		exclude_key += this.childNodes[0].nodeValue + ",";
	});
	exclude_type = exclude_type.substring(0, exclude_type.length - 1);
	exclude_key = exclude_key.substring(0, exclude_key.length - 1);
	$('#exclude_key').val(exclude_key);
	$('#exclude_type').val(exclude_type);

}

function startCitiesAutoComplate() {
	country_code = $('span[id="countries_key"]').text();
}

function checkCountries() {
	if ($('span[id="countries_value"]').size() == 1) {
		$('#divCountrieChoice').show();
		$('#liCountrie0').show();
		$('#liCountrie1').hide();
		$('#liCountrie2').hide();
		$('#liCountrie3').hide();

		if ($('span[id="countries_regions"]').text() == "true")
			$('#liCountrie1').show();
		if ($('span[id="countries_city"]').text() == "true")
			$('#liCountrie2').show();
		if ($('span[id="countries_key"]').text() == "US")
			$('#liCountrie3').show();

	} else {
		$('#divCountrieChoice').hide();
		$('#divRegions').hide();
		$('#divCities').hide();
		$('#divZips').hide();

		$('#divRegions .addLi').remove();
		$('#divCities .addLi').remove();
		$('#zips').val('');
	}
}
