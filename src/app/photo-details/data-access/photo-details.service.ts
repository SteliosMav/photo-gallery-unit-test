import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  combineLatest,
  delay,
  finalize,
  of,
  switchMap,
} from 'rxjs';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';
import {
  Photo,
  PhotosListService,
} from 'src/app/photos-list/data-access/photos-list.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoDetailsService {
  /** Represents the loading state of the photo details */
  private _loading = new BehaviorSubject(false);

  /** Observable stream indicating the loading state of the photo details. */
  loading$ = this._loading.asObservable();

  /** Subject for signaling when the photo failed to load. */
  failedToLoadPhoto$: Subject<boolean> = new Subject();

  /**
   * Finds a photo by its ID.
   * @param id The ID of the photo to find.
   * @returns An observable stream of the found photo.
   */
  findPhoto(id: string): Observable<Photo> {
    this._loading.next(true);
    return combineLatest({
      loadedPhotos: this.photosListService.loadedPhotos$,
      favoritePhotos: this.favoritesService.favoritePhotos$,
    }).pipe(
      switchMap(({ loadedPhotos, favoritePhotos }) => {
        const photoFromLoaded = loadedPhotos.find((el) => el.id === id);
        if (photoFromLoaded) return of(photoFromLoaded);
        const photoFromFavorites = favoritePhotos.find((el) => el.id === id);
        if (photoFromFavorites) return of(photoFromFavorites);
        return this._getPhoto(id).pipe(
          catchError((err) => {
            console.log(err);
            this.failedToLoadPhoto$.next(true);
            return of(err);
          }),
          finalize(() => this._loading.next(false))
        );
      }),
      finalize(() => this._loading.next(false))
    );
  }

  constructor(
    private photosListService: PhotosListService,
    private favoritesService: FavoritesService,
    private http: HttpClient
  ) {}

  /**
   * Retrieves the photo details from the API for the given ID.
   * @param id The ID of the photo.
   * @returns An Observable emitting the photo details.
   */
  private _getPhoto(id: string): Observable<Photo> {
    return this.http
      .get<Photo>(`${environment.api}/id/${id}/info`)
      .pipe(delay(environment.requestAdditionalTimeDelay));
  }
}
