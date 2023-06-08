import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  finalize,
  map,
  of,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';

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
  private _loadedPhotos = new BehaviorSubject([] as Photo[]);
  private _page = 1;
  private _loading = new BehaviorSubject(false);

  loadedPhotos$: Observable<Photo[]> = this._loadedPhotos.asObservable();
  loading$: Observable<boolean> = this._loading.asObservable();
  failedToLoadPhotos$ = new Subject();

  loadMorePhotos() {
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

  initPhotos() {
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

  private _pushLoadedPhotos(photos: Photo[]): void {
    const previousPhotos = this._loadedPhotos.getValue();
    const newValue = [...previousPhotos, ...photos];
    this._loadedPhotos.next(newValue);
  }

  private _getPhotos(page: number) {
    return this.http
      .get<Photo[]>(`https://picsum.photos/v2/list?page=${page}`)
      .pipe(
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
