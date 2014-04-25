// 에러메시지 포멧 정의 ///
var NO_BLANK_TEXT = "{name+을를} 입력해주세요.";
var NO_BLANK_SELECT = "{name+을를} 선택해주세요.";
var NOT_VALID = "{name+이가} 올바르지 않습니다";
var TOO_LONG = "{name}의 길이가 초과되었습니다 (최대 {maxbyte}바이트)";
var STRING_FR  = 6
var STRING_TO  = 10
var old_menu = '';
var old_cell = '';

/// 스트링 객체에 메소드 추가 ///
String.prototype.trim = function(str) {
	str = this != window ? this : str;
	return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

String.prototype.hasFinalConsonant = function(str) {
	str = this != window ? this : str;
	var strTemp = str.substr(str.length-1);
	return ((strTemp.charCodeAt(0)-16)%28!=0);
}

String.prototype.bytes = function(str) {
	str = this != window ? this : str;
  var len = 0;
  for(j=0; j<str.length; j++) {
		var chr = str.charAt(j);
		len += (chr.charCodeAt() > 128) ? 2 : 1;
	}
	return len;
}

// 	천단위 콤마 붙히기 (var won = "100000"; won.comma() => 100,000)
String.prototype.comma=function(){
var l_text=this;
var l_pattern=/^(-?\d+)(\d{3})($|\..*$)/;

  if(l_pattern.test(l_text)){
    l_text=l_text.replace(l_pattern,function(str,p1,p2,p3)
    {
      return p1.comma() + ("," + p2 + p3);
    });
  }
  return l_text;
} 


/// 실질적 폼체크 함수 ///
function validate(form) {
	for (i = 0; i < form.elements.length; i++ ) {
		var el = form.elements[i];
		if (el.tagName == "FIELDSET" || el.tagName.toLowerCase() == "object") continue;
		if(el.tagName!="SELECT"){
			el.value = el.value.trim();
		}

		var fitbyte = el.getAttribute("FITBYTE");
		var minbyte = el.getAttribute("MINBYTE");
		var maxbyte = el.getAttribute("MAXBYTE");
		var option = el.getAttribute("OPTION");
		var match = el.getAttribute("MATCH");
		var glue = el.getAttribute('GLUE');
		
		if (el.getAttribute("REQUIRED") != null) {	//필수 사항에 대한 처리
			if(el.getAttribute("disabled")==true) continue;
		    if (el.type == "radio"){
		        obj = eval("form." + el.name);

		        bool = true;
		        if(obj.length)
		        {
			        for(rad = 0; rad<obj.length; rad++){
			            if(obj[rad].checked == true){
			                bool = false;
			            }
			        }
		        }
		        else
		        {
		        	if(obj.checked == true){
		                bool = false;
		            }
		        }

		        if(bool){
		            return doError(el,NO_BLANK_SELECT,"del");
		        }
		    }
		    else{
			    if (el.value == null || el.value == "") {
				    if(el.tagName=="SELECT") {
				        return doError(el,NO_BLANK_SELECT);
				    }
				    else {
				        return doError(el,NO_BLANK_TEXT);
				    }
			    }
			}
		}

		if (fitbyte != null) { //문자열 길이 체크
			if (el.value.length != parseInt(fitbyte)) {
				return doError(el,"{name+은는} " + fitbyte + "자를 입력해야 합니다.");
			}
		}

		if (minbyte != null) {
			if (el.value.length < parseInt(minbyte)) {
				return doError(el,"{name+은는} 최소 "+minbyte+"자 이상 입력해야 합니다.");
			}
		}

		if (maxbyte != null && el.value != "") { //문자열 길이 체크
			var len = 0;
			if (el.value.length > parseInt(maxbyte)) {
				return doError(el,"{name}의 입력 가능한 최대 글자는 "+maxbyte+" Byte 입니다. 현재 " + el.value.bytes() + " Byte 를 입력 하였습니다");
			}
		}

		if (match && (el.value != form.elements[match].value)) return doError(el,"{name+이가} 일치하지 않습니다");  //두개의 문자열 일치 체크

		if (option != null && el.value != "") {   /// 특수 패턴 검사 함수 포워딩 ///
			if (el.getAttribute('SPAN') != null) {
				var _value = new Array();
				for (span=0; span<el.getAttribute('SPAN');span++ ) {
					_value[span] = form.elements[i+span].value;
				}
				var value = _value.join(glue == null ? '' : glue);
				if (!funcs[option](el,value)) return false;
			} else {
				if (!funcs[option](el)) return false;
			}
		}
	}
	return true;
}


// Textarea 글자수 조절
// 입력예제 <textarea onKeyPress="fnChkRemark(this,'50')">  -- fnChkRemark(텍스트값, 자릿수)
function fnChkRemark(obj, strCnt) {
	var strtempRemark = obj.value;
	var len = 0;
	var tString = '';
	for(j=0; j< strtempRemark.length; j++) {
		var chr = strtempRemark.charAt(j);
		len += (chr.charCodeAt() > 128) ? 2 : 1;
		if (len <= strCnt)
			tString += chr;
	}
	if (len >= strCnt) {
		alert(strCnt + '자 이하로 입력해 주세요. ');
		obj.focus();
		obj.value = tString;
		return false;
	}
}


function josa(str,tail) {
	return (str.hasFinalConsonant()) ? tail.substring(0,1) : tail.substring(1,2);
}


function doError(el,type,action) { //에러 처리 함수
	var pattern = /{([a-zA-Z0-9_]+)\+?([가-힝]{2})?}/;
	var name = (hname = el.getAttribute("HNAME")) ? hname : el.getAttribute("NAME");
	pattern.exec(type);
	var tail = (RegExp.$2) ? josa(eval(RegExp.$1),RegExp.$2) : "";
	alert(type.replace(pattern,eval(RegExp.$1) + tail));
	if (action == "sel") {
		el.select();
	} else if (action == "del")	{
		el.value = "";
	}

	// 히든 필드, display:none, readonly 개체는 포커스시 에러나므로 에러처리 추가
	try
	{
		el.focus();
	}
	catch (e)
	{}
	return false;
}

/// 특수 패턴 검사 함수 매핑 ///
var funcs = new Array();
funcs['email'] = isValidEmail;
funcs['phone'] = isValidPhone;
funcs['mobile'] = isValidMobile;
funcs['userid'] = isValidUserid;
funcs['pass'] = isValidPass;
funcs['hangul'] = hasHangul;
funcs['nick'] = hasNick;
funcs['number'] = isNumber;
funcs['numeric'] = isNumeric;
funcs['engonly'] = alphaOnly;
funcs['jumin'] = isValidJumin;
funcs['bizno'] = isValidBizNo;
funcs['domain'] = isValidDomain;


/// 패턴 검사 함수들 ///
function isValidEmail(el,value) {
	var value = value ? value : el.value;
	var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
	return (pattern.test(value)) ? true : doError(el,NOT_VALID);
}

function validChar(value){
	var alpbool = false;
	var numbool = false;
	
	for(z=-1 ; z<value.length-1; z++){
		if(isNaN(value.substr(z+1,1))){
			alpbool = true;
		} else {
			numbool = true;
		}
	}
	
	return (alpbool && numbool);
}

function isValidUserid(el) {
	var pattern = /^[a-zA-Z]{1}[a-zA-Z0-9_]{5,11}$/;
	return (pattern.test(el.value) && validChar(el.value)) ? true :doError(el,"{name+은는} 첫 문자는 영문이어야 하며\n\n6자이상 12자 이하 영문/숫자 조합이어야 합니다");
}

function isValidPass(el) {
	var pattern = /^[a-zA-Z0-9]{4,14}$/;
	return (pattern.test(el.value) && validChar(el.value)) ? true :doError(el,"{name+은는} 5자이상 15자 이하이어야 하고,\n\n영문/숫자 조합이어야 합니다");}

function hasHangul(el) {
	var pattern = /^[가-힝]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 한글로만 입력해야 합니다");
}

function hasNick(el) {
	var pattern = /^[가-힝a-zA-Z0-9]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 특수문자를 사용하실 수 없습니다");
}

function alphaOnly(el) {
	var pattern = /^[a-zA-Z]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 영문으로만 입력해야 합니다");
}

function isNumber(el) {
	var pattern = /^[0-9]+$/;
  return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 숫자만 입력해야 합니다");
}

function isNumeric(el) {
  return (!isNaN(el.value)) ? true : doError(el,"{name+은는} 반드시 숫자형식만 입력해야 합니다");
}

function isValidJumin(el,value) { //주민번호 체크
    var pattern = /^([0-9]{6})-?([0-9]{7})$/;
	var num = value ? value : el.value;
   
    return (pattern.test(num)) ? true : doError(el,NOT_VALID);
    
    
    /* 외국인일 경우 체계 검사 불필요
    if (!pattern.test(num)) return doError(el,NOT_VALID);
    num = RegExp.$1 + RegExp.$2;

	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";
	for (var i=0; i<12; i++) {
		if (isNaN(num.substring(i,i+1))) return doError(el,NOT_VALID);
		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}
	var mod = sum % 11;
	return ((11 - mod) % 10 == last) ? true : doError(el,NOT_VALID);
	*/
}

//지방세 납부정보입력시 주민번호 유효성 체크 2009-07-14
function isValidJuno(juno) {
	var sum = 0;
	var last = juno.charCodeAt(12) - 0x30;
	var bases = "234567892345";

	for (var i=0; i<12; i++) {
		if (isNaN(juno.substring(i,i+1))) return false;
		sum += (juno.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}
	var mod = sum % 11;
	return ((11 - mod) % 10 == last) ? true : false;	
}

function isValidBizNo(el, value) { //사업번호 체크
    var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
	var num = value ? value : el.value;
    if (!pattern.test(num)) return doError(el,NOT_VALID);
    num = RegExp.$1 + RegExp.$2 + RegExp.$3;
    var cVal = 0;
    for (var i=0; i<8; i++) {
        var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7);
        cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10;
    }
    var li_temp = parseFloat(num.substring(i,i+1)) * 5 + '0';
    cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
    return (parseInt(num.substring(9,10)) == 10-(cVal % 10)%10) ? true : doError(el,NOT_VALID);
}

function isValidPhone(el,value) {//전화번호
    var pattern = /([0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})/;
	var num = value ? value : el.value;
	if (num == null || num == "") {
		return doError(el,NO_BLANK);
	}
	else {
	  return (pattern.test(num)) ? true : doError(el,"나머지 {name}을(를) 입력해 주세요.");
	}
}

function isValidMobile(el,value) {//휴대전화번호
    var pattern = /([0-9]{3})-?([0-9]{3,4})-?([0-9]{4})/;
	var num = value ? value : el.value;
	if (num == null || num == "") {
		return doError(el,NO_BLANK);
	}
	else {
	  return (pattern.test(num)) ? true : doError(el,"나머지 {name}을(를) 입력해 주세요.");
	}
}


function isValidDomain(el,value) { //도메인 체크
	var pattern = /^.+(\.[a-zA-Z]{2,3})$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID);
}


