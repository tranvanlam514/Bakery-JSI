import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAswlEROqESGvRJrOgNK6PLiyYQEI-FQPk",
    authDomain: "spck-jsi-3e996.firebaseapp.com",
    projectId: "spck-jsi-3e996",
    storageBucket: "spck-jsi-3e996.firebasestorage.app",
    messagingSenderId: "31009511475",
    appId: "1:31009511475:web:83bb7453c94790f6a5ab46",
    measurementId: "G-N94X8S07W3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("addProductForm");
const productList = document.getElementById("product-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("productName").value.trim();
  const image_url = document.getElementById("productImg").value.trim();

  if (name && image_url) {
    try {
      await addDoc(collection(db, "cake"), {
        name,
        image_url
      });
      form.reset();
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  }
});


// Thay đổi và hiển thị sản phẩm
onSnapshot(collection(db, "cake"), (snapshot) => {
  productList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const item = document.createElement("div");
    item.classList.add("product-card");
    item.innerHTML = `
    <img src="${data.image_url}" alt="${data.name}" class="product-img" />
    <h3 class="product-name">${data.name}</h3>
    <button class="delete-btn" onclick="deleteProduct('${docSnap.id}')">Delete</button>
    `;
    productList.appendChild(item);
  });
});


// Xoá sản phẩm
window.deleteProduct = async function (id) {
  await deleteDoc(doc(db, "cake", id));
}
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const userAvatar = document.getElementById("userAvatar");
  const logoutBtn = document.getElementById("logoutBtn");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Người dùng đã đăng nhập
      loginBtn.style.display = "none";
      userAvatar.style.display = "inline-block";
      logoutBtn.style.display = "inline-block";
    } else {
      // Chưa đăng nhập
      loginBtn.style.display = "inline-block";
      userAvatar.style.display = "none";
      logoutBtn.style.display = "none";
    }
  });

  // Xử lý khi bấm nút Logout
  logoutBtn.addEventListener("click", function () {
    firebase.auth().signOut().then(() => {
      alert("Đăng xuất thành công!");
      window.location.reload();
    }).catch((error) => {
      console.error("Đăng xuất thất bại: ", error);
    });
  });
});
  let slideIndex = 0;
  showSlides();