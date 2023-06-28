import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post } from '@postify/util';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Error': props<{ error: HttpErrorResponse }>(),
  },
});
