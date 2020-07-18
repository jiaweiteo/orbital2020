import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAF5SKrxfw-uz05YwQoSBDpxpbt0jZId0U",
    authDomain: "orbital-2020-933a8.firebaseapp.com",
    databaseURL: "https://orbital-2020-933a8.firebaseio.com",
    projectId: "orbital-2020-933a8",
    storageBucket: "orbital-2020-933a8.appspot.com",
    messagingSenderId: "389106809715",
    appId: "1:389106809715:web:236cf77204b82938392306",
    measurementId: "G-JDLPCM60KW"
}
firebase.initializeApp(firebaseConfig)

export default firebase