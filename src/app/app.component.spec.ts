import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PhotosListService } from './photos-list/data-access/photos-list.service';
import { FavoritesService } from './favorites/data-access/favorites.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let photosListService: PhotosListService;
  let favoritesService: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [PhotosListService, FavoritesService],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    photosListService = TestBed.inject(PhotosListService);
    favoritesService = TestBed.inject(FavoritesService);

    spyOn(photosListService, 'initPhotos').and.returnValue(of([]));
    spyOn(favoritesService, 'initFavoritePhotos');

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the photos list on ngOnInit', () => {
    expect(photosListService.initPhotos).toHaveBeenCalled();
  });

  it('should initialize the favorite photos on ngOnInit', () => {
    expect(favoritesService.initFavoritePhotos).toHaveBeenCalled();
  });
});
