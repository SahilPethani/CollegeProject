import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, onMessage, getToken } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyAiavYHC4hH8z9Mdu-0A8cUzcrX4Dzg7aY",
    authDomain: "hrm-codeline.firebaseapp.com",
    projectId: "hrm-codeline",
    storageBucket: "hrm-codeline.appspot.com",
    messagingSenderId: "920500645964",
    appId: "1:920500645964:web:9e4ef424462c2b3d8904e9",
    measurementId: "G-46VFXQJYQQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

const messaging = getMessaging();

export { auth, db, messaging };

export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey:
                "BAyN3jPBHtvbiigKuh-_SF7Rkzrsa1yb2gXWNkTrLYpo0LTPrmA4TQXYKbcxQgrhV-y5dmdFuWfFXfBZScIdTj4",
        });

        if (currentToken) {
            console.log("Current token for client: ", currentToken);

            return currentToken
        } else {
            console.log(
                "No registration token available. Request permission to generate one."
            );
        }
    } catch (err) {
        console.error(
            "An error occurred while retrieving or storing the token: ",
            err
        );
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Recived Notification -> " + payload.notification.title);
            resolve(payload);
        });
    });