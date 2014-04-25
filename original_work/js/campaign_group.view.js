//IE에서 console.log에러 방지 
var console = window.console || {
	log : function() {
	}
};

var summary_chart;
var conversion_chart;
var conversionGraph;

function drawChart(spentData, clicksData, ctrData, impData, year, month, day, currency) {
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
	// $('#top_ctr').text(number_format((data.sum.clicks /
	// data.sum.impressions) * 100, 2) + '%');
	// $('#top_clicks').text(number_format(data.sum.clicks));
	// $('#top_conversion').text(number_format(conversion));

	Highcharts.setOptions({
		colors : [ '#9AD7DC', '#FEE684', '#B3AED6', '#F28E96', '#FCB393', '#D9BADA', '#C3DE99', '#9AC0E7', '#6AF9C4' ]
	});

	summary_chart = new Highcharts.Chart({
		chart : {
			renderTo : 'summary_chart_container',
			marginBottom : 120
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
				shadow : false,
			},
		},
		series : [ {
			type : 'column',
			data : spentData,
			color : '#D9BADA',
			name : 'Cost',
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