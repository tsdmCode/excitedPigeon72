import populateHeader from './populateHeader.js';

export const mainCategories = {
  Beauty: [],
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
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const getFeaturedProducts = () => {
  fetch(`https://dummyjson.com/products/${Math.floor(Math.random() * data.total)}`)
    .then((response) => response.json())
    .then((product) => {
      //console.log(product);
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

async function sortCategories() {
  const res = await fetch('https://dummyjson.com/products/categories');
  const categoryData = await res.json();
  // console.log(categoryData);

  categoryData.forEach((category) => {
    switch (category.slug) {
      case 'beauty':
      case 'fragrances':
      case 'skin-care':
        mainCategories.Beauty.push({ url: category.url, name: category.name });
        break;
      case 'tops':
      case 'womens-dresses':
      case 'womens-shoes':
      case 'mens-shirts':
      case 'mens-shoes':
      case 'mens-watches':
      case 'womens-watches':
      case 'womens-bags':
      case 'womens-jewellery':
      case 'sunglasses':
        mainCategories.Fashion.push({ url: category.url, name: category.name });
        break;
      case 'smartphones':
      case 'laptops':
      case 'tablets':
      case 'mobile-accessories':
        mainCategories.Electronics.push({ url: category.url, name: category.name });
        break;
      case 'furniture':
      case 'home-decoration':
      case 'groceries':
      case 'kitchen-accessories':
        mainCategories.Home.push({ url: category.url, name: category.name });
        break;
      case 'sports-accessories':
      case 'motorcycle':
      case 'vehicle':
        mainCategories.Sports.push({ url: category.url, name: category.name });
        break;
      default:
        console.log('Ukendt kategori:', category.name);
        break;
    }
  });
  console.log(mainCategories);
}

const initialize = async () => {
  await fetchData();
  getFeaturedProducts();
  getFeaturedProducts();
  getFeaturedProducts();
  await sortCategories();
  populateHeader();
};

initialize();
