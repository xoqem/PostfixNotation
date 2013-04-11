PostfixNotation
===============

A JavaScript parser / calculator using postfix notation.


Known Issues:
-------------

1. jQuery evaluates the string "+2" as a numeric 2.  I'm actually ok with it denoting a positive number, as it is consistent with the negative sign being used to show negative numbers.  So, you can use the / or * immediately before a number, but the + and - will be treated as part of the number if not separated by white space.

2. So far I've tested it in Chrome/Firefox/IE on Windows, Chome/Firefox/Safari on Mac, and on an iPhone.  But please let me know if you find an incompatibility with any browser and OS combo.


Project Structure
-----------------

This app was built using jQuery, Ember, Handlebars, and Twitter Bootstrap.  The javascript files are stored in the js folder and organized into folders for clarity.  The code from the app.js file runs first, and the remainder of the files are order independent.  The Handlebars templates can be found in the templates folder.

The Grunt build process, described in more detail below, concats the application javacsript files into main.js, processes the templates into templates.js, and copies images, css, and html files and places them all in the tmp debug and release folders respectively.  During general development, I would typically run grunt watch, and just refresh the debug index page ocassionally.  For deployment, the build process also creates debug and release packages.


Unit Tests
----------

The unit tests currently aren't integrated into the build process (because they required setting up PhantomJS and having more info about the build box, which seemed like overkill for this).  For now, you can run them by simply going to the test.html page (which is a sibling of the index.html page) in either the tmp/debug or tmp/release folders.  I tried to cover all the major bases with many tests cases, but do let me know if I missed something that should be added to the test cases.


Building:
---------

1. Install node: http://nodejs.org/download/

2. In the project directory run:

    npm install

3. To globally install the smart grunt runner (so it will run the version of grunt in your project directory) run:

    npm install -g grunt-cli

4. Then run grunt to build the project:

    grunt

5. Run the app by loading the index.html file in either tmp/debug or tmp/release.  Compressed release and debug packages can be found in the dist folder after building.

Note: if you are running the app via file:// you'll need to update the index.html and test.html pages to to have http:// in front of the link and script urls.  They only have // to play nicely with https or http.


Credits:
--------

Background Texture - Jordan Pittman - http://subtlepatterns.com/low-contrast-linen/
