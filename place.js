function initMap() {
  //=== dom selection  ===//
  const resultDiv = document.querySelector(".search_area--result");
  // const btnSearch = document.querySelector(".btn-search");
  const input = document.getElementById("pac-input");
  const resultAreaName = document.querySelector(".result-area-name");
  const priceCardsManual = document.querySelector(".manual-cards");
  const priceCardsAuto = document.querySelector(".auto-cards");

  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["(regions)"],
  };

  //=== data  ===//
  const postCodeAreaData = [
    {
      formattedAddress: "London SW1A, UK",
      areaName: "sw1a",
      price: "$120 for SW1a",
      info: "5 HOURS BLOCK BOOKING",
      auto: [
        { hour: 2, price: "$70" },
        { hour: 4, price: "$90" },
        { hour: 6, price: "$110" },
      ],
      manual: [
        { hour: 2, price: "$110" },
        { hour: 4, price: "$150" },
        { hour: 6, price: "$190" },
      ],
    },
    {
      formattedAddress: "Southall UB1, UK",
      areaName: "ub1",
      price: "$220 for UB1",
      info: "15 HOURS BLOCK BOOKING",
      auto: [
        { hour: 2, price: "$71" },
        { hour: 4, price: "$91" },
        { hour: 6, price: "$111" },
      ],
      manual: [
        { hour: 2, price: "$112" },
        { hour: 4, price: "$151" },
        { hour: 6, price: "$191" },
      ],
    },
    {
      formattedAddress: "Plymouth PL5, UK",
      areaName: "pl5",
      price: "$320 for PL5",
      info: "55 HOURS BLOCK BOOKING",
      auto: [
        { hour: 2, price: "$72" },
        { hour: 4, price: "$92" },
        { hour: 6, price: "$113" },
      ],
      manual: [
        { hour: 2, price: "$117" },
        { hour: 4, price: "$155" },
        { hour: 6, price: "$199" },
      ],
    },
  ];

  let selectedArea = {};

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  input.addEventListener("input", () => {
    //=== remove google brand   ===//
    const container = document.querySelector(".pac-container");
    container.classList.remove("pac-logo");

    if (input.value.length == 0) {
      resultDiv.classList.add("hidden");
      // selectedArea = {};
    }
  });

  //=== show result  ===//
  const showResult = function (area, isAreaAvailable) {
    resultDiv.classList.remove("hidden");

    if (isAreaAvailable) {
      resultAreaName.textContent = area.formattedAddress;
      priceCardsManual.innerHTML = "";
      priceCardsAuto.innerHTML = "";

      area.manual.forEach((area) => {
        priceCardsManual.innerHTML += `
        <div class="gearbox-card">
        <span>${area.hour}</span>
        <span>Hours</span>
        <span>${area.price}</span>
        <a href="#" class="gearbox-link">BOOK</a>
        </div>
        `;
      });

      area.auto.forEach((area) => {
        priceCardsAuto.innerHTML += `
        <div class="gearbox-card">
        <span>${area.hour}</span>
        <span>Hours</span>
        <span>${area.price}</span>
        <a href="#" class="gearbox-link">BOOK</a>
        </div>
        `;
      });

      resultDiv.classList.remove("not-found");
    } else {
      resultDiv.classList.add("not-found");
      resultAreaName.textContent = "Sorry we do not cover this area yet";
    }
  };

  //=== select area  ===//
  const selectArea = function (place) {
    selectedArea = postCodeAreaData.find(
      (item) => item.areaName == place.name.toLowerCase()
    );
    if (!selectedArea) {
      showResult(selectedArea, false);
    } else {
      showResult(selectedArea, true);
    }
    // console.log("selected area", selectedArea);
  };

  //=== select area by clicking on button  ===//
  /*
  btnSearch.addEventListener("click", function () {
    if (input.value.length > 0) {
      const place = autocomplete.getPlace();
      selectArea(place);
    }
  });
  */

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    selectArea(place);
    // console.log("place", place);

    //=== redirect  ===//
    /*
    const urlParams = new URLSearchParams(window.location.search);
    window.location.assign(`/area.html?place=${place.formatted_address}`)
    urlParams.set('place', place.name);
    window.location.search = urlParams;
    */

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
  });
}

window.initMap = initMap;
