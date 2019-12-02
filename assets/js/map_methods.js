let marker;
let centralizeInterval;
var Origin = { position: "", coord: { lat: 0, lng: 0 }, isCoord: false };
var Desti = { position: "", coord: { lat: 0, lng: 0 }, isCoord: false };

document.getElementById("map").addEventListener("load", x => {

});
document.getElementById("map").addEventListener("mouseup", x => {
	if (timer) clearInterval(timer);
	marker.setPosition(LatLng);
	calcRoute(marker.position);
});
document.getElementById("map").addEventListener("mousedown", x => {
	timer = setInterval(j => {
		//deleteMarkers();
		LatLng = { lat: map.center.lat(), lng: map.center.lng() };
		marker.setPosition(LatLng);
	}, 1);
});

document.getElementsByClassName("js-confirmSearch")[0].addEventListener("click", x => {

});
const initPositioning = () => {
	centralizeMap();
}

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const centralizeMap = () => {
	//declare middle of the map coordinates
	LatLng = { lat: map.center.lat(), lng: map.center.lng() };
	//set the marker of the center
	var icon = {
		url: 'https://tis-uniride.herokuapp.com/assets/img/marker.png',
		scaledSize: new google.maps.Size(50, 50), // scaled size
	};
	
	marker = new google.maps.Marker({
		position: LatLng,
		icon: icon,
		map: map,
		title: "Localização",
	});

	marker.setPosition(LatLng);
}

var PromiseValue;
//função assincrona que retorna a latidude e longitude de um endereço
async function geoCoder(local1) {
	//fetch Request HTTP
	let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${
		//RegEx que troca espaços por + já que a url não suporta espaços	
		local1.replace(/ /g, "+")
		}&key=AIzaSyCZmU2kIucbxFBUXpC7cZxAyRH-NqjKsgM`);
	//await espera a chamada retornar independente de si
	///nota que o json() ou stream de resposta só pode ser chamada 1 vez antes de ser trancada a leitura
	let jsonResponse = await res.json();
	//armazena resposta em JsonResponse
	return jsonResponse.results[0].geometry.location;
	//return coordinates res.lat, res.lng
}

//interpola a posição para rua mais proxima
async function interpolatePosition(pos) {
	//pos,passa um obj que contem as propriedades, pos.lat,pos.lng
	//nota-se que essa função deverá ser chamada sempre que uma coordenada 
	//for ser processada, pois é essencial a validação da posição do usuario
	let res = await fetch(`https://roads.googleapis.com/v1/snapToRoads?path=${pos.lat},${pos.lng}&interpolate=true&key=AIzaSyCZmU2kIucbxFBUXpC7cZxAyRH-NqjKsgM`);
	//chamada http na api que processa a posição
	//aguarda resultado da chamada, nota-se que o objeto res só pode ser lido uma vez antes de trancado a leitura de seu stream
	let jsonResponse = await res.json();
	//acessa propriedade que retorna coordenadas e passa como resposta
	return jsonResponse.snappedPoints[0].location;
	//return interpolated coordinates
}
//pega coordenadas baseadas em um local e retorna sua coordenada interpolada na posição correta
async function calculatePosition(objId, isCoord = false) {
	let destination;
	let destCoord;
	//opçao de passar coordenadas ao invés de buscar pelo id do elemento

	if (!isCoord) {

		//pega o campo onde está escrito o local baseado no id
		destination = document.getElementById(objId).value;

		//retorna coordenada calculada do local exato
		destCoord = await geoCoder(destination);
	}
	else {
		destCoord = objId;
	}
	//retorna a interpolação da posição no local adequado
	let parsedCoord = await interpolatePosition(destCoord);
	return parsedCoord;
}
async function containsText(ElementId) {
	let value = document.getElementById(ElementId).value;
	if (value != undefined) {
		return true
	}
	return false
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setMapOnAll(null);
}
//clean array and map
function deleteMarkers() {
	clearMarkers();
	markers = [];
}
//receive name and coordinate
async function calcRoute() {
	origin = { lat: map.center.lat(), lng: map.center.lng() };
	//await containsText("-pickup") == true ? origin = await calculatePosition('-pickup') : origin = await calculatePosition(origin,true);
	origin = await calculatePosition(origin, true)

	let destination = await calculatePosition("-destination");
	icon = {
		url: 'https://tis-uniride.herokuapp.com/assets/img/marker.png',
		scaledSize: new google.maps.Size(50, 50), // scaled size
	};
	var request = {
		origin: new google.maps.LatLng(
			origin.latitude,
			origin.longitude
		),
		destination: new google.maps.LatLng(
			destination.latitude,
			destination.longitude
		),
		travelMode: google.maps.TravelMode["DRIVING"]
		
	};
	directionsService.route(request, function (response, status) {
		if (status == "OK") {
			directionsDisplay.setDirections(response);
		} else {
			console.log("Directions request failed due to " + status);
		}
	});


}