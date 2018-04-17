var admin = require("firebase-admin");

var serviceAccount = require("../ivyveg-386ae-firebase-adminsdk-d4epj-8707040091.json");
console.log('FIRESBASE STARTED');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ivyveg-386ae.firebaseio.com"
});
 var gcm;
// This registration token comes from the client FCM SDKs.

var payload = {
    notification: {
        title: 'New Customer registered needs your approval to start buying',
        body: 'Admin'
    }
};

var registrationTokens = [

];

//Send a message to the device corresponding to the provided
//registration token.

 var sendmessages = function sendGcmMesage(registrationTokens) {

    admin.messaging().sendToDevice(registrationTokens, payload)
        .then(function(response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });

}
var sendmessagesApproval = function sendGcmMesage(registrationTokens) {
    var payloads = {
        notification: {
            title: 'New Customer registered needs your approval to start buying',
            body: 'Admin'
        }
    };

    admin.messaging().sendToDevice(registrationTokens, payloads)
        .then(function(response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });

}
var sendmessagesNews = function sendGcmMesage(registrationTokens) {
    var payloads = {
        notification: {
            title: 'Checkout our new Promotions',
            body: 'Admin'
        }
    };

    admin.messaging().sendToDevice(registrationTokens, payloads)
        .then(function(response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });

}
var sendmessagesfodeviler = function sendGcmMesage(registrationTokens,data) {
    var payloads = {
        notification: {
            title: 'A Customer has ordered please check it out',
            body: 'Admin',


        },
        "data" : {
            "Nick" : "Mario",
            "Room" : "PortugalVSDenmark"
        }
    };

    admin.messaging().sendToDevice(registrationTokens, payloads)
        .then(function(response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });

}

var sendmessagestoCustomer = function sendGcmMesage(GcmId) {
     console.log('here send');
    var payloads = {
        notification: {
            title: 'Your account has been approved u can start ordering',
            body: 'Admin',
            sound: 'default',
            click_action:'FCM_PLUGIN_ACTIVITY',
        }
    };

    admin.messaging().sendToDevice(GcmId, payloads)
        .then(function(response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });

}
module.exports = { registrationTokens: "registrationTokens" };
module.exports.sendmessages = sendmessages;
module.exports.sendmessagesApproval = sendmessages;
module.exports.sendmessagestoCustomer = sendmessagestoCustomer;
module.exports.sendmessagesfodeviler = sendmessagesfodeviler;
module.exports.sendmessagesNews = sendmessagesNews;