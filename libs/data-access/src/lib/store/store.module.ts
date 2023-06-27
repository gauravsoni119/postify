import { NgModule } from '@angular/core';
import { PostsEffects } from './posts/posts.effects';
import { StoreModule } from '@ngrx/store';
import { postsFeature } from './posts/posts.reducer';

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(postsFeature)],
  providers: [PostsEffects],
})
export class PostifyStoreModule {}
