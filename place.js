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
      postcodes: ["E14", "E2", "E3", "E1", "E1W"],
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
          gearBox: "automatic",
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
          gearBox: "automatic",
          id: 4,
        },
      ],
    },
    {
      postcodes: ["E12", "E13", "E15", "E16"],
      priceList: [
        {
          detail: "2 FULL Hour - Taster Lesson / £160",
          hour: 2,
          price: "£160",
          gearBox: "manual",
          id: 1,
        },
        {
          detail: "5 Hours - Block OFFER / £160",
          hour: 5,
          price: "£1160",
          gearBox: "automatic",
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
          gearBox: "automatic",
          id: 4,
        },
      ],
    },
    {
      postcodes: [
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
      ],
      priceList: [
        {
          detail: "2 FULL Hour - Taster Lesson / £260",
          hour: 2,
          price: "£260",
          gearBox: "manual",
          id: 1,
        },
        {
          detail: "5 Hours - Block OFFER / £160",
          hour: 5,
          price: "£2160",
          gearBox: "automatic",
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
          price: "£2610",
          gearBox: "automatic",
          id: 4,
        },
      ],
    },
    {
      postcodes: ["E5", "E6", "E7", "E8", "E9"],
      priceList: [
        {
          detail: "2 FULL Hour - Taster Lesson / £260",
          hour: 2,
          price: "£260",
          gearBox: "manual",
          id: 1,
        },
        {
          detail: "5 Hours - Block OFFER / £160",
          hour: 5,
          price: "£2160",
          gearBox: "automatic",
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
          price: "£2610",
          gearBox: "automatic",
          id: 4,
        },
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
    }
  });

  //=== show result  ===//
  const showResult = function (area, isAreaAvailable) {
    resultDiv.classList.remove("hidden");

    if (isAreaAvailable) {
      resultAreaName.textContent = area.formattedAddress;
      priceCardsManual.innerHTML = "";
      priceCardsAuto.innerHTML = "";

      area.priceList
        .filter((ar) => ar.gearBox === "manual")
        .forEach((area) => {
          priceCardsManual.innerHTML += `
        <div class="gearbox-card">
        <span>${area.hour}</span>
        <span>Hours</span>
        <span>${area.price}</span>
        <a  href="area.html" data-id = "${area.id}" class="gearbox-link">BOOK</a>
        </div>
        `;
        });

      area.priceList
        .filter((ar) => ar.gearBox === "automatic")
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

      const cardButtons = document.querySelectorAll(".gearbox-link");
      [...cardButtons].forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const selectedId = +btn.dataset.id;
          const selectedPackage = area.priceList.find(
            (ar) => ar.id === selectedId
          );
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
    console.log("place", place);
    selectedArea = postCodeAreaData.find((item) =>
      item.postcodes.includes(place.name)
    );
    if (!selectedArea) {
      showResult(selectedArea, false);
    } else {
      selectedArea.formattedAddress = place.formatted_address;
      showResult(selectedArea, true);
    }
    console.log("selected area", selectedArea);
  };

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    selectArea(place);

    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
  });
}

window.initMap = initMap;
