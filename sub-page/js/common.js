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


// PlaceHolder 
// http://mathiasbynens.be/demo/placeholder

$('select').selectBox();