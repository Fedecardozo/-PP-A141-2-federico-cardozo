import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'https://restcountries.com/v3.1/all';
  http = inject(HttpClient);
  urlGit = 'https://api.github.com/users/Fedecardozo';
  constructor() {}

  getPaises() {
    return this.http.get(this.url);
  }
  getGit() {
    return this.http.get(this.urlGit);
  }
}
