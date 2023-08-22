import { Injectable } from '@angular/core';
import { Product } from '../products/model/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: { product: Product, quantity: number }[] = [];

  constructor() { }

  // Add a product to the cart
  addProduct(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product: product, quantity: 1 });
    }
  }

  // Remove a product from the cart
  removeProduct(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity === 0) {
        this.cart = this.cart.filter(item => item.product.id !== product.id);
      }
    }
  }

  // Check if a product is already in the cart
  isProductInCart(product: Product): boolean {
    return this.cart.some(item => item.product.id === product.id);
  }

  // Get the total count of items in the cart
  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Get all items in the cart
  getCartItems(): { product: Product, quantity: number }[] {
    return this.cart;
  }

  // Update the quantity of a product in the cart (not in use)
  updateProductQuantity(product: Product, quantity: number): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity = quantity;
    }
  }
}
