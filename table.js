import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a Firestore instance
const db = firebase.firestore();

// Function to fetch data from Firestore and populate the table
function fetchAndPopulateTable() {
  const tableBody = document.getElementById('tableBody');

  db.collection('profile').get().then((querySnapshot) => {
    tableBody.innerHTML = ''; // Clear previous data
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Document ID:", doc.id); // Log document ID
      console.log("Document Data:", data); // Log document data
      tableBody.innerHTML += `
        <tr class="border-b border-gray-200 dark:border-gray-700">
          <td class="py-3 px-6 text-left">${data.firstName}</td>
          <td class="py-3 px-6 text-left">${data.lastName}</td>
          <td class="py-3 px-6 text-left">${data.dateOfBirth}</td>
          <td class="py-3 px-6 text-left">${data.gender}</td>
          <td class="py-3 px-6 text-left">${data.phoneNumber}</td>
          <td class="py-3 px-6 text-left">${data.email}</td>
          <td class="py-3 px-6 text-left">${data.role}</td>
        </tr>
      `;
    });
  }).catch((error) => {
    console.error("Error fetching documents: ", error);
  });
}

// Call the function to fetch and populate the table when the page loads
fetchAndPopulateTable();
