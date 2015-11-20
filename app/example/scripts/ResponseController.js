angular
  .module('example')
  .controller('ResponseController', function($scope, supersonic) {

    $scope.events = [];
    var itineraryId = null;
    $scope.listLimit = 2;          
    supersonic.ui.views.current.params.onValue(function(itinerary_id){
                                               itineraryId =itinerary_id.id;
                                               });

    
    supersonic.ui.views.current.whenVisible(function() {
        supersonic.logger.log("f1 called");
        
        var Itenary = Parse.Object.extend("Itinerary");
        var query = new Parse.Query(Itenary);
        //var iternaryIdstr="1AtJcYGjFs";
        
        query.equalTo("objectId", itineraryId);
        query.include("events");
        //query.include("events.suggestions");
        //query.include("events.suggestions.tips"); 
        query.find({
            success: function(itinerary) {
            supersonic.logger.log("iternary queried successfully");   
                
                $scope.itenary = itinerary[0];
                
                 var eventsObj=itinerary[0].get("events")
                     
                  $scope.events = eventsObj.sort(function(a,b){
                     a = new Date(a.get('time'));
                     b = new Date(b.get('time')); 
                      return a<b ? -1 : a>b ? 1 : 0;
                 });
                        
     },
        error: function(error) {
        supersonic.logger.log("query failed");
        }  
        });

    });

    $scope.saveSuggestion = function  (suggestionId) {
      var Suggestions = Parse.Object.extend("Suggestions");
      var suggestions = new Suggestions();
      $scope.sug_isSaved=false;
      
      
      var query = new Parse.Query(Suggestions);

      query.equalTo("objectId", suggestionId);



      query.find({
            success: function(sug) {
            supersonic.logger.log("found the sug"); 
            supersonic.logger.log(sug); 

            sug[0].set("isSaved",true);
            supersonic.logger.log("set isSaved");
            sug[0].save(null, {
              success: function(sug1) {
                // Now let's update it with some new data. In this case, only cheatMode and score
                // will get sent to the cloud. playerName hasn't changed.
                supersonic.logger.log("sug saved ");
              }
            });
                
                
                        
      },
        error: function(error) {
        supersonic.logger.log("query fsdfba failed");
        }  
      });

      
      
    }

});
