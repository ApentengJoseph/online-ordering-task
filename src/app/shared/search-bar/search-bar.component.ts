import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SearchService } from "src/app/services/search.service";

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
    @Input() urlPath!:string;
    @Output() searchEmitter = new EventEmitter<string>();
    searchTerm = '';

    constructor(private searchService:SearchService){}

    ngOnInit(): void {}
  
    onSearch() {
      this.searchEmitter.emit(this.searchTerm);
    }
}