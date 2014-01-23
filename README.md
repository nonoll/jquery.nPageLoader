#jquery.nPageLoader
```
/**
 * @pluginName	jquery.nPageLoader.js
 * @Requires	jQuery v1.0.4 ~ v1.10.2
 * @Author		nonoll ( http://usefl.co.kr - hyunkwan Roh )
 * @Version		1.0.0
 * @Date		2014.01.22
 */
```
페이지 로딩 프로그래스를 쉽게 구현하기 위해 만듦.
속도 체크용 이미지를 로드하여 인터넷속도를 구하고
그 속도를 기준으로 하여 로드할 페이지양에 프로그래스를 구현함.

### 설치
jquery v1.x 와 jquery.nPageLoader.js 를 웹페이지에 추가
```
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="js/jquery.nPageLoader.js"></script>
```

### 메소드
```
// 실행
$.nPageLoader.init();

// 이벤트 체크
$.nPageLoader.addEventListener( "event", listener );
  event > "progress"
              +event       : 이벤트 타입
              <li>byteLoaded  : 로드된 byte</li>
              <li>byteTotal   : 로드할 총 byte</li>
              <li>percent     : 로드된 퍼센트</li>
            </ul>
        > "complete"
            <ul>
              <li>event       : 이벤트 타입</li>
              <li>percent     : 로드된 퍼센트</li>
            </ul>
```

### 사용법
**기본 사용**
$.nPageLoader 를 선언 실행하고
addEventListener 를 이용 이벤트를 체크한다
```
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
```

**기본 옵션**
```
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
```

##History
1. 2014.01.23 첫 버전 등록





