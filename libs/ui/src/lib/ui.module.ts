import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PostListComponent } from './components/post-list/post-list.component';
import { KeyRendererPipePipe } from './pipes/key-renderer-pipe.pipe';
import { PostCardComponent } from './components/post-card/post-card.component';
import { SkeletonRectComponent } from './components/skeleton-rect/skeleton-rect.component';
import { ErrorStateComponent } from './components/error-state/error-state.component';

const uiModules = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
];

const components = [
  PostListComponent,
  PostCardComponent,
  SkeletonRectComponent,
  ErrorStateComponent,
];

const pipes = [KeyRendererPipePipe];

@NgModule({
  imports: [CommonModule, ...uiModules],
  declarations: [...components, ...pipes],
  exports: [...components, ...pipes],
})
export class UiModule {}
