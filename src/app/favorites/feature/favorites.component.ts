import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../data-access/favorites.service';
import {
  Photo,
  PhotosListService,
} from 'src/app/photos-list/data-access/photos-list.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  photos$ = this.favoritesService.favoritePhotos$;

  removePhotoFromFavorites(photo: Photo) {
    this.photosListService.updateOne(photo.id, { isFavorite: false });
    this.favoritesService.removePhotoFromFavorites(photo);
  }

  ngOnInit() {}

  constructor(
    private favoritesService: FavoritesService,
    private photosListService: PhotosListService
  ) {}
}
