import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  combineLatest,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';
import {
  Photo,
  PhotosListService,
} from 'src/app/photos-list/data-access/photos-list.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoDetailsService {
  private _loading = new BehaviorSubject(false);

  loading$ = this._loading.asObservable();
  failedToLoadPhoto$: Subject<boolean> = new Subject();

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

  private _getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`https://picsum.photos/id/${id}/info`);
  }
}
