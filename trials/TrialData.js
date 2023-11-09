/**/

import { Reading } from "../src/readings/Reading.js";
import { PatientReadings } from "../src/storage/PatientReadings.js";
import { UnifiedStorage } from "../src/storage/UnifiedStorage.js";
import { PatientReadings } from "../src/storage/PatientReadings.js";
import { DayOfReadings } from "../src/storage/DayOfReadings.js";
import { HourOfReadings } from "../src/storage/HourOfReadings.js";


export class TrialData {
    data;

    constructor() {
        let u = new UnifiedStorage();
        
        let patient1 = new PatientReading("aa");
        let p1Day1 = new DayOfReadings("11/05/23");
        let p1Day2 = new DayOfReadings("11/06/23");
        
        let patient2 = new PatientReading("bb");
        let p2Day1 = new DayOfReadings("11/05/23");
        let p2Day2 = new DayOfReadings("11/06/23");
        let p2Day3 = new DayOfReadings("11/07/23");
        
        for (let day of [ p1Day1, p1Day2, p2Day1, p2Day2, p2Day3 ]) {
            this.addHoursToDay(day);
        }
        
        u.patients.push(patient1);
        u.patients.push(patient2);
    }
    
    addHoursToDay(day) {
        for (let hour = 0; hour < 24; hour++) {
            day.hours.push(new HourOfReadings(hour));
            
            for (let at = 0; at < 10; at++) {
                let number = Math.random() * 10;
                day.hours[hour].readings.push(new Reading([ "Health", number ]));
            }
        }
    }
}


