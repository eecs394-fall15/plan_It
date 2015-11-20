angular
  .module('example')
  .controller('AdvisorInputController', function($scope, supersonic) {

    
    var eventId = null;
    $scope.curr_event =null;
    $scope.advisor={};
          
    supersonic.ui.views.current.params.onValue(function(in_eventId){
                                               eventId =in_eventId.id;
                                               });

    
    supersonic.ui.views.current.whenVisible(function() {
        
        
        var Event = Parse.Object.extend("Events");
        var query = new Parse.Query(Event);
        //var iternaryIdstr="1AtJcYGjFs";
        
        query.equalTo("objectId", eventId);
        
        //query.include("events.suggestions");
        //query.include("events.suggestions.tips"); 
        query.find({
            success: function(q_events) {
            
                supersonic.logger.log("event quieried");
                $scope.curr_event = q_events[0];
                
                 // var eventsObj=itinerary[0].get("events")
                     
                 //  $scope.events = eventsObj.sort(function(a,b){
                 //     a = new Date(a.get('time'));
                 //     b = new Date(b.get('time')); 
                 //      return a<b ? -1 : a>b ? 1 : 0;
                 // });
                        
     },
        error: function(error) {
        supersonic.logger.log("query failed");
        }  
        });

    });

    $scope.saveResponse = function  () {
      var Suggestions = Parse.Object.extend("Suggestions");
      var suggestion = new Suggestions();

      var Tip = Parse.Object.extend("Tip");
      var tip = new Tip();

      supersonic.logger.log("save Response callled"); 

      tip.set("title", $scope.advisor.tip);
      suggestion.set("title", $scope.advisor.suggestion);



      tip.save(null, {
            success: function(q_tip) {
              supersonic.logger.log("saved tip");   
                
            },
            error: function(q_tip, error) {
                
            }
      }); 

      suggestion.save(null, {
            success: function(q_sug) {
      
                supersonic.logger.log("saved suggestion");  
            },
            error: function(q_sug, error) {
                
            }
        }); 


      
      
    }

});
