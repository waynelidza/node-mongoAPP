var admin = require("firebase-admin");

var serviceAccount = require("../ivyveg-386ae-firebase-adminsdk-d4epj-8707040091.json");
console.log('FIRESBASE STARTED');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ivyveg-386ae.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.

var payload = {
    notification: {
        title: 'Node JS server successfully started',
        body: 'Admin'
    }
};

var registrationTokens = [
    'eKcoez8JtmU:APA91bGntcjA4jXdU9ZZLgvnfYBekGRdnH7z8hhdZVHuqpmj89Kh2GQ40-Yjd5F7wrMXIkI3UhPYiyzZG0ZgaZGA4EuIyDwmIys7qTg29e62ffW8tH8AVsC_sDzC24-l0-VqnHw0koGA',
    // ...
    'ecupwIfBy1w:APA91bFtuMY7MktgxA3Au_Qx7cKqnf...'
];

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().sendToDevice(registrationTokens, payload)
    .then(function(response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log('Successfully sent message:', response);
    })
    .catch(function(error) {
        console.log('Error sending message:', error);
    });