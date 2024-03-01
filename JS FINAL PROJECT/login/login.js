import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
  
  // Initialize 
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInBtn = document.querySelector('#signInBtn');
const loginWithGoogleBtn = document.querySelector('#loginWithGoogleBtn');
const currentPageName = window.location.pathname.split("/").pop();


// Function to generate a unique user ID
function generateUserID() {
    const timestamp = Date.now(); // Get current timestamp
    const random = Math.floor(Math.random() * 100); // Generate random number between 0 and 999
    const userID = timestamp + "_" + random; // Combine timestamp and random number
    return userID;
}
const uid = generateUserID();
export const storeUserData = async (uid, displayName, photoURL, email) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);
  
      // Check if the user already exists
      if (!userSnapshot.exists()) {
        // If the user doesn't exist, add them to the "users" collection
        const userData = {
          displayName,
          photoURL,
          uid,
          email
        };
  
        await setDoc(userRef, userData);
      }
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };
  
 
// Listener for authentication state changes
const onLoad = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            storeUserData(user.uid, user.displayName, user.photoURL, user.email);
            if (!user.emailVerified) {
                alert("Please verify your email.");
                logOut();
                window.location.href = "login.html";
                return;
            } else if (user.emailVerified) {
                if (currentPageName !== "index.html" && currentPageName !== "createblog.html" && currentPageName !== "upload.html") {
                    window.location.href = "../createblog/createblog.html";
                }
            }
            lbl.innerText = user.displayName;
            if (user.photoURL) {
                userImg.src = user.photoURL;
                // createBlog();
            }
        } else if (!user && (currentPageName === "index.html" || currentPageName === "" || currentPageName === "createblog.html" || currentPageName === "upload.html")) {
            if (currentPageName !== "index.html" && currentPageName !== "" && currentPageName !== "signup.html" && currentPageName !== "login.html") {
                window.location.href = "../index/index.html";
            }
        }
        if (currentPageName !== "upload.html" && currentPageName !== "createblog.html") {
            // loadBlogByID();
            // loadReplies();
        }
    });
};

onLoad();

function signInUser(event) {
    event.preventDefault(); // Prevent the default form submission behavior
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User signed in:", userCredential.user.uid);
        })
        .catch((error) => {
            console.error("Sign-in error:", error.message);
        });
}
  
  function signInWithGoogle() {
      signInWithPopup(auth, provider)
          .then((result) => {
              // Handle Google sign-in result
          })
          .catch((error) => {
              console.error("Google sign-in error:", error.message);
          });
  }
  

//   sign Out Logout 

const sign_out_btn = document.querySelector('#logout')

const logOut = () => {
   signOut(auth).then(() => {
     // Sign-out successful.
   }).catch((error) => {
     console.error(error)
   });
 };

//   signInBtn && signInBtn.addEventListener('click', signInUser)
//   loginWithGoogleBtn && loginWithGoogleBtn.addEventListener('click', signInWithPopup);


  
  signInBtn && signInBtn.addEventListener('click', signInUser);
  loginWithGoogleBtn && loginWithGoogleBtn.addEventListener('click', signInWithGoogle);