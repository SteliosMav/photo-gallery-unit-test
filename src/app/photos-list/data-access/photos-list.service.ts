import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  delay,
  finalize,
  map,
  of,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';
import { environment } from 'src/environments/environment';

export interface Photo {
  id: string;
  author: string;
  height: number;
  width: number;
  download_url: string;
  url: string;
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PhotosListService {
  // The behavior subject to hold the loaded photos
  private _loadedPhotos = new BehaviorSubject([] as Photo[]);
  // The page number of the photos to retrieve from the API
  private _page = 1;
  // The behavior subject to track the loading state
  private _loading = new BehaviorSubject(false);

  // Observables to expose the loaded photos and loading state
  loadedPhotos$: Observable<Photo[]> = this._loadedPhotos.asObservable();
  loading$: Observable<boolean> = this._loading.asObservable();
  // Observable that emits when an error occurs during the loading of photos-list
  failedToLoadPhotos$ = new Subject();

  /**
   * Loads more photos.
   * @returns An observable that emits the loaded photos.
   */
  loadMorePhotos(): Observable<Photo[]> {
    this._loading.next(true);
    return this._getPhotos(this._page + 1).pipe(
      tap((res) => {
        this._page++;
        this._pushLoadedPhotos(res);
      }),
      catchError((res) => {
        console.log('Error: ', res);
        this.failedToLoadPhotos$.next(true);
        return of(res);
      }),
      finalize(() => this._loading.next(false))
    );
  }

  /**
   * Initializes the photos.
   * @returns An observable that emits the loaded photos.
   */
  initPhotos(): Observable<Photo[]> {
    this._loading.next(true);
    return this._getPhotos(this._page).pipe(
      tap((res) => {
        this._pushLoadedPhotos(res);
      }),
      catchError((res) => {
        console.log('Error: ', res);
        this.failedToLoadPhotos$.next(true);
        return of(res);
      }),
      finalize(() => this._loading.next(false))
    );
  }

  /**
   * Updates a photo by ID with new data.
   * @param id - The ID of the photo to update.
   * @param photo - The new data for the photo.
   */
  updateOne(id: string, photo: Partial<Photo>) {
    const previousPhotos = this._loadedPhotos.getValue();
    const newValue = previousPhotos.map((el) => {
      if (el.id === id) return { ...el, ...photo };
      return el;
    });
    this._loadedPhotos.next(newValue);
  }

  constructor(
    private http: HttpClient,
    private favoriteService: FavoritesService
  ) {}

  /**
   * Pushes the loaded photos to the behavior subject.
   * @param photos - The photos to push.
   */
  private _pushLoadedPhotos(photos: Photo[]): void {
    const previousPhotos = this._loadedPhotos.getValue();
    const newValue = [...previousPhotos, ...photos];
    this._loadedPhotos.next(newValue);
  }

  /**
   * Retrieves photos from the API.
   * @param page - The page number of the photos to retrieve.
   * @returns An observable that emits the retrieved photos.
   */
  private _getPhotos(page: number): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${environment.api}/v2/list?page=${page}`)
      .pipe(
        delay(environment.requestAdditionalTimeDelay),
        map((photos) =>
          photos.map((photo) => {
            const isFavorite = this.favoriteService.findOne(photo.id)
              ? true
              : false;
            return { ...photo, isFavorite };
          })
        )
      );
  }
}
