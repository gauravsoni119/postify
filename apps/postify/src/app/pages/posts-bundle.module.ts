import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule, BASE_PATH } from '@postify/shell';

@NgModule({
  imports: [CommonModule, ShellModule],
  providers: [
    { provide: BASE_PATH, useValue: 'https://jsonplaceholder.typicode.com' },
  ],
})
export class PostsBundleModule {}
