import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

//Truy cập và hiển thị sản phẩm
const productList = document.getElementById("productList");

async function displayProducts() {
  const querySnapshot = await getDocs(collection(db, "cake"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement("div");
    item.classList.add("product-card");
    item.innerHTML = `
      <img src="${data.image_url}" alt="${data.name}" class="product-img" />
      <h3 class="product-name">${data.name}</h3>
    `;
    productList.appendChild(item);
  });
}

displayProducts();


