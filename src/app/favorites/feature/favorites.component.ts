import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavoritesService } from '../data-access/favorites.service';
import {
  Photo,
  PhotosListService,
} from 'src/app/photos-list/data-access/photos-list.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  /** Observable stream of favorite photos. */
  photos$ = this.favoritesService.favoritePhotos$;

  /**
   * Removes a photo from favorites.
   * @param photo The photo to remove from favorites.
   */
  removePhotoFromFavorites(photo: Photo): void {
    this.photosListService.updateOne(photo.id, { isFavorite: false });
    this.favoritesService.removePhotoFromFavorites(photo);
  }

  constructor(
    private favoritesService: FavoritesService,
    private photosListService: PhotosListService
  ) {}
}
