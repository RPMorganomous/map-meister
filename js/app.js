// MODEL and VIEWMODEL for neighborhood map web application
// by Rick Morgan - mba.rick@gmail.com

//============================================================
// MODEL section - used to initialize and store locations data
//============================================================

// map is used to display location objects
var map;

// locationsLength is used to account for custom location objects
var locationsLength;

// blank array for all the markers
var markers = [];

// clientID and secret are required for Foursquare json request
var clientID = "QU01LFBIGT44FNACHRMVI1FCKBNE5LH25D2MDJS4ESIOOFLW";
var secret = "B4MK0Z5OWO1CSIIE5WEJCJHILJ13LJIKS5H20PHZTBLR44S5";

// These custom location objects represent points of interest in my town,
// they will be displayed as blue markers and included with the json
// requested data
var locations =
    [
        {
            title: 'Ricks House',
            location: {lat: 32.010396, lng: -102.107679},
            content: 'Rick has a nice house.'
        },
        {
            title: 'Fasken Park',
            location: {lat: 32.012297, lng: -102.106606},
            content: 'Faskin Park is a nice place for a picnic.'
        },
        {
            title: 'Midland College',
            location: {lat: 32.030844, lng: -102.106315},
            content: 'Rick went to school here.'
        },
        {
            title: 'Dojo',
            location: {lat: 31.998896, lng: -102.1163},
            content: 'This is where we study mixed martial arts.'
        },
        {
            title: 'Dog Park',
            location: {lat: 32.036648, lng: -102.072355},
            content: 'A great place to play frisbee with pets.'
        },
    ];

//============================================
// VIEWMODEL section - used to control the dom
//============================================

// Handle errors if Google Maps api fails
function loadError(source) {
    alert(source + ' could not be initialized.');
}

// This function populates the infowindow when the custom marker is clicked.
// It only allows one infowindow which will open at the marker that is clicked,
// and populate based on that markers position.  It also adds a nifty bounce
// feature to just the custom markers.
function populateInfoWindow(marker, infowindow) {

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {

        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');

        // Set to current marker
        infowindow.marker = marker;

        // Make sure the marker property is cleared if the infowindow closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });

        // Make the markers bounce when selected
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);

            } else {

            marker.setAnimation(google.maps.Animation.BOUNCE);
            // Stop bounce after 3000 milliseconds = 4 bounces
            setTimeout(function(){
                marker.setAnimation(null);
            }, 3000);
        }

        // initialize a new google street view service with a radius
        // of 500 to find images in semi-remote areas
        var streetViewService = new google.maps.StreetViewService();
        var radius = 500;

        // getStreatView is going to first check the status and if the pano
        // was found, it will compute the position of the streetview image,
        // then calculate the heading, then get a panorama from that and set
        // the options
        function getStreetView(data, status) {

            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;

                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);

                infowindow.setContent('<div>' +
                    marker.title +
                    '</div><div id="pano"></div>');

                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 30
                        }
                };

                var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('pano'), panoramaOptions);

            } else {
                infowindow.setContent('<div>' + marker.title + '</div>' +
                    '<div>No Street View Found</div>');
            }
        }

       // Use streetview service to get the closest streetview image within
       // 500 meters ( var radius: set in populateInfoWindow) of the
       // markers position
       streetViewService.getPanoramaByLocation(marker.position, radius,
            getStreetView);

       // Open the infowindow on the correct marker.
       infowindow.open(map, marker);
    }
}

// This function will loop through the markers array and display them all.
function showRicksHood() {

    var bounds = new google.maps.LatLngBounds();

// Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {

        markers[i].setMap(map);

        bounds.extend(markers[i].position);
    }

    map.fitBounds(bounds);
}

// This function will loop through the markers and hide them all.
function hideRicksHood() {

    for (var i = 0; i < markers.length; i++) {

        markers[i].setMap(null);
    }
}

// This is a simple function that adds a leading 0 to a string
// for the purpose of making a date format of YYYYMMDD which is
// required for the foursquare query url
function pad(n){
    return (n <10) ? ("0" + n) : n;
}

