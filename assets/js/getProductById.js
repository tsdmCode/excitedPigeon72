export async function getProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();

  return data;
}
