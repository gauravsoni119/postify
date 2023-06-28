import { Component } from '@angular/core';
import { StoreModelService } from '@postify/data-access';
import { LoadingState } from '@postify/util';

@Component({
  selector: 'postify-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  vm$ = this.storeModel.postsViewModel$;
  readonly skeletonRects = new Array(30);
  readonly loadingState = LoadingState;

  constructor(private readonly storeModel: StoreModelService) {
    this.storeModel.loadPosts();
  }
}
