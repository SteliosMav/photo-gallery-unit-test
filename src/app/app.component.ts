import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavoritesService } from './favorites/data-access/favorites.service';
import { PhotosListService } from './photos-list/data-access/photos-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private photosListService: PhotosListService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.photosListService.initPhotos().subscribe();
    this.favoritesService.initFavoritePhotos();
  }
}
