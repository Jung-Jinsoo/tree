//Table Style

var $view_table = $('.view-table');


// IE8에서는 nth-child(even) 등의 CSS Selector 가 적용되지 않아서 jQuery를 이용한 Style 적용
$view_table.find('tbody tr:nth-child(even)').css({
	'background-color' : '#ecf0f1'
});

// Date Button Style

var $date_button_wrap = $('#date-button-wrap');

$date_button_wrap.children('button').on('click',function(){
	$(this)
	.addClass('active')
	.siblings('button')
	.removeClass('active');
});


// ad-table 관련 Javascritp

$('.info-data-wrap').each(function(){
	$(this).height($(this).parent().siblings('th').children('div').outerHeight());	
});
$('.btn-pause').on('click',function(){
	var dimLayer = '<div class="dim-layer"><button class="btn-refresh">Restart</button></div>',
	parseDim = $.parseHTML(dimLayer);
	$(this).parent().append(parseDim);

});
$('.info-data-wrap').on('click','.btn-refresh',function(){
	$(this).parent('.dim-layer').remove();
});