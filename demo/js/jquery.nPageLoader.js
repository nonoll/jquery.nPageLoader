/**
 * @PluginName	jquery.nPageLoader.js
 * @Requires	jQuery v1.0.4 ~ v1.10.2
 * @Author		nonoll ( http://usefl.co.kr - hyunkwan Roh )
 * @Version		1.0.1
 * @Date		2014.01.22
 */
(function( $, window ) {
	"use strict";
	
	var pluginName = "usefl - jquery.nPageLoader.js";
	
	var _percent = 0,
		_rtnFnc = {},
		_requstId = 0,
		_instance, _startTime, _endTime,
		_download, _downloadSpeed;
	
	$.nPageLoader = {
		options : {},
		init : function( opt ) {
			_instance = this;
			
			this.options = $.extend( {}, $.nPageLoader.defaults, opt );
			
			if( this.options.kb ) {
				this.options.urlSize *= 1024;
				this.options.size *= 1024;
			}
			
			this.log( pluginName + "\nversion : " + this.version );
			this.log( "init" );
			
			this.run();
		},
		run : function() {
			this.log( "run" );
			_download = new Image();
			
			_download.onload = function(e) {
				_endTime = _instance.getTime();
				_instance.checkSpeed();
			}
			
			_startTime = this.getTime();
			if( this.options.noCache ) {
				_download.src = this.options.url + "?noCache=" + Math.random();
			} else {
				_download.src = this.options.url;
			}
			
			this.log( "src : " + _download.src );
		},
		progress : function() {
			_endTime = _instance.getTime();
			var duration = ( _endTime - _startTime );
			var bitsLoaded = Math.round( _downloadSpeed * duration ) / 1000;
			var bitsTotal = _instance.options.size;
			_percent = Math.round( ( bitsLoaded / bitsTotal ) * 100 );
			_percent = _percent >= 100 ? 100 : _percent;

			if( _rtnFnc.progress ) {
				_rtnFnc.progress( { event: "progress", byteLoaded: bitsLoaded/1024, byteTotal: bitsTotal/1024, percent: _percent } );
			}
			
			_instance.log( "progress : " + _percent );
			
			if( _percent >= 100 ) {
				_instance.complete();
			} else {
				_requstId = window.requestAFrame( _instance.progress );
			}
		},
		complete : function() {
			_instance.log( "complete : " + _percent );
			
			if( _rtnFnc.complete ) {
				_rtnFnc.complete( { event: "complete", percent: _percent } );
			}
			if( _requstId ) {
				window.cancelAFrame( _requstId );
			}
		},
		checkSpeed : function() {
			var duration = ( _endTime - _startTime ) / 1000;
			var bitsLoaded = this.options.urlSize * 8;
			var speedBps = Math.round( bitsLoaded / duration );
			var speedKbps = ( speedBps / 1024 ).toFixed(2);
			var speedMbps = ( speedKbps / 1024 ).toFixed(2);
			_downloadSpeed = speedBps;//speedKbps;
			this.log( "Your connection speed is: \n" +
								duration + " s\n"   + 
								speedBps + " bps\n"   + 
								speedKbps + " kbps\n" + 
								speedMbps + " Mbps" );

			_startTime = _instance.getTime();
			_instance.progress();
		},
		getTime : function() {
			return new Date().getTime();
		},
		log : function( msg ) {
			if( this.options.log ) {
				if( !"console" in window || typeof console == "undefined" ) {
					var methods = [ "log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd" ];
					var emptyFn = function(){};
					window.console = {};
					for( var i = 0; i < methods.length; ++i ) {
						window.console[ methods[ i ] ] = emptyFn;
					}
				} else {
					console.log( msg );
				}
			}
		},
		addEventListener: function( event, fnc ) {
			switch( event )
			{
				case "progress":
					_rtnFnc.progress = fnc;
					break;
				case "complete":
					_rtnFnc.complete = fnc;
					break;
			}
		},
		version : "1.0.1"
	}
	
	$.nPageLoader.defaults = {
		url: "http://www.google.com/images/srpr/nav_logo14.png",
		urlSize: 28.6,
		size: 155,
		kb: true,
		noCache: true,
		log: false
	};
	
	window.requestAFrame = (function () {
		return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 1000 / 60);
				};
	})();
	
	window.cancelAFrame = (function () {
		return window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.oCancelAnimationFrame ||
				function (id) {
					window.clearTimeout(id);
				};
	})();
})(jQuery, window);
