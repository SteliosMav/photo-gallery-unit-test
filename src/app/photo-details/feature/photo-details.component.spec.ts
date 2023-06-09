import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailsComponent } from './photo-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingIndicatorComponent } from 'src/app/shared/ui/loading-indicator/loading-indicator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LoadingIndicatorComponent,
      ],
    });
    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
