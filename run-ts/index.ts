
import express, { Request, Response } from "express";
import axios from "axios";

// region Express app set-up

const app = express();
app.use(express.json());

// endregion Express app set-up

/* Core class, a dispatcher that announces (publishes) 
   enqueued events (messages) to observers (services). */
class MessageQueue {
  // region Fields

  private queue: string[];
  private services: string[];

  // endregion Fields

  constructor() {
    this.queue = [];
    this.services = [];
  }

  /* Add a "service" observer of all events.
     Observers are all remote, at HTTP/S URLs.
     NB: No removal mechanism for observers. */
  public registerService(url: string): void {
    this.services.push(url);
    console.log(`Service registered at ${url}`);
  }

  /* Retain an event to announce to all observers.
     NB: No removal mechanism for events. */
  public enqueueMessage(message: string): void {
    this.queue.push(message);
    console.log("Message added to queue: " + message);
  }

  public broadcastMessage(): void {
    // Nothing to announce.
    if (this.queue.length === 0) {
      return;
    }

    // Copy messages, then trash original.
    const messagesToBroadcast = [...this.queue];
    this.queue = [];
    
    messagesToBroadcast.forEach(async (message) => {
      // If message is empty for some reason
      // (or otherwise is falsy), skip it.
      if (!message) { return; }
      
      // Traverse all observers and send to each by HTTPS.
      for (const serviceUrl of this.services) {
        try {
          await axios.post(serviceUrl, { message });
          console.log(`Message sent to ${ serviceUrl }`);
        }
        // Catch and report all flavors of fail, 
        // but don't try to recover / resend.
        catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(`Failed to send message to ${ serviceUrl }: ${ error.message }`);
          } 
          else if (error instanceof Error) {
            console.error(`Failed to send message to ${ serviceUrl }: ${ error.message }`);
          } 
          else {
            console.error(`Failed to send message to ${ serviceUrl }: ${ error }`);
          }
        }
      }
    });
  }
}

// Instance used by all HTTPS listeners
const messageQueue = new MessageQueue();


// region HTTPS listeners that route to MessageQueue instance

/* Call https:localhost:3033//register, body = URL, to observe all events. */
app.post("/register", (req: Request, res: Response) => {
  const { serviceUrl } = req.body;
  
  if (typeof serviceUrl !== "string" || !serviceUrl) {
    return res.status(400).send("Service URL is required and must be a string");
  }
  
  messageQueue.registerService(serviceUrl);
  
  return res.status(200).send("Service registered successfully");
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

/* Call https://localhost:3033/send-message, body = text, to announce to all observers */
app.post("/send-message", (req: Request, res: Response) => {
  console.log(`cruft : req.body:`, req.body);
  const { message } = req.body;
  console.log(`cruft : message:`, message);
  
  if (typeof message !== "string" || !message) {
    return res.status(400).send("Message is required and must be a string");
  }
  
  messageQueue.enqueueMessage(message);
  
  return res.status(200).send("Message added to queue");
});

// endregion HTTPS listeners that route to MessageQueue instance

// region Express app start-up

const PORT = process.env.PORT || 3033;

app.listen(PORT, () => {
  console.log(`Message Queue Service is running on http://localhost:${ PORT }`);
});

// endregion Express app start-up

// Start the background message broadcaster
setInterval(() => {
  messageQueue.broadcastMessage();
}, 5000); // Broadcast every 5 seconds
