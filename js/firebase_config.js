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

            if(email.toLowerCase()=== "admin@gmail.com" && password==="admin"){
              window.location.href = "./admin.html";
            }
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User signed in:", user);
                    alert("Đăng nhập thành công!");
                    window.location.href = "./index.html"; 
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert("Đăng nhập thất bại: " + errorMessage);
                    console.error(error);
                });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("button_login");

  if (!loginBtn) return;

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((cred) => {
        const user = cred.user;                  // user đã đăng nhập
        const mail = user.email.toLowerCase();   // tránh lệch HOA/thường

        if (mail === "admin@gmail.com") {
          window.location.href = "./admin.html";
        } else {
          window.location.href = "./index.html";
        }
      })
      .catch((err) => {
        alert("Đăng nhập thất bại:\n" + err.message);
        console.error(err);
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const userMenu = document.getElementById("userMenu");
  const userAvatar = document.getElementById("userAvatar");
  const logoutBtn = document.getElementById("logoutBtn");
  const navNew = document.getElementById("navNew");
  const navAdd = document.getElementById("navAdd");

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Đã đăng nhập:", user.email);

      if (loginBtn) loginBtn.style.display = "none";
      if (userMenu) userMenu.style.display = "flex";
      if (logoutBtn) logoutBtn.style.display = "inline-block";

      if (userAvatar) {
        userAvatar.src = user.photoURL || "images/default-avatar.png";
      }

      // Phân quyền: Admin
      if (user.email === "admin@gmail.com") {
        if (navNew) navNew.style.display = "none";
        if (navAdd) navAdd.style.display = "inline-block";
      } else {
        if (navNew) navNew.style.display = "inline-block";
        if (navAdd) navAdd.style.display = "none";
      }

      if (!logoutBtn.hasListener) {
        logoutBtn.addEventListener("click", () => {
          auth.signOut().then(() => {
            alert("Đăng xuất thành công!");
            window.location.reload();
          }).catch((error) => {
            console.error("Logout error:", error);
          });
        });
        logoutBtn.hasListener = true;
      }

    } else {
      console.log("Chưa đăng nhập");

      if (loginBtn) loginBtn.style.display = "inline-block";
      if (userMenu) userMenu.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "none";
      if (userAvatar) userAvatar.src = "";
      if (navNew) navNew.style.display = "inline-block";
      if (navAdd) navAdd.style.display = "none";
    }
  });
});


