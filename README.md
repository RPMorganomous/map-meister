# Neighborhood Map

Welcome to my neighborhood!  Things are pretty quiet here in Midland, Texas, but have a look around and enjoy the sights (virtually) with this Neighborhood Map application.

![Neighborhood Map](/images/map.png)

The Neighborhood Map Udacity project is part of the Full Stack Developer Nanodegree which teaches students to:

"Learn how to create server-side, data-driven web applications that support any front-end and can scale to support hundreds of thousands of users."

## The project overview:

"You will develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this application, including: map markers to identify popular locations or places you’d like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. You will then research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles, Yelp reviews, etc)."

## Main technologies implemented:
* HTML
* CSS
* JavaScript
* Knockout.js
* AJAX
* JSON
* Google Maps API
* Foursquare API

## Methodology

This application utilizes a View - Model - ModelView design.  All components in the dom (view) are completely controlled by the ModelView, according to modern JavaScript design principles.

With the [design spec](https://review.udacity.com/#!/rubrics/17/view) provided by [Udacity](https://www.udacity.com/) this project was built completely from scratch.  After achieving basic functionality, the project was expanded to include numerous features not required by the spec but still important for the overall user experience (detailed below).

## Executing The Application

This application is [hosted on the AtomusGames server](http://www.atomusgames.com/rpm/map-meister/) for user convenience.  However, to download to your own computer, simply use the GitHub clone/download option (big green button in the top right corner).

### Prerequisites

All that's needed to view the project is:
* Internet Connection
* Web Browser (chrome, brave, firefox, edge, etc..)

## Testing The Application

Open the application and select a location or place from the list on the left hand side of the map.  An infowindow will open above the pen displaying a panoramic view of the place.  Selecting any marker will close the previous infowindow and open a new one above the new marker.  Enter a search term such as "coffee" and click SEARCH to get a new list of places and coresponding markers.

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

