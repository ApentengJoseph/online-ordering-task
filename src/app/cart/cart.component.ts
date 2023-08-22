import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../products/model/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems(); // Initialize cart items from the cart service
  }

  // Method to remove a product from the cart
  removeFromCart(product: Product): void {
    this.cartService.removeProduct(product); // Remove product from the cart service
    this.cartItems = this.cartService.getCartItems(); // Update cart items after removal (Rxjs subjects can be use to simulate this also)
  }

  // Method to navigate to the checkout page
  navigateToCheckout(): void {
    this.router.navigate(['/checkout']); // Navigate to the checkout page
  }
}
