import { getProductById } from './getProductById.js';
import { cardShitter } from './cardShitter.js';

export default async function detailedView(id) {
  const product = await getProductById(id);
  console.log(product);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.innerHTML += cardShitter(product, true);
}
