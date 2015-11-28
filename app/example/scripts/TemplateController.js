angular
  .module('example')
  .controller('TemplateController', function($scope, supersonic) {
   $scope.navbarTitle = "Create Template"; 
   $scope.template = {};
    
    //steroids.view.setBackgroundImage("/icons/backgroundTeal.png");
    steroids.view.setBackgroundColor("#5cd6d6");
    
    $scope.submitForm = function(){
        var Itenerary = Parse.Object.extend("Itinerary"); 
        var itenerary = new Itenerary(); 
        
        itenerary.set("title",$scope.template.city); 
        itenerary.set("author", Parse.User.current());
        itenerary.set("events",[]); 
        itenerary.set("published",false); 
        // itenerary.set("country",$scope.template.country);
        // itenerary.set("date",$scope.template.date); 
        
        itenerary.save(null, {
            success: function(itenerary) {
                supersonic.logger.log("itenerary successfully saved!!!!");
         
                var view = new supersonic.ui.View("example#customize");
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
    }
    
    $scope.goBack = function(){
        supersonic.ui.layers.pop();
    }

  });
