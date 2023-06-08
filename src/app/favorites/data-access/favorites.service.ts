import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';
import { FAVORITE_PHOTOS_STORAGE_KEY } from 'src/environments/constants';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  /** BehaviorSubject that holds the favorite photos. */
  private _favoritePhotos = new BehaviorSubject<Photo[]>([]);

  /** Observable that emits the favorite photos. */
  favoritePhotos$ = this._favoritePhotos.asObservable();

  /** Initializes the favorite photos from local storage. */
  initFavoritePhotos(): void {
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

  /**
   * Adds a photo to the favorite photos.
   * @param photo The photo to add.
   */
  addPhotoToFavorites(photo: Photo): void {
    const favoritePhoto: Photo = { ...photo, isFavorite: true };
    const previousPhotos: Photo[] = this._favoritePhotos.getValue();
    const newValue: Photo[] = [...previousPhotos, favoritePhoto];
    this._setStorage(newValue);
    this._favoritePhotos.next(newValue);
  }

  /**
   * Removes a photo from the favorite photos.
   * @param photo The photo to remove.
   */
  removePhotoFromFavorites(photo: Photo): void {
    const previousPhotos: Photo[] = this._favoritePhotos.getValue();
    const newValue: Photo[] = previousPhotos.filter((el) => el.id !== photo.id);
    this._setStorage(newValue);
    this._favoritePhotos.next(newValue);
  }

  /**
   * Finds a photo by ID in the favorite photos.
   * @param id The ID of the photo to find.
   * @returns The found photo, or undefined if not found.
   */
  findOne(id: string): Photo | undefined {
    return this._favoritePhotos.getValue().find((photo) => photo.id === id);
  }

  constructor() {}

  /**
   * Sets the favorite photos in the local storage.
   * @param photos The array of favorite photos to store.
   */
  private _setStorage(photos: Photo[]): void {
    localStorage.setItem(FAVORITE_PHOTOS_STORAGE_KEY, JSON.stringify(photos));
  }
}
