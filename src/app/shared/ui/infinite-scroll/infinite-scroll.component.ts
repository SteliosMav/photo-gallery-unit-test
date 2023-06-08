import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { LOAD_MORE_PIXELS_OFFSET } from 'src/environments/constants';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent {
  // Emits an event when the scroll position (almost) reaches the bottom.
  @Output() loadMore$ = new Subject();

  /**
   * Handles the scroll event and emits `loadMore$` when the scroll position reaches the bottom.
   * @param event - The scroll event object.
   */
  @HostListener('scroll', ['$event'])
  private _onScroll(event: Event): void {
    const hostEl = this.el.nativeElement;

    const scrollTop = hostEl.scrollTop;
    const scrollHeight = hostEl.scrollHeight;
    const clientHeight = hostEl.clientHeight;
    const offset = LOAD_MORE_PIXELS_OFFSET;

    // Check if the scroll position is close to the bottom
    if (scrollTop + clientHeight >= scrollHeight - offset) {
      this.loadMore$.next(true);
    }
  }

  constructor(private el: ElementRef) {}
}
