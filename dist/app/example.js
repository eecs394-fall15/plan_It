angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic'
]);

angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic) {

    $scope.navbarTitle = "Learn More";

    $scope.mytest=function() {
        //var TestObject = Parse.Object.extend("TestObject");
        //var testObject = new TestObject();
        supersonic.logger.log("hey");

        var ItenaryParse = Parse.Object.extend("Itenary");
        var query = new Parse.Query(ItenaryParse);
        query.descending("title");
        supersonic.logger.log("hey22");
        query.find({
          success: function(results) {
            supersonic.logger.log("hey success");

            // Do something with the returned Parse.Object values
            
          },
          error: function(error) {
            supersonic.logger.log("hey error");

          }
        });




        
    }


  });

angular
  .module('example')
  .controller('SettingsController', function($scope, supersonic) {
    $scope.navbarTitle = "Settings";
    $scope.itenary=null;


 function f1 () {
 	supersonic.logger.log("f1 called");
 	var Itenary = Parse.Object.extend("Itenary");
	var query = new Parse.Query(Itenary);
	query.equalTo("objectId", "AzXTi8GA53");
	query.find({
	  success: function(results) {
	    supersonic.logger.log("queried successfully");
	    // Do something with the returned Parse.Object values
	    $scope.$apply( function () {
          $scope.itenary = results[0];
          supersonic.logger.log(results);
          supersonic.ui.dialog.alert(results);

        });
	    
	  },
	  error: function(error) {
	    supersonic.logger.log("query failed");
	  }
	});

 	// body...
 }
    
 f1();

  });
