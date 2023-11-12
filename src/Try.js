/**/

import Storage from "./storage/Storage.js";


// new store instance

let store = await new Storage();
await store.init();
let db = store.store;


// data trials

let patient = { firstName: "John", lastName: "Johannson", patientId: "B9275348" };
let result = await store.storePatient(patient);
console.log(`cruft : storePatient() result:`, result);

let patients = db.collection("patients");

let storedPatient = await patients.findOne({ patientId: "B9275348" });
console.log(`cruft : storedPatient:`, storedPatient);

let uid = storedPatient._id;
let name = `readings-patient-${ uid }`;
console.log(`cruft : calculated name:`, name);

let readings = db.collection(name);

let storedReadings = await readings.findOne({ patientId: "B9275348" });
console.log(`cruft : before, storedReadings:`, storedReadings);

let reading = { patientId: "B9275348", timestamp: new Date(), systolic: 130, diastolic: 90 };
result = await store.storeReading(reading);
console.log(`cruft : storeReading() result:`, result);

storedReadings = await readings.findOne({ patientId: "B9275348" });
console.log(`cruft : after, storedReadings:`, storedReadings);

storedReadings = await store.getPatientReadings("B9275348", "from", "to");
console.log(`cruft : called, storedReadings:`, storedReadings);

result = await store.unstorePatient("B9275348");
console.log(`cruft : unstorePatient() result:`, result);

let storedPatients = await patients.find( { } ).toArray();
console.log(`cruft : storedPatients:`, storedPatients);

