import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Photo, PhotosListService } from '../data-access/photos-list.service';
import { Observable, combineLatest, filter, switchMap, take, tap } from 'rxjs';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';

interface ViewModel {
  photos: Photo[];
  loading: boolean;
}

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosListComponent implements OnInit {
  // Observable to expose the view model
  viewModel$: Observable<ViewModel> = combineLatest({
    photos: this.photosListService.loadedPhotos$,
    loading: this.photosListService.loading$,
  });

  /**
   * Loads more photos when triggered.
   */
  onLoadMore(): void {
    this.viewModel$
      .pipe(
        take(1),
        filter(({ loading }) => !loading),
        switchMap(() => this.photosListService.loadMorePhotos())
      )
      .subscribe();
  }

  /**
   * Adds a photo to favorites.
   * @param photo - The photo to add to favorites.
   */
  addPhotoToFavorites(photo: Photo): void {
    this.photosListService.updateOne(photo.id, { isFavorite: true });
    this.favoritesService.addPhotoToFavorites(photo);
  }

  /**
   * Removes a photo from favorites.
   * @param photo - The photo to remove from favorites.
   */
  removePhotoFromFavorites(photo: Photo): void {
    this.photosListService.updateOne(photo.id, { isFavorite: false });
    this.favoritesService.removePhotoFromFavorites(photo);
  }

  ngOnInit() {
    // Subscribes to the `failedToLoadPhoto$` observable to handle failed photo loading
    this.photosListService.failedToLoadPhotos$
      .pipe(
        tap(() =>
          window.alert('Could not load more photos. Please try again later')
        )
      )
      .subscribe();
  }

  constructor(
    private photosListService: PhotosListService,
    private favoritesService: FavoritesService
  ) {}
}
