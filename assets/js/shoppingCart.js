import { getProductById } from './getProductById.js';
import { saveDataToLocalStorage, getDataFromLocalStorage } from './localStorage.js';
import { incrementDecrement } from './incrementDecrement.js';
import { deleteById } from './deleteById.js';

window.incrementDecrement = incrementDecrement;

export async function shoppingCart() {
  const data = getDataFromLocalStorage('store_data');
  const app = document.getElementById('app');
  app.innerHTML = '';

  let total = 0;
  const cartItems = await Promise.all(
    data.items.map(async (element) => {
      const product = await getProductById(element.id);
      const itemTotal = element.price * element.amount;
      total += itemTotal;

      return `<div class="cartItem" data-id="${element.id}">
            <img src="${product.thumbnail}"> 
            <p>${product.title}</p>
            <p>$${element.price}</p>
            <div class="amount-container">
                <button onclick="handleIncrement(${element.id}, '-')">-</button>
                <input type="number" value="${element.amount}" readonly data-item-amount="${element.id}">
                <button onclick="handleIncrement(${element.id}, '+')">+</button>
                <i onclick="handleDeleteById(${element.id})" class="fa-solid fa-trash-can"></i>
            </div>
            <p class="subtotal" data-subtotal="${element.id}">Subtotal: $${itemTotal.toFixed(2)}</p>
        </div>`;
    })
  );

  app.innerHTML =
    cartItems.join('') +
    `<div class="cart-total">
      <h3 id="cart-total">Total: $${total.toFixed(2)}</h3>
      <button onclick="buyNow()" class="buy-now-btn">Buy Now</button>
    </div>`;
}

window.handleIncrement = function (id, operator) {
  const data = getDataFromLocalStorage('store_data');

  const currentItem = data.items.find((item) => item.id === id);
  const willDelete = currentItem && currentItem.amount === 1 && operator === '-';

  if (willDelete) {
    const cartItem = document.querySelector(`[data-id="${id}"]`);
    if (cartItem) {
      cartItem.remove();
    }

    data.items = data.items.filter((item) => item.id !== id);
    saveDataToLocalStorage('store_data', data);
  } else {
    // Update normally
    incrementDecrement(id, data, operator);

    const updatedData = getDataFromLocalStorage('store_data');
    const updatedItem = updatedData.items.find((item) => item.id === id);

    if (updatedItem) {
      const input = document.querySelector(`[data-item-amount="${id}"]`);
      if (input) {
        input.value = updatedItem.amount;
      }

      const subtotal = document.querySelector(`[data-subtotal="${id}"]`);
      if (subtotal) {
        const newSubtotal = updatedItem.price * updatedItem.amount;
        subtotal.textContent = `Subtotal: $${newSubtotal.toFixed(2)}`;
      }
    }
  }

  updateTotal();
};

window.handleDeleteById = function (id) {
  const cartItem = document.querySelector(`[data-id="${id}"]`);
  if (cartItem) {
    cartItem.remove();
  }

  const data = getDataFromLocalStorage('store_data');
  data.items = data.items.filter((item) => item.id !== id);
  saveDataToLocalStorage('store_data', data);

  updateTotal();
};

function updateTotal() {
  const data = getDataFromLocalStorage('store_data');
  let total = 0;

  data.items.forEach((item) => {
    total += item.price * item.amount;
  });

  const totalElement = document.getElementById('cart-total');
  if (totalElement) {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
}

window.buyNow = function () {
  saveDataToLocalStorage('store_data', { items: [] });
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Thank you for your purchase!</h2>';
};
