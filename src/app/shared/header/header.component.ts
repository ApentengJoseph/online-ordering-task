import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    urlPath!:string;
  @Output() searchEmitter = new EventEmitter<string>();

  constructor(private searchService: SearchService,public cartService: CartService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    //For the purpose of removing search bar based on route
    this.activatedRoute.url.subscribe((url) => {
        this.urlPath = url[0].path;
    },(error) => {
        throwError(error); // You can handle the error better in a real world scene
    })
  }

  onSearch(searchTerm: string) {
    this.searchService.setSearchTerm(searchTerm);
  }
}
