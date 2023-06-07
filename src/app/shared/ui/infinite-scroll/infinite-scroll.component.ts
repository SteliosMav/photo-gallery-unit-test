import { Component, ElementRef, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';

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
    const offset = 200; // The amount of pixels to emit event before bottom is reached

    if (scrollTop + clientHeight >= scrollHeight - offset) {
      this.loadMore$.next(true);
    }
  }

  constructor(private el: ElementRef) {}
}
