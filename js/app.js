// MODEL

var map;

// blank array for all the markers
var markers = [];

var locations = [
        {title: 'Ricks House', location: {lat: 32.010855, lng: -102.107781},
        content: 'Rick is a cool guy.'},
        {title: 'Fasken Park', location: {lat: 32.012297, lng: -102.106606},
        content: 'Faskin Park is a nice place for a picknick.'},
        {title: 'Connies House', location: {lat: 32.01101, lng: -102.107148},
        content: 'Connie is our neighbor.'},
        {title: 'Lauras House', location: {lat: 32.010905, lng: -102.107486},
        content: 'Laura is our hairstylist.'},
        {title: 'Kims House', location: {lat: 32.010773, lng: -102.108157},
        content: 'Kims son, Sean, is my sons friend.'},
    ];



// VIEWMODEL

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.position + '<p>' + marker.content + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
            } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
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

      // This function will loop through the listings and hide them all.
      function hideRicksHood() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }

      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

var AppViewModel = function(){
    var self = this;
    this.ricksPlaces = ko.observableArray(locations);

};

AppViewModel.prototype.initMap = function(){

        // Create a styles array to use with the map.
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

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 32.010394, lng: -102.107687},
        zoom: 13,
        mapTypeControl: true, // lets the user select satellite view
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map', 'midnight_map']
        }
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.mapTypes.set('midnight_map', styledMapTypeMidnight);
    map.setMapTypeId('styled_map');

        // Style the markers a bit. This will be our listing marker icon.
        var defaultIcon = makeMarkerIcon('0091ff');

        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = makeMarkerIcon('FFFF24');

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        var content = locations[i].content;
    // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            // map: map,
            position: position,
            title: title,
            content: content,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
        });

        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.

        self.ricksPlaces()[i].marker=marker;

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

        // Extend the boundaries of the map for each marker
        bounds.extend(markers[i].position);
        // map.fitBounds(bounds);
    }

    // document.getElementById('show-ricksHood').addEventListener('click', showRicksHood);
    // document.getElementById('hide-ricksHood').addEventListener('click', hideRicksHood);

}


var appViewModel = new AppViewModel();



ko.applyBindings(appViewModel);

