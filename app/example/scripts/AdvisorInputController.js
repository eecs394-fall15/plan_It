angular
  .module('example')
  .controller('AdvisorInputController', function($scope, supersonic) {

    
    $scope.eventId = null;
    $scope.curr_event =null;
    $scope.advisor={};
    $scope.suggestions=[];
          
    supersonic.ui.views.current.params.onValue(function(in_eventId){
                                               $scope.eventId =in_eventId.id;
                                               });

    
    supersonic.ui.views.current.whenVisible(function() {
        
        
        var Event = Parse.Object.extend("Events");
        var query = new Parse.Query(Event);
        
        query.equalTo("objectId", $scope.eventId);
        
        query.include("suggestions");
        //query.include("events.suggestions.tips"); 
        query.find({
            success: function(q_events) {
            
                supersonic.logger.log("event quieried");
                $scope.curr_event = q_events[0];
                var curr_suggs = q_events[0].get('suggestions'); 
                
            for (var i = 0; i < curr_suggs.length; i++){
                var sug = curr_suggs[i];
		     	curr_sugg = {};
		     	curr_sugg.title = sug.get('title');
		     	curr_sugg.id = i;
		     	curr_sugg.objectid = sug.id;
		     	$scope.suggestions.push(curr_sugg);
		     }
		     $scope.selected =null;
                        
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

      tip.set("title", $scope.advisor.tip);
      tip.set("authorId","9tc4bwB16S");
      //tip.set("author",);


      tip.save(null, {
            success: function(q_tip) {
              supersonic.logger.log("saved tip");   
                
            },
            error: function(q_tip, error) {
                
            }
      }); 

     if ($scope.advisor.suggestion){
             suggestion.set("title", $scope.advisor.suggestion);
             suggestion.set("isSaved", false);
             suggestion.addUnique("tips",tip);


              suggestion.save(null, {
                    success: function(q_sug) {
                        supersonic.logger.log("saved suggestion");  
                        
                        var Event = Parse.Object.extend("Events");
                        var query = new Parse.Query(Event);
                        query.equalTo("objectId", $scope.eventId);
                        query.find({
                            success: function(q_events) {
                                var current_event = q_events[0];
                                current_event.addUnique("suggestions",q_sug);
                                current_event.save();    
                         },
                            error: function(error) {
                            supersonic.logger.log("query q_events failed");
                            }  
                            });
                    },
                    error: function(q_sug, error) {

                    }
              });
       }
        else {        // saving tip to existing suggestions
            var query = new Parse.Query("Suggestions");
            var suggindex = $scope.selected.id;
            var objid = $scope.suggestions[suggindex].objectid;
            query.equalTo("objectId", objid);
            query.find({
                success: function(result){
                    result[0].addUnique("tips",tip);
                    result[0].save(); 
                },
                error: function(err){
                }
            });
        }

      supersonic.ui.layers.pop();
      
    }

});