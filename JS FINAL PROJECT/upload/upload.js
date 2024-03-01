import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, get, } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { signOut, getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Initialize Firebase
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
const db = getDatabase(app);

// Function to retrieve blog data
function getBlogData(blogId) {
    const blogRef = ref(db, `blogs/${blogId}`);
    get(blogRef).then((snapshot) => {
        const blogData = snapshot.val();
        // Process blog data and display on HTML page
        displayBlogData(blogData);
    }).catch((error) => {
        console.error("Error getting blog data:", error);
    });
}

// Function to retrieve user data using UID
function getUserData(uid) {
    const userRef = ref(db, `users/${uid}`);
    get(userRef).then((snapshot) => {
        const userData = snapshot.val();
        // Process user data and display on HTML page
        displayUserData(userData);
    }).catch((error) => {
        console.error("Error getting user data:", error);
    });
}

// Function to display blog data on HTML page
function displayBlogData(blogData) {
    // Display blog data on HTML page
}

// Function to display user data on HTML page
function displayUserData(userData) {
    // Display user data on HTML page
}

// Get blog ID from URL or wherever you store it
const blogId = "your_blog_id";

// Get blog data using the blog ID
getBlogData(blogId);
//   sign Out Logout 

const sign_out_btn = document.querySelector('#logOutBtn')
sign_out_btn.addEventListener('click',()=>{
   signOut(auth).then(()=>{
       //  
   }).catch((error)=>{
       console.log("error" + error);
   })
})