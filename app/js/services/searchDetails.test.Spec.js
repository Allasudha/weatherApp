describe("service: searchDetailsService", function () {
  beforeEach(module("weatherApp"));
  var details;
  beforeEach(inject(function (searchDetails) {
    details = searchDetails;
  }));

  it("test service", function () {
    var params = {
      city: "Mumbai",
      units: "imperial",
    };
    var result, error;
    details
      .search(params)
      .success(function (data) {
        result = data;
      })
      .error(function (e) {
        error = e;
      })
      .finally(function () {
        expect(result.city.name).toBe("Mumbai");
      });
  });
});
