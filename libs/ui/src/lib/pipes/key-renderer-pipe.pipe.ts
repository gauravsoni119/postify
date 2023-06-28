import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '@postify/util';

@Pipe({
  name: 'keyRendererPipe',
})
export class KeyRendererPipePipe implements PipeTransform {
  transform(post: Post, key: keyof Post): string | number {
    return post[key];
  }
}
