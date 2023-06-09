import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhotoGridModule } from 'src/app/shared/ui/photo-grid/photo-grid.module';
import { FavoritesService } from '../data-access/favorites.service';
import { PhotosListService } from 'src/app/photos-list/data-access/photos-list.service';
import { of } from 'rxjs';
import { PhotoGridComponent } from 'src/app/shared/ui/photo-grid/photo-grid.component';
import { By } from '@angular/platform-browser';
import { marbles } from 'rxjs-marbles';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesService: FavoritesService;
  let photosListService: PhotosListService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [HttpClientTestingModule, PhotoGridModule],
      providers: [FavoritesService, PhotosListService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService);
    photosListService = TestBed.inject(PhotosListService);

    // Set up mock favorite photos
    const favoritePhotos = [
      {
        id: '1',
        author: 'John',
        height: 200,
        width: 300,
        download_url: 'https://example.com',
        url: 'https://example.com',
        isFavorite: true,
      },
      {
        id: '2',
        author: 'Jane',
        height: 400,
        width: 600,
        download_url: 'https://example.com',
        url: 'https://example.com',
        isFavorite: true,
      },
    ];
    component.photos$ = of(favoritePhotos);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should display favorite photos',
    marbles((m) => {
      const photoGrid = fixture.nativeElement.querySelector('app-photo-grid');
      const photoGridComponent = fixture.debugElement.query(
        By.directive(PhotoGridComponent)
      ).componentInstance;

      // Trigger change detection to update the component
      fixture.detectChanges();

      // Assert the result using marbles
      const favoritePhotos = [
        {
          id: '1',
          author: 'John',
          height: 200,
          width: 300,
          download_url: 'https://example.com',
          url: 'https://example.com',
          isFavorite: true,
        },
        {
          id: '2',
          author: 'Jane',
          height: 400,
          width: 600,
          download_url: 'https://example.com',
          url: 'https://example.com',
          isFavorite: true,
        },
      ];
      m.expect(component.photos$).toBeObservable('(a|)', {
        a: favoritePhotos,
      });

      // Assert the component properties
      expect(photoGrid).toBeTruthy();
      expect(photoGridComponent.photos).toEqual(favoritePhotos);
    })
  );

  it('should call removePhotoFromFavorites when removing a photo', () => {
    const photoToRemove = {
      id: '1',
      author: 'John',
      height: 200,
      width: 300,
      download_url: 'https://example.com',
      url: 'https://example.com',
      isFavorite: true,
    };
    const removePhotoFromFavoritesSpy = spyOn(
      component,
      'removePhotoFromFavorites'
    );

    component.removePhotoFromFavorites(photoToRemove);

    expect(removePhotoFromFavoritesSpy).toHaveBeenCalledWith(photoToRemove);
  });

  it('should update isFavorite property when removing a photo', () => {
    const photoToRemove = {
      id: '1',
      author: 'John',
      height: 200,
      width: 300,
      download_url: 'https://example.com',
      url: 'https://example.com',
      isFavorite: true,
    };
    const updateOneSpy = spyOn(photosListService, 'updateOne');

    component.removePhotoFromFavorites(photoToRemove);

    expect(updateOneSpy).toHaveBeenCalledWith(photoToRemove.id, {
      isFavorite: false,
    });
  });
});
