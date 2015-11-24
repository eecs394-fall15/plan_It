angular
  .module('example')
  .controller('HomeController', function($scope, supersonic) {
 //    $scope.iterneraries = null;

 //        supersonic.ui.views.current.whenVisible(function() {

 //        var Itenary = Parse.Object.extend("Itinerary");
 //        var query = new Parse.Query(Itenary);
 //        query.find({
 //            success: function (results) {
 //            $scope.iterneraries = results; 
 //    },
 //    error: function (error) {
 //        alert("Error: " + error.code + " " + error.message);
 //    }
        
 //        });
        
        
 // });



  $scope.currUser = Parse.User.current().id;
  supersonic.logger.log("yo id is "+$scope.currUser);




  supersonic.ui.views.current.whenVisible(function() {

       $scope.currUser = Parse.User.current().id;
  supersonic.logger.log("yo id is "+$scope.currUser);
    
});


});
