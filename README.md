# Power in numbers

This web application was thought of because I'm always trying to find ways to track my training plans and training session, but I always lose track or it takes to long to write up the workout. This will hopefuly save me time, help me be more organized and gain knowledge of others training session for better progression. Also collect an array of training plans from different users.
 
## UX
 
This site is designed for people who like to stay active and need the motivation to keep going, also find new training plans to keep things interesting.

I've tried to do most of the leg work for the user, by creating an easy and enjoyable experience.
- As a user that's just completed a training session, logging your session should be as quick and easy as possible.
- The stats section on the profile page has been added so the user can watch their progress and work out the number of training sessions they have completed. Using d3 and cross filter its clear to see how many session logged and the category of these sessions. Also, the distance the user has travelled by foot and bike is shown on a pie chart, so the user can compare data with ease.

This project is hosted on heroku [Power-in-numbers](https://power-in-numbers.herokuapp.com/login_page) Please feel free to create an account and start making progression as soon as possible.

The main theme of the site is blue, white and black. I have created a seamless background image and added this on most pages to make the site feel the same, as the user navigates throughout. 

Trying to keep the feel of the site competitive but also motivating, by adding small bits of data on how many sessions have been logged that day, how far as a group the page has travelled and the best records on display, these were added to try and motivate people by seeing other users working hard.

## Features

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