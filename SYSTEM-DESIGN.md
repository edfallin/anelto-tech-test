
# System Design

## Introduction

This project is a primitive and incomplete implementation of a patient health-data monitoring and storing system.&nbsp;  This system is meant to emulate a cloud environment, meaning that it is broken up into microservices.&nbsp;  These communicate mostly with a separate data store, and to a small degree with each other via a (provided) pub-sub emulation.

There is no authentication / authorization (or "authentorization") in this system.

Testing and trying things out are described somewhere near [here](#so-you-want-to-run-the-project).

The known problems with the code are laid out at the end.


## Design

This system consists of several "edge" microservices which are meant to be called directly from the outside world.&nbsp;  In real life, these would be implemented as cloud functions rather than standalone services.&nbsp;  Most of these services directly contact a data store to save or retrieve data.

The microservice that adds individual readings for a patient also publishes a message to the pub-sub emulation as they are saved, so that they may be picked up separately by real-time monitoring services.

The microservice for monitoring patient readings is implemented as a plain call-and-response RESTful HTTP server, meaning that to receive continuous readings at a client end, the front end would need to use something like a long-polling system.&nbsp;  This service also listens to events from the pub-sub emulation and stores them in memory for retrieval when asked for (and then disposal so they are not repeated).

The data store is a wrapper around MongoDb database calls.&nbsp;  In the local pseudo-cloud, this is just the default database server on the local machine.&nbsp;  In real life, this would most likely be a managed instance of the database hosted by the cloud provider.

### How the data is organized

Since it seems like doctors ordinarily will want to look at a single patient at a time, and patients' data is logically unrelated, it makes the most sense to have data organized first by patient, then by reading timestamp.&nbsp;  Arbitary data operations would not be well-supported this way, but should really be rare.

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

There are many, many, many improvements possible.&nbsp;  This example doesn't even come close to an MVP.&nbsp;  Let's look at this in two stages: MVP and LOP (later ongoing product).

### MVP improvements

As before, these are in no order.

| Classification | Improvement needed   | Comments |
|-|-|-|
| Responsiveness | Switch away from `toArray()` when retrieving readings | Chokepoint for large data retrievals, which are likely.&nbsp;  Instead, cursoring and paging make sense, with some effects on the API signature. |
| Security | Add authentorization (see term definition in _Intro_) | Of course.&nbsp;  Required and desirable.&nbsp;  See discussion below. |
| Responsiveness | Switch to time-series storage for readings   | This MongoDb type is optimized for the kind of retrieval needed here. |
| Responsiveness | Add indexes and make other MongoDb-specific improvements | Whatever MongoDb offers for improving data return times, that should be used, because the data sets are likely to get very large |
| Responsiveness | Sharding, probably   | Data for individual patients may be large, but especially data across many patients will really get voluminous.&nbsp;  Dividing patients into regions (whether disjunct geographically, or more notional, like overlapping area codes) and then having separate shards for each region would help keep overall data-store sizes smaller. |
| Reliability | Logging  | The different services need to journal what they're doing, because even when the code is under test and 100% reliable, the service mesh is not. |
| Reliability | Exception catching, error trapping, input validation  | Didn't have time to catch 'em all, or really any of them.&nbsp;  Obviously in real life, a system needs to be robust enough to stay running and stable against garbage inputs, offline system components, and so on. |
| Security | Input validation  | Speaks for itself. |
| Reliability | Data journaling   | Not quite the same as the journal-like logging I mentioned already, this would be a record of the operations that were conducted so the state could be rolled forward after a major crash.&nbsp;  My idea includes journaling when the data store is completely offline, allowing things to continue in a half-normal fashion while the cloud engineers scramble to wipe up the coffee. |
| Responsiveness | Cloud scaling set-up | Of course on a real cloud, gateways perform load-balancing and spin-up of metered functions, containers, and whatnot, in conjunction with other systems / features designed for ultra-quick response times.&nbsp;  I mention it here so you know I know about it, but also just to mention that flexible scaling is most of the point of the cloud, so it would have to be set up well and improvements always looked for. |


#### Authentorization

Authentication and authorization are of course absolutely necessary.&nbsp;  I would implement these for individual readings with JWT bearer tokens.&nbsp;  Whatever the source of readings (device, computer), I would expect it to have a public/private asymmetrical keypair, and when the connection was first set up (after a user connected their device, for instance), the cloud service and source would exchange keys once.&nbsp;  Rather like SSH keys, the key at the patient end would remain constant.

For authorization to retrieve or monitor readings, one would have to be the originating patient or else their doctor (or delegate).&nbsp;  For these purposes, I would have a separate, typical system of login screens with salted and hashed passwords.&nbsp;  I would still use a JWT bearer token system here, not sessions, but would not use third-party servers for any OAuth2-style validation of identities / claims.&nbsp;  All servers would be in-house (well, really, part of the virtual private cloud).


#### Consistency & co.

One might well wonder if the system can maintain data consistency under realistic workloads or complex situations.&nbsp;  As long as patient data is arriving linearly, addressed more or less linearly, and not aggregated across patients in anything like real time, it doesn't look like data consistency would be a big issue compared to the volume arriving.&nbsp;  But probably I'm missing something!&nbsp;  This is the last thing I'm typing, so it's too late now.&nbsp;  Jaa ne!


### LOP improvements

As usual, these are in no order.

| Classification | Improvement needed   | Comments |
|-|-|-|
| Security | Re-registration of auth info  | Eventually there will be some need to replace keys for authentorization, so something needs to be written for it. |
| Generalization | Slow copying of sanitized readings to a relational store | Eventually someone will want to do some kind of study of the data across patients, so for those who opt in, having the data drizzle into a separate relational store, first stripped of all personal identifiers, will enable studies of social health statistics, etc. |
| Responsiveness | Caching, maybe | Data of this kind doesn't seem readily amenable to caching, but who knows?&nbsp;  If system monitoring (see below) shows that there is a lot of locality of reference, then caching is definitely advisable to speed up data returns. |
| Responsiveness | Ongoing system monitoring  | Not only are noticeable latencies looked for, but anyplace that seems disproportionately slow, or shows an undesirable latency trendline.&nbsp;  This monitoring gets development ahead of the game and makes it easier to find forgotten inefficiencies.&nbsp;  (Or brand-new ones!) |
| Reliability | Ongoing system monitoring  | Yes, it's the same thing, but it's so nice I listed it twice, where "nice" means "vitally necessary" for the same kinds of reasons as in the first listing. |


## Known problems

I have had to leave off development while many things are incomplete or even still broken.&nbsp;  Therefore there is a long list of known problems, even excluding the design limitations stated earlier.

Namely:

1. When anything goes wrong, the affected component crashes.&nbsp;  (Or it could be more than one!).&nbsp;  Alas, getting to `try`-`catch` was always on the horizon.
1. Retrieval by range doesn't work from HTTP (although it does from the Storage class itself, for instance in `Try.js`).
1. When last checked, the messages emitted by `Writer` were not parseable by the pub-sub emulator.&nbsp;  This means all of the following:

    a. That `Writer` crashes.

    b. That nothing is sent to pub-sub.

    c. That `Watcher` therefore has nothing to monitor.

    > However, pub-sub comes after saving data, so `Reader` should still have some data to look at.
    > 
    > In any case, it may be working now since I made untested late-breaking changes.
    > 
    > If it's not, then a flag I added to `Writer`'s constructor makes it possible to turn off pub-sub when adding data for other trying-out.


## So you want to run the project

To try out the project, you need to take these steps, more or less, omitting anything that is already installed in your run environment.

Unfortunately, not everything is likely to work.&nbsp;  See [the preceding section](#known-problems).

1. Clone to your machine:

```bash
git clone ...this-repo's-url...
```

2. Install all the dependencies:

```bash
npm install
```

3. Install `MongoDb` if it isn't installed already.&nbsp;  This is a many-step process.&nbsp;  Mongo's [own guide](https://www.mongodb.com/docs/manual/administration/install-community/) is best for this.&nbsp;  (That link is for the MacOS version, though of course there are other pages for other OSes.)

> The MongoDb settings in the code assume the defaults, such as port `27107`.

4. Start MongoDb one of the usual ways if it's not already running, as laid out on its installation website.

5. Install `pm2` if it isn't installed already, because I use it in some scripts to support side-by-side Node processes easily.

```bash
npm install pm2
```

6. To run unit tests, simply run the `test` script.&nbsp;  If the output looks unfamiliar, that's because they are written using my Risei framework (one of the dependencies).&nbsp;  The tests are written using declarative syntax in files with an `rt.js` extension, conveniently all found in the `tests` folder.&nbsp;  Risei settings are found in `package.json`.

```bash
npm test
```

7. Not everything could be unit-tested given all the situational constraints, so there are also some try-it-out pieces of code.&nbsp;  To see how the usage of MongoDb works, you can find and run the `Try.js` script in the `trials` folder.

8. To go for the gold and try actually running everything, you need to take two steps and then a deep breath:

```bash
npm run dev
```

then

```bash
npm run trial-start
```

This script BTW is the `StartEdgeEndpoints.sh` BASH script found in `src/run-scripts`.&nbsp;  It runs the other `Start___` scripts in the same folder.

At the bottom of its output, after all the `pm2` status screens, this start script tells you how to make the various calls needed.  Here is the same info for convenience:

```
How to use:

    Add a patient at POST http://localhost:31001/add-patient.
        A patient POST body consists of { firstName, lastName, patientId }.

    Add readings at POST http://localhost:31003/add-reading.
        A reading POST body consists of { patientId, timestamp, systolic, diastolic }.

    Request past readings at GET http://localhost:31005/get-readings/id/from/to.
        From and to are dates / date-times in a URL-encoding-friendly format, such as 11-10-2023.

    Request current readings at GET http://localhost:31007/get-current/id.

    Remove a patient at DELETE http://localhost:31001/remove-patient/id.
```

Of course, the properties in those example objects have to have values, similar to those in the `Try.js` script or, for instance, like this for a patient:

```json
    { patientId: "Z2936584", firstName: "Zachary", lastName: "Taylor" }
```


9. After trying things out and seeing what if anything works, you would exit from both running systems.
  a. You can Ctrl+C out of the `nodemon` script (`dev`).
  a. But you should run the following to stop `pm2` and all the processes.

```bash
npm run trial-stop
```

> **Warning!**:&nbsp;  The preceding script stops ___all___ processes running via `pm2` and then shuts down `pm2` itself.&nbsp;  If that's not what you want, stop the processes piecemeal the usual ways with `pm2`.&nbsp;  The processes you would shut down are all named `Start___`, where `___` represents the name of one of the edge-microservice components.&nbsp;  Actually you would also want to shut down the stray `node` process there as well, which is an artifact of this unfinished approach.


## Conclusion

That's the whole thing.&nbsp;  Enjoy!
