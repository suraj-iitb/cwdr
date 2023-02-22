// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const sanitizer = require('./sanitizer');
const constants = require('./constants')

exports.addUsers = functions.https.onCall(async (data, context) => {
    const userDoc = await admin.firestore().collection('users').add({ 
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        noOfApplicants: 0,
        status: 'active'
    });

    const output = { result: `User with ID: ${userDoc.id} added.` }
    console.log(output);
    return output;
});

exports.addUserTrigger = functions.auth.user().onCreate((user) => {
    let displayName = user.displayName;
    let firstName = '';
    let lastName = '';
    if(user.displayName != null) {
        displayName = displayName.split(' ');
        if(displayName.length == 2) {
            firstName = displayName[0]; 
            lastName = displayName[1];
        } else if (displayName.length == 1) {
            firstName = displayName[0];
        }
    }
    
    admin.firestore().collection('user').doc(user.uid).set({ 
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        noOfApplicants: 0,
        status: 'active',
        roles: [constants.FIELD]
    });

    const output = { result: `User with ID: ${user.uid} added.` }
    console.log(output);
    return output;
});


exports.addUser = functions.https.onCall((data) => {
   admin.auth().createUser({
        email: data.email,
        password: data.password,
        displayName: data.firstName + ' ' + data.lastName,
        emailVerified: true,
        disabled: false,
  })
  .then((userRecord) => {
    const output = { result: `User with ID: ${userRecord.uid} added.` }
    console.log(output);
    return output;
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
})


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({ original: original });
    // Send back a message that we've successfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        // Grab the current value of what was written to Firestore.
        const original = snap.data().original;

        // Access the parameter `{documentId}` with `context.params`
        functions.logger.log('Uppercasing', context.params.documentId, original);

        const uppercase = original.toUpperCase();

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to Firestore.
        // Setting an 'uppercase' field in Firestore document returns a Promise.
        return snap.ref.set({ uppercase }, { merge: true });
    });

// [START allAdd]
// [START addFunctionTrigger]
// Adds two numbers to each other.
exports.addNumbers = functions.https.onCall((data) => {
// [END addFunctionTrigger]
    // [START readAddData]
    // Numbers passed from the client.
    const firstNumber = data.firstNumber;
    const secondNumber = data.secondNumber;
    // [END readAddData]

    // [START addHttpsError]
    // Checking that attributes are present and are numbers.
    if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'two arguments "firstNumber" and "secondNumber" which must both be numbers.');
    }
    // [END addHttpsError]

    // [START returnAddData]
    // returning result.
    return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: '+',
    operationResult: firstNumber + secondNumber,
    };
    // [END returnAddData]
});

exports.addNumbers1 = functions.https.onCall(async (data) => {
    // [END addFunctionTrigger]
        // [START readAddData]
        // Numbers passed from the client.
        const firstNumber = data.firstNumber;
        const secondNumber = data.secondNumber;
        // [END readAddData]
    
        // [START addHttpsError]
        // Checking that attributes are present and are numbers.
        if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'two arguments "firstNumber" and "secondNumber" which must both be numbers.');
        }

        const writeResult = await admin.firestore().collection('messages2').add({ original: "original" });
        // Send back a message that we've successfully written the message
        console.log({ result: `Message with ID: ${writeResult.id} added.` });        // Send back a message that we've successfully written the message

        // [END addHttpsError]
    
        // [START returnAddData]
        // returning result.
        return {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: '+',
        operationResult: firstNumber + secondNumber,
        };
        // [END returnAddData]
    });

// [END allAdd]

// [START messageFunctionTrigger]
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessageCall = functions.https.onCall((data) => {
    const firstNumber = data.firstNumber;
    const secondNumber = data.secondNumber;
    // [END readAddData]

    // [START addHttpsError]
    // Checking that attributes are present and are numbers.
    if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'two arguments "firstNumber" and "secondNumber" which must both be numbers.');
    }
    // [END addHttpsError]

    // [START returnAddData]
    // returning result.
    return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: '+',
    operationResult: firstNumber + secondNumber,
    };
    
  });
