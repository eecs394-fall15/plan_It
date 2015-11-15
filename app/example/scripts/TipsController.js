angular
  .module('example')
  .controller('TipsController', function($scope,supersonic) {
    $scope.suggestion = null; 
    $scope.tips = []; 
    
    supersonic.ui.views.current.params.onValue( function (passedSuggestion) {
      $scope.suggestion = JSON.parse(passedSuggestion.id); 
        var tipsObj = JSON.parse(passedSuggestion.id).tips;
        for (var i = 0; i < tipsObj.length;i++){
            var tipObj = tipsObj[i];
            var tipAuthor = tipObj.authorId;
           
            var User = Parse.Object.extend("_User"); 
             var query = new Parse.Query(User); 
            
            query.equalTo("objectId",tipAuthor); 
            query.find({
                success: function(user){
                    tipObj.author = user[0].get("username"); 
                    supersonic.logger.log(tipObj);
                },
                error: function(error){
                 supersonic.logger.log(error);    
                }
            }); 
            $scope.tips.push(tipObj);
        }
    });
});
