import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonRectComponent } from './skeleton-rect.component';

describe('SkeletonRectComponent', () => {
  let fixture: ComponentFixture<SkeletonRectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonRectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonRectComponent);
    fixture.detectChanges();
  });

  it('should render skeleton rect', () => {
    expect(fixture.debugElement.classes).toEqual({
      pulse: true,
      'skeleton-rect': true,
    });
  });
});
