import { Component, Input } from "@angular/core";
import { Product } from "../model/products";


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent {
     @Input() filteredProducts!:Product[];// Receives data from the parent component
}