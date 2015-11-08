angular
  .module('example')
  .controller('customizeController', function($scope, supersonic) {
    $scope.navbarTitle = "Settings";
    
    supersonic.ui.views.current.whenVisible(function() {
        supersonic.logger.log("f1 called");
        var Itenary = Parse.Object.extend("Itenary");
        var query = new Parse.Query(Itenary);
        query.equalTo("objectId", "AzXTi8GA53");
        query.find({
            success: function(results) {
            supersonic.logger.log("queried successfully");
            // Do something with the returned Parse.Object values
                $scope.itenary = results[0];
                supersonic.logger.log(results);
     },
        error: function(error) {
        supersonic.logger.log("query failed");
        }  
        });
        
        
 });
  });
