import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/products';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  selectedProductId!: number;
  selectedProduct!: Product | undefined;
  selectedImage!: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedProductId = Number(params.get('id'));
      // Find the selected product using the provided ProductService
      this.selectedProduct = this.productService.products.find(
        (product: { id: number }) => product.id === this.selectedProductId
      );
      this.selectedImage = this.selectedProduct?.thumbnail;
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  addToCart(product: Product): void {
    if (this.cartService.isProductInCart(product)) {
      this.cartService.removeProduct(product);
    } else {
      this.cartService.addProduct(product);
    }
  }

  // Method to change the selected image
  changeSelectedImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
}
