import { Component } from '@angular/core';

@Component({
  selector: 'postify-layout',
  template: `
    <mat-toolbar color="primary" i18n="Header|Application header@@appHeader"
      >Postify</mat-toolbar
    >
    <div class="container-fluid pt-3">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class LayoutComponent {}
