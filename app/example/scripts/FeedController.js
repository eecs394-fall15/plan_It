angular
  .module('example')
  .controller('FeedController', function($scope, supersonic) {
    $scope.ites = null;
    
     // steroids.view.setBackgroundImage("/icons/backgroundTeal.png");
    steroids.view.setBackgroundColor("#5cd6d6");

    supersonic.ui.views.current.whenVisible(function() {
        
        supersonic.logger.log("feedcontroller");
        
        var query = new Parse.Query("Itinerary");
        query.notEqualTo("author", Parse.User.current());
        query.find({
            success: function (results) {
                supersonic.logger.log("feedcontroller successful query");
            $scope.ites = results;  
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
        
    });
        
        
 });
    
});
