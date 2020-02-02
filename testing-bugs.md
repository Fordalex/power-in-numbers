## Testing and bugs

After getting the form completed, I soon realized that not everyone will fill this out the same way... 
![User Testing](https://github.com/Fordalex/power-in-numbers/blob/master/readme/user_testing.png)
I need to add a unit dropdown box to give me more control on how the user's input the data. This will allow me to perform unit conversions on the given values.

I spent a few days trying to get the filter system to work using jinja and a few if statements... Bad choice. I soon realised that the for loop index wasn't giving the correct numbers in order, also the search result wasn't giving back the correct number of sessions shown, but was returning the full amount of the iterations that the loop was undergoing. I've started saving the users inputs into a session cookie and filtering the data before sending it through to the home page.

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.