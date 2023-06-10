import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PhotoDetailsService } from '../data-access/photo-details.service';
import {
  Photo,
  PhotosListService,
} from 'src/app/photos-list/data-access/photos-list.service';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailsComponent implements OnInit {
  /** Represents the observable stream of the photo details */
  photo$ = this.route.params.pipe(
    switchMap(({ id }) => this.photoDetailsService.findPhoto(id))
  );

  /**
   * Toggles the favorite state of the photo.
   * @param photo The photo to toggle the favorite state for.
   */
  togglePhotoSFavoriteState(photo: Photo): void {
    if (photo.isFavorite) {
      this.photosListService.updateOne(photo.id, { isFavorite: false });
      this.favoritesService.removePhotoFromFavorites(photo);
    } else {
      this.photosListService.updateOne(photo.id, { isFavorite: true });
      this.favoritesService.addPhotoToFavorites(photo);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private photoDetailsService: PhotoDetailsService,
    private photosListService: PhotosListService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    // Subscribes to the `failedToLoadPhoto$` observable to handle failed photo loading
    this.photoDetailsService.failedToLoadPhoto$
      .pipe(
        takeUntil(this._destroy$),
        tap(() =>
          window.alert('Could not load more photos. Please try again later')
        )
      )
      .subscribe();
  }

  private _destroy$ = new Subject();

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}
