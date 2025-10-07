const mainCategories = {
  BeautyProducts: [],
  Fashion: [],
  Electronics: [],
  Home: [],
  Sports: [],
};
let data;

const fetchData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const getFeaturedProducts = () => {
  fetch(`https://dummyjson.com/products/${Math.floor(Math.random() * data.total)}`)
    .then((response) => response.json())
    .then((product) => {
      console.log(product);
      const app = document.getElementById('app');

      app.innerHTML += `<figure class="product-card">
          <img src="${product.thumbnail}" />
          <figcaption>    
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              <button onclick="addToCart()" class="buyBtn"></button>
          </figcaption>
      </figure>`;
    })
    .catch((error) => console.error(error));
};

const initialize = async () => {
  await fetchData();
  getFeaturedProducts();
  getFeaturedProducts();
  getFeaturedProducts();
};

initialize();
