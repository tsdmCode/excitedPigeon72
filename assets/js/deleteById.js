import { getDataFromLocalStorage, saveDataToLocalStorage } from './localStorage.js';

export async function deleteById(id) {
  const data = await getDataFromLocalStorage('store_data');

  const existingItemIndex = data.items.findIndex((item) => item.id === id);

  if (existingItemIndex > -1) {
    data.items.splice(existingItemIndex, 1);

    saveDataToLocalStorage('store_data', data);
  } else {
    console.log('item not found');
  }

  console.log(data);
}
