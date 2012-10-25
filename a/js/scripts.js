// CONSOLE ERRORS CURE - Avoid 'console' errors in browsers that lack a console.
(function() {
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = window.console || {};

    while (length--) {
        // Only stub undefined methods.
        console[methods[length]] = console[methods[length]] || noop;
    }
}());

// SLIDER
(function($) {
    $.fn.innerfade = function(options) {
        return this.each(function() {   
            $.innerfade(this, options);
        });
    };

    $.innerfade = function(container, options) {
        var settings = {
        		'animationtype':    'fade',
            'speed':            'normal',
            'type':             'sequence',
            'timeout':          2000,
            'containerheight':  'auto',
            'runningclass':     'innerfade',
            'children':         null
        };
        if (options)
            $.extend(settings, options);
        if (settings.children === null)
            var elements = $(container).children();
        else
            var elements = $(container).children(settings.children);
        if (elements.length > 1) {
            $(container)./* css('position', 'relative'). */css('height', settings.containerheight).addClass(settings.runningclass);
            for (var i = 0; i < elements.length; i++) {
                $(elements[i]).css({/* 'z-index': String(elements.length-i), */'position': 'absolute'}).hide();
            };
            if (settings.type == "sequence") {
                setTimeout(function() {
                    $.innerfade.next(elements, settings, 1, 0);
                }, settings.timeout);
                $(elements[0]).show();
            } else if (settings.type == "random") {
            		var last = Math.floor ( Math.random () * ( elements.length ) );
                setTimeout(function() {
                    do { 
												current = Math.floor ( Math.random ( ) * ( elements.length ) );
										} while (last == current );             
										$.innerfade.next(elements, settings, current, last);
                }, settings.timeout);
                $(elements[last]).show();
						} else if ( settings.type == 'random_start' ) {
								settings.type = 'sequence';
								var current = Math.floor ( Math.random () * ( elements.length ) );
								setTimeout(function(){
									$.innerfade.next(elements, settings, (current + 1) %  elements.length, current);
								}, settings.timeout);
								$(elements[current]).show();
						}	else {
							alert('Innerfade-Type must either be \'sequence\', \'random\' or \'random_start\'');
						}
				}
    };

    $.innerfade.next = function(elements, settings, current, last) {
        if (settings.animationtype == 'slide') {
            $(elements[last]).slideUp(settings.speed);
            $(elements[current]).slideDown(settings.speed);
        } else if (settings.animationtype == 'fade') {
            $(elements[last]).fadeOut(settings.speed);
            $(elements[current]).fadeIn(settings.speed, function() {
							removeFilter($(this)[0]);
						});
        } else
            alert('Innerfade-animationtype must either be \'slide\' or \'fade\'');
        if (settings.type == "sequence") {
            if ((current + 1) < elements.length) {
                current = current + 1;
                last = current - 1;
            } else {
                current = 0;
                last = elements.length - 1;
            }
        } else if (settings.type == "random") {
            last = current;
            while (current == last)
                current = Math.floor(Math.random() * elements.length);
        } else
            alert('Innerfade-Type must either be \'sequence\', \'random\' or \'random_start\'');
        setTimeout((function() {
            $.innerfade.next(elements, settings, current, last);
        }), settings.timeout);
    };

})(jQuery);

// **** remove Opacity-Filter in ie ****
function removeFilter(element) {
	if(element.style.removeAttribute){
		element.style.removeAttribute('filter');
	}
}

// PLACEHOLDER polyfill - http://mths.be/placeholder v2.0.7 by @mathias
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery)); 

$(document).ready(function(){
	$(':input[placeholder], textarea[placeholder]').placeholder();
	$('iframe[src^="http://player.vimeo.com"], iframe[src^="http://www.youtube.com"], iframe[src*="dailymotion.com"], object:not([class*="not-video"]):not(:has(embed)), embed:not([class*="not-video"])').wrap('<figure class="video" />');
	$('ol, ul').prev('p').css('margin-bottom', '0'); //lists captions
	$('#slideshow').innerfade({children: '.slide',timeout: 4400,speed: 'slow'});
	equalHeights();
});

// EQUAL HEIGHTS COLUMNS
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

function noError(){return true;}
window.onerror = noError;