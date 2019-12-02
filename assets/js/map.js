let map;
let initlatlng = { lat: 0, lng: 0 };
let LatLng;
let calculated = false;
let ParsedLocal;
let timer;
let directionsService;
let directionsDisplay;
function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
  };
var initMap = () => {
	
	//initialize maps
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 20, lng: 20 },
		zoom: 18,
		styles: [
			{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
			{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
			{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
			{
				featureType: "administrative.locality",
				elementType: "labels.text.fill",
				stylers: [{ color: "#d59563" }]
			},
			{
				featureType: "poi",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#d59563"
					}
				]
			},
			{
				featureType: "poi.park",
				elementType: "geometry",
				stylers: [{ color: "#263c3f" }]
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.fill",
				stylers: [{ color: "#6b9a76" }]
			},
			{
				featureType: "road",
				elementType: "geometry",
				stylers: [{ color: "#38414e" }]
			},
			{
				featureType: "road",
				elementType: "geometry.stroke",
				stylers: [{ color: "#212a37" }]
			},
			{
				featureType: "road",
				elementType: "labels.text.fill",
				stylers: [{ color: "#9ca5b3" }]
			},
			{
				featureType: "road.highway",
				elementType: "geometry",
				stylers: [{ color: "#746855" }]
			},
			{
				featureType: "road.highway",
				elementType: "geometry.stroke",
				stylers: [{ color: "#1f2835" }]
			},
			{
				featureType: "road.highway",
				elementType: "labels.text.fill",
				stylers: [{ color: "#f3d19c" }]
			},
			{
				featureType: "transit",
				elementType: "geometry",
				stylers: [{ color: "#2f3948" }]
			},
			{
				featureType: "transit.station",
				elementType: "labels.text.fill",
				stylers: [{ color: "#d59563" }]
			},
			{
				featureType: "water",
				elementType: "geometry",
				stylers: [{ color: "#17263c" }]
			},
			{
				featureType: "water",
				elementType: "labels.text.fill",
				stylers: [{ color: "#515c6d" }]
			},
			{
				featureType: "poi.business",
				stylers: [{ visibility: "off" }]
			},
			{
				featureType: "poi.attraction",
				stylers: [{ visibility: "off" }]
			},
			{
				featureType: "water",
				elementType: "labels.text.stroke",
				stylers: [{ color: "#17263c" }]
			}
		]
	});
	var icon = {
		url: 'https://tis-uniride.herokuapp.com/assets/img/marker.png',
		scaledSize: new google.maps.Size(50, 50), // scaled size
	};
	directionsOptions = {
		icon: icon,
		map:map,
		suppressMarkers:true
	};
	
	//initialize directions
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer(directionsOptions);
	//local request
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setPosition,error,{enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0});
	}

	directionsDisplay.setMap(map);
	centralizeMap();
}

const setPosition = position => {
	let gotem = { lat: position.coords.latitude, lng: position.coords.longitude };
	map.setCenter(gotem);
}