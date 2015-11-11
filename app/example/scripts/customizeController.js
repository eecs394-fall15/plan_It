angular
  .module('example')
  .controller('SettingsController', function($scope, supersonic) {
    $scope.navbarTitle = "Settings";
    $scope.events = []; 
    $scope.suggestions = {};
    $scope.eventswsugs=[];
    
    $scope.findSuggestions = function(eventId) {
        supersonic.logger.info(eventId); 
        supersonic.logger.log("finding sugs"); 
        var Suggestion = Parse.Object.extend("Suggestion"); 
        var suggestionQuery = new Parse.Query(Suggestion); 
        suggestionQuery.equalTo("parEventId", eventId);
        suggestionQuery.find({
            success: function(allsuggestions){
                supersonic.logger.log(allsuggestions);
                for(var j=0; j< $scope.eventswsugs.length;j++){
                    if($scope.eventswsugs[j].events_id == eventId){
                        
                        $scope.eventswsugs[j].events_sug=allsuggestions;
                        
                    }
                }
                
                //$scope.eventswsugs.push({events_id:eventId,events_sug:allsuggestions})
                
//                
//                for (var i = 0; i < $scope.events.length;i++){
//                    var e = $scope.events[i];
//                    if (e.id == eventId) {
//                        e.suggestions = allsuggestions; 
//                          supersonic.logger.log(e);
//                    }
//                }
//           
                
            },
            error: function(error){
                
            }
        });
    };
    
    supersonic.ui.views.current.whenVisible(function() {
        supersonic.logger.log("f1 called");
        var Itenary = Parse.Object.extend("Itenary");
        var query = new Parse.Query(Itenary);
        var iternaryIdstr="AzXTi8GA53";
        query.equalTo("objectId", iternaryIdstr);
        query.find({
            success: function(results) {
            supersonic.logger.log("queried successfully");
            supersonic.logger.info("queried successfully");    
                
            // Do something with the returned Parse.Object values
                $scope.itenary = results[0];
                supersonic.logger.log(results);
                
                var Event = Parse.Object.extend("Event"); 
                var eventQuery = new Parse.Query(Event); 
                eventQuery.equalTo("parIter", iternaryIdstr); 
                eventQuery.find({
                    success: function(resultsE) {
                        for (var i=0; i<resultsE.length;i++){
                            $scope.eventswsugs.push({events_id:resultsE[i],events_sug:[]});
                        }
                        
                        $scope.events = resultsE; 
                        supersonic.logger.log(resultsE);
                        supersonic.logger.info(resultsE);    

                    },
                    error: function(error) {
                    }
                });
                        
     },
        error: function(error) {
        supersonic.logger.log("query failed");
        }  
        });
        
        
 });
  });
