import { Component } from '@angular/core';
import { PhotosListService } from '../data-access/photos-list.service';
import { catchError, filter, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
})
export class PhotosListComponent {
  photos$ = this.photosListService.loadedPhotos$;
  loading$ = this.photosListService.loading$;

  onLoadMore() {
    this.loading$
      .pipe(
        take(1),
        filter((loading) => !loading),
        switchMap(() =>
          this.photosListService.loadMorePhotos().pipe(
            catchError((res) => {
              console.log('Error: ', res);
              window.alert(
                'Could not load more photos. Please try again later'
              );
              return of(res);
            })
          )
        )
      )
      .subscribe();
  }

  ngOnInit() {
    this.photosListService
      .loadMorePhotos()
      .pipe(
        catchError((res) => {
          console.log('Error: ', res);
          window.alert('Could not load more photos. Please try again later');
          return of(res);
        })
      )
      .subscribe();
  }

  constructor(private photosListService: PhotosListService) {}
}
