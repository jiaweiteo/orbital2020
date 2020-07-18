import React from 'react';
import {Text, View, Button, Vibration, Platform} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import firebase from "firebase";
import budget from "../components/TrackBudget";
import firebaseDb from "../firebaseDb";

class PushNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expoPushToken: '',
            notification: {},
            message: "",
        };
        this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
    }

    registerForPushNotificationsAsync = async () => {
        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }
        try {
            let token = await Notifications.getExpoPushTokenAsync();
            let user = firebase.auth().currentUser;
                firebase.firestore().collection("users").doc(user.uid).collection("Token").doc("Token").set({
                token: token,
            })
            this.setState({expoPushToken: token});
        } catch (error) {
            console.log(error);
        }
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            })
        }
    }

    /*componentDidMount() {
        this.registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }*/
    async componentDidMount() {
        await this.registerForPushNotificationsAsync();
    }

    _handleNotification = notification => {
        Vibration.vibrate();
        console.log(this.state.cost)
        this.setState({notification: notification});
    };

    sendPushNotification = (budget, expense) => {
        const percent = Math.floor((Number(expense) / Number(budget)) * 100)
        let msg = "You have spent " + percent + "% of your budget."
        let warning  = ""
        if (percent < 50) {
            warning = "You are well within your budget plan so far. Keep it up!"
        } else if (percent < 90) {
            warning = "Do look out for promos and discounts online to minimize your expenditure!"
        } else if (percent < 100) {
            warning = "Do be mindful of your spendings. You may want to reduce your expenses to keep within your budget!"
        } else {
            warning = "You have exceeded your budget! Do you want to increase your budget plan?"
        }
        msg = msg + warning
        this.setState({ message: msg })
        const localNotification = {
            
            title: 'SmartTrack',
            body: msg
        };

        const schedulingOptions = {
            time: (new Date()).getTime() + 1000
        }


        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
    };

}

const pushNotification = new PushNotification()
export default pushNotification

