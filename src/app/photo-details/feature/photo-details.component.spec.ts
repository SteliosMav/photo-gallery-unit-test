import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observer, Subscription, of, throwError } from 'rxjs';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoDetailsService } from '../data-access/photo-details.service';
import {
  Photo,
  PhotosListService,
} from 'src/app/photos-list/data-access/photos-list.service';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';
import { LoadingIndicatorComponent } from 'src/app/shared/ui/loading-indicator/loading-indicator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let photoDetailsService: PhotoDetailsService;
  let photosListService: PhotosListService;
  let favoritesService: FavoritesService;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }), // Set the ID parameter for testing
          },
        },
        PhotoDetailsService,
        PhotosListService,
        FavoritesService,
      ],
      imports: [HttpClientTestingModule, LoadingIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;

    photoDetailsService = TestBed.inject(PhotoDetailsService);
    photosListService = TestBed.inject(PhotosListService);
    favoritesService = TestBed.inject(FavoritesService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the photo details', () => {
    const photoDetails: Photo = {
      id: '1',
      author: 'John Doe',
      height: 800,
      width: 600,
      download_url: 'https://example.com/photo.jpg',
      url: 'https://example.com/photo',
      isFavorite: false,
    };
    const findPhotoSpy = spyOn(
      photoDetailsService,
      'findPhoto'
    ).and.returnValue(of(photoDetails));

    component.ngOnInit();

    component.photo$.subscribe((photo) => {
      expect(photo).toEqual(photoDetails);
    });

    expect(findPhotoSpy).toHaveBeenCalledWith('1');
  });

  it('should toggle the favorite state of the photo when already a favorite', () => {
    const photo: Photo = {
      id: '1',
      author: 'John Doe',
      height: 800,
      width: 600,
      download_url: 'https://example.com/photo.jpg',
      url: 'https://example.com/photo',
      isFavorite: true,
    };
    const updateOneSpy = spyOn(photosListService, 'updateOne');
    const removePhotoSpy = spyOn(favoritesService, 'removePhotoFromFavorites');

    component.togglePhotoSFavoriteState(photo);

    expect(updateOneSpy).toHaveBeenCalledWith('1', {
      isFavorite: false,
    });
    expect(removePhotoSpy).toHaveBeenCalledWith(photo);
  });

  it('should toggle the favorite state of the photo when not a favorite', () => {
    const photo: Photo = {
      id: '1',
      author: 'John Doe',
      height: 800,
      width: 600,
      download_url: 'https://example.com/photo.jpg',
      url: 'https://example.com/photo',
      isFavorite: false,
    };
    const updateOneSpy = spyOn(photosListService, 'updateOne');
    const addPhotoSpy = spyOn(favoritesService, 'addPhotoToFavorites');

    component.togglePhotoSFavoriteState(photo);

    expect(updateOneSpy).toHaveBeenCalledWith('1', {
      isFavorite: true,
    });
    expect(addPhotoSpy).toHaveBeenCalledWith(photo);
  });

  it('should handle failed photo loading', () => {
    const alertSpy = spyOn(window, 'alert');
    const failedToLoadPhoto$ = photoDetailsService.failedToLoadPhoto$;

    component.ngOnInit();
    failedToLoadPhoto$.next(true);

    expect(alertSpy).toHaveBeenCalledWith(
      'Could not load more photos. Please try again later'
    );
  });
});
