import { deleteById } from './deleteById.js';
import { saveDataToLocalStorage } from './localStorage';
export function incrementDecrement(id, data, operator) {
  const index = data.items.findIndex((item) => item.id === id);

  if (index === -1) {
    console.error(`Item with id ${id} not found`);
    return;
  }

  switch (operator) {
    case '+':
      data.items[index].amount++;
      break;
    case '-':
      if (data.items[index].amount === 1) {
        deleteById(id);
      } else {
        data.items[index].amount--;
      }
      break;
  }
  saveDataToLocalStorage('store_data', data);
}
