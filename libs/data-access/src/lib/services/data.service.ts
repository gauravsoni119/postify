import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '@postify/util';

export const BASE_PATH = new InjectionToken('Http client Base path ', {
  providedIn: 'root',
  factory: () => '',
});

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
