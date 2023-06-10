import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

import { InfiniteScrollComponent } from './infinite-scroll.component';
import { LOAD_MORE_PIXELS_OFFSET } from 'src/environments/constants';

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let elRef: ElementRef;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollComponent],
      providers: [
        {
          provide: ElementRef,
          useValue: {
            nativeElement: {
              scrollTop: 0,
              scrollHeight: 100,
              clientHeight: 100,
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    elRef = TestBed.inject(ElementRef);
    component = fixture.componentInstance;
    component['el'] = elRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit loadMore$ event when scroll position reaches the bottom', () => {
    spyOn(component.loadMore$, 'next');

    const hostEl = component['el'].nativeElement;
    const scrollHeight = hostEl.scrollHeight;
    hostEl.scrollTop = scrollHeight + 1;
    hostEl.clientHeight = scrollHeight + 1;

    const scrollEvent = new Event('scroll');

    component['_onScroll'](scrollEvent);

    expect(component.loadMore$.next).toHaveBeenCalled();
  });

  it('should not emit loadMore$ event when scroll position is not at the bottom', () => {
    spyOn(component.loadMore$, 'next');

    const hostEl = component['el'].nativeElement;
    const scrollTop = hostEl.scrollTop;
    const scrollHeight = hostEl.scrollHeight;
    hostEl.scrollHeight =
      (scrollTop + scrollHeight) * 2 + LOAD_MORE_PIXELS_OFFSET;

    const scrollEvent = new Event('scroll');

    component['_onScroll'](scrollEvent);

    expect(component.loadMore$.next).not.toHaveBeenCalled();
  });
});
