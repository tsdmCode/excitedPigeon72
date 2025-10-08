import { cardShitter } from './cardShitter.js';

export async function searchByCategory(url) {
  console.log('bruger følgende url', url);
  const res = await fetch(url);
  const data = await res.json();

  const app = document.getElementById('app');

  app.innerHTML = '';
  data.products.forEach((product) => {
    app.innerHTML += cardShitter(product);
  });
}
