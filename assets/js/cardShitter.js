export function cardShitter(product) {
  return `<figure class="product-card">
              <img src="${product.thumbnail}" />
              <figcaption>    
                  <h2>${product.title}</h2>
                  <p>${product.description}</p>
                  <p>Price: $${product.price}</p>
                  <button onclick="addToCart(${product.id})" class="buyBtn">Add to Cart</button>
              </figcaption>
          </figure>`;
}
