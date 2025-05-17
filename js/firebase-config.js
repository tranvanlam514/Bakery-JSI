// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAswLEROqESGvRJrOgNK6PLiyYQEI-FQPk",
  authDomain: "spck-jsi-3e996.firebaseapp.com",
  projectId: "spck-jsi-3e996",
  storageBucket: "spck-jsi-3e996.appspot.com",
  messagingSenderId: "31009511475",
  appId: "1:31009511475:web:83bb7453c94790f6a5ab46",
  measurementId: "G-N94X85XWJ3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!name || !email || !password) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log('Đăng ký thành công:', user);

      return user.updateProfile({ displayName: name });
    })
    .then(() => {
      alert('Đăng ký thành công! Chuyển hướng đến đăng nhập...');
      window.location.href = "./login.html";
    })
    .catch((error) => {
      console.error('Lỗi đăng ký:', error.message);
      alert('Lỗi đăng ký: ' + error.message);
    });
}

function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log('Đăng nhập thành công:', user);
      alert('Đăng nhập thành công! Chào, ' + user.displayName);
      window.location.href = "main.html";
    })
    .catch((error) => {
      console.error('Lỗi đăng nhập:', error.message);
      alert('Lỗi đăng nhập: ' + error.message);
    });
}

document.getElementById('signup-form')?.addEventListener('submit', registerUser);
document.getElementById('login-form')?.addEventListener('submit', loginUser);