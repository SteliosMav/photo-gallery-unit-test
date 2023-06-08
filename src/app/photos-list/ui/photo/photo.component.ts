import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Photo } from '../../data-access/photos-list.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements AfterViewInit {
  @Input() photo!: Photo;

  @Output() addToFavorites: Subject<Photo> = new Subject();
  @Output() removeFromFavorites: Subject<Photo> = new Subject();

  private _hovered = new BehaviorSubject(false);

  hovered$ = this._hovered.asObservable();

  @HostListener('mouseenter')
  onHoverIn(): void {
    this._hovered.next(true);
  }
  @HostListener('mouseleave')
  onHoverOut(): void {
    this._hovered.next(false);
  }

  @HostListener('click') onClick() {
    const url = '/photos/' + this.photo.id;
    this.router.navigateByUrl(url);
  }

  toggleFavoriteButton() {
    if (this.photo.isFavorite) {
      this.removeFromFavorites.next(this.photo);
    } else {
      this.addToFavorites.next(this.photo);
    }
  }

  constructor(private el: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    const hostEl: HTMLElement = this.el.nativeElement;
    const imgUrl = this.photo.download_url;
    hostEl.setAttribute('style', `background-image: url(${imgUrl})`);
  }
}
