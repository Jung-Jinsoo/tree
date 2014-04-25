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
var roas_chart;
var path_imp_chart;
var path_clicks_chart;
var position_imp_chart;
var position_clicks_chart;
var conversionGraph;

function drawPerformanceChart(spentData, clicksData, ctrData, impData, year, month, day, currency) {
	summary_chart = new Highcharts.Chart({
		chart : {
			renderTo : 'summary_chart_container'
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
			lineWidth : 2,
			data : clicksData,
			color : '#FDBF84',
			yAxis : 2,
			name : 'Clicks',
			marker : {
				radius : 3
			},
			shadow : false
		}, {
			type : 'line',
			lineWidth : 2,
			data : ctrData,
			color : '#C3DC9B',
			yAxis : 1,
			name : 'CTR',
			marker : {
				radius : 3
			},
			shadow : false
		}, {
			type : 'line',
			lineWidth : 2,
			data : impData,
			color : '#a0a0a0',
			yAxis : 3,
			name : 'Impression',
			marker : {
				radius : 3
			},
			shadow : false
		} ],
		exporting : {
			enabled : false
		},
		legend : {
			align : 'left',
			layout : 'vertical',
			verticalAlign : 'top',
			itemStyle : {
				paddingBottom : '4px'
			},
			width : 120,
			margin : 30,
			borderRadius : 0,
			borderColor : '#D9D9D9'
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
			type : 'column'
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
			},
		},
		series : eval(conversionGraph),
		exporting : {
			enabled : false
		},
		legend : {
			align : 'left',
			layout : 'vertical',
			verticalAlign : 'top',
			itemStyle : {
				paddingBottom : '4px'
			},
			width : 120,
			margin : 30,
			borderRadius : 0,
			borderColor : '#D9D9D9'
		},
		credits : {
			text : '',
			href : 'http://adwitt.com/'
		}
	});
}

function drawPathChart(socialImp, organicImp, socialClick, organicClick) {
	path_imp_chart = new Highcharts.Chart({
		chart : {
			type : 'pie',
			renderTo : 'path_imp_container',
			backgroundColor : null
		},
		title : {
			text : ''
		},
		tooltip : {
			formatter : function() {
				return this.key + " : <strong>" + Highcharts.numberFormat(this.percentage, 2) + "%</strong>";
			}
		},
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					enabled : false,
					borderWidth : 0,
					formatter : function() {
						return this.point.series.name + '<br/><b>' + Highcharts.numberFormat(this.percentage, 2) + ' %</b>';
					}
				},
				shadow : false
			}
		},
		series : [ {
			data : [ {
				name : 'Social impression',
				y : socialImp,
				color : '#99C0E7'
			}, {
				name : 'Organic impression',
				y : organicImp,
				color : '#F28E96'
			} ]
		} ],
		credits : {
			text : '',
			href : 'http://adwitt.com/'
		}
	});

	path_clicks_chart = new Highcharts.Chart({
		chart : {
			renderTo : 'path_clicks_container',
			type : 'column',
			backgroundColor : null,
			height : 170
		},
		title : {
			text : ''
		},
		xAxis : {
			tickWidth : 0,
			labels : {
				enabled : false
			},
			lineColor : 'transparent'
		},
		yAxis : {
			gridLineWidth : 0,
			min : 0,
			title : {
				text : ''
			},
			labels : {
				enabled : false
			}
		},
		legend : {
			enabled : false
		},
		tooltip : {
			headerFormat : '',
			pointFormat : '{series.name} : <b>{point.y}</b> '
		},
		plotOptions : {
			column : {
				borderWidth : 0,
				stacking : 'normal',
				shadow : false,
				dataLabels : {
					enabled : false
				},
			}
		},
		credits : {
			text : '',
			href : 'http://adwitt.com/'
		},
		series : [ {
			name : 'Social clicks',
			data : [ {
				y : socialClick,
				color : '#99C0E7'
			} ],
			pointWidth : 50
		}, {
			name : 'Organic clicks',
			data : [ {
				y : organicClick,
				color : '#F28E96'
			} ],
			pointWidth : 50
		} ]
	});
	
	path_conversion_container = new Highcharts.Chart({
		chart : {
			type : 'pie',
			renderTo : 'path_conversion_container',
			backgroundColor : null
		},
		title : {
			text : ''
		},
		tooltip : {
			formatter : function() {
				return this.key + " : <strong>" + Highcharts.numberFormat(this.percentage, 2) + "%</strong>";
			}
		},
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					enabled : false,
					borderWidth : 0,
					formatter : function() {
						return this.point.series.name + '<br/><b>' + Highcharts.numberFormat(this.percentage, 2) + ' %</b>';
					}
				},
				shadow : false
			}
		},
		series : [ {
			data : [ {
				name : 'Social clicks',
				y : socialClick,
				color : '#99C0E7'
			}, {
				name : 'Organic clicks',
				y : organicClick,
				color : '#F28E96'
			} ]
		} ],
		credits : {
			text : '',
			href : 'http://adwitt.com/'
		}
	});
}

function drawPositionChart(newsfeedImp, rhsImp, newsfeedClick, rhsClick) {
	position_imp_chart = new Highcharts.Chart({
		chart : {
			type : 'pie',
			renderTo : 'position_imp_container',
			backgroundColor : null
		},
		title : {
			text : ''
		},
		tooltip : {
			formatter : function() {
				return this.key + " : <strong>" + Highcharts.numberFormat(this.percentage, 2) + "%</strong>";
			}
		},
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					enabled : false,
					borderWidth : 0,
					formatter : function() {
						return this.key + '<br/><b>' + Highcharts.numberFormat(this.percentage, 2) + ' %</b>';
					}
				},
				shadow : false
			}
		},
		series : [ {
			data : [ {
				name : 'RHS impression',
				y : rhsImp,
				color : '#9AD7DC'
			}, {
				name : 'Newsfeed impression',
				y : newsfeedImp,
				color : '#99C1E5'
			} ]
		} ],
		credits : {
			text : '',
			href : 'http://adwitt.com/'
		}
	});

	position_clicks_chart = new Highcharts.Chart({
		chart : {
			renderTo : 'position_clicks_container',
			type : 'column',
			backgroundColor : null,
			height : 170
		},
		title : {
			text : ''
		},
		xAxis : {
			tickWidth : 0,
			labels : {
				enabled : false
			},
			lineColor : 'transparent'
		},
		yAxis : {
			gridLineWidth : 0,
			min : 0,
			title : {
				text : ''
			},
			labels : {
				enabled : false
			}
		},
		legend : {
			enabled : false
		},
		tooltip : {
			headerFormat : '',
			pointFormat : '{series.name} : <b>{point.y}</b> '
		},
		plotOptions : {
			column : {
				borderWidth : 0,
				stacking : 'normal',
				shadow : false,
				dataLabels : {
					enabled : false
				}
			}
		},
		credits : {
			text : '',
			href : 'http://adwitt.com/'
		},
		series : [ {
			name : 'newsfeed clicks',
			data : [ {
				y : newsfeedClick,
				color : '#99C1E5'
			} ],
			pointWidth : 50
		}, {
			name : 'RHS clicks',
			data : [ {
				y : rhsClick,
				color : '#9AD7DC'
			} ],
			pointWidth : 50
		} ]
	});
}