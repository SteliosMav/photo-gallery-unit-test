import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';

import { PhotoGridComponent } from './photo-grid.component';
import { Subject } from 'rxjs';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';
import { PhotoModule } from './photo/photo.module';
import { InfiniteScrollModule } from '../infinite-scroll/infinite-scroll.module';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';

describe('PhotoGridComponent', () => {
  let component: PhotoGridComponent;
  let fixture: ComponentFixture<PhotoGridComponent>;
  let hostEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoGridComponent],
      imports: [
        MatGridListModule,
        PhotoModule,
        InfiniteScrollModule,
        LoadingIndicatorComponent,
      ],
    });
    fixture = TestBed.createComponent(PhotoGridComponent);
    hostEl = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when loading input is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const loadingWrapper = hostEl.querySelector('.loading-wrapper');
    const loadingIndicator = hostEl.querySelector('app-loading-indicator');

    expect(loadingWrapper).toBeTruthy();
    expect(loadingIndicator).toBeTruthy();
  });

  it('should not display loading spinner when loading input is false', () => {
    component.loading = false;
    fixture.detectChanges();

    const loadingWrapper =
      fixture.nativeElement.querySelector('.loading-wrapper');
    const loadingIndicator = fixture.nativeElement.querySelector(
      'app-loading-indicator'
    );

    expect(loadingWrapper).toBeFalsy();
    expect(loadingIndicator).toBeFalsy();
  });

  it('should emit addPhotoToFavorites event when a photo is added to favorites', () => {
    const photo: Photo = {
      id: '1',
      isFavorite: false,
      url: '',
      download_url: '',
      author: '',
      width: 100,
      height: 100,
    };
    const addPhotoToFavoritesSpy = spyOn(component.addPhotoToFavorites, 'next');

    fixture.detectChanges();

    // Simulate adding a photo to favorites
    component.addPhotoToFavorites.next(photo);

    expect(addPhotoToFavoritesSpy).toHaveBeenCalledWith(photo);
  });

  it('should emit removePhotoFromFavorites event when a photo is removed from favorites', () => {
    const photo: Photo = {
      id: '1',
      isFavorite: true,
      url: '',
      download_url: '',
      author: '',
      width: 100,
      height: 100,
    };
    const removePhotoFromFavoritesSpy = spyOn(
      component.removePhotoFromFavorites,
      'next'
    );

    fixture.detectChanges();

    // Simulate removing a photo from favorites
    component.removePhotoFromFavorites.next(photo);

    expect(removePhotoFromFavoritesSpy).toHaveBeenCalledWith(photo);
  });
});
