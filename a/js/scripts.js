// CONSOLE ERRORS CURE - Avoid 'console' errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// SLIDER / SLIDESHOW / CAROUSEL - Easy Slider 1.7 by Alen Grakalic	- http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding
(function($){$.fn.easySlider=function(options){var defaults={prevId:'slideshow-prev',prevText:'Previous',nextId:'slideshow-next',nextText:'Next',controlsShow:true,controlsBefore:'',controlsAfter:'',controlsFade:true,firstId:'slideshow-first',firstText:'First',firstShow:false,lastId:'slideshow-last',lastText:'Last',lastShow:false,vertical:false,speed:800,auto:false,pause:2000,continuous:false,numeric:false,numericId:'controls',hoverPause:false};var options=$.extend(defaults,options);this.each(function(){var obj=$(this);var s=$("li",obj).length;var w=$("li",obj).width();var h=$("li",obj).height();var clickable=true;obj.width(w);obj.height(h);obj.css("overflow","hidden");var ts=s-1;var t=0;$("ul",obj).css('width',s*w);if(options.continuous){$("ul",obj).prepend($("ul li:last-child",obj).clone().css("margin-left","-"+w+"px"));$("ul",obj).append($("ul li:nth-child(2)",obj).clone());$("ul",obj).css('width',(s+1)*w)};if(!options.vertical)$("li",obj).css('float','left');if(options.controlsShow){var html=options.controlsBefore;if(options.numeric){html+='<ol id="'+options.numericId+'"></ol>'}else{if(options.firstShow)html+='<span id="'+options.firstId+'"><a href=\"javascript:void(0);\">'+options.firstText+'</a></span>';html+=' <span id="'+options.prevId+'"><a href=\"javascript:void(0);\">'+options.prevText+'</a></span>';html+=' <span id="'+options.nextId+'"><a href=\"javascript:void(0);\">'+options.nextText+'</a></span>';if(options.lastShow)html+=' <span id="'+options.lastId+'"><a href=\"javascript:void(0);\">'+options.lastText+'</a></span>'};html+=options.controlsAfter;$(obj).after(html)};if(options.numeric){for(var i=0;i<s;i++){$(document.createElement("li")).attr('id',options.numericId+(i+1)).html('<a rel='+i+' href=\"javascript:void(0);\">'+(i+1)+'</a>').appendTo($("#"+options.numericId)).click(function(){animate($("a",$(this)).attr('rel'),true)})}}else{$("a","#"+options.nextId).click(function(){animate("next",true)});$("a","#"+options.prevId).click(function(){animate("prev",true)});$("a","#"+options.firstId).click(function(){animate("first",true)});$("a","#"+options.lastId).click(function(){animate("last",true)})};function setCurrent(i){i=parseInt(i)+1;$("li","#"+options.numericId).removeClass("current");$("li#"+options.numericId+i).addClass("current")};function adjust(){if(t>ts)t=0;if(t<0)t=ts;if(!options.vertical){$("ul",obj).css("margin-left",(t*w*-1))}else{$("ul",obj).css("margin-left",(t*h*-1))}clickable=true;if(options.numeric)setCurrent(t)};function animate(dir,clicked){if(clickable){clickable=false;var ot=t;switch(dir){case"next":t=(ot>=ts)?(options.continuous?t+1:ts):t+1;break;case"prev":t=(t<=0)?(options.continuous?t-1:0):t-1;break;case"first":t=0;break;case"last":t=ts;break;default:t=dir;break};var diff=Math.abs(ot-t);var speed=diff*options.speed;if(!options.vertical){p=(t*w*-1);$("ul",obj).animate({marginLeft:p},{queue:false,duration:speed,complete:adjust})}else{p=(t*h*-1);$("ul",obj).animate({marginTop:p},{queue:false,duration:speed,complete:adjust})};if(!options.continuous&&options.controlsFade){if(t==ts){$("a","#"+options.nextId).hide();$("a","#"+options.lastId).hide()}else{$("a","#"+options.nextId).show();$("a","#"+options.lastId).show()};if(t==0){$("a","#"+options.prevId).hide();$("a","#"+options.firstId).hide()}else{$("a","#"+options.prevId).show();$("a","#"+options.firstId).show()}};if(clicked)clearTimeout(timeout);if(options.auto&&dir=="next"&&!clicked){;timeout=setTimeout(function(){animate("next",false)},diff*options.speed+options.pause)}}};var timeout;if(options.auto){;timeout=setTimeout(function(){animate("next",false)},options.pause)};if(options.numeric)setCurrent(0);if(!options.continuous&&options.controlsFade){$("a","#"+options.prevId).hide();$("a","#"+options.firstId).hide()};if(options.hoverpause&&options.auto){$(this).mouseover(function(){clearTimeout(timeout)}).mouseout(function(){animate("next",false)})}})}})(jQuery);

$(document).ready(function(){
	$('iframe[src^="http://player.vimeo.com"], iframe[src^="http://www.youtube.com"], iframe[src*="dailymotion.com"], object:not([class*="not-video"]):not(:has(embed)), embed:not([class*="not-video"])').wrap('<figure class="video" />');
	$('ol, ul').prev('p').css('margin-bottom', '0'); //lists captions
	$('.slideshow').easySlider({
		// prevText: 'Назад',
		// nextText: 'Вперёд',
		// firstText: 'Первый кадр',
		// lastText: 'Последний кадр',
        auto: true,
        continuous: true,
        pause: 1000,
        controlsShow: false,
        hoverPause: true
    });
	equalHeights();
	//$('.slideshow').tabs('.slideshow > div', {effect: 'fade', fadeOutSpeed: 'slow', rotate: true}).slideshow({autoplay: true, interval: 10000});
});

// Equal heights columns
function equalHeights() {
    //set the starting bigestHeight variable  
    var biggestHeight = 0;
    //check each of them  
    $('.equal-height .col').each(function () {
        //if the height of the current element is  
        //bigger then the current biggestHeight value  
        if ($(this).height() > biggestHeight) {
            //update the biggestHeight with the  
            //height of the current elements  
            biggestHeight = $(this).height();
        }
    });
    //when checking for biggestHeight is done set that  
    //height to all the elements  
    $('.equal-height .col').height(biggestHeight);
}

// FACEBOOK-LIKE SLIDE-OUT MENU. Author: Aldo Lugo — http://blog.aldomatic.com/facebook-style-slide-out-menu-in-jquery-mobile/ 
$(function slideOut(){
	var menuStatus;
	
	$('.btn-menu').click(function(){
		if(menuStatus != true){				
		$('.ui-page-active, .doc-header').animate({
			marginLeft: '240px',
		  }, 300, function(){menuStatus = true});
		  return false;
		  } else {
			$('.ui-page-active, .doc-header').animate({
			marginLeft: '0',
		  }, 300, function(){menuStatus = false});
			return false;
		  }
	});

	$('.page').live('swipeleft', function(){
		if (menuStatus){	
		$('.ui-page-active, .doc-header').animate({
			marginLeft: '0',
		  }, 300, function(){menuStatus = false});
		  }
	});
	
	$('.page').live('swiperight', function(){
		if (!menuStatus){	
		$('.ui-page-active, .doc-header').animate({
			marginLeft: '240px',
		  }, 300, function(){menuStatus = true});
		  }
	});
	
	$('#slide-out li a').click(function(){
		var p = $(this).parent();
		if($(p).hasClass('current')){
			$('#slide-out li').removeClass('current');
		} else {
			$('#slide-out li').removeClass('current');
			$(p).addClass('current');
		}
	});
		
});	