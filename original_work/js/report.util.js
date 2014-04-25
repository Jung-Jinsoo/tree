//IE에서 console.log에러 방지 
var console = window.console || {
	log : function() {
	}
};

var totalCampaignGroupCount;
var rawCampaignGroups;
var selectedCampaignGroup = new Array();
var rawAddCampaigngroupButton = '<button id="btn_add_campaigngroup" style="margin-left:12px; display: none;">&nbsp;&nbsp;+&nbsp;&nbsp;</button>';

function initCampaignGroupUI() {
	selectedCampaignGroup.length = 0;

	$("#campaign").empty();
	$("#campaign").append("<option value=''>Select campaign</option>");

	var campaignGroupContainer = $("#campaign_groups_container");
	$(campaignGroupContainer).empty();
	$(campaignGroupContainer).append('<select name="campaign_groups" id="campaign_groups">'+rawCampaigngroups+'</select>');
	$(campaignGroupContainer).append(rawAddCampaigngroupButton);
	
	$("#campaign_groups").change(onCampaignGroupChange);
	$("#tr_ad_area").show(100);

	$("#btn_add_campaigngroup").click(addCampaignGroup);
}

// 그룹의 하위광고를 읽어와야 할 경우 true 그 외 false
function addCampaignGroupIfNull(campaignGroupId) {
	if (campaignGroupId != '') {
		$("#btn_add_campaigngroup").show(100);
	}
	return true;
}

function addCampaignGroup() {
	var crtCampaignGroup = $("#campaign_groups").val();
	var crtCampaignGroupName = $("#campaign_groups option:selected").text();

	if (selectedCampaignGroup.indexOf(crtCampaignGroup) == -1) {
		selectedCampaignGroup.push(crtCampaignGroup);
		$("#campaign_groups option[value='" + crtCampaignGroup + "']").remove();
		if (selectedCampaignGroup.length > 0 && $("#campaign").is(':visible')) {
			$("#tr_ad_area").hide(100);
			$("#campaign_groups option[value='']").remove();
		}

		$("<button name='campaignGroups' style='margin-right: 8px; padding-left: 4px; padding-right: 4px; height:30px;' campaign_group_id='" + crtCampaignGroup + "' onclick='return removeCampaignGroup(this);'>" + crtCampaignGroupName + "</button>").insertBefore("#campaign_groups");
	}

	if (selectedCampaignGroup.length == totalCampaignGroupCount) {
		$("#campaign_groups").hide(100);
		$("#btn_add_campaigngroup").hide(100);
	}
	$("#choosed_campaign_groups").val(selectedCampaignGroup);
	return false;
}

function removeCampaignGroup(component) {
	var campaignGroupId = $(component).attr('campaign_group_id');
	while (selectedCampaignGroup.indexOf(campaignGroupId) != -1) {
		selectedCampaignGroup.splice(selectedCampaignGroup.indexOf(campaignGroupId), 1);
	}
	$(component).detach();
	$('#campaign_groups').append('<option value="' + campaignGroupId + '">' + $(component).text() + '</option>');
	if (selectedCampaignGroup.length == 0) {
		initCampaignGroupUI();
	}
	if (!$("#campaign_groups").is(':visible')) {
		$("#campaign_groups").show(100);
		$("#btn_add_campaigngroup").show(100);
	}
	$("#choosed_campaign_groups").val(selectedCampaignGroup);
	return false;
}
