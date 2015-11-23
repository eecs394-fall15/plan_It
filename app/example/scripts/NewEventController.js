angular
  .module('example')
  .controller('NewEventController', function($scope,supersonic) {
    $scope.event={};
    
    supersonic.ui.views.current.params.onValue( function (itineraryId) {
        $scope.itinerary = itineraryId.id; 
    });
    
    $scope.submitEvent = function(){
        
        var dbevent = Parse.Object.extend("Events"); 
        var newEvent = new dbevent(); 
        newEvent.set("title", $scope.event.title); 
        newEvent.set("time", $scope.event.time); 
        newEvent.set("listLimit",2); 
        newEvent.set("additional",$scope.event.additional); 
        newEvent.set("suggestions",[]);
        
        newEvent.save(null, {
            success: function(savedEvent){

                var itinerary = Parse.Object.extend("Itinerary"); 
                var query = new Parse.Query(itinerary); 
                query.equalTo("objectId",$scope.itinerary);
                query.find({
                    success: function(savedItin){
                        savedItin[0].addUnique("events",savedEvent);
                        savedItin[0].save(); 
                        
                var view = new supersonic.ui.View("example#newItinerary");
                supersonic.ui.layers.push(view, {
                    params: {
                        id: $scope.itinerary
                    }
                   });
                    },
                    error: function(error){
                     supersonic.logger.log(error); 

                    }
            }); 
            },
            error: function(error){
            }
        }); 
    }
    
    $scope.back = function(){
        supersonic.ui.layers.pop();
    }
});
