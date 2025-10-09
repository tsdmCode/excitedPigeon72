import addToCart from './addToCart.js';
import detailedView from './detailedView.js';
window.addToCart = addToCart;
window.detailedView = detailedView;

window.addToCartAndStop = function (e, id, price) {
  e.stopPropagation();
  addToCart(id, price);
};

export function cardShitter(product, details) {
  return details != true
    ? `<figure onclick="detailedView(${product.id}, true)" class="product-card">
              <img src="${product.thumbnail}" />
              <figcaption>    
               
                      <h2>${product.title}</h2>
                      <p>${product.description}</p>
                      <p>Price: $${product.price}</p>
                  
                  <button onclick="addToCartAndStop(event, ${product.id}, ${product.price})" class="buyBtn">Add to Cart</button>
              </figcaption>
          </figure>`
    : `<figure class="product-card">
              <img src="${product.thumbnail}" />
              <figcaption>    
                  <h2>${product.title}</h2>
                  <p>${product.description}</p>
                  ${product.brand ? `<p>Brand: ${product.brand}</p>` : ''}
                  <p>Price: $${product.price}</p>
                  <p>Weight: ${product.weight}lbs</p>
                  ${product.height ? `<p>Height: ${product.height}lbs</p>` : ''}
                  <p>Rating: ${product.rating}</p>
                  <p>Items in stock: ${product.stock}</p>
                  <button onclick="addToCartAndStop(event, ${product.id}, ${
        product.price
      })" class="buyBtn">Add to Cart</button>

              </figcaption>
          </figure>`;
}
