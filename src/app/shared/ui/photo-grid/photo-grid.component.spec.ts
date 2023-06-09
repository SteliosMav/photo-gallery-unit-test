import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGridComponent } from './photo-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';

describe('PhotoGridComponent', () => {
  let component: PhotoGridComponent;
  let fixture: ComponentFixture<PhotoGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoGridComponent],
      imports: [MatGridListModule],
    });
    fixture = TestBed.createComponent(PhotoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
