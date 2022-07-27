function initMap() {
  const resultDiv = document.querySelector(".search_area--result");
  const btnSearch = document.querySelector(".btn-search");

  const resultAreaName = document.querySelector(".result-area-name");

  const input = document.getElementById("pac-input");

  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["(regions)"],
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  input.addEventListener("input", () => {
    const container = document.querySelector(".pac-container");
    container.classList.remove("pac-logo");
    const innerDiv = document.createElement("div");
    innerDiv.classList.add("inner");

    if (input.value.length == 0) {
      resultDiv.classList.add("hidden");
    }

    container.append(innerDiv);
    console.log("pac-container", container);
    console.log("autocomplete", autocomplete);
  });

  //=== show result  ===//
  const showResult = function (place) {
    resultAreaName.textContent = place.formatted_address;
  };

  btnSearch.addEventListener("click", function () {
    if (input.value.length > 0) {
      const place = autocomplete.getPlace();
      showResult(place);
      resultDiv.classList.remove("hidden");
    }
  });

  autocomplete.addListener("place_changed", () => {
    resultDiv.classList.remove("hidden");

    const place = autocomplete.getPlace();
    showResult(place);
    // console.log("place", place);

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
