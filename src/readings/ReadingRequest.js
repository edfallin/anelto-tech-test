/**/

import { EventNames } from "../global/EventNames.js";
import { Event_ } from "../global/Event_.js";

export class ReadingRequest extends Event_ {
    patientId;
    
    startDate;
    startTime;
    
    endDate;
    endTime;
    
    constructor() {
        this.eventName = EventNames.getReadings;
    }
}
