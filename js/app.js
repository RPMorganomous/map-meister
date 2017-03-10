// MODEL

var map;

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 32.010394, lng: -102.107687},
        zoom: 13
    });
}

// VIEWMODEL

//var ViewModel = function (){}

// VIEW

// ko.applyBindings(new ViewModel());

//initMap(){};