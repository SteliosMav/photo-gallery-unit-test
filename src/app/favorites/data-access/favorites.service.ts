import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';
import { FAVORITE_PHOTOS_STORAGE_KEY } from 'src/environments/constants';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _favoritePhotos = new BehaviorSubject([] as Photo[]);

  favoritePhotos$ = this._favoritePhotos.asObservable();

  initFavoritePhotos() {
    const favoritePhotosStorageValue = localStorage.getItem(
      FAVORITE_PHOTOS_STORAGE_KEY
    );
    if (favoritePhotosStorageValue) {
      const favoritePhotos: Photo[] = JSON.parse(favoritePhotosStorageValue);
      this._favoritePhotos.next(favoritePhotos);
    } else {
      this._favoritePhotos.next([]);
    }
  }

  addPhotoToFavorites(photo: Photo) {
    const favoritePhoto = { ...photo, isFavorite: true };
    const previousPhotos = this._favoritePhotos.getValue();
    const newValue: Photo[] = [...previousPhotos, favoritePhoto];
    this._setStorage(newValue);
    this._favoritePhotos.next(newValue);
  }

  removePhotoFromFavorites(photo: Photo) {
    const previousPhotos = this._favoritePhotos.getValue();
    const newValue: Photo[] = previousPhotos.filter((el) => el.id !== photo.id);
    this._setStorage(newValue);
    this._favoritePhotos.next(newValue);
  }

  findOne(id: string) {
    return this._favoritePhotos.getValue().find((photo) => photo.id === id);
  }

  constructor() {}

  private _setStorage(photos: Photo[]) {
    localStorage.setItem(FAVORITE_PHOTOS_STORAGE_KEY, JSON.stringify(photos));
  }
}
