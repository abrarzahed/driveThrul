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
  const allData = {
    postcodes: [
      "E14",
      "E2",
      "E3",
      "E1",
      "E1W",
      "E12",
      "E13",
      "E15",
      "E16",
      "IG1",
      "IG4",
      "IG6",
      "IG2",
      "IG8",
      "E11",
      "IG3",
      "IG5",
      "RM6",
      "E18",
      "IG7",
      "E5",
      "E6",
      "E7",
      "E8",
      "E9",
    ],
    priceList: [
      {
        detail: "2 FULL Hour - Taster Lesson / £60",
        hour: 2,
        price: "£60",
        gearBox: "manual",
        id: 1,
      },
      {
        detail: "5 Hours - Block OFFER / £160",
        hour: 5,
        price: "£160",
        gearBox: "manual",
        id: 2,
      },
      {
        detail: "10 Hours - Block OFFER / £310",
        hour: 10,
        price: "£310",
        gearBox: "manual",
        id: 3,
      },
      {
        detail: "20 Hours - Block OFFER / £610",
        hour: 20,
        price: "£610",
        gearBox: "manual",
        id: 4,
      },
      {
        detail: "2 FULL Hour - Taster Lesson / £60",
        hour: 2,
        price: "£60",
        gearBox: "automatic",
        id: 5,
      },
      {
        detail: "5 Hours - Block OFFER / £160",
        hour: 5,
        price: "£160",
        gearBox: "automatic",
        id: 6,
      },
      {
        detail: "10 Hours - Block OFFER / £310",
        hour: 10,
        price: "£310",
        gearBox: "automatic",
        id: 7,
      },
      {
        detail: "20 Hours - Block OFFER / £610",
        hour: 20,
        price: "£610",
        gearBox: "automatic",
        id: 8,
      },
    ],
  };
  const se1Data = {
    postcodes: ["SE1"],
    priceList: [
      {
        detail: "2 FULL Hour - Taster Lesson / £60",
        hour: 2,
        price: "£160",
        gearBox: "manual",
        id: 1,
      },
      {
        detail: "5 Hours - Block OFFER / £160",
        hour: 5,
        price: "£260",
        gearBox: "manual",
        id: 2,
      },
      {
        detail: "10 Hours - Block OFFER / £310",
        hour: 10,
        price: "£1310",
        gearBox: "manual",
        id: 3,
      },
      {
        detail: "20 Hours - Block OFFER / £610",
        hour: 20,
        price: "£1610",
        gearBox: "manual",
        id: 4,
      },
      {
        detail: "2 FULL Hour - Taster Lesson / £60",
        hour: 2,
        price: "£160",
        gearBox: "automatic",
        id: 5,
      },
      {
        detail: "5 Hours - Block OFFER / £160",
        hour: 5,
        price: "£260",
        gearBox: "automatic",
        id: 6,
      },
      {
        detail: "10 Hours - Block OFFER / £310",
        hour: 10,
        price: "£1310",
        gearBox: "automatic",
        id: 7,
      },
      {
        detail: "20 Hours - Block OFFER / £610",
        hour: 20,
        price: "£1610",
        gearBox: "automatic",
        id: 8,
      },
    ],
  };

  let selectedArea = {};

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  input.addEventListener("input", (e) => {
    //=== remove google brand   ===//
    const container = document.querySelector(".pac-container");
    container.classList.remove("pac-logo");

    if (input.value.length == 0) {
      resultDiv.classList.add("hidden");
    }
  });

  //=== show result  ===//
  const showResult = function (area, isAreaAvailable) {
    resultDiv.classList.remove("hidden");

    if (isAreaAvailable) {
      resultAreaName.textContent = area.formatted_address;
      priceCardsManual.innerHTML = "";
      priceCardsAuto.innerHTML = "";

      if (area.name === "SE1") {
        se1Data.priceList
          .filter((a) => a.gearBox === "manual")
          .forEach((area) => {
            priceCardsManual.innerHTML += `
        <div class="gearbox-card">
        <span>${area.hour}</span>
        <span>Hours</span>
        <span>${area.price}</span>
        <a href="area.html" data-id = "${area.id}" class="gearbox-link">BOOK</a>
        </div>
        `;
          });

        se1Data.priceList
          .filter((a) => a.gearBox === "automatic")
          .forEach((area) => {
            priceCardsAuto.innerHTML += `
        <div class="gearbox-card">
        <span>${area.hour}</span>
        <span>Hours</span>
        <span>${area.price}</span>
        <a href="area.html" data-id = "${area.id}" class="gearbox-link">BOOK</a>
        </div>
        `;
          });
      } else {
        allData.priceList
          .filter((a) => a.gearBox === "manual")
          .forEach((area) => {
            priceCardsManual.innerHTML += `
        <div class="gearbox-card">
        <span>${area.hour}</span>
        <span>Hours</span>
        <span>${area.price}</span>
        <a href="area.html" data-id = "${area.id}" class="gearbox-link">BOOK</a>
        </div>
        `;
          });

        allData.priceList
          .filter((a) => a.gearBox === "automatic")
          .forEach((area) => {
            priceCardsAuto.innerHTML += `
        <div class="gearbox-card">
        <span>${area.hour}</span>
        <span>Hours</span>
        <span>${area.price}</span>
        <a href="area.html" data-id = "${area.id}" class="gearbox-link">BOOK</a>
        </div>
        `;
          });
      }

      const cardButtons = document.querySelectorAll(".gearbox-link");
      [...cardButtons].forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const selectedId = +btn.dataset.id;
          const selectedPackage = allData.priceList.find(
            (ar) => ar.id === selectedId
          );
          console.log(selectedPackage);
          localStorage.setItem(
            "selectedPackage",
            JSON.stringify(selectedPackage)
          );
          window.location.assign("area.html");
        });
      });

      resultDiv.classList.remove("not-found");
    } else {
      resultDiv.classList.add("not-found");
      resultAreaName.textContent = "Sorry we do not cover this area yet";
    }
  };

  //=== select area  ===//
  const selectArea = function (place) {
    const itemName = place.name;

    selectedArea = allData.postcodes.some((item) => {
      return itemName.startsWith(item + " ") || item === itemName;
    });
    if (itemName.includes("SE1")) {
      selectedArea = true;
    }

    if (!selectedArea) {
      showResult(undefined, false);
    } else {
      showResult(place, true);
    }
  };

  const tabBtnManual = document.querySelector(".tab-btn-manual");
  const tabBtnAuto = document.querySelector(".tab-btn-auto");

  const tabContentManual = document.querySelector(".manual-cards");
  const tabContentAuto = document.querySelector(".auto-cards");

  tabBtnManual.addEventListener("click", function () {
    this.classList.remove("disabled");
    tabBtnAuto.classList.add("disabled");

    tabContentManual.classList.remove("disabled");
    tabContentAuto.classList.add("disabled");
  });

  tabBtnAuto.addEventListener("click", function () {
    this.classList.remove("disabled");
    tabBtnManual.classList.add("disabled");

    tabContentAuto.classList.remove("disabled");
    tabContentManual.classList.add("disabled");
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    selectArea(place);
  });
}

window.initMap = initMap;
