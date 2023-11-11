/**/

import mongo from "mongodb";

export class Storage {
    store;
    
    constructor() {
        this.construct()
            .then(client => store = client.db("local"));
    }
    
    async construct() {
        let client = await new mongo(`mongodb://127.0.0.1:27017`, { });
        await client.connect();
    }
}
