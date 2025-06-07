const firebaseConfig = {
    apiKey: "AIzaSyAswlEROqESGvRJrOgNK6PLiyYQEI-FQPk",
    authDomain: "spck-jsi-3e996.firebaseapp.com",
    projectId: "spck-jsi-3e996",
    storageBucket: "spck-jsi-3e996.firebasestorage.app",
    messagingSenderId: "31009511475",
    appId: "1:31009511475:web:83bb7453c94790f6a5ab46",
    measurementId: "G-N94X8S07W3"
};
firebase.initializeApp(firebaseConfig);
document.addEventListener('DOMContentLoaded', function () {
    const signupButton = document.getElementById("button_signup");
    if (signupButton) {
        signupButton.addEventListener('click', function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return user.updateProfile({
                        displayName: name
                    });
                })
                .then(() => {
                    console.log("User registered and profile updated");
                    alert("Đăng ký thành công!");
                    window.location.href = "./login.html"; // Chuyển sang trang đăng nhập
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert("Đăng ký thất bại: " + errorMessage);
                    console.error("Registration error:", error);
                });
        });
    }
});



// document.getElementById("button_signup").addEventListener("click", function (event) {
//   event.preventDefault();

//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       return user.updateProfile({
//         displayName: name
//       });
//     })
//     .then(() => {
//       console.log("User registered and profile updated");
//       alert("Đăng ký thành công!");
//       window.location.href = "./login.html"; // Chuyển sang trang đăng nhập
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
//       alert("Đăng ký thất bại: " + errorMessage);
//       console.error("Registration error:", error);
//     });
// });

// document.getElementById("button_login").addEventListener("click", function (event) {
//   event.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log("User signed in:", user);
//       alert("Đăng nhập thành công!");
//       window.location.href = "./index.html";
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
//       alert("Đăng nhập thất bại: " + errorMessage);
//       console.error(error);
//     });
// });
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById("button_login");

    if (loginButton) {
        loginButton.addEventListener('click', function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User signed in:", user);
                    alert("Đăng nhập thành công!");
                    window.location.href = "./index.html"; // Chuyển đến trang chính
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert("Đăng nhập thất bại: " + errorMessage);
                    console.error(error);
                });
        });
    }
});

