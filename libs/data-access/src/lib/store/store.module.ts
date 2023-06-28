import { NgModule } from '@angular/core';
import { PostsEffects } from './posts/posts.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postsFeature } from './posts/posts.reducer';
import { DataService } from '../services/data.service';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(postsFeature),
    EffectsModule.forFeature([PostsEffects]),
  ],
  providers: [DataService],
})
export class PostifyStoreModule {}
