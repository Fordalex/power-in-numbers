# Power in numbers

This web application was thought of because I'm always trying to find ways to track my training plans and training session, but I always lose track or it takes to long to write up the workout. This will hopefuly save me time, help me be more organized and gain knowledge of others training session for better progression. Also collect an array of training plans from different users.
 
## UX
 
This site is designed for people who like to stay active and need the motivation to keep going, also find new training plans to keep things interesting.

I've tried to do most of the leg work for the user creating an easy and enjoyable experience for the user.
- As a user that's just completed a training session your going to be tried and logging your session should be as quick and easy as possible.

This project is hosted on heroku [Power-in-numbers](https://power-in-numbers.herokuapp.com/login) Please feel free to create an account and start making progression as soon as possible.

## Features

- The first page the user will be faced with is the login page, the user can either create a new account or log striaght in.
- After the user logs in they will be taken to their profile, if the user has just created the profile I would like to create a tutioral that the user can follow so they can understand how to user the site.
- User's can log a training session, personal record and training plans from their profile page.
- The home page has an array of filters, so depending on the users goals they can see a collection of the session types, length and date they are interested in.
- Record page will hold all the users personal records and also a filter function to help the user find the content they are after.
- A settings page to change the weight/distance unit to fit different user types. 
 
### Existing Feature
- Feature 1 - User's can create and save their training session from thier profile page, the form will populate with the relivate information as the user is filling out the form to try and keep to process as quick and easy as possible.
- 

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- 

## Technologies Used

To create Power In Numbers i used the following:

- [Adobe XD](https://jquery.com)
    - The project uses **Abode XD** to build the wireframes.

- [Photoshop](https://jquery.com)
    - I used **Photoshop** to edit the header image and create the background image.

- [Font Awesome](https://jquery.com)
    - The project uses **Font Awesome** for the icons.

- [Bootstrap4](https://jquery.com)
    - The project uses **Bootstrap4** to speed up the development process and keep the code easy to read.

- [Pexels](https://jquery.com)
    - **Pexels** Was used for the stock images.

- [Unsplash](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Google Font](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [HTML 5](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [CSS](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Javascript](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Python](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Flask](https://www.fullstackpython.com/flask.html)
    - The project uses **Flask** to simplify DOM manipulation.

- [jinja](https://jquery.com)
    - The project uses **jinja** for the templating language.



## Testing

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

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X