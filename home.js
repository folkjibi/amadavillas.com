import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };