import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoComponent } from './photo.component';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoComponent],
    });
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;

    const mockPhoto: Photo = {
      id: '1',
      author: 'John Doe',
      height: 800,
      width: 600,
      download_url: 'https://example.com/photo.jpg',
      url: 'https://example.com',
      isFavorite: false,
    };
    component.photo = mockPhoto;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
