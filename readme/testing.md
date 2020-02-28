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

### log (tab)

After a session is logged the user will be taken to this page.

Checking the session have logged correctly:

### add (tab)

Three links all take the user to the correct page.

- click 'add sessions', make sure that the url shows /add_session
- click 'add record', make sure that the url shows /add_record
- click 'create training plan', make sure the url shows /add_plan



### stats (tab)

### details (tab)


## records


## personal training plans


## home


## pin records


## training plans


## settings

