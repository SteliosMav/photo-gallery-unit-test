import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosListComponent } from './photos-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfiniteScrollModule } from 'src/app/shared/ui/infinite-scroll/infinite-scroll.module';
import { PhotoGridModule } from 'src/app/shared/ui/photo-grid/photo-grid.module';

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosListComponent],
      imports: [HttpClientTestingModule, InfiniteScrollModule, PhotoGridModule],
    });
    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
