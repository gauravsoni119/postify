import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostifyStoreModule } from '@postify/data-access';
import { shellRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(shellRoutes),
    PostifyStoreModule,
  ],
})
export class ShellModule {}
