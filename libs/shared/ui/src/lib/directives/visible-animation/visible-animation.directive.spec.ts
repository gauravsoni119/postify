import { Component } from '@angular/core';
import {
  VisibleAnimationDirective,
  VisibleAnimationDescendantDirective,
} from './visible-animation.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'postify-test',
  template: `
    <div class="container" postifyVisibleAnimation>
      <div class="card" postifyVisibleAnimationDescendant>Card 1</div>
      <div class="card" postifyVisibleAnimationDescendant>Card 2</div>
      <div class="card" postifyVisibleAnimationDescendant>Card 3</div>
      <div class="card" postifyVisibleAnimationDescendant>Card 4</div>
      <div class="card" postifyVisibleAnimationDescendant>Card 5</div>
      <div class="card" postifyVisibleAnimationDescendant>Card 6</div>
    </div>
  `,
})
export class TestComponent {}

describe('VisibleAnimationDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        VisibleAnimationDirective,
        VisibleAnimationDescendantDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });
  it('should look for intersection and animate the cards', () => {
    expect(window.IntersectionObserver).toHaveBeenCalled();
  });
});
