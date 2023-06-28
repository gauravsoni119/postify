import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@postify/ui';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, UiModule],
})
export class PostsModule {}
