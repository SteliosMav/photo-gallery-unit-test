import { Component, ElementRef, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LOAD_MORE_PIXELS_OFFSET } from 'src/environments/constants';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent {
  @Output() loadMore$ = new Subject();

  @HostListener('scroll', ['$event'])
  private _onScroll(event: Event): void {
    const hostEl = this.el.nativeElement;

    const scrollTop = hostEl.scrollTop;
    const scrollHeight = hostEl.scrollHeight;
    const clientHeight = hostEl.clientHeight;
    const offset = LOAD_MORE_PIXELS_OFFSET;

    if (scrollTop + clientHeight >= scrollHeight - offset) {
      this.loadMore$.next(true);
    }
  }

  constructor(private el: ElementRef) {}
}
