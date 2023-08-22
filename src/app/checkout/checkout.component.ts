import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  checkoutForm!:FormGroup;

  constructor(public cartService: CartService, private formBuilder:FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
        address: ['', Validators.required]
      });
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.subtotal = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    this.tax = this.subtotal * 0.1; //tax rate of 10%
    this.total = this.subtotal + this.tax;
  }

  onCheckout(): void {
    // Simulate checkout API call
    console.log('Checkout data:', {
      cartItems: this.cartItems,
      total: this.total,
      paymentDetails: {
        cardNumber: this.checkoutForm.get('cardNumber')?.value, // card number
        expiry: this.checkoutForm.get('expiry')?.value, // expiry date
        cvv: this.checkoutForm.get('cvv')?.value // CVV
      },
      address:this.checkoutForm.get('address')?.value 
    });

    //Initialize cart item back to an empty array
    this.cartService.cart = [];
    // After successful checkout, you can navigate to a success page
    this.router.navigate(['/success']);
  }
}
