angular
  .module('example')
  .controller('AdvisorInputController', function($scope, supersonic) {

    
    $scope.eventId = null;
    $scope.curr_event =null;
    $scope.advisor={};
    $scope.suggestions=[];
    $scope.inputInfo = {};
    $scope.responded = {value:false};
    
     // steroids.view.setBackgroundImage("/icons/backgroundTeal.png");
    steroids.view.setBackgroundColor("#5cd6d6");
          
    supersonic.ui.views.current.params.onValue(function(sentvals){
        $scope.eventId =sentvals.eventid;
        $scope.itineraryId = sentvals.itinid;                                
    });

    
    supersonic.ui.views.current.whenVisible(function() {
        
        
        // querying to get currentEvent obj and that event's existing suggestions 
        var Event = Parse.Object.extend("Events");
        var query = new Parse.Query(Event);
        
        query.equalTo("objectId", $scope.eventId);
        
        query.include("suggestions");
        //query.include("events.suggestions.tips"); 
        query.find({
            success: function(q_events) {
            
                $scope.curr_event = q_events[0];
                $scope.allResponders = q_events[0].get("responders"); 
                
                

                
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
                    
        // check if user already has existing input for this event
    if ($scope.allResponders.length > 0) { 
        if ($scope.allResponders.indexOf(Parse.User.current().id) > -1) { //////////// Change from hardcoded 
            $scope.responded.value = true; 
            
            var squery = new  Parse.Query("Suggestions");
            //squery.equalTo("authorId", "9tc4bwB16S");       //////////// Change from hardcoded 
            squery.equalTo("authorId", Parse.User.current().id);
            squery.equalTo("itineraryId",$scope.itineraryId); 
            squery.find({
                success: function(result){
                  $scope.inputInfo.sugg = result[0].get("title"); 
                    supersonic.logger.log(result); 
                },
                error: function(err){
                }
            }); 
            
            var tquery = new Parse.Query("Tip");
            //tquery.equalTo("authorId", "9tc4bwB16S");       //////////// Change from hardcoded 
            tquery.equalTo("authorId", Parse.User.current().id);  
            tquery.equalTo("itineraryId",$scope.itineraryId); 
            tquery.find({
                success: function(result){
                  $scope.inputInfo.tip = result[0].get("title"); 
                    supersonic.logger.log("tip"+result); 
                },
                error: function(err){
                }
            }); 
        }  
    }
              
     },
        error: function(error) {
        supersonic.logger.log("query failed");
        }  
        });

    });
    
    $scope.changeSugg = function() {
       $scope.responded.value = false;
        $scope.$apply();
        supersonic.logger.log("CLICKED!!!!!!!!"+$scope.responded.value); 
       
    }

    $scope.saveResponse = function  () {
        
        
        var tip_query = new Parse.Query("Tip");
            tip_query.equalTo("authorId", Parse.User.current().id);
            tip_query.equalTo("eventid",$scope.eventId); 
            tip_query.find({
                success: function(tip_r){
                    tip_arr = tip_r;
                    
                     if (tip_arr.length > 0){ // if past entry for tip, resave existing entry 
                         tip_r[0].set('title',$scope.advisor.tip);
                         tip_r[0].save();
                     }
                    
                },
                error: function(err){
                }
            }); 
        
        
        
        if (tip_arr.length == 0){
        
        
        
        
        
      var Suggestions = Parse.Object.extend("Suggestions");
      var suggestion = new Suggestions();

      var Tip = Parse.Object.extend("Tip");
      var tip = new Tip();

      tip.set("title", $scope.advisor.tip);
      tip.set("authorId",Parse.User.current().id); 
      tip.set("published",false); 
      tip.set("itineraryId", $scope.itineraryId);
      tip.set("eventid",$scope.eventId); 
      tip.set("author",Parse.User.current());


      tip.save(null, {
            success: function(q_tip) {
              supersonic.logger.log("saved tip");   
                
            },
            error: function(q_tip, error) {
                
            }
      }); 

     if ($scope.advisor.suggestion){   // If user entered a new suggestion 
         supersonic.logger.log("new suggestion input"); 
             suggestion.set("title", $scope.advisor.suggestion);
             suggestion.set("isSaved", false);
             suggestion.addUnique("tips",tip);
             suggestion.set("published",false); 
             suggestion.set("itineraryId", $scope.itineraryId); 
             suggestion.set("eventid",$scope.eventId);
             suggestion.set("author",Parse.User.current());
            suggestion.set("authorId",Parse.User.current().id); 


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
                                //current_event.addUnique("responders","9tc4bwB16S"); //////// change from hardcoded 
                                current_event.addUnique("responders",Parse.User.current().id);
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
    }
      supersonic.ui.layers.pop();
      
    }

});
