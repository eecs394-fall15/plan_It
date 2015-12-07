angular
  .module('example')
  .controller('UpdateEventController', function($scope,supersonic) {
     $scope.event={};
    steroids.view.setBackgroundColor("#5cd6d6");
      supersonic.ui.views.current.params.onValue( function (eventId) {
        $scope.eventid = eventId.id; 
    });
    
     supersonic.ui.views.current.whenVisible(function() {
         
         
         var eventsQ = new Parse.Query("Events");
        eventsQ.equalTo("objectId",$scope.eventid);
        eventsQ.find({
            success: function(thatevent){
   
                $scope.event.title=thatevent[0].get('title'); 
                var a = new Date(thatevent[0].get('time'));
                var timestring = a.getHours() + ":" + a.getMinutes();
                document.getElementById("time").value = timestring; 
                $scope.event.additional=thatevent[0].get('additional'); 
            },
            error: function(errr){
            }
        });
     });
    
    $scope.updateEvent = function(){
        var eventsQ = new Parse.Query("Events");
        eventsQ.equalTo("objectId",$scope.eventid);
        eventsQ.find({
            success: function(thatevent){
   
                thatevent[0].set('title',$scope.event.title);
                thatevent[0].set('time',$scope.event.time);
                thatevent[0].set('additional',$scope.event.additional);
                thatevent[0].save(); 
                  var options = {
                  buttonLabel: "Close"
        };
                supersonic.ui.dialog.alert("Event successfully updated!", options).then(function() {
            supersonic.ui.layers.pop();
                });
            },
            error: function(errr){
            }
        });
    }
});
