import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product, ProductListResponse } from "../products/model/products";


@Injectable({
    providedIn: 'root'
})

export class ProductService {
    products:Product[] = [];
    END_POINT_URL:string = 'https://dummyjson.com/products';

    constructor(private http: HttpClient){}

    //Get all products from endpoint
    getProducts(skip:number,limit:number){
        return this.http.get<ProductListResponse>(`${this.END_POINT_URL}?skip=${skip}&limit=${limit}`);
    }

}