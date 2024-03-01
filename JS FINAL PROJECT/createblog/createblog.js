import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase,set,ref,get,remove,update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)

// const add_post_Btn  = document.querySelector('#post_btn')
function Add_Post() {
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const id = Math.floor(Math.random() * 100);
    const file_input = document.querySelector('#file_input');

    if (file_input && file_input.files.length > 0) {
        const file = file_input.files[0];
        if (file.type.startsWith('image/')) {
            // Proceed with adding the post
            const submitBtn = document.querySelector('#submitBtn').value;

            set(ref(db, 'post/' + id), {
                title: title,
                content: content,
                imageURL: null // Set to the image URL after uploading to storage
            }).then(() => {
                console.log("Post added successfully!");
                console.log("Title:", title);
                console.log("Content:", content);
                console.log("File:", file);

                // Clear input fields
                document.querySelector('#title').value = "";
                document.querySelector('#content').value = "";
                document.querySelector('#file_input').value = "";
                document.querySelector('#submitBtn').value = "";

                // Redirect to view blog page
                window.location.href = "../index/index.html"; // Change this to the actual path of your view blog page
            }).catch((error) => {
                console.error("Error adding post:", error);
            });
        } else {
            // File is not an image, display an error message or take appropriate action
            alert("Invalid file format. Please upload an image.");
        }
    } else {
        console.error("File input element not found or no files selected.");
    }
}
submitBtn && submitBtn.addEventListener("click", Add_Post);

// // Get Data from Firebase DB
// function GetPostData() {
//     const user_ref = ref(db, 'post/');
//     get(user_ref).then((snapshot) => {
//         const data = snapshot.val();
//         let html = ''; // Declare and initialize the html variable
//         const table = document.querySelector('table');
//         for (const key in data) {
//             const { title, post_content } = data[key];
//             html += `
//                 <tr>
//                     <td> <span class="postNumber"></span></td>
//                     <td>${title}</td>
//                     <td> <button class="delete" onclick="delete_data(${key})">Delete</button> </td>
//                     <td> <button class="update" onclick="update_data(${key})">Update</button> </td>
//                 </tr>`;
//         }
//     });
// }

// GetPostData(); // Call the function to fetch and display post data


// //  delete_data
// window.delete_data = function(key){
//      remove(ref(db,`post/${key}`))
//      notify.innerHTML ="data Deleted"
//      GetPostData()
// }
// // get and update data 
//  window.update_data = function (key) {
//      const user_ref = ref(db,`post/${key}`)
//       get(user_ref).then((item)=>{
//          document.querySelector('#title').value = item.val().title;
//          document.querySelector('#submitBtn').value = item.val().post_content;
//         })
//            const update_btn = document.querySelector('.update_btn')
//             update_btn.classList.add('show')
//              document.querySelector('.post_btn').classList.add('hide')
// //   update
//             function Update_Form (){
//                 const title = document.querySelector('#title').value;
//                 const post_content = document.querySelector('#submitBtn').value;
//                   update(ref(db ,`post/${key}`),{
//                      title:title,
//                      submitBtn:submitBtn
//                   })
//                GetPostData()
//             }
//       update_btn.addEventListener('click',Update_Form)
//    }