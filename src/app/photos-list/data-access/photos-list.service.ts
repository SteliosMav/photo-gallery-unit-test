import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  loadedPhotos$: Observable<Photo[]> = this._loadedPhotos.asObservable();

  loadMorePhotos() {
    return this._getPhotos(this._page + 1).pipe(
      tap((res) => {
        console.log('Success: ', res);
        this._page++;
        this._pushLoadedPhotos(res);
      })
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
