import { initializeApp  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, set, ref, get, remove, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  
  // Write or ask condition
  // Check if user is logged in or not
  document.getElementById('writeOrAskBtn').addEventListener('click', () => {
    const user = auth.currentUser;
    if (user) {
      window.location.href = "../createblog/createblog.html";
    } else {
      // User is not logged in, redirect to login page
      window.location.href = "../login/login.html";
    }
  });
  
  document.getElementById('logInBtn').addEventListener('click', () => {
    window.location.href = "../login/login.html";
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const blogPosts = document.getElementById("blogPosts");
  
    // Retrieve blog data from Firebase Realtime Database
    const blogRef = ref(db, "blogPosts");
    get(blogRef).then((snapshot) => {
      const blogData = snapshot.val();
  
      // Update HTML elements with blog data
      for (const postId in blogData) {
        const post = blogData[postId];
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 100)}...</p>
            <a href="viewBlog.html?postId=${postId}">Read More</a>
        `;
        blogPosts.appendChild(postDiv);
      }
    });
  
    // Check if user is logged in or not
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to create blog page
        window.location.href = "../createblog/createblog.html";
      } else {
        // User is not logged in
        const logInBtn = document.getElementById("logInBtn");
        logInBtn.addEventListener("click", () => {
          // Redirect to login page
          window.location.href = "../login/login.html";
        });
      }
    });
  });