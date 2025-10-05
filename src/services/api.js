const BASE_URL = 'https://dummyjson.com';

export const apiService = {
  async getProducts(limit = 30, skip = 0) {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProduct(id) {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async searchProducts(query, limit = 30, skip = 0) {
    try {
      const response = await fetch(`${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};