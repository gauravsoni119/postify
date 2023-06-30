import { Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { StoreModelService } from '@postify/data-access';
import { LoadingState } from '@postify/util';

@Component({
  selector: 'postify-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  vm$ = this.storeModel.postsViewModel$;
  readonly skeletonRects = new Array(30);
  readonly loadingState = LoadingState;

  constructor(
    private readonly storeModel: StoreModelService,
    private readonly liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit() {
    this.liveAnnouncer.announce('loading posts');
    this.storeModel.loadPosts();
  }
}
