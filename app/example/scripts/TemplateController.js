angular
  .module('example')
  .controller('TemplateController', function($scope, supersonic) {
   $scope.navbarTitle = "Create Template"; 
   $scope.template = {}; 
   $scope.choices = [{id: 'TempChoice1',title: '',time: '',info: ''}]; 
   $scope.addNewChoice = function() {
         
    	var newItemNo = $scope.choices.length+1;
    	$scope.choices.push({'id':'choice'+newItemNo,title: '',time: '',info: ''});
};
	
	$scope.showAddChoice = function(choice) {
  		return choice.id === $scope.choices[$scope.choices.length-1].id;
};
    $scope.showChoiceLabel = function (choice) {
        return choice.id === $scope.choices[0].id;
        
};
    
    $scope.submitForm = function(){
          supersonic.logger.log($scope.choices);
          supersonic.logger.log($scope.template); 
        var Itenerary = Parse.Object.extend("Itenary"); 
        var itenerary = new Itenerary(); 
        
        itenerary.set("title",$scope.template.city); 
        itenerary.set("country",$scope.template.country);
        itenerary.set("date",$scope.template.date); 
        
        itenerary.save(null, {
            success: function(itenerary) {
                supersonic.logger.log("itenerary successfully saved!!!!");
                
                for (var i = 0; i < $scope.choices.length;i++){
                    var eventinfo = $scope.choices[i];
                    
                    var Event = Parse.Object.extend("Event"); 
                    var event = new Event(); 
                    
                    event.set("title",eventinfo.title);
                    event.set("parItenerary",itenerary); 
                    event.set("time",eventinfo.time);
                    event.set("info",eventinfo.info); 
                    
                    event.save(null, {
                        success: function(event) {
                            supersonic.logger.log("event successfully saved");
                        },
                        error: function(event, error){
                            supersonic.logger.log("event failed to save");
                        }
                    });
                }
                
            },
            error: function(itenerary, error) {
                supersonic.logger.log("itenerary failed to save");    
            }
        }); 
    };

  });
