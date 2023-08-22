import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, ProductListResponse } from '../products/model/products';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  throwError,
} from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  filteredProducts!: Product[];
  skip: number = 0;
  limit: number = 20;
  totalProducts!: number;
  noSearchResults: boolean = false;
  private isProductsAvailable = new Subject<ProductListResponse>();
  productsObservable = this.isProductsAvailable.asObservable();

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {
    this.getProducts(this.skip, this.limit);
  }

  ngOnInit(): void {
    combineLatest([
      this.productsObservable,
      this.searchService.search$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
    ]).subscribe(([result, searchTerm]) => {
      if (result.products) {
        this.filteredProducts = this.filterProductsByTitle(searchTerm);
      }

      if (this.filteredProducts.length === 0) {
        this.noSearchResults = true;
      } else {
        this.noSearchResults = false;
      }
    });
  }

  // Method to fetch products from the productService
  getProducts(skip: number, limit: number) {
    this.productService.getProducts(skip, limit).subscribe(
      (result) => {
        this.isProductsAvailable.next(result);
        this.productService.products = result.products;
        this.totalProducts = result.total;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  // Method to filter products based on the search term
  filterProductsByTitle(searchTerm: string): Product[] {
    searchTerm = searchTerm.toLowerCase();

    if (searchTerm) {
      return this.productService.products?.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    } else {
      return this.productService.products; // Return all products when search term is empty or only whitespace
    }
  }

  // Method to handle page change event
  onPageChange(
    event:
      | { page: number; first: number; rows: number; pageCount: number }
      | any
  ) {
    this.getProducts(event.page, event.rows);
    this.filteredProducts = this.productService.products;
  }
}
