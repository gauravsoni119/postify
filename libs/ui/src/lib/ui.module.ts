import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SharedUiModule } from '@postify/shared/ui';
import { PostListComponent } from './components/post-list/post-list.component';
import { KeyRendererPipePipe } from './pipes/key-renderer-pipe.pipe';
import { PostCardComponent } from './components/post-card/post-card.component';

const uiModules = [MatCardModule, MatButtonModule, MatDividerModule];

const components = [PostListComponent, PostCardComponent];

const pipes = [KeyRendererPipePipe];

@NgModule({
  imports: [CommonModule, SharedUiModule, ...uiModules],
  declarations: [...components, ...pipes],
  exports: [...components, ...pipes],
})
export class UiModule {}
