import { KeyRendererPipePipe } from './key-renderer-pipe.pipe';

describe('KeyRendererPipePipe', () => {
  it('create render specify property of post', () => {
    const pipe = new KeyRendererPipePipe();
    expect(
      pipe.transform(
        { id: 1, userId: 1, title: 'Title', body: 'body' },
        'title'
      )
    ).toEqual('Title');
  });
});
