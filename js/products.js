const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';
const productList = document.getElementById('product-list');
const localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <button onclick="removeProduct(${index})">Remove</button>
    `;
    productList.appendChild(card);
  });
}

function addProduct(e) {
  e.preventDefault();
  const name = document.getElementById('productName').value;
  const img = document.getElementById('productImg').value;
  products.push({ name, img });
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
  e.target.reset();
}

function removeProduct(index) {
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

document.getElementById('addProductForm').addEventListener('submit', addProduct);

renderProducts();


const isAdmin = true;

if (isAdmin) {
  document.getElementById('adminControls').style.display = 'block';
}


fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.meals.forEach(meal => {
      const card = createProductCard(meal.strMeal, meal.strMealThumb, meal.idMeal, false);
      productList.appendChild(card);
    });

    localProducts.forEach((prod, idx) => {
      const card = createProductCard(prod.name, prod.img, idx, true);
      productList.appendChild(card);
    });
  });

function createProductCard(name, img, id, isLocal = false) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <a href="${isLocal ? '#' : `product_detail.html?id=${id}`}">
      <img src="${img}" alt="${name}" />
      <h3>${name}</h3>
    </a>
    ${isAdmin && isLocal ? `<button onclick="removeProduct(${id})">Remove</button>` : ''}
  `;
  return card;
}

document.getElementById('addProductForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('productName').value;
  const img = document.getElementById('productImg').value;
  localProducts.push({ name, img });
  localStorage.setItem('localProducts', JSON.stringify(localProducts));
  location.reload();
});

function removeProduct(index) {
  localProducts.splice(index, 1);
  localStorage.setItem('localProducts', JSON.stringify(localProducts));
  location.reload();
}

fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.meals.forEach(meal => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
            `;
            productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });