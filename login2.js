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

document.querySelector(".btn-login").addEventListener('click', function(event) {
    event.preventDefault();
    const username = document.querySelector("input[name='Username']").value;
    const password = document.querySelector("input[name='Password']").value;
    const errorMessageElement = document.querySelector(".invalid");
    
    console.log("Attempting login for:", username);

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
                        errorMessageElement.style.display = "none"; // Hide error message
                        // Redirect to index.html after successful login
                        window.location.href = '/facing-20241024T050659Z-001/facing/optionrent/optionrent.html';
                    } else {
                        console.log("Incorrect password for user:", username);
                        showErrorMessage(errorMessageElement);
                    }
                    return true; // Break the forEach loop
                }
            });
            if (!userFound) {
                console.log("User not found:", username);
                showErrorMessage(errorMessageElement);
            }
        } else {
            console.log("No user data found in the database");
            showErrorMessage(errorMessageElement);
        }
    }).catch((error) => {
        console.error("Error reading from database:", error);
        showErrorMessage(errorMessageElement);
    });
});

function showErrorMessage(element) {
    element.style.display = "block"; // Show error message
    element.innerHTML = "Incorrect Password or email.<br>Please try again.";
}

// Toggle password visibility
document.getElementById("toggle-password").addEventListener('click', function() {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    // You might want to change the eye icon here as well
});