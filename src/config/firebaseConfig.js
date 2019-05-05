// import * as firebase from 'firebase/app'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


var config={
    apiKey: "AIzaSyBGY94EkRWbXegBcxBiP7tGYWp5aFF5QZo",
    authDomain: "fanconcert-af75c.firebaseapp.com",
    databaseURL: "https://fanconcert-af75c.firebaseio.com",
    projectId: "fanconcert-af75c",
    storageBucket: "fanconcert-af75c.appspot.com",
    messagingSenderId: "287058786354"
};

firebase.initializeApp(config);
// firebase.firestore().settings({timestampsInSnapshots:true})

const storage = firebase.storage();
export {storage,firebase as default} ;