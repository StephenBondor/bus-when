# Bus When?

Bus arrival time app

A front-end and back-end solution to the problem of delerving up-to-date arrival
time information to people waiting for a bus.

### Front-end

Deployed [here](https://epic-euclid-7b3828.netlify.com)

This app was created in React.

Dependency list:

meet an un-styled MVP with:

-   React
-   Hooks
-   Moment.js

#### MVP

-   Displays the next 2 arrival times for all bus routes queried from the server
    given a stop (or multiple stops).

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
