import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js';

// Firebase configuration
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
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const userEmail = user.email;

    // Function to handle form submission
    window.submitForm = function(event) {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const price = document.getElementById('price').value;
      const description = document.getElementById('description').value;
      const bedrooms = document.getElementById('bedrooms').value;
      const bathrooms = document.getElementById('bathrooms').value;
      const area = document.getElementById('area').value;
      const agent = document.getElementById('agent').value;

      const imageFiles = document.getElementById('image').files;

      if (imageFiles.length === 0) {
        alert('Please select at least one image.');
        return;
      }

      const uploadTasks = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        const storageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytes(storageRef, imageFile)
          .then(snapshot => {
            console.log(`Uploaded image ${i + 1} successfully:`, snapshot.ref.fullPath);
            return getDownloadURL(snapshot.ref);
          });
        uploadTasks.push(uploadTask);
      }

      Promise.all(uploadTasks)
        .then(imageUrls => {
          const realEstateData = {
            title,
            price,
            description,
            bedrooms,
            bathrooms,
            area,
            agent,
            imageUrls
          };

          return addDoc(collection(db, userEmail, 'home', 'realEstate'), realEstateData);
        })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById('realEstateForm').reset();
          alert('Real estate data saved successfully!');
        })
        .catch(error => {
          console.error("Error adding document: ", error);
          alert('Error saving real estate data.');
        });
    }
  } else {
    // User is signed out
    console.log("User is signed out");
  }
});
