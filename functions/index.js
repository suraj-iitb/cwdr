const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cryptoJS = require("crypto-js");

const constants = require("./constants");

admin.initializeApp();

exports.addUserTrigger = functions.auth.user().onCreate((user) => {
  let displayName = user.displayName;
  let firstName = "";
  let lastName = "";
  if (displayName != null) {
    displayName = displayName.split(" ");
    if (displayName.length == 2) {
      firstName = displayName[0];
      lastName = displayName[1];
    } else if (displayName.length == 1) {
      firstName = displayName[0];
    }
  }

  admin
    .firestore()
    .collection(constants.COLLECTIONS.USER)
    .doc(user.uid)
    .set({
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      noOfApplicants: 0,
      status: "active",
      roles: [constants.ROLES.FIELD],
    });

  console.log(`User with ID: ${user.uid} added.`);
});

exports.addUser = functions.https.onCall((data) => {
  admin
    .auth()
    .createUser({
      email: data.email,
      password: data.password,
      displayName: data.firstName + " " + data.lastName,
      emailVerified: true,
      disabled: false,
    })
    .then(() => {
      console.log(`User with ID: ${user.uid} added.`);
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });
});

exports.deleteUserTrigger = functions.auth.user().onDelete((user) => {
  admin
    .firestore()
    .collection(constants.COLLECTIONS.USER)
    .doc(user.uid)
    .delete();

  console.log(`User with ID: ${user.uid} deleted.`);
});

exports.deleteUser = functions.https.onCall((data) => {
  admin
    .auth()
    .deleteUser(data.uid)
    .then(() => {
      console.log("Successfully deleted user");
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
    });
});

exports.encrypt = functions.https.onCall((data) => {
  let cipherText = cryptoJS.AES.encrypt(data.originalText, "secret key").toString();
  return { cipherText: cipherText };
});

exports.decrypt = functions.https.onCall((data) => {
  let originalText = cryptoJS.AES.decrypt(data.cipherText, "secret key").toString(cryptoJS.enc.Utf8);
  return { originalText: originalText };
});
