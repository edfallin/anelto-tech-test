/**/

import Storage from "./storage/Storage.js";


// Target store instance.

let store = await new Storage();
await store.init();
let db = store.store;


// region Basic operations: Add a patient, add a reading, get a reading, drop a patient.

// Adding patient.
let patient = { firstName: "John", lastName: "Johannson", patientId: "B9275348" };
let result = await store.storePatient(patient);
console.log(`cruft : storePatient() result:`, result);

let patients = db.collection("patients");

let storedPatient = await patients.findOne({ patientId: "B9275348" });
console.log(`cruft : storedPatient:`, storedPatient);

// Calculating readings collection for this patient.
let uid = storedPatient._id;
let name = `readings-patient-${ uid }`;
console.log(`cruft : calculated name:`, name);

let readings = db.collection(name);

// Adding and looking at readings.
let storedReadings = await readings.findOne({ patientId: "B9275348" });
console.log(`cruft : before, storedReadings:`, storedReadings);

let reading = { patientId: "B9275348", timestamp: new Date(), systolic: 130, diastolic: 90 };
result = await store.storeReading(reading);
console.log(`cruft : storeReading() result:`, result);

storedReadings = await readings.findOne({ patientId: "B9275348" });
console.log(`cruft : after, storedReadings:`, storedReadings);

storedReadings = await readings.find({ }).toArray(); // store.getPatientReadings("B9275348", "from", "to");
console.log(`cruft : called, storedReadings:`, storedReadings);

// Removing patient and verifying collection states.
result = await store.unstorePatient("B9275348");
console.log(`cruft : first unstorePatient() result:`, result);

let storedPatients = await patients.find( { } ).toArray();
console.log(`cruft : storedPatients:`, storedPatients);

result = await store.unstorePatient("B9275348");
console.log(`cruft : second unstorePatient() result:`, result);

// endregion Basic operations: Add a patient, add a reading, get a reading, drop a patient.

// Give me some space.
console.log();
console.log();
console.log();

// region Complex operations: Add a patient, add several readings, get just some of those readings.

// Adding different patient.
patient = { firstName: "Jacob", lastName: "Jacobson", patientId: "C4062091" };
result = await store.storePatient(patient);

// Calculating readings collection for this patient.
uid = result._id;
name = `readings-patient-${ uid }`;
readings = db.collection(name);

// Adding and looking at all readings.
let jacobReadings = [ 0, 1, 2, 3, 4, 5, 6 ].map(
    (x) => {
        let stamp = new Date(`11/${ x + 1 }/2023`);
        let sys = 180 - 10 * x;
        let dia = 90 + 5 * x;
        return { patientId: "C4062091", timestamp: stamp, systolic: sys, diastolic: dia }; 
    }
);

for (let jR of jacobReadings) {
    await store.storeReading(jR);
}

storedReadings = await readings.find({ }).toArray();
console.log(`cruft : all jR storedReadings:`, storedReadings);

// Getting targeted readings.
let chosen = await store.getPatientReadings("C4062091", new Date("11/03/2023"), new Date("11/06/2023"));
console.log(`cruft : chosen, 11/03 to 11/06:`, chosen);

chosen = await store.getPatientReadings("C4062091", new Date("11/01/2023"), new Date("11/04/2023"));
console.log(`cruft : chosen, 11/01 to 11/04:`, chosen);


// endregion Complex operations: Add a patient, add several readings, get just some of those readings.
