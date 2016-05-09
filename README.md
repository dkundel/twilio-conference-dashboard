# Twilio Conference Dashboard with Node.js, Socket.IO, Express and AngularJS

This application demostrates how to work with conference status callbacks.

## Running the Project on Your Machine

To run this project on your computer, download or clone the source. You will 
also need to download and install [Node.js](http://nodejs.org/), which should also install 
[npm](https://www.npmjs.com/). 

You will also need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) 
if you don't have one already.

### Install Dependencies

Navigate to the project directory in your terminal and run:

```bash
npm install
```

This should install all of our project dependencies from npm into a local 
`node_modules` folder.

### Get a Phone Number

This project is configured to use a **TwiML App**, which allows us to easily set the voice URLs for all Twilio phone numbers we purchase in this app.

Create a new TwiML app at https://www.twilio.com/user/account/apps/add and use its `Sid` as the `TWIML_APP_SID` environment variable wherever you run this app.

![Creating a TwiML App](http://howtodocs.s3.amazonaws.com/call-tracking-twiml-app.gif)

See the end of the "Exposing Webhooks to Twilio" section for details on the exact URL to use in your TwiML app.

### Configuration

This application is configured using [dotenv](https://www.npmjs.com/package/dotenv).
Begin by copying the example .env file to use in this application:

```bash
cp .env.example .env
```

Next, open the `.env` at the root of the project and update it with credentials
from your [Twilio account](https://www.twilio.com/user/account/voice-messaging)
and local configuration.

### Running the Project

You are now ready to start up the server. You can either just run `node .` or `npm start` just like you are used to
from other Node projects.

However if you want to start the server in a mode that it always restarts when you change code you can run:

```bash
npm run dev
```

### Exposing Webhooks to Twilio

To test your application locally with a Twilio number, we recommend using 
[ngrok](https://ngrok.com/docs). Use ngrok to expose a local port and get a 
publicly accessible URL you can use to accept incoming calls or texts to your 
Twilio numbers.

The following example would expose your local Node application running on port 
3000 at `http://chunky-danger-monkey.ngrok.io` (note that *reserved* subdomains 
are a paid feature of ngrok):

```bash
ngrok http -subdomain=chunky-danger-monkey 3000
```

In your Twilio app configuration you'll need to set
`http://<your-ngrok-domain>.ngrok.io/voice` as the callback URL. Open
the application and then click the "App configuration" button.

![app configuration button screenshot](images/app-configuration.png)

The button will take you to your TwiML call tracking
application. Under "Voice" you will find a "Request URL" input
box. There you should put the URL to the application's lead resource
(e.g `http://<your-ngrok-domain>.ngrok.io/lead`).

![webhook configuration](images/webhook.png)

## License

MIT