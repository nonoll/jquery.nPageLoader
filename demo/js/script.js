var pageLoader = $.nPageLoader;
pageLoader.init({
    // 속도체크용 이미지 url
    url : 'images/sequence/img_0001.jpg',
    // 속도체크용 이미지 용량 kb
    urlSize : 83,
    // 실제 문서 예상 용량 kb
    size : 3500,
    // console log
    log : false
});
pageLoader.addEventListener( 'progress', onProgress );
pageLoader.addEventListener( 'complete', onComplete );

function onProgress( event ){
    $( 'div.progress > h1' ).html( event.percent + "%" );
    $( 'div.progress' ).width( event.percent + "%");
}

function onComplete( event ){
    $( 'div.progress > h1' ).html( event.percent + "%" );
    $( 'div.progress' ).width( event.percent + "%");

    $( 'div.loading' ).fadeOut();
}

var Background = {
	_viewIdx 		: 0,
	_imgLength 		: 330,
	$indicator 		: null,
	$container 		: null,
	$background 	: null,
	resize : function() {
		var _this = this,
			winWidth = $( window ).width(),
			winHeight = $( window ).height();

		this.$background.width( winWidth );
		this.$background.height( winHeight );
	},
	setup : function() {
		var _this = this,
			appendHtml = '',
			addString;

		for( var i = 0; i <= this._imgLength; i++ ) {
			addString = 4 - String( i ).length;
			switch( addString ) {
				case 3:
					addString = '000';
					break;
				case 2:
					addString = '00';
					break;
				case 1:
					addString = '0';
					break;
				default:
					addString = '0000';
					break;
			}
			appendHtml += '<img src="images/sequence/img_' + addString + i + '.jpg"/>';
		}

		this.$container.html( appendHtml );
	},
	display : function( margin ) {
		var _this = this,
			winWidth = $( window ).width() - this.$indicator.width(),
			indiLeft = 0,
			src = '';

		this._viewIdx = margin;
		
		if( this._viewIdx > this._imgLength ) {
			this._viewIdx = 0;
		}

		if( this._viewIdx < 0 ) {
			this._viewIdx = this._imgLength;
		}

		src = this.$container.find( 'img' ).eq( this._viewIdx ).attr( 'src' );
		this.$background.find( 'img' ).attr( 'src', src );

		indiLeft = ( winWidth / this._imgLength ) * this._viewIdx;
		/*if( viewLeft + this.$indicator.width() >= winWidth ) {
			viewLeft -= this.$indicator.width();
		}*/
		this.$indicator.css( 'left', indiLeft );
	},
	setEvents : function() {
		var _this = this,
			isDown = false,
			startPos, endPos;

		$( window ).mousedown(function(event) {
			isDown = true;
			startPos = event.pageX;

			$( 'div.hitArea' ).addClass( 'drag_hand' );
		});

		$( window ).mouseup(function(event) {
			isDown = false;
			var movePos = event.pageX - startPos,
				winWidth = $( window ).width(),
				movePer = Number( ( movePos / winWidth ).toFixed( 2 ) ),
				imgPer = _this._imgLength / 100,
				moveNum = Number( ( ( imgPer * movePer ) * 25 ).toFixed( 0 ) ) * -1;

			//console.log( movePos, movePer );
			//console.log( imgPer, ( imgPer * movePer ) * 10, moveNum, _this._viewIdx + moveNum );
			$({someValue: _this._viewIdx}).animate({someValue: _this._viewIdx + moveNum}, {
														duration: 'slow',
														step: function() { 
															//console.log( parseInt( this.someValue ) );
															_this.display( parseInt( this.someValue ) );
														}
														});

			$( 'div.hitArea' ).removeClass( 'drag_hand' );

		});

		$( window ).mouseleave(function(event) {
			isDown = false;

			$( 'div.hitArea' ).removeClass( 'drag_hand' );
		});
	},
	init : function() {
		var _this = this;

		this.$background = $( 'div.wrap > div.back' );
		this.$container = $( 'div.wrap > div.back_container' );
		this.$indicator = $( 'div.wrap > div.timeline > div.indicator' );

		this.setup();
		this.resize();
		this.display( 0 );
		this.setEvents();

		$( window ).resize(function(event) {
			_this.resize();
		});
	}
}

var MouseController = {
	wheel : function( event ) {
		var delta = 0;

		if( !event ) {
			event = window.event;
		}

		if( event.wheelDelta ) {
			delta = event.wheelDelta / 120;
			if( window.opera ) {
				delta = -delta;
			}
		} else if ( event.detail ) {
			delta = -event.detail/3;
		}
		//console.log( 'a', delta );
	},
	init : function() {
		var onMouseWheel = function(e) {
		    e = e.originalEvent;
		    var _this = Background;
		    var delta = e.wheelDelta > 0 || e.detail < 0 ? -25 : 25;

		    $({someValue: _this._viewIdx}).animate({someValue: _this._viewIdx + delta}, {
														duration: 'slow',
														step: function() { 
															//console.log( parseInt( this.someValue ) );
															_this.display( parseInt( this.someValue ) );
														}
														});
		}
		$("body").bind("mousewheel DOMMouseScroll", onMouseWheel);
		/*$( 'div.wrap' ).bind('mousewheel', function( event, delta ) {
			console.log( delta );
			Background.display( Background._viewIdx + 2 );
		});*/
	}
}


$(document).ready(function() {
	Background.init();
	MouseController.init();
});