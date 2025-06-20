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


  })
  .catch(err => console.error("Lỗi khi lấy chi tiết món:", err));

