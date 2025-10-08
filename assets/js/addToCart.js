import { saveDataToLocalStorage, getDataFromLocalStorage } from './localStorage.js';

export default function addToCart(id, price) {
  const data = getDataFromLocalStorage('store_data');

  console.log(data.items);
  console.log(id, price);

  const existingItem = data.items.find((item) => item.id === id);

  if (existingItem) {
    existingItem.amount += 1;
    console.log(`Incremented amount for item ${id}. New amount: ${existingItem.amount}`);
  } else {
    data.items.push({
      id: id,
      price: price,
      amount: 1,
    });
    console.log(`Added new item ${id} to cart with price ${price}`);
  }

  saveDataToLocalStorage('store_data', data);

  console.log('Updated cart:', data.items);
}
