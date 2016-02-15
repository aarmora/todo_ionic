// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'firebase'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});

(function(){

  var homeController = function ($scope, $http, $firebaseArray){
        var ref = new Firebase("https://todo-aarmora.firebaseio.com/");
        $scope.list = $firebaseArray(ref); 

        //Let's check whether we need to show all or just those not completed
        $scope.toShow = function(){
          if($scope.showAll)
            return {};
          else
            return {"completed":false};
        }

        //Sync it with firebase
        $scope.addItem = function(task){
          $scope.list.$add({"task": task, "completed": false});
        };

        //Add a new task to firebase
        $scope.saveData = function(item){
          $scope.list.$save(item);
        }

    };
    homeController.$inject = ['$scope', '$http', '$firebaseArray'];
    app.controller('homeController', homeController); 
    

}());