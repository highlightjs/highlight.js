Building and Testing
====================

To use Highlight.js it is first necessary to build it for the environment
where you plan to execute it: the browser, the Node.js server, etc.

TLDR
----

Often when contributing a pull-request it's sufficient to build and test only
the Node.js build. Our CI process will guarantee the browser build tests are all
still green if you don't run them during development.

::

    npm run build
    npm run test

The browser library must be built and tested separately:

::

    npm run build-browser
    npm run test-browser

Building
--------

The build tool is written in JavaScript using node.js. Before running the
script, make sure to have node installed and run ``npm install`` to get the
dependencies.

The tool is located in ``tools/build.js``. A few useful examples:

* Build for a browser using only common languages::

    node tools/build.js :common

* Build for node.js including all available languages::

    node tools/build.js -t node

* Build two specific languages for debugging, skipping compression in this case::

    node tools/build.js -n python ruby

On some systems the node binary is named ``nodejs``; simply replace ``node``
with ``nodejs`` in the examples above if that is the case.

The full option reference is available with the usual ``--help`` option.

The build result will be in the ``build/`` directory.

.. _basic-testing:

Basic testing
-------------

The usual approach to debugging and testing a language is first doing it
visually. You need to build highlight.js with only the language you're working
on (without compression, to have readable code in browser error messages) and
then use the Developer tool in ``tools/developer.html`` to see how it highlights
a test snippet in that language.

A test snippet should be short and give the idea of the overall look of the
language. It shouldn't include every possible syntactic element and shouldn't
even make practical sense.

After you satisfied with the result you need to make sure that language
detection still works with your language definition included in the whole suite.

Testing is done using `Mocha <http://mochajs.org/>`_ and the
files are found in the ``test/`` directory. You can use the node build to
run the tests from the command line with ``npm test`` after building_. (Using
``npm run build_and_test`` you can build and then test with one command.)

**Note**: for Debian-based machine, like Ubuntu, you might need to create an
alias or symbolic link for nodejs to node. The reason for this is the
dependencies that are requires to test highlight.js has a reference to
"node".

Place the snippet you used inside the browser in
``test/detect/<language>/default.txt``, build the package with all the languages
for node and run the test suite. If your language breaks auto-detection, it
should be fixed by :ref:`improving relevance <relevance>`, which is a black art
in and of itself. When in doubt, please refer to the discussion group!


Testing markup
--------------

You can also provide additional markup tests for the language to test isolated
cases of various syntactic construct. If your language has 19 different string
literals or complicated heuristics for telling division (``/``) apart from
regexes (``/ .. /``) -- this is the place.

A test case consists of two files:

* ``test/markup/<language>/<test_name>.txt``: test code
* ``test/markup/<language>/<test_name>.expect.txt``: reference rendering

To generate reference rendering use the Developer tool located at
``tools/developer.html``. Make sure to explicitly select your language in the
drop-down menu, as automatic detection is unlikely to work in this case.


Building and Testing with Docker
--------------------------------

If you don't want to install dependencies on your system, you can use the
included Dockerfile to build a container that will add the source code
and then deploy a web server for you to preview it. Specifically, after you
finish with your changes you can build the container from the root of the repository:

::

  docker build -t highlight-js .


And then run the container. You will need to expose port 80 on the host for the
web interface, and note that we are running it in detached (-d) mode.

::

  docker run -d --name highlight-js --rm -p 80:80 highlight-js


If your preference is for another port, you can do that too:


::

  docker run -d --name highlight-js --rm -p 80:8080 highlight-js


Or you can skip binding a port if your intention is to interactively shell
into the container to use it as a development environment.


::

  docker run -d --name highlight-js --rm highlight-js


Whatever you choose, you can use docker ps to ensure that it's running.

::

  $ docker ps
  CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
  0e15a7c99adf        highlight-js        "docker-entrypoint.s…"   8 seconds ago       Up 7 seconds        0.0.0.0:80->80/tcp   highlight-js


Then, open up to http://127.0.0.1/tools/developer.html to see the developer page
for preview. When you are done, clean up your container.

::

  docker stop highlight-js

If you want a more advanced testing setup, you can bind the source folder when you
run the container.

::

  docker run -d --name highlight-js --volume $PWD/src:/var/www/html/src --rm -p 80:80 highlight-js

Then if you want to make changes, you can do so locally (the folder is bound as a volume),
and execute a command to the container to trigger a rebuild:

::

  docker exec highlight-js node tools/build.js :common


And then reload the page to see changes. When you finish, don't forget to remove the container.
