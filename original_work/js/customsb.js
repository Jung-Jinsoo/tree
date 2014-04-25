// JinSoo selectBox PlugIN
(function($){
    $.fn.extend({
        selectBox : function(options){
            var defaults = {
            };
            var options = $.extend(defaults,options);
            return this.each(function(){
                var o = options;
                var _this = $(this);
                _this.each(function(){
                    // 각각의 select의 option의 갯수 구함
                    var optionList = $(this).children('option').length;
                    // 기존의 select는 숨김
                    $(this).css({
                        visibility: 'hidden',
                        width : '1px',
                        height : '1px',
                        position: 'absolute'
                    });
                    // selectBox라는 클래스명을 가지고 있는 div로 전체를 감싼다(select 태그 포함)
                    $(this).wrap('<div class="selectBox"></div>');
                    // title생성
                    var $selectTitle = $('<em/>',{
                        //클래스명은 selectTitle
                        'class' : 'selectTitle',
                        // 기본값설정하기 :  각 option의 가장 첫번째 인덱스의 텍스트를 가져와서 넣어준다.
                        text : $(this).children('option').eq(0).text()
                        //설정이 완료 되었으면 이 값을 넣어준다
                    }).insertBefore($(this));
                    // 화살표 생성
                    var $iconArrow = $('<span/>',{
                        //클래스는 arrowSelect
                        'class' : 'arrowSelect'
                    }).insertBefore($(this));
                    var $list = $('<ul/>',{
                        //각각의 option값이 들어갈 li의 부모 ul 를 생성 클래스는 selectList
                        'class':'selectList'
                    }).insertAfter($(this));
                    // for문으로 현재 option 갯수만큼 li생성하고 value값은 rel에 넣어주고 text도 넣어준다.
                    for(var i=0;i<optionList;i++){
                        $('<li/>',{
                            text : $(this).children('option').eq(i).text(),
                            rel : $(this).children('option').eq(i).val()
                            // 그후 이 li들은 ul.selectList에 넣는다.
                        }).appendTo($list);
                    }
                    var $listItem = $list.children('li');

//                    toggle 기능이 사라져서 추가
                    var $setToggle = 0;
//                    IE7 Z-INDEX Bug FIX
                    var allResetZindex = function(){
                        _this.parent().css({
                            'zIndex' : 0
                        });
                    };

                    $selectTitle.on('click',function(){
                        var oThis = $(this).siblings('.selectList');
                        if($setToggle == 0){
                            $(this).siblings('.selectList').show();
                            $(this).parent().css({
                                zIndex : 5
                            });
                            $setToggle = 1;
                        }
                        else if ($setToggle == 1){
                            $(this).siblings('.selectList').hide();
                            allResetZindex();
                            $setToggle = 0;
                        }
                        $('.selectList').not(oThis).hide();
                    });
                    $listItem.on('click',function(){
                        var thisIndex = $(this).index();
                        $(this).parent().siblings('select').find('option:eq('+thisIndex+')').attr('selected','selected').siblings().removeAttr('selected');
                        $(this).parent().siblings('em').text($(this).text());
                        $list.hide();
                        $setToggle = 0;
                        allResetZindex();
                    });
                    $(document).click(function(e){
                        if($(e.target).parents('.selectBox').get(0) == null){
                            $('.selectList').hide();
                            $setToggle = 0;
                            allResetZindex();
                        }
                    });
                });
            });
        }
    });
})(jQuery);

$('select').selectBox();