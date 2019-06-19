'use strict';

(function($){
	$(document).ready(function() {
		//--- Code ---
		$('.header__profile').click(showWindow);
		$('.profile__close').click(closeWindow);

		checkWidth();

		$( window ).resize(()=> {
			toDrag()
		})
		//  --- tabs ---
		$( "#tabs" ).tabs();
		$("#profile-tabs").tabs();
		// --- tab links ---
		$('.tabs__link').click(function() {
			$('.tabs__link').removeClass('active');
			$(this).addClass('active');
		});
		$('.profile__tabs-link').click(function() {
			$('.profile__tabs-link').removeClass('profile__tabs-link--active');
			$(this).addClass('profile__tabs-link--active');
		});
	});
	function toDrag() {
		let tabs = $('#tabs'),
		menu = $('.navigation--main'),
		container = $('.petbook-container');
		($( window ).width() > 415 ? menu.append(tabs) : container.append(tabs))
	}

	function checkWidth() {
		$( window ).width() > 415 ? toDrag() : null;
	}

// --- modal window ---
function showWindow() {
	$('.profile').removeClass('hidden');
	$('.header__profile').children('.profile').removeClass('profile--hidden');
	
}
function closeWindow() {
	setTimeout(function() {
		$('.profile').addClass('profile--hidden');
	}, 10);
	setTimeout(function() {
		$('.profile').addClass('hidden');
	}, 200);


	
}
	
})(jQuery);


