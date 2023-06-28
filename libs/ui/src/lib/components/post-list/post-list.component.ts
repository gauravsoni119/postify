import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '@postify/util';

@Component({
  selector: 'postify-post-list',
  templateUrl: './post-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  @Input() posts: Post[] = [];
}
