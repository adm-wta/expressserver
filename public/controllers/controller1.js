var module = angular.module("MyApp", ['ngRoute']);

module.config(function($routeProvider) {

   $routeProvider
       .when('/', {
            templateUrl: 'pages/home.html',
           controller:'homeController'
       })
       .when ('/pages/about', {
            templateUrl:'pages/about.html',
            controller: 'aboutController'

       })
       .when ('/pages/register', {
        templateUrl:'pages/register.html',
        controller: 'registerController'

        })
       .when('/register/:subject', {
        templateUrl: 'pages/register.html',
        controller: 'registerController'
        })
       .otherwise ({

       templateUrl:'pages/routeNotFound.html',
        controller: 'notFoundController'
   });

});

module.controller('homeController', function ($scope) {
    $scope.message = 'Welcome to my web front end built with Angular & Bootstrap';
});

module.controller('aboutController', function ($scope) {
    $scope.message = 'Find out more about me.';
});

module.controller('registerController', function ($scope, $routeParams, memberDataStoreService) {

    var subject = "";
    if($routeParams ['subject'] == "interesting") {
        subject = "I want the interesting letter";
    }
    else if ($routeParams ['subject'] == "boring") {

        subject = "I want the boring letter";
    }

    $scope.subject = subject;

    $scope.message = 'Register';
    $scope.person = {};
    $scope.person.newsletterOptIn = false;
    $scope.person.channels = [
        {value: "television",label: "Television"},
        {value: "radio",label: "Radio"},
        {value: "social-media",label: "Social Media"},
        {value: "other",label: "Other"}
    ];
    $scope.register = function () {

        $scope.firstNameInvalid = false;
        $scope.lastNameInvalid = false;
        $scope.emailInvalid = false;
        $scope.researchInvalid = false;
        $scope.showSuccessMessage = false;
        $scope.showErrorMessage = false;



        if(!$scope.registrationForm.firstName.$valid){
            $scope.firstNameInvalid = true;
        }

        if(!$scope.registrationForm.lastName.$valid){
            $scope.lastNameInvalid = true;
        }
        if (!$scope.registrationForm.email.$valid) {
            $scope.emailInvalid = true;
        }

        if (!$scope.registrationForm.research.$valid) {
            $scope.researchInvalid = true;
        }

        if($scope.registrationForm.$valid){

            $scope.working = true;

            var promise = memberDataStoreService.doRegistration($scope.person);
            promise.success(function (data, status) {
                $scope.showSuccessMessage = true;
            });
            promise.error(function (data, status) {
                $scope.showErrorMessage = true;
            });
            promise.finally(function () {
                $scope.working = false;
            });




            $scope.doShow = true;

        }

    };  //end register function



});

module.controller('notFoundController', function ($scope, $location) {

    $scope.message = 'There seems to be a problem finding the page you wanted';
    $scope.attemptedPath = $location.path();
});














module.factory('memberDataStoreService', function ($http) {

    var memberDataStore = {};

    memberDataStore.doRegistration = function (theData) {
        var promise = $http({method: 'POST', url: 'memberservices/register', data: theData});
        return promise;
    }

    return  memberDataStore;

});




