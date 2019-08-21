# Bus When?

_A next bus arrival time app_

This app is a frontend and backend solution to the problem of delerving
up-to-date arrival time information to people waiting for a bus.

Deployed [here](https://epic-euclid-7b3828.netlify.com)

#### Minimum Viable Product

-   Displays the next 2 arrival times for all bus routes on a website, queried
    from a server, given a stop (or multiple stops).

#### Stretch

-   Properly style it (CHECK)

        lol, not sure about "properly" more like "something"

-   Add a database (CHECK)

        This is a prisma deploy using MySQL (I think, but gql abstracts
        a lot of the DB stuff away)

        Database Schema (see `backend/prisma/datamodel.prisma`).


        	type Stop {
        		name: String! @unique
        		eventList: [Event] (forign key)
        	}

        	type Route {
        		name: String! @unique
        		stopList: [Stop!]! (forign key)
        	}

        	type Bus {
        		startTime: DateTime!
        		route: Route!
        		eventList: [Event] (forign key)
        	}

        	type Event {
        		stop: Stop! (forign key)
        		bus: Bus! (forign key)
        		time: DateTime! (forign key)
        	}

-   Add automated seeding generator (CHECK)

        backend/seeder.js `node seeder`

-   Migrate backend over to new BD backend GQL playground (CHECK):

        `https://us1.prisma.sh/bondor-e1702b/bus-when/dev`

-   Refactor frontend to access BD instead of hacked data (CHECK)
-   Add integration tests against expected data (CHECK)
-   Refactor frontend to use Apollo GQL Hooks (CHECK)
-   Add front end functionality:

        Pages for routes
        Pages for Bus by id
        Search for stop

-   Add user can report late bus or comment on the condition of a bus they are
    on
-   Make it subscription/websocket based
-   Add Caching / Optimistic Responce

#### User Stories

##### User

-   Only one user type: End Consumer

##### Stories

-   As a User I can: Choose which stops I'd like to see information for.
-   As a User I can: See the bus services servicing those stops.
-   As a User I can: See the next two arrival times for each of those services.
-   As a User I can: Use this app on my smart phone.

### Design Decisions, Justification and Notes (Technical Design Doc)

#### Stack

From the get go, this app seemed most suitable to deploy with React and GraphQL
technologies.

##### React:

-   Fast modular design makes scaling user interaction changes, design changes,
    and infrastructure changes near seemless and easy to work with
-   Many supported libraries/frameworks
-   Easy to pass on a React project to another developer
-   Hooks allow for outragiously simplified, low boilerplate local state
    management

##### GraphQL:

-   Combined with Hooks, GQL effectively removes the necessity for global state
    management: the DB IS the source of truth.
-   Considering this app does not have/require a database, but because GQL comes
    out of the box with so many great features, a database can be effortlessly
    added to the backend and deployed, _without changing endpoints/resolvers_,
    making it the clear choice for forward scalability
-   Sweet sweet gql playground
-   The app is meant to be mobile first, consequently, data shaping client side
    is paramount, a standard feature of GQL
-   Last but not least, the datamodel or relational schema of bus transportation
    systems is itself a graph: each bus is on a route which interacts with other
    buses in a graph like fashion, stops are nodes connected by distances,
    traffic, and various other conditions. Stops themselves are hubs, and
    represent nodes on another graph of station interconnectivity w/r/t
    multi-modal. When it looks like a duck... GraphQL itself is a system of
    graphs infinitely extensable and recursively nested, JUST like
    transportation: each bus is on a route, which is connected by hubs, which
    connect to other routes, and other hubs and other buses.

    There is no better technology to solve this problem as effectively and
    scalably that I am aware of.

### Plan

This app was aimed to be built _fully_ mobile first:

##### Frontend

1. Ruff out a sketch from the docs _in a mobile window_
1. Build required react components--populate with hard coded data
1. Consolidate hard data into a referable datastructure: hash table for easy
   lookup
1. Convert components to become dynamic while accessing structured data.
1. Integrate all components and consolidate data access points
1. Modularize components
1. Deploy frontend to Netlify

##### Backend

1. Build gql-server boilerplate
1. Connect and define schema and resolvers from given datastructure
1. Refactor resolvers to meet efficiency and optimization: allowing for DB
   integration if need be.
1. Deploy backend to Heroku (This by far took the most time because Heroku
   _hates_ building deploys from subdirectories)

##### Integration

With a frontend and backend deployed, refactor the frontend to query the backend
instead of it's attached data structure (which, artfully, is the exact same one
the back end refers to)

1. Add Apollo client libraries to allow server integration on the frontend
1. Refactor data queries into gql queries.
1. Deploy
1. Run non-automated user tests.

##### Testing

The scope of this project, the small code base, the time pressure, the nature of
the data structure modularely adding features from the frontend to the back, and
the fact that there will most likely only ever be one developer on this repo all
contributed to shelving responsible unit and integration testing until
conditions change.

## Frontend

Deployed [here](https://epic-euclid-7b3828.netlify.com)

This is a continuous deployment

### How to run on a local machine:

1. Run `git clone https://github.com/StephenBondor/bus-when.git` in a fresh
   directory
2. Make sure you have `yarn`
   [installed and ready to go](https://yarnpkg.com/lang/en/docs/install/)
3. `cd bus-when/frontend`
4. `yarn init -y` get the package.json file up to date
5. `yarn install` installs all the dependencies
6. `yarn upgrade --latest` makes sure all dependencies are current
7. `yarn start` (Note: this will only run the frontend locally)
8. You should automatically be navigated to
   [http://localhost:3000](http://localhost:3000)

### Dependency list:

Frontend MVP requires:

-   React
-   Hooks
-   Moment.js
-   apollo-boost
-   react-apollo
-   graphql

Stretch:

-   styled-components

## Backend

Deployed [here](https://frozen-crag-20790.herokuapp.com)

This is a continuous deployment

### How to run on a local machine:

1. This assumes the front end is golden, so start their if you haven't
2. Make your way into the root dir `cd bus-when/`
3. `yarn init -y` get the package.json file up to date
4. `yarn install` installs all the dependencies
5. `yarn upgrade --latest` makes sure all dependencies are current
6. `yarn server` to start the server
7. You probably wont be automatically navigated to
   [http://localhost:4000](http://localhost:4000) but you should browse there to
   see the GQL playground and make sure you are good to go.

### Dependency list:

Backend MVP requires:

-   GraphQL-Yoga (an express server fork)
-   nodemon
