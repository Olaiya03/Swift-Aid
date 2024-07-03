var serviceType = "";
var nearbyServices = "";

// FUNCTION TO FETCH USER GEOLOCATION AND CREATE A MAP.
function initialize() {
    if (navigator.geolocation) { // Checking if geolocation is supported by the browser
        navigator.geolocation.getCurrentPosition(function (position) { // Retrieving user's current position
            userGeolocation = {
                latitude: position.coords.latitude, // Storing latitude in userGeolocation object
                longitude: position.coords.longitude // Storing longitude in userGeolocation object
            }
            let myLat = userGeolocation.latitude;
            let myLng = userGeolocation.longitude;
            console.log("User geolocation is: ", myLat, myLng); // Outputting user geolocation
            let myPosition = new google.maps.LatLng(myLat, myLng);

            // CREATING A MAP CENTERED AT THE USER LOCATION.
            map = new google.maps.Map(document.getElementById("map"), {
                center: myPosition,
                zoom: 15
            })
            // To Load Autocomplete
            // let input = document.getElementById("autocomplete");
            // let autoComplete = new google.maps.places.Autocomplete(input)
            // autoComplete.bindTo("bounds", map)


            // TO LOAD MARKERS
            let marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29)
            })

            google.maps.event.addListener(myPosition, function () {
                // marker.setVisible(false)
                let place = myPosition
                console.log(place)
                consoles.log(place.photos[0].getUrl({ maxWidth: 500, maxHeight: 300 }))

                if (!place.geometry) {
                    window.alert("Autocomplete's returned place contains no geometry")
                    return
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport)
                } else {
                    map.setCenter(place.geometry.location)
                    map.setZoom(17) // Why 17? Because it looks good.
                }
                marker.setPosition(place.geometry.location)
                marker.setVisible(true)

                let requests = {
                    location: place.geometry.location,
                    radius: '1000',
                    // type: ['restaurant']
                    type: [document.getElementById("type").value]
                }

                service = new google.maps.places.PlacesService(map)
                service.nearbySearch(requests, callback)
            })
        });
    } else {
        console.log("Geolocation is not supported by this browser."); // Handling case where geolocation is not supported
    }
}


document.getElementById("hospitalButton").addEventListener("click", function () {
    alert("Hospital button clicked");
    // searchNearbyPlaces("Hospital");
});

document.getElementById("gasStationButton").addEventListener("click", function () {
    alert("Gas Station button clicked");
    // searchNearbyPlaces("Gas Station");
});

document.getElementById("policeStationButton").addEventListener("click", function () {
    alert("Police Station button clicked");
    // searchNearbyPlaces("Police Station");
});

document.getElementById("roadSafetyButton").addEventListener("click", function () {
    alert("Road Saftety button clicked");
    // searchNearbyPlaces("Road Safety");
});

document.getElementById("fireStationButton").addEventListener("click", function () {
    alert("Fire Station button clicked");
    // searchNearbyPlaces("Fire Station");
});

document.getElementById("ambulanceButton").addEventListener("click", function () {
    alert("Ambulance button clicked");
    // searchNearbyPlaces("Ambulance Service");
});

document.getElementById("bankButton").addEventListener("click", function () {
    alert("Bank button clicked");
    // searchNearbyPlaces("Bank");
});

document.getElementById("restaurantButton").addEventListener("click", function () {
    alert("Restaurant button clicked");
    initialize();
    // searchNearbyPlaces("Restaurant");
});

document.getElementById("hotelButton").addEventListener("click", function () {
    alert("Hotel button clicked");
    // searchNearbyPlaces("Hotel");
});

document.getElementById("parkButton").addEventListener("click", function () {
    alert("Motor Park button clicked");
    // searchNearbyPlaces("Motor Park");
});



// FUNCTION TO FETCH USER GEOLOCATION.
// function getUserGeolocation() {
//     // Get user geolocation and store in userGeolocation variable
//     let userGeolocation = null; // Initializing the variable to store user geolocation
//     if (navigator.geolocation) { // Checking if geolocation is supported by the browser
//         navigator.geolocation.getCurrentPosition(function (position) { // Retrieving user's current position
//             userGeolocation = {
//                 latitude: position.coords.latitude, // Storing latitude in userGeolocation object
//                 longitude: position.coords.longitude // Storing longitude in userGeolocation object
//             };
//             console.log("My user geolocation is: ", userGeolocation); // Outputting user geolocation
//         });
//     } else {
//         console.log("Geolocation is not supported by this browser."); // Handling case where geolocation is not supported
//     }
// }
// Calling the function to get user geolocation
// getUserGeolocation();



//PERFORM A NEARBY SEARCH FOR PLACES
// searchNearbyPlaces = (thePlace) => {
//     let request = {
//         // location: place.geometry.location,
//         location: userGeolocation,
//         radius: "1000",
//         // type: [document.getElementById("type").value]
//         type: [thePlace]
//     }

//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }


function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results.length)
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        // infowindow.setContent(place.name)
        alert(place.name)
        // alert(place.photos[0].getUrl())
        window.open(place.photos[0].getUrl(), '_blank')
    });
}

google.maps.event.addDomListener(window, "load", initialize);