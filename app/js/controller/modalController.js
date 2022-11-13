angular
  .module("weatherApp")
  .controller("ModalInstanceCtrl", function ($uibModalInstance, search) {
    var modal = this;
    modal.search = search;

    modal.byCountry = function (country) {
      $uibModalInstance.dismiss("cancel");
      search.weatherData = search.weatherDataGroupedByCountry[country][0];
    };
  });
