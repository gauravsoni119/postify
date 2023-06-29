import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { Subject } from 'rxjs';
import { POSTS, getTextContent, query } from '@postify/test-util';
import { PostCardComponent } from './post-card.component';
import { UiModule } from '../../ui.module';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;
  const observer = new Subject();
  const mockBreakpointObserver = {
    observe: () => observer,
  };

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
    component.post = POSTS[0];
    fixture.detectChanges();
  });

  it('should render card', () => {
    expect(getTextContent(selectors.cardHeader, fixture)).toEqual('Post Title');
    expect(getTextContent(selectors.cardContent, fixture)).toEqual(
      component.post.title
    );
  });

  it('should render userId on card click', () => {
    query(selectors.card, fixture).triggerEventHandler('click');
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(getTextContent(selectors.cardHeader, fixture)).toEqual(
      'Post Userid'
    );
    expect(getTextContent(selectors.cardContent, fixture)).toEqual(
      component.post.userId.toString()
    );
  });

  it('should render id on card click', () => {
    query(selectors.card, fixture).triggerEventHandler('click');
    query(selectors.card, fixture).triggerEventHandler('click');
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(getTextContent(selectors.cardHeader, fixture)).toEqual('Post Id');
    expect(getTextContent(selectors.cardContent, fixture)).toEqual(
      component.post.id.toString()
    );
  });

  it('should render body on card click', () => {
    query(selectors.card, fixture).triggerEventHandler('click');
    query(selectors.card, fixture).triggerEventHandler('click');
    query(selectors.card, fixture).triggerEventHandler('click');
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(getTextContent(selectors.cardHeader, fixture)).toEqual('Post Body');
    expect(getTextContent(selectors.cardContent, fixture)).toEqual(
      component.post.body
    );
  });

  it('should truncate text in multi lines on large devices', () => {
    expect(query(selectors.cardContent, fixture).classes).toEqual({
      'postify-text-truncate': true,
    });
    observer.next({ matches: true, breakpoints: {} });
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    fixture.detectChanges();
    expect(query(selectors.cardContent, fixture).classes).toEqual({
      'postify-text-truncate': true,
      'postify-text-truncate--multi-line': true,
    });
  });
});
