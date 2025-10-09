import populateHeader from './populateHeader.js';
import { cardShitter } from './cardShitter.js';
import { searchProduct } from './searchProduct.js';
import addToCart from './addToCart.js';
import { deleteById } from './deleteById.js';
import detailedView from './detailedView.js';
export const mainCategories = {
  Beauty: [],
  Fashion: [],
  Electronics: [],
  Home: [],
  Sports: [],
};
let data;
const search = document.getElementById('product-search');

search.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const searchQuery = `https://dummyjson.com/products/search?q=${e.target.value}`;
    searchProduct(searchQuery);
  }
});

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

      app.innerHTML += cardShitter(product, false);
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
