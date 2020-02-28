# Power in numbers

This web application was thought of because I'm always trying to find ways to track my training plans and training sessions, but I always lose track or it takes too long to write up the workout. This will hopefuly save me time, help me be more organized and gain knowledge of others training sessions for better progression. Also collect an array of training plans from different users and see their progression.
 
## UX
 
This site is designed for people of all ages, the goal for this site is to motivate people to train by tracking their progress. Also being able to see that other users are contributing to the site goals should hopfully influence people to train. I have added a section on the home page that will add up all the user's distance travelled and display this for everyone to see. I think this will help people because as they log a session, they can watch this amount grow and feel part of a team. 

Each user will have to create their account before gaining access to this site after they have completed the necessary steps, they will then be taken to their profile. The profile page will allow the user to: add a session, add a record, create a training plan, seeing all their sessions logged, watch their stats grow and see or edit their basic information.

- When the user would like to add a session all they need to press is the 'add' tab on their profile and select 'Add Session' then fill out the form.

The form the user will have to fill out, to add a session will change depending on what session type the user is adding, the required information from the user will change and be stored to the database differently. Walking, running, cycling these are pretty much the same as they are units of distance and the user's inputs will be used to calculate their average speed. The user can choose from two different options miles and km, this information will be saved to the DB and used later on for the conversions. The Weightlifting session type is different because one session might consist of three exercises and the next workout might consist of forty-three so it was important to make sure the form could handle this type of scalability. After the form has been completed the user will be redirceted to their profile to view their sesssions.

- To log a record is very similar to adding a session, a record is added by clicking on the 'Add' tab on the their profile and pressing 'Save Record' then filling out the form.

This form had to be a little different because the user will be saving just one record so the table for 'weightlifting' doesn't have to scale the same way, but I have added a dropdown from the exercise, so that later on I can create a stats page for the records. After the form had been been saved the user will be redirected to the 'PRs' page. 

- finally creating a training plan, again the user will need to be on their 'Profile' and press the 'Add' tab and select 'Create Program'.

This form had to be a little more complicated because first I have to find out how many weeks the user wants to create the training plan over and also what days are going to be training days and rest days. After this infomration has been given the tables for the days can be appended to the page and filled in by the user. When completed, this training plan will be saved to the 'Training Plans' page for all the users to use.

- Setting up a training plan, When on the 'Training Plans' page the user can select one of the many training plans available on the page. After they have selected a training plan that suits their goals the user will need to add the weight that they would like to use and this will be saved to 'Your Training Plans' page.

This project is hosted on heroku [Power-in-numbers](https://power-in-numbers.herokuapp.com/login_page) Please feel free to create an account and start making progression as soon as possible.

## Features

- On the 'Profile', 'PRs', 'Home' and records page the option to filter the sessions by there: 'date', 'session type' and also sort by the newest or oldest sessions first, is available to change by the user.

This should help the user find the training sessions they are looking for or filter just the session types they are interested in to create a more personal and convenient viewing experience.




- The first page the user will be faced with is the login page, the user can either create a new account or log in.
- After the user logs in they will be taken to their profile.
- User's can log a training session, personal record and create training plans from their profile page.
- The home page has an array of filters, so depending on the users goals they can see a collection of the session types on the date they are interested in.
- Record page will hold all the users personal records and also a filter function to help the user find the content they are after.
- A settings page to change the weight/distance unit to fit different user types. 

The login page: 
- I've added the custom made background image and a user count on first page the user is faced with.
Register:
- Tried to take as little information as posible from the user to speed up the process.
Profile:
- The sessions are shown first, there are four tabs that take you to differnt sections on the profile page. 
- The page is loaded on 'log', 'add' is a section the user can save data for: training session, personal record and create a training plan.
- 'stats' was created, again to try and keep people motivated by clearly and easily displaying their progress and hard work.
- 'details' is the last tab and basically shows them information the user gave about themselves.
Records:


### Features Left to Implement

- I would like to create a tutioral that the user can follow so they can understand how to user the site.
- A section were the user is able to store their bodyweight and track their progression with a line graph.
- On the records page I would like a carasel showing the best records and the users information.
- Another page to be able to track your training plans.

## Technologies Used

To create Power In Numbers i used the following:

- [Adobe XD](https://www.adobe.com/products/xd.html)
    - The project uses **Abode XD** to build the wireframes.

- [Photoshop](https://jquery.com)
    - I used **Photoshop** to edit the header image and create the background image.

- [Adobe Illustrator](https://www.adobe.com/uk/products/illustrator.html)
    - I used **Adobe Illustrator** to create the seamless background image.

- [Font Awesome](https://fontawesome.com/)
    - The project uses **Font Awesome** for the icons.

- [Bootstrap4](https://getbootstrap.com/)
    - The project uses **Bootstrap4** to speed up the development process and keep the code easy to read.

- [Pexels](https://www.pexels.com/)
    - **Pexels** Was used for the stock images.

- [Google Font](https://fonts.google.com/)
    - The project uses **Google font** to change the style of the text.

- [HTML 5]()
    - This project uses **HTML 5** for the mark up language.

- [CSS]()
    - **CSS** is used to syle the project.

- [Javascript]()
    - **Javascript** is the programing language for this project.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Python]()
    - This HLL **Python** was used for the backend of this project, dealing with pulling data from mongoDB and managing the routes.

- [Flask](https://www.fullstackpython.com/flask.html)
    - **Flask** is a micro framework used.

- [jinja](https://jquery.com)
    - The project uses **jinja** for the templating language.


## Deployment

This project is hosted on heroku, I achieved this by:

1. Going to the heroku dashboard and creating a new app.
2. Then the 'Deploy' section and down to 'deployment method' select github and link heroku to this repository.
3. Still on the Deploy section, continuing down to 'manual deploy' and pressing 'deploy branch'

## Testing and bugs

[Testing and bugs]()

### How to run locally:

#### Download:

1. Go to https://github.com/Fordalex/power-in-numbers
2. Click on 

![clone or download](https://github.com/Fordalex/master-mind-project/blob/master/readme/clone-or-download.png "clone or download")

3. Click download zip
4. Extract zip file
5. Import in to preferred IDE



#### Using Git:

1. Open terminal in preferred IDE
2. Write "git clone https://github.com/Fordalex/master-mind-project"
3. Press enter

## Credits

### Media
    The header image is taken from:
- [Unsplash](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

### Acknowledgements

- https://www.w3schools.com/jsref/met_element_scrollintoview.asp
This content was used to help implement the scroll to element function.

- https://stackoverflow.com/questions/13266746/scroll-jump-to-id-without-jquery
This was then using to add the smooth scroll to this function.

- https://www.youtube.com/watch?v=_5OXmXvkU_E
Organizing the app.py file.

- https://codepen.io/bbodine1/pen/novBm
checkbox taken from codepen

- https://treyhunner.com/2016/04/how-to-loop-with-indexes-in-python/
for loop in python 