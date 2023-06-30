import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateComponent } from './components/error-state/error-state.component';
import { SkeletonRectComponent } from './components/skeleton-rect/skeleton-rect.component';

const uiModules = [MatIconModule];

const components = [ErrorStateComponent, SkeletonRectComponent];

@NgModule({
  imports: [CommonModule, ...uiModules],
  declarations: [...components],
  exports: [...components],
})
export class SharedUiModule {}