// This function will show markers for all the places in the area
// matching the search term.
function showSearchResults(ricksPlaces, searchForName) {

    // Format the date for the search query url
    var date = new Date().getFullYear().toString()
        + pad((new Date().getMonth() + 1).toString())
        + new Date().getDate().toString();

    // Build the search query url
    var SearchQueryURL = "https://api.foursquare.com/v2/venues/search?" +
    "categoryID=" +
    "" +
    "&client_id=" +
    clientID +
    "&client_secret=" +
    secret +
    "&v=" +
    date + // format is YYYYMMDD
    "&ll=" +
    "32.01,-102.10" + // Midland, Texas
    "&query=" +
    searchForName();


    // Initialize the array of Foursquare search results asynchronously
    $.getJSON(SearchQueryURL, function(data){
    	var fsVenues = data.response.venues;

    	fsVenues.forEach(function(venue) {

    		ricksPlaces.push(venue);
    	});

    // Create new markers for each object
    for (var i = 0; i < fsVenues.length; i++) {
        var positionLat = parseFloat(fsVenues[i].location.lat);
        var positionLng = parseFloat(fsVenues[i].location.lng);

        var title = fsVenues[i].name;

        var marker = new google.maps.Marker({
            position: {lat: positionLat, lng: positionLng},
            title: title,
            id: i
        });

        // Add the markers to the array begining after the custom markers
        ricksPlaces()[i + locationsLength].marker = marker;

        // Add the markers to the markers array
        markers.push(marker);

        // Assign new maps infowindows for the Foursquare marker objects
        largeInfowindow = new google.maps.InfoWindow();

        // Populate the infowindows upon marker click
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);

        });

        // Display the markers
        showRicksHood();
    }
    })

    // If the Foursquare request fails, alert the user and display the
    // custom markers
    .fail(function(error){
        alert("Foursquare data failed to load.  Error : " + error.status);
        showRicksHood();
    });

}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+
        markerColor +
        '|40|_|%E2%80%A2',

        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
        return markerImage;
}

// This function makes the locations observable by knockout.js (ko)
var AppViewModel = function(){
    var self = this;

    this.searchForName = ko.observable("");
    this.ricksPlaces = ko.observableArray();


this.newSearch = function (searchForName){
    // clear the view model list
    this.ricksPlaces([]);

    // Because no custom markers will be displayed after a search, reset
    // length of locations to begin populating the new array at item 0
    locationsLength = 0;

    // Remove any existing markers
    if (markers.length > 0) {
        for (i=0; i < markers.length; i++) {
                 markers[i].setMap(null);
        }

    // Empty the markers array
    markers = [];
    }

    // Execute the new Foursquare search
    showSearchResults(self.ricksPlaces, searchForName);
};

// Get the data for the infowindow
showInfo = function (){
    populateInfoWindow(this.marker, largeInfowindow);
};

};

AppViewModel.prototype.initMap = function(){

    // Create a couple of styles arrays to use with the map.
    // Desert Map
        var styledMapType = new google.maps.StyledMapType(
        [
          {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
          }
        ],
        {name: 'Desert Map'});

    // Midnight Map
        var styledMapTypeMidnight = new google.maps.StyledMapType(
        [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 13
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#144b53"
                    },
                    {
                        "lightness": 14
                    },
                    {
                        "weight": 1.4
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#08304b"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#0c4152"
                    },
                    {
                        "lightness": 5
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#0b434f"
                    },
                    {
                        "lightness": 25
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#0b3d51"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#146474"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#021019"
                    }
                ]
            }
        ],
        {name: 'Midnight Map'});

    // Constructor creates a new map - only center and zoom are required.
    var self = this;

    map = new google.maps.Map(document.getElementById('map'),
        {
            center: {lat: 32.010394, lng: -102.107687},
            zoom: 13,
            mapTypeControl: true, // lets the user select satellite view
            mapTypeControlOptions:
                {
                    mapTypeIds:
                        [
                            'roadmap',
                            'satellite',
                            'hybrid',
                            'terrain',
                            'styled_map',
                            'midnight_map'
                        ]
                }
        });

    // Assign the custom maps
    map.mapTypes.set('styled_map', styledMapType);
    map.mapTypes.set('midnight_map', styledMapTypeMidnight);
    map.setMapTypeId('styled_map');

    // Style the markers a bit. This will be the listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // Set the new maps infowindow
    var largeInfowindow = new google.maps.InfoWindow();

    // Set the new maps boundry
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create
    // an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {

    // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        var content = locations[i].content;

    // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker(
            {
                position: position,
                title: title,
                content: content,
                animation: google.maps.Animation.DROP,
                icon: defaultIcon,
                id: i,
                name: title
            });

        // Push the marker to our array of markers.
        markers.push(marker);
        self.ricksPlaces.push(marker);
        self.ricksPlaces()[i].marker = marker;


        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });

          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });

          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });

        // Used to offset the ricksPlaces array
        locationsLength = markers.length;
    }

};

// Instantiate a new ViewModel
var appViewModel = new AppViewModel();

// Apply the knockout.js (ko) bindings
ko.applyBindings(appViewModel);

