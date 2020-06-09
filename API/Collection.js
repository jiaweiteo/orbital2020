import firebase from "firebase";
import firebaseDb from "../firebaseDb";
import budget from "../components/TrackBudget";

/*export function logIn({email, password}) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            var user = firebaseDb.auth().currentUser;
            let docRef = firebaseDb.firestore().collection('users').doc(user.uid)
            docRef.onSnapshot(doc => {
                budget.updateUser(doc.data().name)
                this.props.navigation.replace("Root")
            })

        })

        .catch(err => alert(err))
}
*/
export function signUp({name, email, password, isSignUpSuccessful}) {
    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            var user = firebaseDb.firestore().collection('users').doc(cred.user.uid);
            user.set({
                name: name,
                email: email,
                password: password,
            });
            user.collection('June').doc('Budget').set({
                budget:"",
            }).then();
            user.collection('June').doc('Expenses').set({
                expenses: "",
            }).then();
            user.collection('June').doc('LeftOver').set({
                leftover: ""
            }).then();
            user.collection('June').doc('Items').set({
                items: "",
            }).then();
            user.collection('June').doc('Cost').set({
                cost: "",
            }).then();
            user.collection('June').doc('Category').set({
                category: "",
            }).then(() => {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    isSignUpSuccessful: true
                })
            })
        })
        .catch(err => console.error(err));
}

export function subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
        authStateChanged(user);
    })
}

export function signout(onSignedOut) {
    firebase.auth().signOut()
        .then(() => {
            onSignedOut();
        })
}

export function updateFood(food, updateComplete) {
    food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    console.log("Updating food in firebase");

    firebase.firestore()
        .collection('Foods')
        .doc(food.id).set(food)
        .then(() => updateComplete(food))
        .catch((error) => console.log(error));
}

export function deleteFood(food, deleteComplete) {
    console.log(food);

    firebase.firestore()
        .collection('Foods')
        .doc(food.id).delete()
        .then(() => deleteComplete())
        .catch((error) => console.log(error));
}
