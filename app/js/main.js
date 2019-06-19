'use strict';

(function($){
	$(document).ready(function() {
		// Code
		checkWidth();

		$( window ).resize(()=> {
		if ($(document).find("title").text() === 'Карта') {
			toDrag('#map')
		} else {
			toDrag('#tabs');
		}

		})

		$( "#tabs" ).tabs();

		$('.tabs__link').click(function() {
			$('.tabs__link').removeClass('active');
			$(this).addClass('active');
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
	$( window ).width() > 415 ? toDrag('#tabs') : null;
}


function initMap() {
    var locations = [
      ['Sobornosty str.', 49.590874, 34.548300, 'images/find.png'],
      ['Monastyrska str.', 49.590261, 34.554512, 'images/marker.png'],
      ['Europeska str.', 49.586636, 34.551621, 'images/lost.png'],
      ['Gogolia str.', 49.587952, 34.559548, 'images/partner.png'],
      ['Mishenko str', 49.582012, 34.557123, 'images/lost.png']
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
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