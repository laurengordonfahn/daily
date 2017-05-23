#Daily

##Project Description:

Daily is an emotion tracking calendar. 

Daily makes tracking and understanding your emotional health easier.

It is hard to keep a dairy, even harder to keep track of and understand your emotional health trends.

With daily for each day chose an emotion with matching color to summerize the day's emotions. Add three adjectives to desribe your day quickly for your own personal reflection. 

Daily's profile feature automatically offers informative charts to follow your emotional trends and patterns based on your input. 

##Features:
1) Personal monthly calendar that keeps track of your day's through breif description and choice of emotional trend word. Colorized for at a glance reflection.
2) Drop down menu access to previous months inputs.
3) Profile feature offers graphical reflections of all of your previous input.
4) Easy and secure signUp/SignIn/LogOut

## Getting Started:

##Prerequisites:

#Prerequisites General Information:
Daily is a flask-python restful API with a node.js React frontend application.
This means that you will need python, node, and create-react-app dependencies. 
Python's dependencies are found in requirements.txt. You will need python's pip installer to run requirements.txt. Node and React's dependencies are found in package.json. You will need either node's npm or yarn installer to successfully download the libraries noted in packages.json.

#Prerquisties Steps:
1) Download the project in a directory of its own. Navigate into the new directory and type in the following command.  

    $ git clone https://github.com/laurengordonfahn/daily.git

2) Create a virtual environment using virtualenv to house the required frameworks if you are unsure you have this capacity visit https://virtualenv.pypa.io/en/stable/: 

```
$ virtualenv env
$ source env/bin/activate
```

3) Pip install will enable installation of the project requirements
If you are uncertain if you have pip install visit the website : https://pip.pypa.io/en/stable/installing/

4) Make sure you are in the first level of your newly created and cloned directory then pip install the requirements, the file will be read into the environment automatically:

```
$ pip install -r requirements.txt
```

5) For your information these are the project requirements found in the requirements.txt file

```
appdirs==1.4.3
bcrypt==3.1.3
blinker==1.4
cffi==1.10.0
chardet==2.3.0
CherryPy==3.8.2
click==6.6
-e git+https://github.com/mobolic/facebook-sdk.git@43b609ee034195c794521e23792532471551c383#egg=facebook_sdk
Flask==0.12
Flask-Bcrypt==0.7.1
Flask-DebugToolbar==0.10.0
Flask-JWT==0.3.2
flask-marshmallow==0.7.0
Flask-SQLAlchemy==2.1
glob2==0.5
itsdangerous==0.24
jasmine==2.6.0
jasmine-core==2.6.1
Jinja2==2.8.1
MarkupSafe==0.23
marshmallow==2.12.2
marshmallow-sqlalchemy==0.13.1
ordereddict==1.1
packaging==16.8
psycopg2==2.6.2
pycparser==2.17
PyJWT==1.4.2
pyparsing==2.2.0
pytz==2016.10
PyYAML==3.10
requests==2.13.0
selenium==2.53.6
six==1.10.0
SQLAlchemy==1.1.4
Werkzeug==0.11.1
```
6) Download package.json dependencies using yarn OR npm. If you are not certain if you have yarn visit https://yarnpkg.com/lang/en/docs/install/. The following command will source all dependencies in package.json. Yarn will create yarn.lock which will show you all subdependencies utilized. Yarn also offeres Yarn upgrade a command that will help you keep dependency libraries uptodate. 
```
    $ yarn install
```
If using npm :
```
    $npm install
```
7) For your information these are the project requirements found in the package.json file
```
{
  "name": "daily",
  "version": "0.0.1",
  "private": true,
  "proxy": "http://localhost:5000",
  "devDependencies": {},
  "dependencies": {
    "chart.js": "^2.5.0",
    "jquery": "^3.2.1",
    "react": "^15.5.4",
    "react-chartjs-2": "^2.1.0",
    "react-dom": "^15.5.4",
    "react-timeout": "^1.0.0",
    "react-scripts": "^0.9.5",
    "react-test-renderer": "^15.5.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "test": "react-scripts test"
  },
  "eslintConfig": {
    "extends": "./node_modules/react-scripts/config/eslint.js"
  }
}

8) Note that package.json was first sourced off of create-react-app. If you want to read more: https://github.com/facebookincubator/create-react-app/blob/master/README.md.
This project uses webpack to building all frontend files.
In packages.json devDependencies is empty but before this project was deployed held the react-scripts requirement found now in dependencies. This change enabled deployement in build mode. 

```
## Installing:
1) create a database using postgres and source the database. To learn more about postgres: https://www.postgresql.org/download/. The seed.py file containes basic color options for your calendar and is essential. 
``` 
    $ createdb daily
    $ python model.py
    $ python seed.py
```

2) To run the server file server.py :
``` 
    $ python server.py
```
3) To run the frontend:
```
    $ yarn run 
```
If using npm
```
    $ npm start
``` 
## Running the tests:
1) create a database using postgres and source the database
```
    $ createdb testdaily
    $ python model.py
```
2) Run the unittests, Jest tests are under construction at this time
```
   $ python test.sh
```

## Built With:
* Python- Backend Language
* Flask - Python web frame work
* SqlAlchemy- Database Toolkit for python (ORM)
* PostgreSQL- Object Relational Database System
* Unittest- Python Testing Framework
* Flask Unittest - Flask-Server Testing Framework (under construciton) 
* Javascript- Front end language
* React - Front end Framework
* JQuery- Javascript Library
* Jest- Javascript Testing Framework (under construction)

## Current Features Completed:
* Create a Personal Calendar (complete)
* Add Daily Adjectives (complete)
* Add Daily Emotion/Color Summery (complete)
* Edit Any Daily Calendar Input (complete)
* Change between Months (complete)
* View Profile Graphs (complete)
* SignIn/Up/SignOut (complete)
* API unittests (complete)

## Future Build-Out:
* Build-Out test Javascript suites and Flask-Server test suites
* Enable user to set color/emotion trend feature
* Add more chart/graphic features in profile
    * By month
    * By pie chart for each emotion
    * By pie chart for positive, netural, negative emotions
* Enable user to reset password
* Publish API docs

## Author:
* Lauren Gordon-Fahn

## Acknowledgments:
* Alex Rattery for being an amazing React teacher. He has been an amazing mentor and bug hunter.
