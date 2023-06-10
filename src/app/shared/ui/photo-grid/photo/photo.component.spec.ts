import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PhotoComponent } from './photo.component';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      imports: [MatIconModule, MatButtonModule],
      providers: [RouterTestingModule],
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

  it('should emit addToFavorites event when toggleFavoriteButton is called with a non-favorite photo', () => {
    const addToFavoritesSpy = spyOn(component.addToFavorites, 'next');

    component.toggleFavoriteButton();

    expect(addToFavoritesSpy).toHaveBeenCalledWith(component.photo);
  });

  it('should emit removeFromFavorites event when toggleFavoriteButton is called with a favorite photo', () => {
    component.photo.isFavorite = true;
    const removeFromFavoritesSpy = spyOn(component.removeFromFavorites, 'next');

    component.toggleFavoriteButton();

    expect(removeFromFavoritesSpy).toHaveBeenCalledWith(component.photo);
  });

  it('should navigate to the photo details page when clicked', () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');

    const hostEl = fixture.debugElement.nativeElement;
    hostEl.click();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/photos/1');
  });

  it('should set the background image of the host element after view initialization', () => {
    const hostElement = fixture.nativeElement;

    expect(hostElement.style.backgroundImage).toBe(
      `url("${component.photo.download_url}")`
    );
  });

  it('should update the hover state when mouse enters and leaves the host element', () => {
    let isHovered = false;

    component.hovered$.subscribe((hovered) => {
      isHovered = hovered;
    });

    expect(isHovered).toBe(false);

    const hostElement = fixture.nativeElement;
    hostElement.dispatchEvent(new Event('mouseenter'));

    fixture.detectChanges();
    expect(isHovered).toBe(true);

    hostElement.dispatchEvent(new Event('mouseleave'));

    fixture.detectChanges();
    expect(isHovered).toBe(false);
  });
});
