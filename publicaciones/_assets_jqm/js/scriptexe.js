/*
 PHOTOSWIPE
 */
( function(window, $, PhotoSwipe) {
		$(document).ready(function() {
			$('div.photoswipe').live('pageshow', function(e) {
				var currentPage = $(e.target), options = {
					minUserZoom : 1,
					swipeThreshold : 250,
					loop : false,
					preventSlideshow : true,
					captionAndToolbarOpacity : 0.9,
					captionAndToolbarShowEmptyCaptions : false,
					getToolbar : function() {
						return '<footer data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="b" class="photoswipeFooter ui-footer ui-bar-b"><div data-role="navbar" data-iconpos="top" class="ui-navbar"><ul class="ui-grid-b"><li class="ui-block-a"><a href="#" data-icon="arrow-l" class="ps-toolbar-previous ui-btn ui-btn-up-b ui-btn-icon-top ui-btn-up-undefined"><span class="ui-btn-inner"><span class="ui-btn-text">Atrás</span><span class="ui-icon ui-icon-arrow-l ui-icon-shadow"></span></span></a></li><li class="ui-block-b"><a href="#" class="ps-toolbar-close ui-btn ui-btn-up-b ui-btn-icon-top ui-btn-up-undefined"data-icon="grid"><span class="ui-btn-inner"><span class="ui-btn-text">Cerrar</span><span class="ui-icon ui-icon-delete ui-icon-shadow"></span></span></a></li><li class="ui-block-c"><a href="#" data-icon="arrow-r" class="ps-toolbar-next ui-btn ui-btn-up-b ui-btn-icon-top ui-btn-up-undefined"><span class="ui-btn-inner"><span class="ui-btn-text">Siguiente</span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></span></a></li></ul></div></footer>';
					}
				}, photoSwipeInstance = $('#zoom a', e.target).photoSwipe(options, currentPage.attr('id'));
				return true;
			}).live('pagehide', function(e) {
				var currentPage = $(e.target), photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));
				if( typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
					PhotoSwipe.detatch(photoSwipeInstance);
				}
				return true;
			});
		});
	}(window, window.jQuery, window.Code.PhotoSwipe));
/*
 CIRCLE MENU
 */
$(document).bind('pagechange', function() {
	var actPage = "#" + $('.ui-page-active').attr('id');
	//Coger el ID de la página a la que cambiamos y activar el efecto
	var delay = 0, delayTime, btns = $('.btn');
	$(actPage + ' #base-button').toggle(function() {
		$(this).addClass('open');
		btns.each(function(i) {
			delayTime = i * delay;
			var ele = $(this);
			window.setTimeout(function() {
				ele.addClass('open');
			}, delayTime);
		});
	}, function() {
		$(this).removeClass('open');
		var ii = 0;
		$($(btns).get().reverse()).each(function(i) {
			delayTime = i * delay;
			var ele = $(this);
			window.setTimeout(function() {
				ele.removeClass('open');
			}, delayTime);
		});
	});
});
/*
 PRELOAD IMAGES
 */
(function($) {
	var imgList = [];
	$.extend({
		preload : function(imgArr, option) {
			var setting = $.extend({
				init : function(loaded, total) {
				},
				loaded : function(img, loaded, total) {
				},
				loaded_all : function(loaded, total) {
				}
			}, option);
			var total = imgArr.length;
			var loaded = 0;
			setting.init(0, total);
			for(var i in imgArr) {
				imgList.push($("<img />").attr("src", imgArr[i]).load(function() {
					loaded++;
					setting.loaded(this, loaded, total);
					if(loaded == total) {
						setting.loaded_all(loaded, total);
					}
				}));
			}
		}
	});
})(jQuery);
$(function() {
	var img_array = $("img").map(function() {
		return $(this).attr("src");
	}).get();
	$.preload(img_array, {
		init : function(loaded, total) {
			var percent = Math.round((loaded * 100) / total);
			$("#indicator").html("Cargando... " + percent + "%");
		},
		loaded : function(img, loaded, total) {
			var percent = Math.round((loaded * 100) / total);
			$("#indicator").html("Cargando... " + percent + "%");
		},
		loaded_all : function(loaded, total) {
			$("#indicator").html("Carga completa!");
			$("#indicator").fadeOut("slow");
		}
	});
});