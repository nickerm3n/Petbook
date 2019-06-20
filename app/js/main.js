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

		});
		//  --- tabs ---	
		$( "#tabs" ).tabs();
		$("#profile-tabs").tabs();
		// profile window function calls
		$('.header__profile').click(showWindow);
		$('.profile__close').click(closeWindow);

		$('.tabs__link').click(function() {
			$('.tabs__link').removeClass('active');
			$(this).addClass('active');
		});
		$('.profile__tabs-link').click(function() {
			$('.profile__tabs-link').removeClass('profile__tabs-link--active');
			$(this).addClass('profile__tabs-link--active');
		});

		$('.close-button, .faq-button').click(()=>{
			$('.faq').toggleClass('show');
		})

		var markers = {
			find: ['нашел','images/find.png'],
			lost: ['потерял', 'images/lost.png'],
			partner: ['партнер','images/partner.png']
		}

		$('.marker-generator__button').click(()=> {
			generateMarker(markers);
		})
		//  --- modal window ---
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
	});
})(jQuery);



function generateMarker(markers) {
	$('.preview').remove()
	let input = $('#marker-generator__input').val();
	let select = $('.marker-generator__select').val();
	let form = $('.marker-generator');

	if (input === '' || input.length > 20) {alert('Строка пустая или больше символов чем можно'); return}

	for (var marker in markers) {
		if (select.toLowerCase() === markers[marker][0].toLowerCase()) {
			var path = markers[marker][1]
		}
	}

	let preview = 
	$(`<div class="preview">
		<div class="wrapper">
		<p id="marker-desc">${input}</p>
		<img id="marker-img" src=${path}>
		</div>
		</div>`);

	preview.insertBefore('.marker-generator__desc');

}

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
			draggable: true,
			geodesic: true,
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}

	google.maps.event.addListener(map, 'click', function(e) {
		placeMarker(e.latLng, map);
	});


};

google.maps.event.addDomListener(window, 'load', initMap); 



function placeMarker(position, map) {
	let textForInfo = $('#marker-desc').text();
	let preview = $('#marker-img').attr('src');

	if (preview === undefined) return;

	let marker = new google.maps.Marker({
		position: position,
		map: map,
		icon: preview,
		draggable: true,
	});  
	map.panTo(position);

	var infowindow = new google.maps.InfoWindow();

	$('.preview').remove()
	$('#marker-generator__input').val('');
	$('.marker-generator__select').prop('selectedIndex',0);;

	google.maps.event.addListener(marker, 'click', (function(marker, text) {
		return function() {
			infowindow.setContent(text);
			infowindow.open(map, marker);
		}
	})(marker, textForInfo)
	)
}
