import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent implements AfterViewInit {
  @Input() photo!: Photo; // The photo object to display

  @Output() addToFavorites: Subject<Photo> = new Subject(); // Emits an event when the photo should be added to favorites
  @Output() removeFromFavorites: Subject<Photo> = new Subject(); // Emits an event when the photo should be removed from favorites

  private _hovered = new BehaviorSubject(false);

  hovered$ = this._hovered.asObservable(); // Observable to track the hover state of the photo

  /**
   * Listens to the mouseenter event to indicate that the photo is being hovered.
   */
  @HostListener('mouseenter')
  onHoverIn(): void {
    this._hovered.next(true);
  }

  /**
   * Listens to the mouseleave event to indicate that the photo is no longer being hovered.
   */
  @HostListener('mouseleave')
  onHoverOut(): void {
    this._hovered.next(false);
  }

  /**
   * Listens to the click event and navigates to the photo details page.
   */
  @HostListener('click')
  onClick() {
    const url = '/photos/' + this.photo.id;
    this.router.navigateByUrl(url);
  }

  /**
   * Toggles the favorite state of the photo and emits the corresponding event.
   */
  toggleFavoriteButton() {
    if (this.photo.isFavorite) {
      this.removeFromFavorites.next(this.photo);
    } else {
      this.addToFavorites.next(this.photo);
    }
  }

  constructor(private el: ElementRef, private router: Router) {}

  /**
   * Sets the background image of the photo element after the view has been initialized.
   */
  ngAfterViewInit(): void {
    const hostEl: HTMLElement = this.el.nativeElement;
    const imgUrl = this.photo.download_url;
    hostEl.setAttribute('style', `background-image: url(${imgUrl})`);
  }
}
