# Testing

## register

Creating a new account:
- When on the login page if the user clicks 'sign up here' they will be taken to the register page where the user can create a new account.
- If the user has already gone to the register page they can still navigate back to the login page using the navigation bar.

Testing if the form works correctly:

All inputs have been given a required attribute so that that user can not leave any fields empty.
I found a password validation js script online at [Password Validation]().

-Try and create an account with unmatching passwords.
-Try and create an account with passwords that are the same but contains no numbers.
-Try and create an account with passwords that are the same but no capitals.
-Try and create an account with passwords that are the same but less than six characters.

The form shouldn't send and should also return the appropriate error message to the user.

If the users details have been entered correctly but the username has already been taken they are redirected to a page telling them 'this username has already been taken'

Create a new account to continue with the following tests.

## login

Logging in for exsisting users:

When on the login page the user will need their username and password to gain access to the site.

- Try loggin in with both the fields empty
- Try loggin in with a registered username but no password
- Try loggin in with a registered username and the incorrect password
- Try loggin in with a non registered username but a registered password

For each of these scenarios the user will be redirected to another page telling them there details were incorrect.

## adding a session

This page is found on the users profile click the 'add' tab and click 'add session'.
Adding a new session:

All these input elements have been given a required attribute.

- Try and submit the form with empty input fields.

Make sure the form dosen't submit.

Adding a row:

- click 'add row' make sure the row is appended to the table and the name attributes are as shown:
    1. session_exercise_1, session_sets_1, reps_exercise_1, session_weight_1
    2. session_exercise_2, session_sets_2, reps_exercise_2, session_weight_2
    3. session_exercise_3, session_sets_3, reps_exercise_3, session_weight_3

Each row should have a name attribute with the count of the row at the end of the value.

- click 'remove row' make sure the row is removed from the table.
- click 'add row' make sure the value of the name attribute is still the value of the row count.

## profile (page)

On the profile page there are four different sections:
Checking the session data has been sorted correctly:
Delete all sessions then, create four sessions:
 1. Session type: 'running', length 1 hour, motivated 10, difficulty 10, effort 10, distance 10 miles.
 2. Session type: 'weightlifting', length 30 mins, motivated 5, difficulty 5, effort 5, and in the weightlifting table. Exercise: Bench Press, Sets: 5, Reps: 5, Weight: 50kg, add another row. Exercise: Skull Crushers, Sets: 5, Reps: 5, Weight: 10kg.
 3. Session type: 'walking', length 45 mins, motivated 10, difficulty 10, effort 10, distance 10 miles.
 4. Session type: 'cycling', length 45 mins, motivated 10, difficulty 10, effort 10, distance 10 miles.

### log (tab)

After a session is logged the user will be taken to this page.
Create

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

Checking the 'walking' sessions have logged correctly:

Checking the 'cycling' sessions have logged correctly:

Filtering the training cards:
 - First make sure that the session cards are shown on the page.
 - Click filter, change the session type dropdown to 'weightlifting' make sure that only session card with the session type weightligting are shown.
 - change the session type to 'running' make sure only running sessions are shown.
 - change the session type to 'cycling' make sure only the cycling sessions are shown
 - change the session type to 'walking' make sure only the walking session are on the page.
 - change the session type back to 'All', change the date to a random date, make sure that the sessions on the page are only from the days filted.
 - change the session type to 'All', date to none and sort by oldest first, make sure that the first session shown is older than the one below.

### add (tab)

Three links all take the user to the correct page.

- click 'add sessions', make sure that the url shows /add_session
- click 'add record', make sure that the url shows /add_record
- click 'create training plan', make sure the url shows /add_plan

### stats (tab)

This page is found on the profile page under the 'stats' tab.

Checking the total session logged:
- logged count should be: 4
- weightlifting: 3
- Running: 1
- Cycling: 1
- Walking: 1
- The pie chart should be spilt into four even slices and the bar chart should show the value after been selected.

Checking the distance travelled:
- Walked: 10
- Ran: 10
- Cycled: 10
- The pie chart should be split into three and the bar chart should change to one when a sesion is selected.



### details (tab)


## records


## personal training plans


## home


## pin records


## training plans


## settings

