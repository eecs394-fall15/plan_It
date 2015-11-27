angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {
    $scope.iterneraries = null;
    
    // steroids.view.setBackgroundImage("/icons/backgroundTeal.png");
    steroids.view.setBackgroundColor("#5cd6d6");

        supersonic.ui.views.current.whenVisible(function() {

        var Itenary = Parse.Object.extend("Itinerary");
        var query = new Parse.Query(Itenary);
        query.equalTo(author,Parse.User.current());
        query.find({
            success: function (results) {
            $scope.iterneraries = results; 
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
        
        });
        
        
 });
    
});
