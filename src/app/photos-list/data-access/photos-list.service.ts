import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Photo {
  id: string;
  author: string;
  height: number;
  width: number;
  download_url: string;
  url: string;
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

  loadMorePhotos() {
    this._loading.next(true);
    return this._getPhotos(this._page + 1).pipe(
      tap((res) => {
        this._page++;
        this._pushLoadedPhotos(res);
      }),
      finalize(() => this._loading.next(false))
    );
  }

  constructor(private http: HttpClient) {}

  private _pushLoadedPhotos(photos: Photo[]): void {
    const previousPhotos = this._loadedPhotos.getValue();
    const newValue = [...previousPhotos, ...photos];
    this._loadedPhotos.next(newValue);
  }

  private _getPhotos(page: number) {
    return this.http.get<Photo[]>(`https://picsum.photos/v2/list?page=${page}`);
  }
}
