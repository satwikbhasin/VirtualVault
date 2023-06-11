import Axios from "axios";

class ProductMap {
  constructor() {
    this.map = new Map();
    this.fetchAllProducts();
  }

  fetchAllProducts = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3001/products/getAllProducts"
      );
      // console.log(response.data);
      this.addProductsToMap(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  addProductsToMap = (products) => {
    products.forEach((item) => {
      this.map.set(item._id, item);
    });
  };

  getProductsFromMap = () => {
    return this.map;
  };

  fetchProductById = async (product_id) => {
    var response = null;
    try {
      response = await Axios.get(
        "http://localhost:3001/products/getProduct/" + product_id
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    return this.map.get(product_id);
  };

  deleteProductFromMap = (product_id) => {
    this.map.delete(product_id);
  };

  updateProductInMap = (product) => {
    this.map.set(product.product_id, product);
  };
}

const productMapInstance = new ProductMap();

export default productMapInstance;
