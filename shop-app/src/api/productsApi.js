const API_URL="http://localhost:3001/products";
export async function getProducts() {
    const response=await fetch(API_URL);
    return response.json();
    
}
export async function getProductById(id) {
    const response=await fetch(`${API_URL}/${id}`);
    return response.json();
    
}