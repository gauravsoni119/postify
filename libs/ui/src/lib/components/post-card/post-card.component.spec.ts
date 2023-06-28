import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { PostCardComponent } from './post-card.component';
import { UiModule } from '../../ui.module';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;
  const observer = new Subject();
  const mockBreakpointObserver = {
    observe: () => observer,
  };
  //NOTE: Can be moved to separate testing utils
  const query = (q: string) => fixture.debugElement.query(By.css(q));
  const getTextContent = (q: string) =>
    fixture.debugElement.query(By.css(q)).nativeElement.textContent.trim();

  const selectors = {
    card: '[data-role="postify-card"]',
    cardHeader: '[data-role="postify-card-header"]',
    cardContent: '[data-role="postify-card-content"]',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, UiModule],
      declarations: [PostCardComponent],
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    component.post = {
      userId: 1,
      id: 1,
      title: 'Post title 1',
      body: 'Post body 1',
    };
    fixture.detectChanges();
  });

  it('should render card', () => {
    expect(getTextContent(selectors.cardHeader)).toEqual('Post Title');
    expect(getTextContent(selectors.cardContent)).toEqual(component.post.title);
  });

  it('should render userId on card click', () => {
    query(selectors.card).triggerEventHandler('click');
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(getTextContent(selectors.cardHeader)).toEqual('Post Userid');
    expect(getTextContent(selectors.cardContent)).toEqual(
      component.post.userId.toString()
    );
  });

  it('should render id on card click', () => {
    query(selectors.card).triggerEventHandler('click');
    query(selectors.card).triggerEventHandler('click');
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(getTextContent(selectors.cardHeader)).toEqual('Post Id');
    expect(getTextContent(selectors.cardContent)).toEqual(
      component.post.id.toString()
    );
  });

  it('should render body on card click', () => {
    query(selectors.card).triggerEventHandler('click');
    query(selectors.card).triggerEventHandler('click');
    query(selectors.card).triggerEventHandler('click');
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(getTextContent(selectors.cardHeader)).toEqual('Post Body');
    expect(getTextContent(selectors.cardContent)).toEqual(component.post.body);
  });

  it('should truncate text in multi lines on large devices', () => {
    expect(query(selectors.cardContent).classes).toEqual({
      'postify-text-truncate': true,
    });
    observer.next({ matches: true, breakpoints: {} });
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    fixture.detectChanges();
    expect(query(selectors.cardContent).classes).toEqual({
      'postify-text-truncate': true,
      'postify-text-truncate--multi-line': true,
    });
  });
});
