import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PhotoDetailsService } from '../data-access/photo-details.service';
import {
  Photo,
  PhotosListService,
} from 'src/app/photos-list/data-access/photos-list.service';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
})
export class PhotoDetailsComponent implements OnInit {
  photo$ = this.route.params.pipe(
    switchMap(({ id }) => this.photoDetailsService.findPhoto(id))
  );

  togglePhotoSFavoriteState(photo: Photo) {
    if (photo.isFavorite) {
      this.photosListService.updateOne(photo.id, { isFavorite: false });
      this.favoritesService.removePhotoFromFavorites(photo);
    } else {
      this.photosListService.updateOne(photo.id, { isFavorite: true });
      this.favoritesService.addPhotoToFavorites(photo);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private photoDetailsService: PhotoDetailsService,
    private photosListService: PhotosListService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.photoDetailsService.failedToLoadPhoto$
      .pipe(
        tap(() =>
          window.alert('Could not load more photos. Please try again later')
        )
      )
      .subscribe();
  }
}
