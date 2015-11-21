angular
  .module('example')
  .controller('TemplateController', function($scope, supersonic) {
   $scope.navbarTitle = "Create Template"; 
   $scope.template = {};
    $scope.submitForm = function(){
        var Itenerary = Parse.Object.extend("Itinerary"); 
        var itenerary = new Itenerary(); 
        
        itenerary.set("title",$scope.template.city); 
        // itenerary.set("country",$scope.template.country);
        // itenerary.set("date",$scope.template.date); 
        
        itenerary.save(null, {
            success: function(itenerary) {
                supersonic.logger.log("itenerary successfully saved!!!!");
         
                var view = new supersonic.ui.View("example#newItinerary");
                supersonic.ui.layers.push(view, {
                    params: {
                        id: itenerary.id
                    }
                   });
                        
            },
            error: function(itenerary, error) {
                supersonic.logger.log("itenerary failed to save");  
                supersonic.logger.log(error); 
            }
        }); 
    };

  });
