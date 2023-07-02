import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '@postify/util';

/**
 * Configure the base path for the api in order to prevent duplicating it in each request
 */
export const BASE_PATH = new InjectionToken('Http client Base path ', {
  providedIn: 'root',
  factory: () => '',
});

/**
 * Data service to interact with the server.
 */
@Injectable()
export class DataService {
  constructor(
    private readonly http: HttpClient,
    @Inject(BASE_PATH) private readonly basePath: string
  ) {}

  loadPosts() {
    return this.http.get<Post[]>(`${this.basePath}/posts`);
  }
}
