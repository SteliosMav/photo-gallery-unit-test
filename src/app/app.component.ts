import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavoritesService } from './favorites/data-access/favorites.service';
import { PhotosListService } from './photos-list/data-access/photos-list.service';

/**
 * The root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  /**
   * Constructs the AppComponent.
   * @param  photosListService - The service for managing the photos list.
   * @param  favoritesService - The service for managing the favorites.
   */
  constructor(
    private photosListService: PhotosListService,
    private favoritesService: FavoritesService
  ) {}

  /**
   * Initializes the photos list and favorite photos.
   */
  ngOnInit(): void {
    this.photosListService.initPhotos().subscribe();
    this.favoritesService.initFavoritePhotos();
  }
}
