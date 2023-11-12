/**/

import Storage from "./storage/Storage.js";


// new store instance

let store = new Storage();
await store.init();
let db = store.store;


// data trials

let patient = { firstName: "John", lastName: "Johannson", patientId: "B9275348" };
let didAdd = store.storePatient();
console.log(`cruft : storePatient, didAdd:`, didAdd);

let patients = db.collection("patients");
let storedPatient = patients.findOne({ patientId: "B9275348" });
console.log(`cruft : storedPatient:`, storedPatient);

let readings = db.collection("patient-readings");
let storedReadings = await readings.findOne({ patientId: "B9275348" });
console.log(`cruft : before, storedReadings:`, storedReadings);

let reading = { patientId: "B9275348", systolic: 130, diastolic: 90 };
didAdd = store.storeReading(reading);
console.log(`cruft : storeReading, didAdd:`, didAdd);

storedReadings = await readings.findOne({ patientId: "B9275348" });
console.log(`cruft : after, storedReadings:`, storedReadings);
