angular
  .module('example')
  .controller('TipsController', function($scope,supersonic) {
    $scope.suggestion = null; 
    $scope.tips = []; 
    $scope.authors = [];
    
    supersonic.ui.views.current.params.onValue( function (passedSuggestion) {
        var suggestionId = passedSuggestion.id; 
        
        var Suggestion = Parse.Object.extend("Suggestions"); 
        var query = new Parse.Query(Suggestion); 
         query.equalTo("objectId",suggestionId);
         query.include("tips"); 
         query.include("tips.author"); 
            query.find({
                success: function(suggestion){
                   $scope.suggestion = suggestion[0]; 
                   $scope.tips = suggestion[0].get("tips"); 
                    
                },
                error: function(error){
                 supersonic.logger.log(error); 
                  
                }
            }); 
    });
});
