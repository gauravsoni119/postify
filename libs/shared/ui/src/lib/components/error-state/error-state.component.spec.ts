import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { getTextContent } from '@postify/test-util';
import { ErrorStateComponent } from './error-state.component';

describe('ErrorStateComponent', () => {
  let component: ErrorStateComponent;
  let fixture: ComponentFixture<ErrorStateComponent>;

  const selectors = {
    title: '[data-role="error-state-title"]',
    message: '[data-role="error-state-message"]',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [ErrorStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorStateComponent);
    component = fixture.componentInstance;
    component.title = 'Something went wrong!';
    component.message =
      'An error occurred while loading posts. Please try again later.';
    fixture.detectChanges();
  });

  it('should render error state', () => {
    expect(getTextContent(selectors.title, fixture)).toEqual(component.title);
    expect(getTextContent(selectors.message, fixture)).toEqual(
      component.message
    );
  });
});
