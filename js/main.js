'use strict';
var app = angular.module('beerSPA', []);

app.controller('beerControl', function ($scope, $http) {

  // Set up variables
  var apiKey = 'c18f83196bd4532eead800cd4e38ca1d';


  // Angular Variables
  $scope.pageData = "failed";

  $scope.data = function () {

    $http({
      method: 'GET',
      url: "http://api.brewerydb.com/v2/?key=" + apiKey,
      headers: {
        'Content-Type': 'application/json'

      }
    }).then(successCallBack, errorCallBack);





  } // end of $scope.data


  function successCallBack(response) {

    $scope.pageData = data;
    //console.log("success", response);

  };

  function errorCallBack(err) {

    console.log("error", err);


    // generic catch
    if (err.status == 503 || err.status == 403) {
      $scope.errModal();
    }
  };


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