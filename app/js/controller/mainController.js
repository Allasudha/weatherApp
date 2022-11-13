angular
  .module("weatherApp")
  .controller("MainCtrl", function (searchDetails, $uibModal) {
    var search = this;
    search.units =
      JSON.parse(localStorage.getItem("weatherParams"))?.units || "imperial";
    search.city = JSON.parse(localStorage.getItem("weatherParams"))?.city;

    search.buttonClick = function () {
      search.reset();
      localStorage.setItem(
        "weatherParams",
        JSON.stringify({
          units: search.units,
          city: search.city,
        })
      );
      const kd = searchDetails.search(search);
      kd.then((data) => console.log(data)).catch((e) => console.log(e));
      searchDetails
        .search(search)
        .then(function (response) {
          const data = response.data;
          search.notFoundError = false;
          search.unitFlag = search.units === "metric" ? "°C" : "°F";
          if (!data.count) {
            search.notFoundError = true;
          } else {
            var weathers = data.list;
            search.weatherDataGroupedByCountry = _.mapValues(
              _.groupBy(weathers, "sys.country"),
              (list) => list.map((weather) => _.omit(weather, "sys.country"))
            );
            if (Object.keys(search.weatherDataGroupedByCountry).length > 1) {
              search.openModal();
            } else {
              search.weatherData = Object.values(
                search.weatherDataGroupedByCountry
              )[0][0];
            }
          }
        })
        .catch(function (error) {
          search.notFoundError = true;
        });
    };

    search.reset = function () {
      search.weathers = null;
      search.weatherDataGroupedByCountry = null;
      search.weatherData = null;
      search.notFoundError = false;
    };

    search.byCountry = function (country) {
      search.weatherData = search.weatherDataGroupedByCountry[country][0];
    };

    search.openModal = function () {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "/app/templates/countrySelectionModal.html",
        controller: "ModalInstanceCtrl",
        controllerAs: "modal",
        resolve: {
          search: function () {
            return search;
          },
        },
      });
    };
  });
