#jquery.nPageLoader
<pre lang="javascript">
/**
 * @PluginName	jquery.nPageLoader.js
 * @Requires	jQuery v1.0.4 ~ v1.10.2
 * @Author		nonoll ( http://usefl.co.kr - hyunkwan Roh )
 * @Version		1.0.0
 * @Date		2014.01.22
 */
</pre>
페이지 로딩 프로그래스를 쉽게 구현하기 위해 만듦.

속도 체크용 이미지를 로드하여 인터넷속도를 구하고

그 속도를 기준으로 하여 로드할 페이지양에 프로그래스를 구현함.

#Setup
jquery v1.x 와 jquery.nPageLoader.js 를 웹페이지에 추가
<pre lang="html">
&lt;script src="http://code.jquery.com/jquery-1.10.1.min.js"&gt;&lt;/script&gt;
&lt;script src="js/jquery.nPageLoader.js"&gt;&lt;/script&gt;
</pre>

#Methods
- ``init`` : 실행
- ``addEventListener`` : 이벤트리스너 등록
- ``event - progress`` : event 이벤트타입 , byteLoaded 로드된 byte , byteTotal 로드할 총 byte , percent 로드된 퍼센트
- ``event - complete`` : event 이벤트타입 , percent 로드된 퍼센트 

<pre lang="javascript">
// 실행
$.nPageLoader.init();

// 이벤트 체크
$.nPageLoader.addEventListener( "event", listener );
/*
  event > "progress"
              event       : 이벤트 타입
              byteLoaded  : 로드된 byte
              byteTotal   : 로드할 총 byte
              percent     : 로드된 퍼센트
        > "complete"
              event       : 이벤트 타입
              percent     : 로드된 퍼센트
*/
</pre>

#Usage
**1. 기본 사용**

$.nPageLoader 를 선언 실행하고

addEventListener 를 이용 이벤트를 체크한다
<pre lang="javascript">
var pageLoader = $.nPageLoader;
pageLoader.init({
	// 속도체크용 이미지 url
	url : "http://www.google.com/images/srpr/nav_logo14.png",
	// 속도체크용 이미지 용량 kb
	urlSize : 28.6,
	// 실제 문서 예상 용량 kb
	size : 155,
	// console log
	log : true
});
pageLoader.addEventListener( "progress", onProgress );
pageLoader.addEventListener( "complete", onComplete );

function onProgress( e ){
	$("#pageLoader_status").html(e.percent + "%");
	$("#pageLoader_bar").width(e.percent + "%");
}

function onComplete( e ){
	$("#pageLoader_status").html(e.event);
	$("#pageLoader_bar").css("background-color","blue");
}
</pre>

**2. 기본 옵션**
<pre lang="javascript">
$.nPageLoader.defaults = {
		// 속도체크용 이미지 url
		url: "http://www.google.com/images/srpr/nav_logo14.png",
		// 속도체크용 이미지 용량 kb
		urlSize: 28.6,
		// 실제 문서 예상 용량 kb
		size: 155,
		// kb 단위 사용
		kb: true,
		// 캐시 사용
		noCache: true,
		// console log
		log: false
	};
</pre>

##History
1. 2014.01.23 첫 버전 등록
2. 2014.04.14 오류 수정 등록





