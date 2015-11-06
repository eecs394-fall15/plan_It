angular
  .module('example')
  .controller('TemplateController', function($scope, supersonic) {
   $scope.navbarTitle = "Create Template"; 
   $scope.choices = [{id: 'TempChoice1'}, {id: 'TempChoice2'}, {id: 'TempChoice3'}]; 
   $scope.addNewChoice = function() {
    	var newItemNo = $scope.choices.length+1;
    	$scope.choices.push({'id':'choice'+newItemNo});
};
	
	$scope.showAddChoice = function(choice) {
  		return choice.id === $scope.choices[$scope.choices.length-1].id;
};
    $scope.showChoiceLabel = function (choice) {
        return choice.id === $scope.choices[0].id;
}

  });
