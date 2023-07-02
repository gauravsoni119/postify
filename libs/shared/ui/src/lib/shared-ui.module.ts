import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateComponent } from './components/error-state/error-state.component';
import { SkeletonRectComponent } from './components/skeleton-rect/skeleton-rect.component';
import {
  VisibleAnimationDescendantDirective,
  VisibleAnimationDirective,
} from './directives/visible-animation/visible-animation.directive';

const uiModules = [MatIconModule];

const components = [ErrorStateComponent, SkeletonRectComponent];

const directives = [
  VisibleAnimationDirective,
  VisibleAnimationDescendantDirective,
];

@NgModule({
  imports: [CommonModule, ...uiModules],
  declarations: [...components, ...directives],
  exports: [...components, ...directives],
})
export class SharedUiModule {}
