import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorStateComponent } from './error-state.component';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('ErrorStateComponent', () => {
  let component: ErrorStateComponent;
  let fixture: ComponentFixture<ErrorStateComponent>;

  const getTextContent = (q: string) =>
    fixture.debugElement.query(By.css(q)).nativeElement.textContent.trim();

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
    expect(getTextContent(selectors.title)).toEqual(component.title);
    expect(getTextContent(selectors.message)).toEqual(component.message);
  });
});
