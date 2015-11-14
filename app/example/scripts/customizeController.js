angular
  .module('example')
  .controller('customizeController', function($scope, supersonic) {

    $scope.events = []; 

    
    supersonic.ui.views.current.whenVisible(function() {
        supersonic.logger.log("f1 called");
        
        var Itenary = Parse.Object.extend("Itinerary");
        var query = new Parse.Query(Itenary);
        var iternaryIdstr="1AtJcYGjFs";
        
        query.equalTo("objectId", iternaryIdstr);
        query.include("events");
        query.include("events.suggestions");
        query.include("events.suggestions.tips"); 
        query.find({
            success: function(itinerary) {
            supersonic.logger.log("queried successfully");   
                
                $scope.itenary = itinerary[0];
                supersonic.logger.log(itinerary);
                 supersonic.logger.info(itinerary);
                 $scope.events=itinerary[0].get("events");
                        
     },
        error: function(error) {
        supersonic.logger.log("query failed");
        }  
        });
 });
  });
