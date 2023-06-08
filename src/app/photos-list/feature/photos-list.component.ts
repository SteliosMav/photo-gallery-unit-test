import { Component, OnInit } from '@angular/core';
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
})
export class PhotosListComponent implements OnInit {
  viewModel$: Observable<ViewModel> = combineLatest({
    photos: this.photosListService.loadedPhotos$,
    loading: this.photosListService.loading$,
  });

  onLoadMore() {
    this.viewModel$
      .pipe(
        take(1),
        filter(({ loading }) => !loading),
        switchMap(() => this.photosListService.loadMorePhotos())
      )
      .subscribe();
  }

  addPhotoToFavorites(photo: Photo) {
    this.photosListService.updateOne(photo.id, { isFavorite: true });
    this.favoritesService.addPhotoToFavorites(photo);
  }

  removePhotoFromFavorites(photo: Photo) {
    this.photosListService.updateOne(photo.id, { isFavorite: false });
    this.favoritesService.removePhotoFromFavorites(photo);
  }

  ngOnInit() {
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
