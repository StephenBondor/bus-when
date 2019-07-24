# Bus When?

Bus arrival time app

A front-end and back-end solution to the problem of delerving up-to-date arrival
time information to people waiting for a bus.

### Front-end

This app was created in React using Apollo and GraphQL.

Dependancy list:

-   React
-   Hooks
-   Moment.js

#### MVP

-   Displays the next 2 arrival times for all bus routes queried from the server
    given a stop (or multiple stops).
-   Mobile first design.

### Back-end

Potential Database Schema:

```
A stop -

-   can be on multiple bus-routes
-   can have multiple arrival times

A bus-route -

-   can have one schedule

A schedule -

-   can have multiple arrival times

An arrival time can -

-   only have one stop
```

Seed Dumby Data:
