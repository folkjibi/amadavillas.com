import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyC7AopHI436i396IBfIz8o6-8VCi7Hb618",
    authDomain: "webpro-c1c55.firebaseapp.com",
    databaseURL: "https://webpro-c1c55-default-rtdb.firebaseio.com",
    projectId: "webpro-c1c55",
    storageBucket: "webpro-c1c55.appspot.com",
    messagingSenderId: "13975027825",
    appId: "1:13975027825:web:608b3c43ec034d10671bd0",
    measurementId: "G-G6QXYR88MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged };
