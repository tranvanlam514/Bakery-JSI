const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

// Gọi API để lấy chi tiết món ăn
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(res => res.json())
  .then(data => {
    const meal = data.meals[0];
    const detailContainer = document.getElementById("product-detail");

    detailContainer.innerHTML = `
      <div class="product-detail-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="product-detail-card-info">
          <h1>${meal.strMeal}</h1>
          <h4>Category: ${meal.strCategory}</h4>
          <h4>Area: ${meal.strArea}</h4>
          <p>${meal.strInstructions}</p>
        </div>
      </div>
    `;

    // Gắn sự kiện thêm vào favorites nếu cần tại đây
  })
  .catch(err => console.error("Lỗi khi lấy chi tiết món:", err));

// Xử lý login/logout UI
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const userAvatar = document.getElementById("userAvatar");
  const logoutBtn = document.getElementById("logoutBtn");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      loginBtn.style.display = "none";
      userAvatar.style.display = "inline-block";
      logoutBtn.style.display = "inline-block";
    } else {
      loginBtn.style.display = "inline-block";
      userAvatar.style.display = "none";
      logoutBtn.style.display = "none";
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
});

// Nếu bạn có slide hoặc carousel, nên để ở đây
let slideIndex = 0;
function showSlides() {
  // slide logic ở đây nếu có
}
