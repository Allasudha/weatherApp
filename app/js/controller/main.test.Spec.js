describe("Controller: MainCtrl", function () {
  // load the controller's module
  beforeEach(module("weatherApp"));

  var MainCtrl, scope, rootScope, localStore, q;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $rootScope) {
    rootScope = $rootScope;
    q = $q;
    const mockSearchDetailsService = () => {
      const service = {
        search: () => {
          const res = {
            message: "accurate",
            cod: "200",
            count: 0,
            list: [],
          };
          var deferred = q.defer();
          deferred.resolve(res);
          return deferred.promise;
        },
      };
      return service;
    };

    rootScope = $rootScope;
    scope = $rootScope.$new();
    MainCtrl = $controller("MainCtrl", {
      searchDetails: mockSearchDetailsService(),
    });
    localStore = {};

    spyOn(window.localStorage, "getItem").and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, "setItem").and.callFake(
      (key, value) => (localStore[key] = value + "")
    );
  }));

  it("default unit must be imperial if not available in localstorage", function () {
    expect(MainCtrl.units).toBe("imperial");
  });

  it("setting of localstorage", function () {
    MainCtrl.city = "Mumbai";
    MainCtrl.buttonClick();
    expect(JSON.parse(localStore["weatherParams"]).city).toEqual("Mumbai");
  });

  it("invalid city", function (done) {
    MainCtrl.city = "xyz";
    MainCtrl.buttonClick();
    rootScope.$apply();
    expect(MainCtrl.notFoundError).toBe(true);
  });
});
