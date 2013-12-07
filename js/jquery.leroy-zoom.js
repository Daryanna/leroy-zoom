/*
 * 	Leroy Zoom - jQuery plugin
 *	written by Edison Machado
 *	http://github.com/edison/leroy-zoom
 *
 *	Copyright (c) 2013 Edison Machado (http://w3cs.com.br)
 *	Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0.txt)
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

(function($) {
	$.fn.leroyZoom = function(options){
		var defaults = {
			id: 'leroy_zoom_frame',
			parent: 'body',
			append: true,
			preload: 'Loading...',
			error: 'Image can\'t be loaded.',
			zoomTop: 100,
			zoomLeft: 460
		};

		var obj, load_image;
		var w1,w2,h1,h2,rw,rh,wa,ha;
		var over = false;
		var magnified = false;
		var options = $.extend(defaults, options);

		this.each(function(){
			obj = this;

			var tagName = this.tagName.toLowerCase();
			var show_wit = function(obj){
				if(tagName == 'a' && zoomable($(obj))){
					if (magnifiable($(obj))) {
						$(obj).addClass("magnifiable");
						$('<div class="zoom-cursor"></div>').prependTo(obj);
					}
					$(obj)
						.addClass("zoomable")
						.click(function(e){ magnify(e, $(obj), obj); return false;})
						.hover(function(e){ start(e, $(obj), obj); }, function() { hide(); })
						.mousemove(function(e){ move(e, obj); });
				} else {
					$(obj).click(function(){ return false; });
				}
			}(obj);
		});

		load_image = function(href, callback) {
			$('#'+ options.id).text(options.preload);

			var image = $("<img />").attr('src', href).load(function() {
				if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            		error();
            		return false;
        		} else {
        			$('#'+ options.id).text("");
        			callback(image);
        		}
    		});
		};

		function zoomable(anchor) {
			return anchor.attr("data-medium-url") != "#" && anchor.attr("data-medium-url") != ""
		};

		function magnifiable(anchor) {
			return anchor.attr("data-large-url") != "#" && anchor.attr("data-large-url") != ""
		};

		function magnify(e, anchor, obj) {
			if (!magnified && magnifiable(anchor)) {
				magnified = true;
				$('#'+ options.id).text(options.preload);
				anchor.find(".zoom-cursor").hide();
				anchor.addClass("magnified");
				
				var callback = function(img) {
					anchor.find(".zoom-cursor").fadeIn(300);

		            $('#'+ options.id).animate({
		                top: options.zoomTop - 50,
		                width: w2 + 100,
		                height: h2 + 100
		            }, 300);
		            show(e, img, obj);
				};
				load_image(anchor.attr("data-large-url"), callback);
			}
		};

		function start(e, anchor, obj){
			var zoom = $('<div id="'+ options.id +'"></div>');
			if(options.append) { zoom.appendTo(options.parent) } else { zoom.prependTo(options.parent) };

			$('#'+ options.id).css({
				top: options.zoomTop,
				left: options.zoomLeft
			});
			
			var callback = function(img) {
				show(e, img, obj);
				if (magnifiable(anchor)) {
					$(obj).find(".zoom-cursor").show();
				}
			};
			img = load_image(anchor.attr("data-medium-url"), callback);
		};

		function show(e, img, obj){
			over = true;
			$(img).css({ 'position':'absolute','top':'0','left':'0' });
			$('#'+ options.id).append(img);
			w1 = $('img', obj).width();
			h1 = $('img', obj).height();
			w2 = $('#'+ options.id).width();
			h2 = $('#'+ options.id).height();
			w3 = $(img).width();
			h3 = $(img).height();
			w4 = $(img).width() - w2;
			h4 = $(img).height() - h2;
			rw = w4/w1;
			rh = h4/h1;
			move(e);
		};

		function hide(obj){
			over = false;
			magnified = false;
			$('#'+ options.id).remove();
			$(obj).removeClass("magnified");
			$(obj).find(".zoom-cursor").hide();
		};

		function error(){
			$('#'+ options.id).html(options.error);
		};

		function move(e, obj){
			if(over){
				var p = $('img',obj).offset();
				var pl = e.pageX - p.left;
				var pt = e.pageY - p.top;
				var xl = pl*rw;
				var xt = pt*rh;
				xl = (xl>w4) ? w4 : xl;
				xt = (xt>h4) ? h4 : xt;
				move_cursor(e.pageX, e.pageY, pl, pt, obj);
				wa = w1/(w3/w2);
				ha = h1/(h3/h2);

				var lm = (pl - wa/2)*(w3/w1)*(-1);
				var tm = (pt - ha/2)*(h3/h1)*(-1);

				if (magnified) {
					lm = lm + 50;
					tm = tm + 50;
				}

				$('#'+ options.id + ' img').css({ 'left': lm,'top': tm });
			};
		};

		function move_cursor(x, y, pl, pt, obj) {
			if (pl > -1 && pl < w1 && pt > -1 && pt < h1) {
				$(obj).find(".zoom-cursor").offset({
					left: x,
					top: y
				});
			} else {
				$(obj).find(".zoom-cursor").hide(obj);
			}
		};
	};
})(jQuery);
