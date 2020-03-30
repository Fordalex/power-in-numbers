# Testing

If you don't want to create the new account to run these test then please use the following account:
- Username: DavidSmith55
- Password: Password123

## Register

Creating a new account:
- When on the login page if the user clicks 'sign up here' they will be taken to the register page where the user can create a new account.
- If the user has already gone to the register page they can still navigate back to the login page using the navigation bar.

Testing if the form works correctly:

All inputs have been given a required attribute so that the user can not leave any fields empty.
I found a password validation js script online at [Password Validation](https://www.the-art-of-web.com/javascript/validate-password/).

- Try and create an account with unmatching passwords.
- Try and create an account with passwords that are the same but contains no numbers.
- Try and create an account with passwords that are the same but no capitals.
- Try and create an account with passwords that are the same but less than six characters.

The form shouldn't send and should also return the appropriate error message to the user.

If the users details have been entered correctly but the username has already been taken they are redirected to a page telling them 'this username has already been taken'

Create a new account to continue with the following tests.

## Login

Logging in for exsisting users:

When on the login page the user will need their username and password to gain access to the site.

- Try logging in with both the fields empty
- Try logging in with a registered username but no password
- Try logging in with a registered username and the incorrect password
- Try logging in with a non registered username but a registered password

For each of these scenarios the user will be redirected to another page telling them there details were incorrect.

## Adding A Session

This page is found on the users profile click the 'add' tab and click 'add session'.
Adding a new session:

All these input elements have been given a required attribute.

- Try and submit the form with empty input fields.

Make sure the form dosen't submit.

Adding a row:

- click 'add row' make sure the row is appended to the table and the name attributes are, for row:
    1. session_exercise_1, session_sets_1, reps_exercise_1, session_weight_1
    2. session_exercise_2, session_sets_2, reps_exercise_2, session_weight_2
    3. session_exercise_3, session_sets_3, reps_exercise_3, session_weight_3

Each row should have a name attribute with the count of the row at the end of the value.

- click 'remove row' make sure the row is removed from the table.
- click 'add row' make sure the value of the name attribute is still the value of the row count.

## Profile (page)

If you have created a new profile please logg the following session if logging in using DavidSmith55 you should see the following:
 1. Session type: 'running', length 1 hour, motivated 10, difficulty 10, effort 10, distance 10 miles.
 2. Session type: 'walking', length 45 mins, motivated 10, difficulty 10, effort 10, distance 10 miles.
 3. Session type: 'weightlifting', length 30 mins, motivated 5, difficulty 5, effort 5, and in the weightlifting table. Exercise: Bench Press, Sets: 5, Reps: 5, Weight: 50kg, add another row. Exercise: Skull Crushers, Sets: 5, Reps: 5, Weight: 10kg.
 4. Session type: 'cycling', length 45 mins, motivated 10, difficulty 10, effort 10, distance 10 miles.

### Log (tab)

After a session is logged the user will be taken to this page.

Checking that the 'weightlifting' sessions have logged correctly:
- view the session card and check the following:
    1. The date is the same as when entered into the add session form.
    2. The location has been taken from the users account.
    3. The body weight has been taken from the users account.
    4. The exercise, sets, reps and weight are the same as when entered in the form.
    5. Make sure the table has not empty rows or rows that haven been appended to the table.
    6. The motivated progression bar has filled to the length specified by the user.
    7. The difficulty progression bar has also filled to the value given.
    8. The effort progression bar has worked as planned.
    9. The session type is as chosen on the form
    10. The length value shouldn't be blank and should show the length of the workout.
    11. The notes have pulled from the DB

Checking the 'running' sessions have logged correctly:
- view the session card and check the following:
    1. The date is the same as when entered into the add session form.
    2. The location has been taken from the users account.
    3. The body weight has been taken from the users account.
    4. The distance travelled should be '10' miles
    5. The distance should workout to 10 miles / 60 mins =  6 mins / mile
    6. The motivated progression bar has filled to the length specified by the user.
    7. The difficulty progression bar has also filled to the value given.
    8. The effort progression bar has worked as planned.
    9. The session type is as chosen on the form
    10. The length value shouldn't be blank and should show the length of the workout.
    11. The notes have pulled from the DB

Checking the 'walking' sessions have logged correctly:
- view the session card and check the following:
    1. The date is the same as when entered into the add session form.
    2. The location has been taken from the users account.
    3. The body weight has been taken from the users account.
    4. The distance travelled should be '10' miles
    5. The distance should workout to 10 miles / 45 mins =  4.5 mins / mile
    6. The motivated progression bar has filled to the length specified by the user.
    7. The difficulty progression bar has also filled to the value given.
    8. The effort progression bar has worked as planned.
    9. The session type is as chosen on the form
    10. The length value shouldn't be blank and should show the length of the workout.
    11. The notes have pulled from the DB

Checking the 'cycling' sessions have logged correctly:
- view the session card and check the following:
    1. The date is the same as when entered into the add session form.
    2. The location has been taken from the users account.
    3. The body weight has been taken from the users account.
    4. The distance travelled should be '10' miles
    5. The distance should workout to 10 miles / 60 mins =  4.5 mins / mile
    6. The motivated progression bar has filled to the length specified by the user.
    7. The difficulty progression bar has also filled to the value given.
    8. The effort progression bar has worked as planned.
    9. The session type is as chosen on the form
    10. The length value shouldn't be blank and should show the length of the workout.
    11. The notes have pulled from the DB

Filtering the training cards:
 - First make sure that the session cards are shown on the page.
 - Click filter, change the session type dropdown to 'weightlifting' make sure that only session card with the session type weightligting are shown.
 - change the session type to 'running' make sure only running sessions are shown.
 - change the session type to 'cycling' make sure only the cycling sessions are shown
 - change the session type to 'walking' make sure only the walking session are on the page.
 - change the session type back to 'All', change the date to a random date, make sure that the sessions on the page are only from the days filted.
 - change the session type to 'All', date to none and sort by oldest first, make sure that the first session shown is older than the one below.

### Add (tab)

Three links all take the user to the correct pages.

- click 'add sessions', make sure that the url shows /add_session
- click 'add record', make sure that the url shows /add_record
- click 'create training plan', make sure the url shows /add_plan

### Stats (tab)

This page is found on the profile page under the 'stats' tab.

Checking the total session logged:
- logged count should be: 4
- weightlifting: 1
- Running: 1
- Cycling: 1
- Walking: 1
- The pie chart should be spilt into four even slices and the bar chart should show the value after been selected.

Checking the distance travelled:
- Walked: 10
- Ran: 10
- Cycled: 10
- The pie chart should be split into three and the bar chart should change to one when a sesion is selected.
- The bar chart should show a total of 30

Checking the mental stats section:
The only four sesssions that have been logged, have had the motivated difficulty and effort value of three 10s and one 5 total 35 divided by the amount of session logged which is 4. 35 / 4 = 8.75 rounded up = 8.8
- Each the motivated the difficulty and the effort should show the value of 8.8
- Sessions logged = 60mins + 30mins + 45mins + 45mins. Time logged should show 3 hours. 

Badges section:
- The total session should show 4
- The distance travelled by foot should equal 20.
- And the distance travlled by bike should equal 10.
- The distance travelled by foot the first badge should by lit up.
Checking the badges light up correctly:
- Add a running session and add the distance to 2000miles, make sure that all the running badges lit up.
- Add a cycling session and add the distance to 2500miles, make sure all the cycling badges lit up.

### Details (tab)

When you created the account this page should show your personal information.
- The name should show your first and last name created.
- The age should show the users age.
- The bw should show the correct BW for the user, aswell this should be converted to the users specified unit.(More on convertions at the bottom)
- The gender should show the correct gender the user entered when creating the account.
- username should be correct.
- The account start date should be today if creating the account on the same day as running these tests.

#### Update Details (page)

The edit details button on the profile page and under the tab 'details' will bring you to this page.

- The age inside the age input should show the value of the users age.
- The body weight should show their body weight and the unit should be the one specified by the user on the settings page.

Checking to see if the form works:

- Change the users age to '100'
- Change the body weight to '180'
- And change the the unit to 'lb'

After you have pressed 'change details' the user will be directed back to their profile page.
Go back to the tab 'details' And make sure these changes have happened.

## Personal Records

This page won't show any records if creating this from a new account, and should tell the user that. "you don't have any records saved yet..." and they will also have a button relocating them on to the add records page.
- Click on 'save record' This page can also be found on the profile, then on the 'add' tab under 'save record'.

Creating a record:
- Add the length on the record to: 
Hour: 0, Mins: 1, Secs: 0. 
Session type: weightlifting.
Motivated: 10   
Difficulty: 10
Effort: 10
Squat / 1 Rep / 180kg
notes: 'Good session!'

After this record has been saved the user will be take to their record page, or if you are using DavidSmith55 this record has already been saved and should show the following:

Checking the record saved:
- The name on the record is the username of the user currently logged in.
- The body weight is what has been set on the users account.
- Date should be today.
- location as set on the users account.
- sets 1
- weight lifted 180kg
- motivated, difficulty and effort should be full
- record type: 'weightlifting'
- length: 0h 1m 0s
- Notes should say 'Good session!'
- The time logged should be a time stamp of when the user saved the record.

## Home

I have been using this site to save my current training sessions so this should be getting full by now...

## Pin Records

On the home page there are two values that will change when a user saved a session. First will count the total amount of sessions logged and the Second will add up all the distance travelled by all users.

Checking the filtering:
 - Click filter, change the session type dropdown to 'weightlifting' make sure that only session card with the session type weightligting are shown.
 - change the session type to 'running' make sure only running sessions are shown.
 - change the session type to 'cycling' make sure only the cycling sessions are shown
 - change the session type to 'walking' make sure only the walking session are on the page.
 - change the session type back to 'All', change the date to a random date, make sure that the sessions on the page are only from the days filted.
 - change the session type to 'All', date to none and sort by oldest first, make sure that the first session shown is older than the one below.

Run checks on each of the session to make sure all the data is being pulled from the DB correctly.


## Settings

Checking the convertion for the unit section, first check the bodyweight that is on the profile you have created. e.g. 50kg. Then change the unit in the settings to 'lb' and the body weight should now show 110lb.
Repeat this for the distance, the total distance travelled on the stats section on the profile page for e.g. 10 miles (if zero logging a running session with the distance of 10 miles) change the unit of distance to 'km' and this should now show '16 km'.
The last button on the setting section is the 'Delete Account' press this and your account will be removed. After pressing the button and then being redirected to the login page, try and log in and you shouldn't be able to gain access to the removed account.

# Existing Bugs / Problems

### Register

If the username the user is trying to create has already been taken, they will be redirected to another page to give them this information. But when the user goes back to the register form the user will have to start from scratch again. I would like to fix this so that it checks to see if the username has been taken before the user submits the form.
### Average Speed

Currently the average speed will show 0.5 for 30 seconds.

### Changes you made might not be changed

This message will pop up when the user trys to leave the page, the only problem is when the user is ready to submit the form this message is still be shown.

### Scroll After Filter

When the user filters the sessiosn I would like the page to scroll down to the sessions shown. I have got the js for this but I don't know how to get the page to only scroll down when the user has filtered the sessions.

### convertions on the pin records page.

The convertions need completing on the records page for the top records shown at the top on the page.

### Navigation

If the user is on mobile view with the navigation bar open and then scale to desktop view the alpha overlay is still being shown.