// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAVQ9Eit9fH2FcPE1TMbTjH-kQ4FVfpakY",
    authDomain: "sde-project-ed3ed.firebaseapp.com",
    databaseURL: "https://sde-project-ed3ed-default-rtdb.firebaseio.com",
    projectId: "sde-project-ed3ed",
    storageBucket: "sde-project-ed3ed.appspot.com",
    messagingSenderId: "602222350958",
    appId: "1:602222350958:web:90fbe6e91c0f257a2c4c7f"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Load user data when the page loads
window.onload = function() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
        document.getElementById('firstName').textContent = userProfile.firstName || '';
        document.getElementById('lastName').textContent = userProfile.lastName || '';
        document.getElementById('idNumber').textContent = userProfile.idNumber || '';
        document.getElementById('department').textContent = userProfile.department || '';
        document.getElementById('program').textContent = userProfile.program || '';// Changed from hiddenNumber to program
        document.getElementById('email').textContent = userProfile.email || '';
        document.getElementById('contactNumber').textContent = userProfile.contactNumber || '';
        updateDisplayName();
    } else {
        window.location.href = "/Mercy Final/Login.html";
    }
};



function triggerFileInput() {
    document.getElementById('fileInput').click();
}

function changeProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePicture').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function makeEditable(id) {
    const element = document.getElementById(id);
    if (element.querySelector('input')) return; // Already editing

    const currentText = element.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '100%';
    input.addEventListener('blur', function() {
        saveEdit(id, this.value);
    });
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    });

    element.textContent = '';
    element.appendChild(input);
    input.focus();
}

function saveEdit(id, newValue) {
    const element = document.getElementById(id);
    element.textContent = newValue;
    if (id === 'firstName' || id === 'lastName') {
        updateDisplayName();
    }
}

function updateDisplayName() {
    const firstName = document.getElementById('firstName').textContent;
    const lastName = document.getElementById('lastName').textContent;
    document.getElementById('displayName').textContent = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
}

function saveChangesToFirebase() {
    const statusElement = document.getElementById('saveStatus');
    statusElement.textContent = 'Saving changes...';
    statusElement.style.display = 'block';

    const userData = {
        firstName: document.getElementById('firstName').textContent,
        lastName: document.getElementById('lastName').textContent,
        idNumber: document.getElementById('idNumber').textContent,
        department: document.getElementById('department').textContent,
        program: document.getElementById('program').textContent,
        email: document.getElementById('email').textContent,
        contactNumber: document.getElementById('contactNumber').textContent
    };

    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const username = userProfile.username;

    database.ref('users credentials/' + username).update(userData)
        .then(() => {
            statusElement.textContent = 'Changes saved successfully!';
            Object.assign(userProfile, userData);
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            setTimeout(() => {
                window.location.href = '/profile/profile.html';
            }, 3000);
        })
        .catch((error) => {
            console.error("Error saving data:", error);
            statusElement.textContent = 'Error saving changes. Please try again.';
        });
}

// Make functions available globally
window.triggerFileInput = triggerFileInput;
window.changeProfilePicture = changeProfilePicture;
window.makeEditable = makeEditable;
window.saveChangesToFirebase = saveChangesToFirebase;