import { Component } from '@angular/core';
import { StoreModelService } from '@postify/data-access';

@Component({
  selector: 'postify-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent {

  constructor(private readonly storeModel: StoreModelService) {
    this.storeModel.loadPosts();
  }
}
