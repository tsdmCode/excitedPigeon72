import { getProductById } from './getProductById.js';
import { saveDataToLocalStorage, getDataFromLocalStorage } from './localStorage.js';

export async function shoppingCart() {
  const data = getDataFromLocalStorage('store_data');

  const app = document.getElementById('app');

  app.innerHTML = '';

  const inCart = ``;

  data.items.forEach((element) => {
    const product = getProductById(element.id);

    inCart += `<div class="cartItem">
            <img src=${product.thumbnail}> 
            <p>${product.title}</p>
            <p>${element.price}</p>
            <div class="amount-container">
                <button>-</button>
                <input type="number" value=${element.amount}></input>
                <button>+</button>
            </div>
        </div>`;
  });
}
