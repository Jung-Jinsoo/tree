//IE���� console.log���� ���� 
var console = window.console || {
	log : function() {
	}
};

Highcharts.setOptions({
	colors : [ '#9AD7DC', '#FEE684', '#B3AED6', '#F28E96', '#FCB393', '#D9BADA', '#C3DE99', '#9AC0E7', '#6AF9C4' ]
});

var summary_chart;
var conversion_chart;
var conversionGraph;

function drawPerformanceChart(spentData, clicksData, ctrData, impData, year, month, day, currency) {
	summary_chart = new Highcharts.Chart({
		chart : {
			renderTo : 'summary_chart_container',
			marginBottom : 120
		},
		tooltip: {
			formatter: function() {
				if('CTR' == this.series.name) {
					return '<b>'+ this.series.name +'</b>: '+ Highcharts.numberFormat(this.y, 2, '.') +' %';
				} if ('Cost' == this.series.name) {
					if (currency > 1) {
						return '<b>'+ this.series.name +'</b>: '+ Highcharts.numberFormat(this.y, 2, '.');
					} else {
						return '<b>'+ this.series.name +'</b>: '+ Highcharts.numberFormat(this.y, 0, '.');
					}
				} else {
					return '<b>'+ this.series.name +'</b>: '+ Highcharts.numberFormat(this.y, 0, '.');
				}
           	}
        },
		title : {
			text : null
		},
		xAxis : {
			type : 'datetime',
			minTickInterval : 24 * 3600 * 1000
		},
		yAxis : [ {
			title : {
				text : ''
			},
			labels : {
				style : {
					color : '#D9BADA'
				}
			}
		}, {
			opposite : true,
			title : {
				text : ''
			},
			labels : {
				style : {
					color : '#C3DC9B'
				}
			}
		}, {
			opposite : true,
			title : {
				text : ''
			},
			labels : {
				style : {
					color : '#FDBF84'
				}
			}
		}, {
			opposite : true,
			title : {
				text : ''
			},
			labels : {
				style : {
					color : '#a0a0a0'
				}
			}
		} ],
		plotOptions : {
			series : {
				pointStart : Date.UTC(year, month, day),
				pointInterval : 24 * 3600 * 1000 * 1
			},
			column : {
				borderWidth : 0,
				shadow : false
			}
		},
		series : [ {
			type : 'column',
			data : spentData,
			color : '#D9BADA',
			name : 'Cost'
		}, {
			type : 'line',
			lineWidth : 1,
			data : clicksData,
			color : '#FDBF84',
			yAxis : 2,
			name : 'Clicks',
			marker : {
				radius : 2
			},
			shadow : false
		}, {
			type : 'line',
			lineWidth : 1,
			data : ctrData,
			color : '#C3DC9B',
			yAxis : 1,
			name : 'CTR',
			marker : {
				radius : 2
			},
			shadow : false
		}, {
			type : 'line',
			lineWidth : 1,
			data : impData,
			color : '#a0a0a0',
			yAxis : 3,
			name : 'Impression',
			marker : {
				radius : 2
			},
			shadow : false
		} ],
		exporting : {
			enabled : false
		},
		legend : {
			align : 'center',
			verticalAlign : 'bottom',
			itemStyle : {
				paddingBottom : '4px'
			},
			margin : 30,
			borderRadius : 0,
			borderColor : '#D9D9D9',
			floating : true,
			y : -20
		},
		credits : {
			text : '',
			href : 'http://adwitt.com/'
		}
	});
}

