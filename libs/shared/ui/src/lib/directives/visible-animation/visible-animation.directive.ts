import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';

@Directive({
  selector: '[postifyVisibleAnimationDescendant]',
})
export class VisibleAnimationDescendantDirective {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.classList.add('visible-animation-descendent');
  }
}

@Directive({
  selector: '[postifyVisibleAnimation]',
})
export class VisibleAnimationDirective implements AfterViewInit {
  @ContentChildren(VisibleAnimationDescendantDirective, {
    descendants: true,
    read: ElementRef,
  })
  elementRefs!: QueryList<ElementRef<HTMLElement>>;

  @Input() options: IntersectionObserverInit = {
    rootMargin: '0px',
    threshold: 0.5,
  };

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        ...this.options,
      }
    );
    this.elementRefs.forEach((elementRef) => {
      observer.observe(elementRef.nativeElement);
    });
  }
}
