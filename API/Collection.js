import firebase from "firebase";
import firebaseDb from "../firebaseDb";
import budget from "../components/TrackBudget";
import trackCouple from "../components/TrackCouple";

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
                coupleuid: "",
                coupleNoti: false,
                coupleName: "",
                friendNoti: false,
                friendExpense: []
            });
            user.collection('Current').doc('Budget').set({
                budget: 0,
            }).then();
            user.collection('Current').doc('Expenses').set({
                expenses: 0,
            }).then();
            user.collection('Current').doc('LeftOver').set({
                leftover: 0
            }).then();
            user.collection('Current').doc('Items').set({
                items: [],
            }).then();
            user.collection('Current').doc('Cost').set({
                cost: [],
            }).then();
            user.collection('Current').doc('Date').set({
                date: "",
                id: "",
                month: "",
            }).then();
            user.collection('Current').doc('Category').set({
                category: [],
            }).then(() => {
                budget.updateUser(name)
                budget.updateUserDetails([], [], [], 0, 0, "", "", "", "")
            }).then(() => {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    isSignUpSuccessful: true
                })
            })
            user.collection('Past Budget').doc('IDs').set({
                temp: [],
            })
            user.collection("Token").doc('Token').set({
                token: "",
            })
            user.collection('Couple Past Budget').doc('IDs').set({
                temp: [],
            })
            user.collection('Couple Expense').doc('Budget').set({
                budget: 0,
            }).then();
            user.collection('Couple Expense').doc('Expenses').set({
                expenses: 0,
            }).then();
            user.collection('Couple Expense').doc('LeftOver').set({
                leftover: 0
            }).then();
            user.collection('Couple Expense').doc('Items').set({
                items: [],
            }).then();
            user.collection('Couple Expense').doc('Cost').set({
                cost: [],
            }).then();
            user.collection('Couple Expense').doc('Date').set({
                date: "",
                id: "",
                month: "",
            }).then();
            user.collection('Couple Expense').doc('Category').set({
                category: [],
            }).then(() => {
                trackCouple.updateUser("")
                trackCouple.updateUserDetails([], [], [], 0, 0, "", "", "", "")
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
