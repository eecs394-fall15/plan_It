angular
  .module('example')
  .controller('NewEventController', function($scope,supersonic) {
    $scope.missingTime = false; 
    $scope.event={};
    $scope.ideas=[{title: "Adventure sports", id: 0},
{title: "Amusement Park", id: 1},
{title: "Antiques Shops", id: 2},
{title: "Aquariums", id: 3},
{title: "Architectural Sites", id: 4},
{title: "Art Galleries", id: 5},
{title: "Art Museums", id: 6},
{title: "Baking Classes", id: 7},
{title: "Balloon Rides", id: 8},
{title: "Bars & Pubs", id: 9},
{title: "Beaches", id: 10},
{title: "Bike Tours", id: 11},
{title: "Boat Tours", id: 12},
{title: "Bowling", id: 13},
{title: "Breakfast", id: 14},
{title: "Breweries", id: 15},
{title: "Brunch", id: 16},
{title: "Cafes", id: 17},
{title: "Campus Tours", id: 18},
{title: "Casinos", id: 19},
{title: "Cinemas", id: 20},
{title: "City Tours", id: 21},
{title: "Clubs", id: 22},
{title: "Comedy Clubs", id: 23},
{title: "Cooking Classes", id: 24},
{title: "Dinner", id: 25},
{title: "Electronic Shops", id: 26},
{title: "Flea & Street Market", id: 27},
{title: "Food Tour", id: 28},
{title: "Golf", id: 29},
{title: "Health Clubs", id: 30},
{title: "Hiking", id: 31},
{title: "Historical Sites", id: 32},
{title: "History Museums", id: 33},
{title: "Hotels", id: 34},
{title: "Jazz Bars", id: 35},
{title: "Karaoke ", id: 36},
{title: "Kayaking & Canoeing", id: 37},
{title: "Libraries", id: 38},
{title: "Lunch", id: 39},
{title: "Meditation Centers", id: 40},
{title: "Motels", id: 41},
{title: "National Parks", id: 42},
{title: "Religious Sites", id: 43},
{title: "Safari", id: 44},
{title: "Scenic Drives", id: 45},
{title: "Science Museums", id: 46},
{title: "Scuba & Snorkeling", id: 47},
{title: "Shopping Malls", id: 48},
{title: "Souvenirs Shops", id: 49},
{title: "Spas", id: 50},
{title: "Street Foods", id: 51},
{title: "Supper", id: 52},
{title: "Theaters", id: 53},
{title: "Wineries", id: 54},
{title: "Yoga Centers", id: 55},
{title: "Zoo", id: 56},
 ];
    $scope.selected = $scope.ideas[0];
    
     // steroids.view.setBackgroundImage("/icons/backgroundTeal.png");
    steroids.view.setBackgroundColor("#5cd6d6");
    
    supersonic.ui.views.current.params.onValue( function (itineraryId) {
        $scope.itinerary = itineraryId.id; 
    });
    
    $scope.saveEvent = function(){
        
        var dbevent = Parse.Object.extend("Events"); 
        var newEvent = new dbevent(); 
        if ($scope.event.title){
            newEvent.set("title", $scope.event.title);
        }
        else{
            var eventindex = $scope.selected.id;
            var eventobj = $scope.ideas[eventindex];
            newEvent.set("title",eventobj.title); 
        }
        newEvent.set("time", $scope.event.time); 
        newEvent.set("listLimit",2); 
        newEvent.set("additional",$scope.event.additional); 
        newEvent.set("suggestions",[]);
        newEvent.set("author", Parse.User.current());
        newEvent.set("published",false);
        newEvent.set("responders",[]); 
        newEvent.set("isChosen",false);  
        newEvent.set("itineraryId",$scope.itinerary);
        
        
        newEvent.save(null, {
            success: function(savedEvent){   // event object

                var query = new Parse.Query("Itinerary"); 
                query.equalTo("objectId",$scope.itinerary);
                query.find({
                    success: function(savedItin){
                        savedItin[0].addUnique("events",savedEvent);
                        savedItin[0].save(); 
                        
                var view = new supersonic.ui.View("example#customize");       
                supersonic.ui.layers.push(view, {
                    params: {
                        id: $scope.itinerary
                    }
                   });
                    },
                    error: function(error){
                     supersonic.logger.log(error); 

                    }
            }); 
            },
            error: function(error){
            }
        }); 
    }
    
    $scope.submitEvent = function(){
         
         if (!$scope.event.time){
              $scope.missingTime = true; 
         }
         else{
             $scope.saveEvent(); 
         }
    } 
    
    $scope.back = function(){
        supersonic.ui.layers.pop();
    }
});
