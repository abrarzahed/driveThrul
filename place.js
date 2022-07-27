

// function initMap() {



//     const map = new google.maps.Map(
//         document.getElementById("map"),
//         {
//             center: { lat: 40.749933, lng: -73.98633 },
//             zoom: 13,
//             mapTypeControl: false,
//         }
//     );
//     const card = document.getElementById("pac-card");
//     const input = document.getElementById("pac-input");
//     const biasInputElement = document.getElementById(
//         "use-location-bias"
//     );
//     const strictBoundsInputElement = document.getElementById(
//         "use-strict-bounds"
//     );
//     const options = {
//         fields: ["formatted_address", "geometry", "name"],
//         strictBounds: false,
//         types: ["(regions)"],
//     };

//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

//     const autocomplete = new google.maps.places.Autocomplete(input, options);

//     input.addEventListener('input', () => {
//         const container = document.querySelector('.pac-container')
//         container.classList.remove('pac-logo')
//         const innerDiv = document.createElement('div')
//         innerDiv.classList.add('inner')


//         container.append(innerDiv)
//         console.log('pac-container', container)
//         console.log('autocomplete', autocomplete);
//     })



//     // Bind the map's bounds (viewport) property to the autocomplete object,
//     // so that the autocomplete requests use the current map bounds for the
//     // bounds option in the request.
//     autocomplete.bindTo("bounds", map);

//     const infowindow = new google.maps.InfoWindow();
//     const infowindowContent = document.getElementById(
//         "infowindow-content"
//     );

//     infowindow.setContent(infowindowContent);

//     console.log('infowindow', infowindow);



//     const marker = new google.maps.Marker({
//         map,
//         anchorPoint: new google.maps.Point(0, -29),
//     });



//     autocomplete.addListener("place_changed", () => {
//         infowindow.close();
//         marker.setVisible(false);



//         const place = autocomplete.getPlace();

//         console.log('place', place);

//         // const urlParams = new URLSearchParams(window.location.search);
//         window.location.assign(`/area.html?place=${place.formatted_address}`)

//         // urlParams.set('place', place.name);
//         // window.location.search = urlParams;


//         if (!place.geometry || !place.geometry.location) {
//             // User entered the name of a Place that was not suggested and
//             // pressed the Enter key, or the Place Details request failed.
//             window.alert("No details available for input: '" + place.name + "'");
//             return;
//         }

//         // If the place has a geometry, then present it on a map.
//         if (place.geometry.viewport) {
//             map.fitBounds(place.geometry.viewport);
//         } else {
//             map.setCenter(place.geometry.location);
//             map.setZoom(17);
//         }

//         marker.setPosition(place.geometry.location);
//         marker.setVisible(true);


//     });

//     // Sets a listener on a radio button to change the filter type on Places
//     // Autocomplete.
//     function setupClickListener(id, types) {
//         const radioButton = document.getElementById(id);

//     }

//     setupClickListener("changetype-all", []);
//     setupClickListener("changetype-address", ["address"]);
//     setupClickListener("changetype-establishment", ["establishment"]);
//     setupClickListener("changetype-geocode", ["geocode"]);
//     setupClickListener("changetype-cities", ["(cities)"]);
//     setupClickListener("changetype-regions", ["(regions)"]);




// }
function initMap() {
    const resultDiv = document.querySelector('.search_area--result')
    const btnSearch = document.querySelector('.btn-search')

    const input = document.getElementById("pac-input");

    const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["(regions)"],
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    input.addEventListener('input', () => {
        const container = document.querySelector('.pac-container')
        container.classList.remove('pac-logo')
        const innerDiv = document.createElement('div')
        innerDiv.classList.add('inner')

        if (input.value.length == 0) {
            resultDiv.classList.add('hidden')
        }

        container.append(innerDiv)
        console.log('pac-container', container)
        console.log('autocomplete', autocomplete);
    })

    btnSearch.addEventListener('click', function () {
        if (input.value.length > 0) {
            resultDiv.classList.remove('hidden')
        }
    })


    autocomplete.addListener("place_changed", () => {
        resultDiv.classList.remove('hidden')

        const place = autocomplete.getPlace();
        console.log('place', place);

        // const urlParams = new URLSearchParams(window.location.search);
        // window.location.assign(`/area.html?place=${place.formatted_address}`)

        // urlParams.set('place', place.name);
        // window.location.search = urlParams;

        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });

}

window.initMap = initMap;



