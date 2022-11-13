angular.module("weatherApp").factory("searchDetails", function ($http) {
  var searchService = this;
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/find?appid=1cb6ace31e50401f28b864f0b23fdc68";
  var params = {};
  searchService.search = function (search) {
    var url = apiUrl;
    if (search && search.city) {
      params.q = search.city;
      params.units = search.units;

      for (const [key, value] of Object.entries(params)) {
        url += "&" + key + "=" + value;
      }
      return $http.get(url);
    }
  };

  return { search: searchService.search };
});
