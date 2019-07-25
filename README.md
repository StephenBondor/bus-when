# Bus When?

Bus arrival time app

A front-end and back-end solution to the problem of delerving up-to-date arrival
time information to people waiting for a bus.

#### MVP

-   Displays the next 2 arrival times for all bus routes queried from a server
    given a stop (or multiple stops).

#### Stretch

-   Properly style it
-   Make it subscription/websocket based
-   Add a database

        Potential Database Schema:

        	A stop -

        	-   can be on multiple bus-routes
        	-   can have multiple arrival times

        	A bus-route -

        	-   can have one schedule

        	A schedule -

        	-   can have multiple arrival times

        	An arrival time can -

        	-   only have one stop

-   Add Caching

## Front-end

Deployed [here](https://epic-euclid-7b3828.netlify.com)

### How to run on a local machine:

1. Run `git clone https://github.com/StephenBondor/bus-when.git` in a fresh
   directory
2. Make sure you have `yarn`
   [installed and ready to go](https://yarnpkg.com/lang/en/docs/install/)
3. `cd bus-when/frontend`
4. `yarn init -y` get the package.json file up to date
5. `yarn instal` installs all the dependencies
6. `yarn upgrade --latest` makes sure all dependencies are current
7. `yarn start` (Note: this will only run the front end locally)
8. You should automatically be navigated to
   [http://localhost:3000](http://localhost:3000)

### Dependency list:

Un-styled frontend MVP requires:

-   React
-   Hooks
-   Moment.js

## Back-end

Deployed [here](https://frozen-crag-20790.herokuapp.com)

### How to run on a local machine:

1. This assumes the front end is golden, so start their if you haven't
2. Make you way into the root dir `cd bus-when/`
3. `yarn init -y` get the package.json file up to date
4. `yarn instal` installs all the dependencies
5. `yarn upgrade --latest` makes sure all dependencies are current
6. `yarn server` to start the server
7. You probably wont be automatically be navigated to
   [http://localhost:4000](http://localhost:4000) but you should brows there to
   see the GQL playground to make sure you are good to go.

Un-styled frontend MVP requires:

-   GraphQL-Yoga (an express server fork)
-   nodemon
