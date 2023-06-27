import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const BASE_PATH = new InjectionToken('Http client Base path ', {
  factory() {
    return 'https://jsonplaceholder.typicode.com';
  },
});

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private readonly http: HttpClient,
    @Inject(BASE_PATH) private readonly basePath: string
  ) {}

  fetchPosts() {
    return this.http.get(`${this.basePath}/posts`);
  }
}
