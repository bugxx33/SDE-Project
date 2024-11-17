
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAVQ9Eit9fH2FcPE1TMbTjH-kQ4FVfpakY",
    authDomain: "sde-project-ed3ed.firebaseapp.com",
    projectId: "sde-project-ed3ed",
    storageBucket: "sde-project-ed3ed.appspot.com",
    messagingSenderId: "602222350958",
    appId: "1:602222350958:web:90fbe6e91c0f257a2c4c7f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);

  document.getElementById("next").addEventListener('click', function(next){
    next.preventDefault();
    set(ref(db, 'user Req/' + document.getElementById("firstName").value),
    {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        idNumber: document.getElementById("idNumber").value,
        department: document.getElementById("department").value,
        college: document.getElementById("college").value,
        Username: document.getElementById("Username").value,
        Password: document.getElementById("Password").value
    });
    alert("Account Created !");
  })
