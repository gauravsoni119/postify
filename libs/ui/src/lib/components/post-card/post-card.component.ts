import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Post } from '@postify/util';
import { ROTATE_POST_KEY } from '../../constants/rotate-post-key';
import { map } from 'rxjs';

@Component({
  selector: 'postify-post-card',
  templateUrl: './post-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  @Input() post!: Post;
  selectedKey: keyof Post = 'title';
  isLargeDevice$ = this.breakpointObserver
    .observe([Breakpoints.Medium, Breakpoints.Large])
    .pipe(map(({ matches }) => matches));

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  onPostClick() {
    this.selectedKey = ROTATE_POST_KEY[this.selectedKey];
  }
}
