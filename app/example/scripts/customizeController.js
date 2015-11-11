angular
  .module('example')
  .controller('customizeController', function($scope, supersonic) {
  $scope.events = []; 

    
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
                eventQuery.equalTo("parIter", $scope.itenary.id); 
                eventQuery.find({
                    success: function(resultsE) {
                        var tempEvents = resultsE; 
                        var eventId = resultsE[2].id;
                        var breakfastEvent = tempEvents[2]; // object
                        
                        resultsE[0].suggs = []; // not making a difference 
                        resultsE[1].suggs = []; 
                        
                        var Suggestion = Parse.Object.extend("Suggestion"); 
                        var suggestionQuery = new Parse.Query(Suggestion); 
                        suggestionQuery.equalTo("parEventId", eventId);
                        suggestionQuery.find({
                            success: function(resultsSugg) {
                                
                                breakfastEvent.suggs = resultsSugg; 
                                
                                $scope.tree = breakfastEvent.suggs[0].get('title');
                                 $scope.tree2 = breakfastEvent.suggs[1].get('title');
                                
                               // $scope.tree = resultsSugg[0].get('title'); // yay 
                            },
                            error: function(error) { 
                                  supersonic.logger.log(error); 
                            }
                          
                        }); 
                        
                        $scope.events = tempEvents;
                        supersonic.logger.log(resultsE);
                        supersonic.logger.info(resultsE);    

                    },
                    error: function(error) {
                         supersonic.logger.log(error); 
                    }
                });
                        
     },
        error: function(error) {
        supersonic.logger.log("query failed");
        }  
        });
 });
  });
