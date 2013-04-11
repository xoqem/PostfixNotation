PostfixNotation
===============

A JavaScript parser / calculator using postfix notation

Known Issues:
-------------

1. jQuery evaluates the string "+2" as a numeric 2.  I'm actually ok with it denoting a positive number, as it is consistent with the negative sign being used to show negative numbers.  So, you can use the / or * immediately before a number, but the + and - will be treated as part of the number if not separated by white space.


Building:
---------

1. Install node: http://nodejs.org/download/

2. In the project directory run:

    npm install

3. To globally install the smart grunt runner (so it will run the version of grunt in your project directory) run:

    npm install -g grunt-cli

4. Then run grunt to build project:

    grunt

5. Run the app by loading the index.html file in either tmp/debug or tmp/release.  Compressed release and debug packages can be found in the dist folder after building.

Note: if you are running the app via file:// you'll need to update the index.html page to to have http:// in front of the link and script urls.  They only have // to play nicely with https or http.


Unit Tests
----------

The unit tests currently aren't integrated into the build process.  For now, you can run them by simply going to the test.html page in either the tmp/debug or tmp/releaes folders.


Credits:
--------

Background Texture - Jordan Pittman - http://subtlepatterns.com/low-contrast-linen/