/**
    * 비밀번호 유효성 체크 로직 
    */
var MIN_SIZE = 3; //최소 3개의 문자를 비교한다.
var sequence = new Array( "YTREWQWERTYUIOPASDFGHJKLZXCVBNMNBVCXZLKJHGFDSAPOIUYTREWQWERTY",
                     "ytrewqwertyuiopasdfghjklzxcvbnmnbvcxzlkjhgfdsapoiuytrewqwerty",
                     "VWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDE",
                     "vwxyzabcdefghijklmnopqrstuvwxyzabcde",
                     "67890123456789098765432109876" );

function isValidPassword( val, userid, corpjno, mobno, telno, cotelno )
{
    if ( val.length == 0 ) {
        alert( "비밀번호를 입력하세요." );

        return false;
    }

    for ( var i = 0; i < sequence.length; i++ ) {
        for ( var j = MIN_SIZE; val.length >= j; j++ ) {
            if ( sequence[i].indexOf( val.substring( j - MIN_SIZE, j ) ) >= 0 ) {
                alert( "고객님의 정보호호를 위하여 키보드 순서 혹은 연속되는 글자 혹은 숫자를 세자리이상 사용하실 수 없습니다.\n예) abc, 123, qwe 등" );

                return false;
            }
        }
    }
    
	mobno	= mobno.replace(' ','');
	telno 	= telno.replace(' ','');
	cotelno	= cotelno.replace(' ','');

   	for ( var j = MIN_SIZE; val.length >= j; j++ ) {
        var temp = val.substring( j - MIN_SIZE, j );

        if ( userid.indexOf( temp ) >= 0 ) {
            alert( "고객님의 정보호호를 위하여 아이디가 포함된 비밀번호는 이용하실 수 없습니다.(" + temp + ")" );

            return false;
        }

        if ( corpjno.indexOf( temp ) >= 0 ) {
            var msg = "주민등록번호";

            if ( corpjno.length == 10 ) msg = "사업자등록번호";

            alert( "고객님의 정보호호를 위하여 " + msg + "가 포함된 비밀번호는 이용하실 수 없습니다.(" + temp + ")" );

            return false;
        }

        if ( mobno != "" && mobno.length > 0 && mobno.indexOf( temp ) >= 0 ) {
            alert( "고객님의 정보호호를 위하여 핸드폰번호가 포함된 비밀번호는 이용하실 수 없습니다.(" + temp + ")" );

            return false;
        }
        if ( telno != "" && telno.length > 0 && telno.indexOf( temp ) >= 0 ) {
            alert( "고객님의 정보호호를 위하여 자택전화번호가 포함된 비밀번호는 이용하실 수 없습니다.(" + temp + ")" );

            return false;
        }
        if ( cotelno != "" && cotelno.length > 0 && cotelno.indexOf( temp ) >= 0 ) {
            alert( "고객님의 정보호호를 위하여 직장전화번호가 포함된 비밀번호는 이용하실 수 없습니다.(" + temp + ")" );

            return false;
        }
    }

    var cnt = 0;
    var prev = val.charAt( 0 );

    for ( var i = 1; i < val.length; i++ ) {
        if ( prev == val.charAt( i ) ) cnt++;
        else cnt = 0;
        prev = val.charAt( i );

        if ( cnt >= MIN_SIZE - 1 ) {
            alert( "고객님의 정보호호를 위하여 동일한 문자를 연속 세번이상 사용하실 수 없습니다.\n예) 1111, qqqq" );

            return false;
        }
    }

    return true;
}
	