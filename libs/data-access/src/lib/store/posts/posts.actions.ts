import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': emptyProps(),
    'Load Posts Error': emptyProps(),
  },
});
