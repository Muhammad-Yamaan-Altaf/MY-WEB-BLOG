import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCbwG30QzgJ-30rxxDbTLL_OBomEw1-4-k",
    authDomain: "yamaan-web-blog.firebaseapp.com",
    databaseURL: "https://yamaan-web-blog-default-rtdb.firebaseio.com",
    projectId: "yamaan-web-blog",
    storageBucket: "yamaan-web-blog.appspot.com",
    messagingSenderId: "1071181517501",
    appId: "1:1071181517501:web:3e788863a71af2f0aaddd4",
    measurementId: "G-V3VL78LZ12"
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const signInBtn = document.querySelector('#signInBtn');
// signInBtn.addEventListener('click', signInUser);

// function signInUser() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             console.log("User signed in:", userCredential.user.uid);
//         })
//         .catch((error) => {
//             console.error("Sign-in error:", error.message);
//         });
// }


const registerBtn = document.querySelector('#registerBtn');
registerBtn.addEventListener('click', createUser);

function createUser() {
    const first_Name = document.getElementById('first_Name').value;
    const last_Name = document.getElementById('last_Name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_Password = document.getElementById('confirmPassword').value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("New user created:", userCredential.user.uid);
        })
        .catch((error) => {
            console.error("User creation error:", error.message);
        });
}

// Listener for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log("User is signed in:", user.uid);
    } else {
        // No user is signed in
        console.log("No user is signed in");
    }
});



// //   sign Out Logout 

//  const sign_out_btn = document.querySelector('#logout')
//  sign_out_btn.addEventListener('click',()=>{
//     signOut(auth).then(()=>{
//         //  
//     }).catch((error)=>{
//         console.log("error" + error);
//     })
//  })


