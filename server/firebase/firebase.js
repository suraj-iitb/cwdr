var admin = require("firebase-admin");

var serviceAccount = require("../config/cwdr-application-firebase-adminsdk-cifbw-3581e1d5ec.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
