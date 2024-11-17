import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAVQ9Eit9fH2FcPE1TMbTjH-kQ4FVfpakY",
    authDomain: "sde-project-ed3ed.firebaseapp.com",
    databaseURL: "https://sde-project-ed3ed-default-rtdb.firebaseio.com",
    projectId: "sde-project-ed3ed",
    storageBucket: "sde-project-ed3ed.appspot.com",
    messagingSenderId: "602222350958",
    appId: "1:602222350958:web:90fbe6e91c0f257a2c4c7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ... existing code ...

document.getElementById("login").addEventListener('click', function(event) {
    event.preventDefault();
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    
    console.log("Attempting login for:", username);

    // Clear any existing error message
    clearErrorMessage();

    const dbRef = ref(database);
    get(child(dbRef, 'users credentials')).then((snapshot) => {
        if (snapshot.exists()) {
            let userFound = false;
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.username === username) {
                    userFound = true;
                    if (userData.password === password) {
                        console.log("Login successful for user:", username);
                        alert("Login Successful!");
                        window.location.href = '/facing-20241024T050659Z-001/facing/optionrent/optionrent.html';
                    } else {
                        console.log("Incorrect password for user:", username);     displayErrorMessage("Incorrect Password or email. Please try again.");
                    }
                    return true; // Break the forEach loop
                }
            });
            if (!userFound) {
                console.log("User not found:", username);
                displayErrorMessage("Incorrect Password or user. Please try again.");
            }
        } else {
            console.log("No user data found in the database");
            displayErrorMessage("No user data found. Please sign up.");
        }
    }).catch((error) => {
        console.error("Error reading from database:", error);
        displayErrorMessage("An error occurred. Please try again later.");
   
    });
});

// Updated functions
function displayErrorMessage(message) {
    clearErrorMessage(); // Clear any existing error message first
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '5px';
    errorDiv.style.marginBottom = '10px';
    errorDiv.textContent = message;

    const passwordInput = document.getElementById("Password");
    passwordInput.parentNode.insertBefore(errorDiv, passwordInput.nextSibling);
}

function clearErrorMessage() {
    const existingError = document.getElementById('error-message');
    if (existingError) {
        existingError.remove();
    }
}