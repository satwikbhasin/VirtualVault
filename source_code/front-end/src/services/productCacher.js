import Axios from "axios";

class ProductCache {
  constructor() {
    this.map = new Map();
    this.productsCount = 0;
  }

  initialize = async () => {
    try {
      const productsCount = await this.fetchProductsCount();
      await this.fetchAllProducts();
      return productsCount;
    } catch (error) {
      console.log(error);
    }
  };

  fetchProductsCount = async () => {
    if (this.productsCount > 0) return this.productsCount;
    try {
      const response = await Axios.get(
        "http://localhost:3001/products/getProductsCount"
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch products count: " + error.message);
    }
  };

  fetchAllProducts = async () => {
    if (this.map.size > 0) {
      return;
    } else {
      try {
        const response = await Axios.get(
          "http://localhost:3001/products/getAllProducts"
        );
        response.data.forEach((item) => {
          this.map.set(item._id, item);
        });
      } catch (error) {
        throw new Error("Failed to fetch products: " + error.message);
      }
    }
  };

  getAllProductsFromMap = async () => {
    return this.map;
  };

  getProductByIdFromMap = (product_id) => {
    return this.map.get(product_id);
  };
}

const productCacheInstance = new ProductCache();

export default productCacheInstance;
