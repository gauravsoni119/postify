import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@postify/ui';
import { SharedUiModule } from '@postify/shared/ui';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, SharedUiModule, UiModule],
})
export class PostsModule {}
