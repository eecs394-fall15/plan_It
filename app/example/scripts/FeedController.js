angular
  .module('example')
  .controller('FeedController', function($scope, supersonic) {
    $scope.ites = null;


    supersonic.logger.log("feed log 1"); 
    supersonic.ui.views.current.whenVisible(function() {
        supersonic.logger.info("feed visible"); 
        var Itenary = Parse.Object.extend("Itinerary");
        var query = new Parse.Query(Itenary);
        query.find({
            success: function (results) {
            $scope.ites = results; 
            supersonic.logger.log("got ites for the feed"); 
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
        
    });
        
        
 });
    
});
