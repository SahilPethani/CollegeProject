importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAiavYHC4hH8z9Mdu-0A8cUzcrX4Dzg7aY",
    authDomain: "hrm-codeline.firebaseapp.com",
    projectId: "hrm-codeline",
    storageBucket: "hrm-codeline.appspot.com",
    messagingSenderId: "920500645964",
    appId: "1:920500645964:web:9e4ef424462c2b3d8904e9",
    measurementId: "G-46VFXQJYQQ"
});

const messaging = firebase.messaging();

// Add any additional configuration or event listeners as needed
