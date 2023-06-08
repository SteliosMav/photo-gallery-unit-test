import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGridComponent {
  // The array of photos to display in the grid
  @Input() photos!: Photo[];
  // Indicates whether the grid is currently loading
  @Input() loading: boolean = false;

  // Emits an event when a photo should be added to favorites
  @Output() addPhotoToFavorites: Subject<Photo> = new Subject();
  // Emits an event when a photo should be removed from favorites
  @Output() removePhotoFromFavorites: Subject<Photo> = new Subject();
}
