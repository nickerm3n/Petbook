'use strict';

(function($){
	$(document).ready(function() {
		// Code
		checkWidth();

		$( window ).resize(()=> {
		if ($(document).find("title").text() === 'Карта') {
			toDrag('#map-wrapper')
		} else {
			toDrag('#tabs');
		}

		})

		$( "#tabs" ).tabs();

		$('.tabs__link').click(function() {
			$('.tabs__link').removeClass('active');
			$(this).addClass('active');
		})

		$('.close-button, .faq-button').click(()=>{
			$('.faq').toggleClass('show');
		})

	});
})(jQuery);



function toDrag(selector) {
	let tabs = $(selector),
		menu = $('.navigation--main'),
		container = $('.petbook-container');
	($( window ).width() > 415 &&  $( window ).height() > 415 ? menu.append(tabs) : container.append(tabs))
}

function checkWidth() {
	if ($(document).find("title").text() === 'Карта') {
			$( window ).width() > 415 ? toDrag('#map-wrapper') : null;
		} else {
			$( window ).width() > 415 ? toDrag('#tabs') : null;
		}
}


function initMap() {
    var locations = [
      ['Настя, пинчер, 28.03.2019', 49.590874, 34.548300, 'images/find.png'],
      ['Ты тут', 49.590261, 34.554512, 'images/marker.png'],
      ['Артур, кот, 18.01.2019.', 49.586636, 34.551621, 'images/lost.png'],
      ['Ветклиника "Айболит".', 49.587952, 34.559548, 'images/partner.png'],
      ['Дядя пёс, мопс', 49.582012, 34.557123, 'images/lost.png']
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      disableDefaultUI: true,
      center: new google.maps.LatLng(49.589555, 34.551047),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    for (let i = 0; i < locations.length; i++) {  
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        icon: locations[i][3],
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
};

google.maps.event.addDomListener(window, 'load', initMap); 