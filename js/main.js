'use strict';
var app = angular.module('beerSPA', []);

/// TBP = Time Based Problem, cannot solve given the lack of time to do so.

/** Commit Info 11/3/18
As of 5:00pm, the API key has not been unlocked and as such no further code was structured at this time.
The API was requested at 11am or so, and Code was started at 2:30pm.
Expected data formatting is partly known as the API suggests far too much data for what is needed,
testing will be required on a working API */

app.controller('beerControl', function ($scope, $http, $timeout) {

  // Set up variables
  var apiKey = 'c18f83196bd4532eead800cd4e38ca1d';


  // Angular Variables
  $scope.beerData = "Loading";



  //Grab all the Beer - TBP (As of this commit, the API key is not unlocked, will await)
  $scope.data = function () {

    $http({
      method: 'GET',
      url: "http://api.brewerydb.com/v2/?key=" + apiKey,
      headers: { 'Content-Type': 'application/json' }
    }).then(successCallBack, errorCallBack);
  } // end of $scope.data


  // In order to create dynamic labelling or any other adjustments to data
  $scope.formatData = function () {
    console.log("DataCheck", $scope.beerData);
    // what if abuMin and or ibuMax are undefined? - TBP
    $scope.beerData.stats = [{ name: "ABV", ave: Number($scope.beerData.abv) },
    { name: "IBU", ave: (Number($scope.beerData.style.ibuMin) + Number($scope.beerData.style.ibuMax)) / 2 },
    { name: "SRM", ave: (Number($scope.beerData.style.srmMin) + Number($scope.beerData.style.srmMax)) / 2 },
    { name: "OG", ave: Number($scope.beerData.style.ogMin) }];
  }

  // If the 
  function successCallBack(response) {

    $scope.beerData = reponse.data.data;
    //console.log("success", response);

    $scope.formatData();

  };

  function errorCallBack(err) {

    console.log("error", err);

    $http.get("./data/beermock.json")
      .then(function (response) {
        $scope.beerData = response.data.data;


      }).then(function () {

        $scope.formatData();
      });



    // generic catch
    if (err.status == 503 || err.status == 403) {
      $scope.errModal();
    }
  };

  $scope.init = function () {

    $scope.data();

    //your code
  }

  $timeout($scope.init)


});


angular.module('beerSPA').directive('jsonText', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attr, ngModel) {
      function into(input) {
        return JSON.parse(input);
      }
      function out(data) {
        return JSON.stringify(data);
      }
      ngModel.$parsers.push(into);
      ngModel.$formatters.push(out);

    }
  };
});