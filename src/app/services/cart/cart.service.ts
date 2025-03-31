import { Injectable } from '@angular/core';
import { Product } from '../../types/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product[] = [];
  private cartVisible = false;

  constructor() { }

  addProduct(product: Product) {
    this.products.push(product);
  }

  removeProduct(product: Product) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  getTotal() {
    return this.products.reduce((total, product) => total + product.price, 0);
  }

  getProducts() {
    return this.products;
  }

  isCartVisible() {
    return this.cartVisible;
  }

  showCart() {
    this.cartVisible = true;
  }

  hideCart() {
    this.cartVisible = false;
  }
}