function drawConversionChart(conversionData, conversionRateData, year, month, day, currency) {
	conversionGraph = "[";

	var i = 0;
	for (key in conversionData) {
		if (i > 0) {
			conversionGraph += ",{";
		} else {
			conversionGraph += "{";
		}
		conversionGraph += "name:'" + key + "'";
		conversionGraph += ",data:[" + conversionData[key] + "]";
		conversionGraph += "}";
		i++;
	}

	if (i > 0) {
		conversionGraph += ",";
	}
	conversionGraph += "{";
	conversionGraph += "type:'line',";
	conversionGraph += "lineWidth:2,";
	// conversionGraph += "color:'#98c415',";
	conversionGraph += "yAxis:1,";
	conversionGraph += "shadow:0,";
	conversionGraph += "marker:{radius:3},";
	conversionGraph += "name:'Conversion rate',";
	conversionGraph += "data:" + JSON.stringify(conversionRateData);
	conversionGraph += "}";
	conversionGraph += "]";

	conversion_chart = new Highcharts.Chart({
		chart : {
			renderTo : 'conversion_container',
			type : 'column',
			marginBottom : 120
		},
		tooltip: {
			formatter: function() {
				if('Conversion rate' == this.series.name) {
					return '<b>'+ this.series.name +'</b>: '+ Highcharts.numberFormat(this.y, 2, '.') +' %';
				} else {
					return '<b>'+ this.series.name +'</b>: '+ Highcharts.numberFormat(this.y, 0, '.');
				}
           	}
        },
		title : {
			text : null
		},
		xAxis : {
			type : 'datetime',
			minTickInterval : 24 * 3600 * 1000
		},
		yAxis : [ {
			min : 0,
			title : {
				text : ''
			}
		}, {
			min : 0,
			title : {
				text : ''
			}
		} ],
		plotOptions : {
			series : {
				pointStart : Date.UTC(year, month, day),
				pointInterval : 24 * 3600 * 1000 * 1
			},
			column : {
				borderWidth : 0,
				shadow : false,
				stacking : 'normal',
				dataLabels : {
					enabled : false
				}
			}
		},
		series : eval(conversionGraph),
		exporting : {
			enabled : false
		},
		legend : {
			align : 'center',
			verticalAlign : 'bottom',
			itemStyle : {
				paddingBottom : '4px'
			},
			margin : 30,
			borderRadius : 0,
			borderColor : '#D9D9D9',
			floating : true,
			y : -20
		},
		credits : {
			text : '',
			href : 'http://adwitt.com/'
		}
	});
}
//
// function drawChart(data, year, month, day, currency) {
// if (data != null) {
// var spentData = data.statsList[0];
// var clicksData = data.statsList[1];
// var ctrData = data.statsList[2];
// var impData = data.statsList[3];
// var conversionRateData = data.statsList[4];
//
// if(data.alertRemainingTime.length > 0) {
// parent.alertCampaignGroupDue(data.alertCampaignGroupId,
// data.alertRemainingTime)
// }
// // if($('#show_popup', top.document).val()=='1' || $('#show_popup',
// // top.document).val()==1) {
// // console.log("dashboard popupType : "+data[1].popupType);
// // parent.popupSuggest(data[1].popupType);
// // }
//
// $('#summary_impression').text(number_format(data.sum.impressions));
//
// if (data.sum.impressions > 0) {
// $('#summary_ctr').text(number_format((data.sum.clicks / data.sum.impressions)
// * 100, 2) + '%');
// }
// $('#summary_click').text(number_format(data.sum.clicks));
//
// if (currency > 1) {
// if (data.sum.impressions > 0) {
// $('#summary_cpm').text(number_format((data.sum.spent / (data.sum.impressions
// / 1000)) / currency, 2));
// }
// if (data.sum.clicks > 0) {
// $('#summary_cpc').text(number_format((data.sum.spent / data.sum.clicks) /
// currency, 2));
// }
// $('#summary_spent').text(number_format((data.sum.spent) / currency, 2));
// } else {
// if (data.sum.impressions > 0) {
// $('#summary_cpm').text(number_format((data.sum.spent / (data.sum.impressions
// / 1000)) / currency, 1));
// }
// if (data.sum.clicks > 0) {
// $('#summary_cpc').text(number_format((data.sum.spent / data.sum.clicks) /
// currency, 1));
// }
// $('#summary_spent').text(number_format((data.sum.spent) / currency, 0));
// }
//
// var conversion = 0;
// for (key in data.sum.actions) {
// conversion = conversion + data.sum.actions[key];
// }
// $('#conversion_conversion').text(number_format(conversion));
// if (currency > 1) { // ��� ��ȭ�� �� ó��
// if (conversion > 0) {
// $('#conversion_cpa').text(number_format((data.sum.spent / conversion) /
// currency, 2));
// }
// if (data.sum.actions['like'] != null && data.sum.actions['like'] > 0) {
// $('#conversion_pagelike').text(number_format(data.sum.actions['like']));
// $('#conversion_cpl').text(number_format((data.sum.spent /
// data.sum.actions['like']) / currency, 2));
// }
// } else {
// if (conversion > 0) {
// $('#conversion_cpa').text(number_format(data.sum.spent / conversion, 1));
// }
// if (data.sum.actions['like'] != null && data.sum.actions['like'] > 0) {
// $('#conversion_pagelike').text(number_format(data.sum.actions['like']));
// $('#conversion_cpl').text(number_format(data.sum.spent /
// data.sum.actions['like'], 1));
// }
// }
// $('#conversion_conversionrate').text(number_format((conversion /
// data.sum.clicks) * 100, 1) + '%');
//
// if (data.sum.actions['offsite_conversion.registration'] != null &&
// data.sum.actions['offsite_conversion.registration'] > 0) {
// $('#external_registration').text(number_format(data.sum.actions['offsite_conversion.registration']));
// }
// if (data.sum.actions['offsite_conversion.add_to_cart'] != null &&
// data.sum.actions['offsite_conversion.add_to_cart'] > 0) {
// $('#external_addcart').text(number_format(data.sum.actions['offsite_conversion.add_to_cart']));
// }
// if (data.sales != null && data.sales > 0) {
// $('#external_sales').text(number_format(data.sales));
// }
// if (data.roas != null && data.roas > 0) {
// $('#external_roas').text(number_format(data.roas, 2) + '%');
// $('#roas_area').show(1000);
// }
//
// $('#top_imp').text(number_format(data.sum.impressions));
// $('#top_reach').text(number_format(data.sum.unique_impressions));
// $('#top_ctr').text(number_format((data.sum.clicks / data.sum.impressions) *
// 100, 2) + '%');
// $('#top_clicks').text(number_format(data.sum.clicks));
// $('#top_conversion').text(number_format(conversion));
//
// Highcharts.setOptions({
// colors : [ '#9AD7DC', '#FEE684', '#B3AED6', '#F28E96', '#FCB393', '#D9BADA',
// '#C3DE99', '#9AC0E7', '#6AF9C4' ]
// });
//
//
//
// conversionGraph = "[";
// for ( var i = 0; i < data.keyData.length; i++) {
// if (i > 0) {
// conversionGraph += ",{";
// } else {
// conversionGraph += "{";
// }
// conversionGraph += "name:'" + data.keyData[i] + "'";
// conversionGraph += ",data:[" + data.statsList[i + 11] + "]";
// conversionGraph += "}";
// }
//
// if (conversionGraph.length > 1) {
// conversionGraph += ",";
// }
// conversionGraph += "{";
// conversionGraph += "type:'line',";
// conversionGraph += "lineWidth: 1,";
// // conversionGraph += "color:'#98c415',";
// conversionGraph += "yAxis:1,";
// conversionGraph += "shadow:0,";
// conversionGraph += "marker:{radius:2},";
// conversionGraph += "name:'Conversion rate',";
// conversionGraph += "data:" + JSON.stringify(conversionRateData);
// conversionGraph += "}";
// conversionGraph += "]";
//
// conversionGraph = "series: [{";
// conversionGraph += "type: 'pie',";
// conversionGraph += "name: 'Impression to conversion',";
// conversionGraph += "data: [";
// for ( var i = 0; i < data.keyData.length; i++) {
// if (i > 0) {
// conversionGraph += ",[";
// } else {
// conversionGraph += "[";
// }
// conversionGraph += "'" + data.keyData[i] + "',";
// conversionGraph += data.statsList[i + 11 + data.keyData.length];
// conversionGraph += "]";
// }
// conversionGraph += "]";
// conversionGraph += "}]";
//
// conversionGraph = "series: [{";
// conversionGraph += "type: 'pie',";
// conversionGraph += "name: 'Analysis of impression to conversion',";
// conversionGraph += "data: [";
// for ( var i = 0; i < data.keyData.length; i++) {
// if (i > 0) {
// conversionGraph += ",[";
// } else {
// conversionGraph += "[";
// }
// conversionGraph += "'" + data.keyData[i] + "',";
// conversionGraph += data.statsList[i + 11 + data.keyData.length];
// conversionGraph += "]";
// }
// conversionGraph += "]";
// conversionGraph += "}]";
// }
//
// parent.resizeIframe($('#ifrm_Wrap').height() + 50);
// }
