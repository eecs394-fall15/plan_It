angular
  .module('example')
  .controller('NewEventController', function($scope,supersonic) {
    $scope.event={};
    $scope.ideas=[{title:"breakfast",id:0},{title:"amusement parks",id:1}];
    $scope.selected = $scope.ideas[0];
    
     // steroids.view.setBackgroundImage("/icons/backgroundTeal.png");
    steroids.view.setBackgroundColor("#5cd6d6");
    
    supersonic.ui.views.current.params.onValue( function (itineraryId) {
        $scope.itinerary = itineraryId.id; 
    });
    
    $scope.submitEvent = function(){
        
        var dbevent = Parse.Object.extend("Events"); 
        var newEvent = new dbevent(); 
        if ($scope.event.title){
            newEvent.set("title", $scope.event.title);
        }
        else{
            var eventindex = $scope.selected.id;
            var eventobj = $scope.ideas[eventindex];
            newEvent.set("title",eventobj.title); 
        }
        newEvent.set("time", $scope.event.time); 
        newEvent.set("listLimit",2); 
        newEvent.set("additional",$scope.event.additional); 
        newEvent.set("suggestions",[]);
        newEvent.set("author", Parse.User.current());
        newEvent.set("published",false);
        newEvent.set("responders",[]); 
        newEvent.set("isChosen",false);  
        newEvent.set("itineraryId",$scope.itinerary);
        
        
        newEvent.save(null, {
            success: function(savedEvent){   // event object

                var query = new Parse.Query("Itinerary"); 
                query.equalTo("objectId",$scope.itinerary);
                query.find({
                    success: function(savedItin){
                        savedItin[0].addUnique("events",savedEvent);
                        savedItin[0].save(); 
                        
                var view = new supersonic.ui.View("example#customize");       
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
