import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const query = <T>(q: string, fixture: ComponentFixture<T>) =>
  fixture.debugElement.query(By.css(q));
export const queryAll = <T>(q: string, fixture: ComponentFixture<T>) =>
  fixture.debugElement.queryAll(By.css(q));
export const getTextContent = <T>(q: string, fixture: ComponentFixture<T>) =>
  query(q, fixture).nativeElement.textContent.trim();
