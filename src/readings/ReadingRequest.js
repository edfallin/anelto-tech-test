/**/

import { EventNames } from "../shared/EventNames.js";
import { Event_ } from "../shared/Event_.js";

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
