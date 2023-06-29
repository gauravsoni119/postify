import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let fixture: ComponentFixture<LayoutComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule],
      declarations: [LayoutComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
  });

  it('should render toolbar', () => {
    expect(
      fixture.debugElement.query(By.css('mat-toolbar')).nativeElement
        .textContent
    ).toContain('Postify');
  });
});
