## Features

### Add Sessions

After getting the form completed, I soon realised that not everyone will fill this out the same way... 
![User Testing](https://github.com/Fordalex/power-in-numbers/blob/master/readme/user_testing.jpg)
I need to add a unit dropdown box to give me more control on how the user's input the data. This will allow me to perform unit conversions on the given values.

![add_session_feature](https://github.com/Fordalex/power-in-numbers/blob/master/readme/add_session_feature.jpg)
Now when the user is filling out the form there are a few different session types the user can select from. Weightlifting is the only table that requires the user to be able to add and remove rows depending on the number of exercises the users has performed. They can also change there mind if they have started filling out the form with the incorrect session type and the form will remove the table incorrectly selected. Running, walking and cycling only requires two pieces of information from the user, the unit of the distance travelled and the distance travelled.

### Add record

![add_record_feature](https://github.com/Fordalex/power-in-numbers/blob/master/readme/add_records_feature.jpg)
Same as the add session form the user can select from four session types: weightlifting, walking, running and cycling the from will change depending on the users selection. There is a slight difference between records and session because there will be a records page with a table showing the best lifters and to make sure the data could be pulled from the database correctly e.g. 'bench press', 'Bench press', 'Bench Press' and i'm sure users will enter somthing unexpected so to prevent surprises a dropdown has been added.

### Add Training Plan

![training_plan](https://github.com/Fordalex/power-in-numbers/blob/master/readme/add_trainingplan_feature.jpg)
First the user will need to tell us how many weeks the plan will be created over, then which days will be training days and which will be rest days. After, the user will need to add a name for the plan and then continue to fill out the rest of the training days. The table rows can be scaled up to 100 but that can easily be changed with one variable value but for this web app to save loading speeds this should be more than enough.

![training_plan](https://github.com/Fordalex/power-in-numbers/blob/master/readme/deleting_trainingplans.jpg)

When the training plans have been created only the creator of the plan can remove it from the database.

### Settings (convertions)

![settings](https://github.com/Fordalex/power-in-numbers/blob/master/readme/settings_feature.jpg)
The user is able to change the unit for the distance and the weight, all the sessions, records and details will be updated to the correct unit specified by them.

### Details

![details](https://github.com/Fordalex/power-in-numbers/blob/master/readme/edit_details.jpg)

Also, the age and the body weight of the user can be changed by selecting 'edit details' under details on the profile. When the user adds a session or record and their currect body weight is taken from the users account so the user being able to change this was an important feature. 

### Filter

![details](https://github.com/Fordalex/power-in-numbers/blob/master/readme/filter_feature.jpg)
The user can open all of the sessions with one click and then close them when finsihed reviewing their sessions. The user can also easily find the sessions they are looking for with the filter section, the user can filter from three different dropdowns. Session type: weightlifting, running, walking and cycling. Date: any. Sort By: Newest First or Oldest First.

### records best lifts

### Profile

The users session will save on their profile page, the records will save under personal records and the training plans will save on the public page under 'Training Plans'.

### Online

On the home sessions from every user will be shown in order from newest to oldest.