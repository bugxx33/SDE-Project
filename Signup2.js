import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Your Firebase configuration object
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

// Add event listener to the Create Account button
document.getElementById('next').addEventListener('click', createAccount);

async function createAccount() {
    // Get user input
    const username = document.getElementById('Username').value.trim();
    const password = document.getElementById('Password').value.trim();

    // Check if any field is empty
    const fields = [
        { name: 'Username', value: username },
        { name: 'Password', value: password }
    ];

    const emptyFields = fields.filter(field => field.value === '');

    if (emptyFields.length > 0) {
        alert(`Please fill in all fields. The following fields are empty: ${emptyFields.map(f => f.name).join(', ')}`);
        return;
    }

    // Validate password
    if (password.length < 8 || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        alert('Password must be at least 8 characters long and contain both letters and numbers.');
        return;
    }

    // Retrieve the ID number from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const idNumber = urlParams.get('idNumber');

    if (!idNumber) {
        alert('Error: ID number not found. Please start from the first signup page.');
        return;
    }

    try {
        // Reference the existing user data
        const userRef = ref(database, `users credentials/${idNumber}`);

        // Update the user data with username and password
        await update(userRef, {
            username: username,
            password: password, // Note: storing passwords in plain text is not secure
        });

        alert('Account created successfully!');
        
        // Redirect to Login.html
        window.location.href = '/Login/Login.html';
    } catch (error) {
        console.error('Error creating account:', error);
        alert('Error creating account: ' + error.message);
    }
}