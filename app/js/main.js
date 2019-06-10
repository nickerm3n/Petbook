'use strict';

(function($){
	$(document).ready(function() {
		// Code
		checkWidth();

		$( window ).resize(()=> {
			toDrag()
		})

		$( "#tabs" ).tabs();

		$('.tabs__link').click(function() {
			$('.tabs__link').removeClass('active');
			$(this).addClass('active');
		})
	});
})(jQuery);


function toDrag() {
	let tabs = $('#tabs'),
		menu = $('.navigation--main'),
		container = $('.petbook-container');
	($( window ).width() > 415 ? menu.append(tabs) : container.append(tabs))
}

function checkWidth() {
	$( window ).width() > 415 ? toDrag() : null;
}