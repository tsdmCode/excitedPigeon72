import { mainCategories } from './index.js';
import { searchByCategory } from './searchByCategory.js';

export default function populateHeader() {
  const nav = document.getElementById('global-nav');

  for (const [key, value] of Object.entries(mainCategories)) {
    let category = document.createElement('section');
    category.innerHTML = `<div class="category">${key}</div>`;

    // Create a container for subcategories
    const subContainer = document.createElement('div');
    subContainer.className = 'sub-container';

    for (const sub of value) {
      const { url, name } = sub;
      const subCategoryDiv = document.createElement('div');
      subCategoryDiv.className = 'sub-category';
      subCategoryDiv.innerHTML = name;
      subCategoryDiv.onclick = () => searchByCategory(url);

      subContainer.appendChild(subCategoryDiv);
    }

    category.appendChild(subContainer);
    nav.append(category);
  }
}
