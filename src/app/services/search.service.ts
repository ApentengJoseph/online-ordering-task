import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>(''); // Initialize a BehaviorSubject with an initial value ('')
  search$: Observable<string> = this.searchSubject.asObservable();

  // Method to update the search term
  setSearchTerm(searchTerm: string) {
    this.searchSubject.next(searchTerm); // Emit the new search term to subscribers
  }
}

