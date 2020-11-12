import firebase from 'firebase';

const config = {
    // DO NOT USE THESE CREDENTIALS !
    apiKey: "AIzaSyDwAMGj20rH42FROMjb5aq_9JhQatrhumQ",
    authDomain: "weatherapp-de148.firebaseapp.com",
    databaseURL: "https://weatherapp-de148.firebaseio.com",
    projectId: "weatherapp-de148",
    storageBucket: "weatherapp-de148.appspot.com",
    messagingSenderId: "1576151366",
    appId: "1:1576151366:web:efd76958e5df117ac25d47"
  };

  firebase.initializeApp(config);
  firebase.analytics();

  export default firebase;