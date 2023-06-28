import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'postify-skeleton-rect',
  template: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonRectComponent {
  @HostBinding('class') classes = 'skeleton-rect pulse';
}
