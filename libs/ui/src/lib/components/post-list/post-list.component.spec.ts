import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostListComponent } from './post-list.component';
import { By } from '@angular/platform-browser';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    component.posts = [
      {
        userId: 1,
        id: 1,
        title: 'Post title 1',
        body: 'Post body 1',
      },
      {
        userId: 1,
        id: 2,
        title: 'Post title 2',
        body: 'Post body 2',
      },
    ];
    fixture.detectChanges();
  });

  it('should render list of post cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('postify-post-card'));
    expect(cards.length).toEqual(2);
  });
});
