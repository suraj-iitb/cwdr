const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cryptoJS = require("crypto-js");

import { COLLECTIONS, ROLES } from '../src/constants/constants';

admin.initializeApp();

exports.addUserTrigger = functions.auth.user().onCreate((user) => {
    let displayName = user.displayName;
    let firstName = '';
    let lastName = '';
    if (displayName != null) {
        displayName = displayName.split(' ');
        if (displayName.length == 2) {
            firstName = displayName[0];
            lastName = displayName[1];
        } else if (displayName.length == 1) {
            firstName = displayName[0];
        }
    }

    admin.firestore().collection(COLLECTIONS.USER).doc(user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        noOfApplicants: 0,
        status: 'active',
        roles: [ROLES.FIELD]
    });

    const output = { message: `User with ID: ${user.uid} added.` }
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
        const output = { message: `User with ID: ${userRecord.uid} added.` }
        console.log(output);
        return output;
    })
    .catch((error) => {
        console.log('Error creating new user:', error);
    });
})

exports.encrypt = functions.https.onCall((data) => {
    let ciphertext = cryptoJS.AES.encrypt(data.text, 'secret key').toString();
    return { ciphertext: ciphertext };
});

exports.decrypt = functions.https.onCall((data) => {
    let bytes = cryptoJS.AES.decrypt(data.text, 'secret key');
    let originalText = bytes.toString(cryptoJS.enc.Utf8);
    return { originalText: originalText }
});
