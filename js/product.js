const productList = document.getElementById('product-list');
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");
const searchForm = document.getElementById("searchForm");
let desserts = [];

// Fetch dữ liệu 
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
    .then(response => response.json())
    .then(data => {
        desserts = data.meals;

        // Hiển thị sản phẩm
        desserts.forEach(meal => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <a href="./product_detail.html?id=${meal.idMeal}" class="product-link">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                </a>
            `;
            productList.appendChild(productCard);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Gợi ý tìm kiếm khi nhập
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (keyword.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    const matches = desserts.filter(meal =>
        meal.strMeal.toLowerCase().includes(keyword)
    );

    if (matches.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    matches.slice(0, 6).forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = meal.strMeal;
        div.addEventListener("click", () => {
            window.location.href = `product_detail.html?id=${meal.idMeal}`;
        });
        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = "block";
});

// Ẩn gợi ý khi click ra ngoài
document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target)) {
        suggestionsBox.style.display = "none";
    }
});

// Xử lý khi submit tìm kiếm
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = searchInput.value.toLowerCase().trim();
    const match = desserts.find(meal =>
        meal.strMeal.toLowerCase() === keyword
    );

    if (match) {
        window.location.href = `product_detail.html?id=${match.idMeal}`;
    } else {
        alert("Không tìm thấy món tráng miệng phù hợp.");
    }
});


