import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { generateMockPhotosArray } from '../utils/generate-mock-photos-array';

export interface Photo {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhotosListService {
  private _photos = new BehaviorSubject(generateMockPhotosArray());

  photos$: Observable<Photo[]> = this._photos.asObservable();

  constructor() {}
}
