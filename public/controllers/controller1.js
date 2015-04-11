var app = angular.module("app", []);

app.controller("controller1", function($scope) {

    var person = {
        firstName:"",
        lastName:"",
        age: 21,
        address:{
            street: '16 Somewhere Drive',
            suburb: 'Port Kennedy',
            state:  'Western Australia'
        }
    }

    $scope.person = person;



});
