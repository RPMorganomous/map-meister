// MODEL

var map;

// blank array for all the markers
var markers = [];

var locations = [
        {title: 'Ricks House', location: {lat: 32.010855, lng: -102.107781}},
        {title: 'Fasken Park', location: {lat: 32.012297, lng: -102.106606}},
        {title: 'Connies House', location: {lat: 32.01101, lng: -102.107148}},
        {title: 'Lauras House', location: {lat: 32.010905, lng: -102.107486}},
        {title: 'Kims House', location: {lat: 32.010773, lng: -102.108157}},
    ];



// VIEWMODEL

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }



var AppViewModel = function(){
    var self = this;
    this.ricksPlaces = ko.observableArray(locations);

};

AppViewModel.prototype.initMap = function(){
    // Constructor creates a new map - only center and zoom are required.
    var self = this;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 32.010394, lng: -102.107687},
        zoom: 13
    });

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
    // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.

        self.ricksPlaces()[i].marker=marker;

        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        // Extend the boundaries of the map for each marker
        bounds.extend(markers[i].position);
        map.fitBounds(bounds);
    }

        // document.getElementById('show-ricksHood').addEventListener('click', showRicksHood);
        // document.getElementById('hide-ricksHood').addEventListener('click', hideRicksHood);

}


var appViewModel = new AppViewModel();



ko.applyBindings(appViewModel);

