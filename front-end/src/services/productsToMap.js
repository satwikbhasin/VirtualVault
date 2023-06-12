import Axios from "axios";

class ProductMap {
  constructor() {
    this.map = new Map();
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
      console.log("Products already fetched");
      return;
    } else {
      console.log("Fetching products");
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

  getAllProductsFromMap = () => {
    return this.map;
  };

  getProductByIdFromMap = (product_id) => {
    return this.map.get(product_id);
  };
}

const productMapInstance = new ProductMap();

export default productMapInstance;
