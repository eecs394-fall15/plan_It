#HOLIDAY PLANIT

#DESIGNED BY
* Edgar Vazquez
* Nikhil Thagadur
* Jaiveer Kothari
* Sophia Lou

#DESCRIPTION
Holiday PlanIt is an app that helps a traveler to get suggestions and tips for his travel plans from locals in the area or other users who are in the Holiday PlanIt app community. 
The traveler can then customize his itinerary by picking from the suggestions and tips and choosing the suggestion he likes the most.

#SYSTEM REQUIREMENTS
* Supersonic  (https://academy.appgyver.com/installwizard)
* Angular.js 
* Node.js

#INSTALLATION
    Download this repository:
    $ git clone https://github.com/eecs394-fall15/plan_It.git

    Cloud Parse database setup 
* Sign up for an account at https://parse.com/
* The parse application is called plan_It. The data can be set in the core section.
The Application ID and the Rest API key can be found in the settings tabs. Use these keys to integrate the Parse database within these two files. 
- Plan_It > app > common > scripts >Parse.js
- Plan_It > app > common > views > layout.html

The database created for this app has five classes with these column names and types:
User

Events

- title, String
- time, Date
- suggestions, Array
- listLimit, Number
- additional, String
- author, Pointer<_User>
- responders, Array
- isChosen, Boolean
- chosen, Pointer<Suggestions>
- itineraryId, String

Itinerary
- author, Pointer <_User>
- events, Array
- published, Boolean
- title, String

Suggestions
- author, Pointer<_User>
- authorId, String
- authors, Array
- eventid, String
- isSaved, Boolean
- itineraryId, String
- published, Boolean
- tips, Array
- title, String

Tip
- authorId, String
- title, String
- author, Pointer<_User>
- published, Boolean
- itineraryId, String
- eventid, String

* Install the Appgyver Supersonic Scanner from the App Store on your mobile device

#RUNNING
 Navigate to the folder where the project is located in your machine in the command prompt(on windows) or terminal( in MAC)
    $ steroids connect 



#DESCRIPTION OF CODE
The app is built using AppGyver’s Supersonic framework. The frontend of the app was coded in Angular JS. ParseDB is the cloud database we used. 


For the database syntax, reference: https://parse.com/docs/js/guide
For Appgyver’s apis, reference: http://docs.appgyver.com/supersonic/api-reference/

The app is divided into two modules- common and example. In the common module we have the scripts that are common to the entire app. In the example module we have the views and their corresponding controllers. We interact with the Parse database through these controllers. 

#PLATFORM CONSTRAINTS
* For development, Supersonic’s logger doesn’t always output expected logs 
* For deployment on IOS devices, a developer license is needed 

# KNOWN BUGS NOT FIXED & SPECIFIC LIMITATIONS
* Loading times for database data delay the rate at which different screens populate. 
* There is a different background for Android and IOS since supersonic’s API does not support background changes yet for Android devices
 




	
