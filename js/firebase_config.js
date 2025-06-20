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
const auth = firebase.auth();
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
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById("button_login");

    if (loginButton) {
        loginButton.addEventListener('click', function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if(email == "admin@gmail.com" && password=="admin"){
              const navNew = document.getElementById("navNew");
              const navAdd = document.getElementById("navAdd");
              if (navNew) navNew.style.display = "none";
              if (navAdd) navAdd.style.display = "inline-block";
              window.location.href = "./admin.html";
            }
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
logoutBtn.addEventListener("click", function () {
    firebase.auth().signOut().then(() => {
      alert("Đăng xuất thành công!");
      window.location.reload();
    }).catch((error) => {
      console.error("Đăng xuất thất bại: ", error);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const userMenu = document.getElementById("userMenu");
  const userAvatar = document.getElementById("userAvatar");
  const logoutBtn = document.getElementById("logoutBtn");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Đã đăng nhập:", user);
      if (loginBtn) loginBtn.style.display = "none";
      if (userMenu) userMenu.style.display = "flex";
      if (userAvatar) userAvatar.src = user.photoURL || "https://www.gravatar.com/avatar/?d=mp";
      
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          firebase.auth().signOut().then(() => {
            alert("Đăng xuất thành công!");
            window.location.reload();
          }).catch((error) => {
            console.error("Logout error:", error);
          });
        });
      }
    } else {
      console.log("Chưa đăng nhập");
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (userMenu) userMenu.style.display = "none";
    }
  });
});

