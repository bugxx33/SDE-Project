import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

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
const storage = getStorage(app);

// Add event listener to the Create Account button
document.getElementById('next').addEventListener('click', createAccount);

async function createAccount() {
    // Get user input
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    const department = document.getElementById('department').value.trim();
    const college = document.getElementById('college').value.trim();
  
    const contactnumber = document.getElementById('contactnumber').value.trim();
    const emailaddress = document.getElementById('emailaddress').value.trim();
    
    // Check if any field is empty
    const fields = [
        { name: 'First Name', value: firstName },
        { name: 'Last Name', value: lastName },
        { name: 'ID Number', value: idNumber },
        { name: 'Department', value: department },
        { name: 'College', value: college },
        { name: 'Contact Number', value: contactnumber },
        { name: 'Email Address', value: emailaddress },
    ];

    const emptyFields = fields.filter(field => field.value === '');

    if (emptyFields.length > 0) {
        alert(`Please fill in all fields. The following fields are empty: ${emptyFields.map(f => f.name).join(', ')}`);
        return;
    }

    // Validate ID number
    if (!/^\d+$/.test(idNumber)) {
        alert('ID Number must contain only numbers.');
        return;
    }

    // Check if all files are uploaded
    const fileInputs = ['corUpload', 'idUpload', 'selfieIdUpload', 'profileUpload'];
    const missingFiles = fileInputs.filter(inputId => !document.getElementById(inputId).files[0]);

    if (missingFiles.length > 0) {
        alert(`Please upload all required files. Missing: ${missingFiles.map(id => id.replace('Upload', '')).join(', ')}`);
        return;
    }

    try {
        // Use the ID number as the key for the user
        const newUserRef = ref(database, `users credentials/${idNumber}`);

        // Upload files and get their download URLs
        const corURL = await uploadFileAndGetURL('corUpload', idNumber, 'cor');
        const idURL = await uploadFileAndGetURL('idUpload', idNumber, 'id');
        const selfieIdURL = await uploadFileAndGetURL('selfieIdUpload', idNumber, 'selfieId');
        const profileURL = await uploadFileAndGetURL('profileUpload', idNumber, 'profile');

        // Store user data in the database
        await set(newUserRef, {
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber,
            department: department,
            college: college,
            contactnumber: contactnumber,
            emailaddress: emailaddress,

            corURL: corURL,
            idURL: idURL,
            selfieIdURL: selfieIdURL,
            profileURL: profileURL,
            
        });

        alert('Data saved!');
        
        // Redirect to signup2.html with ID number as a parameter
        window.location.href = `signup2.html?idNumber=${idNumber}`;
    } catch (error) {
        console.error('Error creating account:', error);
        alert('Error creating account: ' + error.message);
    }
}

async function uploadFileAndGetURL(inputId, idNumber, fileType) {
    const fileInput = document.getElementById(inputId);
    const file = fileInput.files[0];
    if (file) {
        const fileRef = storageRef(storage, `${idNumber}/${fileType}/${file.name}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
    }
    return null;
}

// Add event listeners to display selected file names
document.getElementById('corUpload').addEventListener('change', function(e) {
    alert('Selected COR file: ' + e.target.files[0].name);
});

document.getElementById('idUpload').addEventListener('change', function(e) {
    alert('Selected ID file: ' + e.target.files[0].name);
});

document.getElementById('selfieIdUpload').addEventListener('change', function(e) {
    alert('Selected Selfie with ID file: ' + e.target.files[0].name);
});
document.getElementById('profileUpload').addEventListener('change', function(e) {
    alert('Selected Profile file: ' + e.target.files[0].name);
});