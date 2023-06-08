import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss'],
})
export class PhotoGridComponent {
  @Input() photos!: Photo[];
  @Input() loading: boolean = false;

  @Output() addPhotoToFavorites: Subject<Photo> = new Subject();
  @Output() removePhotoFromFavorites: Subject<Photo> = new Subject();
}
