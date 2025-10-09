import addToCart from './addToCart.js';
window.addToCart = addToCart;
export function cardShitter(product) {
  return `<figure class="product-card">
              <img src="${product.thumbnail}" />
              <figcaption>    
                  <div class="content">
                      <h2>${product.title}</h2>
                      <p>${product.description}</p>
                      <p>Price: $${product.price}</p>
                  </div>
                  <button onclick="addToCart(${product.id}, ${product.price})" class="buyBtn">Add to Cart</button>
              </figcaption>
          </figure>`;
}
