import data from "../data.json";

class ProductMap {
  constructor() {
    this.map = new Map();
    data.forEach((item) => {
      this.map.set(item.product_id, item);
    });
  }

  addProductsToMap = (products) => {
    products.forEach((item) => {
      this.map.set(item.product_id, item);
    });
  };

  getProductsFromMap = () => {
    return this.map;
  };

  getProductFromMap = (product_id) => {
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
