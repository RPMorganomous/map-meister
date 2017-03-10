// MODEL

var map;

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 32.010394, lng: -102.107687},
        zoom: 13
    });
    var faskin = {lat: 32.012297, lng: -102.106606};
    var marker = new google.maps.Marker({
        position: faskin,
        map: map,
        title: 'First Marker!'
    });
}


// VIEWMODEL

//var ViewModel = function (){}

// VIEW

// ko.applyBindings(new ViewModel());

//initMap(){};