
# System Design

## Introduction

This project is a primitive and incomplete implementation of a patient health-data monitoring and storing system.&nbsp;  This system is meant to emulate a cloud environment, meaning that it is broken up into microservices.&nbsp;  These communicate mostly with a separate data store, and to a small degree with each other via a (provided) pub-sub emulation.

There is no authentication / authorization (or "authentorization") in this system.&nbsp;  Adding it might have effects on the design / structure, although not with absolute necessity.&nbsp;  I explain what I mean later on.

Testing and trying things out are described [here](#so-you-want-to-run-the-project).

The known problems with the code are laid out at the end.


## Design

This system consists of several "edge" microservices which are meant to be called directly from the outside world.&nbsp;  In real life, these would be implemented as cloud functions rather than standalone services.&nbsp;  Most of these services directly contact a data store to save or retrieve data.

The microservice that adds individual readings for a patient also publishes a message to the pub-sub emulation as they are saved, so that they may be picked up separately by real-time monitoring services.

The microservice for monitoring patient readings is implemented as a plain call-and-response RESTful HTTP server, meaning that to receive continuous readings at a client end, the front end would need to use something like a long-polling system.&nbsp;  This service also listens to events from the pub-sub emulation and stores them in memory for retrieval when asked for (and then disposal so they are not repeated).

The data store is a wrapper around MongoDb database calls.&nbsp;  In the local pseudo-cloud, this is just the default database server on the local machine.&nbsp;  In real life, this would most likely be a managed instance of the database hosted by the cloud provider.

That's about all there is to say about the current design: it's pretty simple.&nbsp;  I bypassed some potential structuring options that might make sense in a real-life implementation, since they were not needed here, and they would be both time-consuming and a case of over-design for the circumstances.


### Components

#### Edge microservices

Each of these is based on the superclass `AEndpoint` (`A` is for "abstract"), which handles most of the basic set-up, allowing each subclass to focus on its HTTP listeners and the local methods that handle the inbound request data.

##### Manager
`Manager` is used to add and remove patients ("manage" them).&nbsp;  Removing a patient also removes all their readings.

##### Writer
`Writer` is used to add ("write") new readings to storage, and to publish them to the pub-sub system.

##### Reader
`Reader` is used to retrieve ("read") existing stored readings, based on the criteria of patient ID, start date ("from") and end date ("to"), which are both inclusive.

##### Watcher
`Watcher` is the real-time readings-monitoring component, which retrieves any not-yet-seen readings for a single patient by ID.&nbsp;  It does not communicate with the data store, but only caches readings that it hears about from the pub-sub system (posted there by `Writer`), and returns them when asked.

`Watcher` is designed to get all the cached readings for the chosen patient, and to trash them as it does so.&nbsp;  This means that readings cannot be repeated.&nbsp;  Published readings for other patients are not trashed.

As mentioned earlier, there is no streaming capability here.

#### Storage

All persistent storage is through the appropriately named `Storage` component.&nbsp;  This object opens a connection to a MongoDb database and saves, retrieves, and possibly deletes data there.


## Design limitations

%cruft : add here!


## Improvements possible

%cruft : add here!


## Known problems

I have had to leave off development while many things are incomplete or even still broken.&nbsp;  Therefore there is a long list of known problems, even excluding the design limitations stated earlier.


## So you want to run the project

