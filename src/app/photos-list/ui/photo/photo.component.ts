import { Component, Input } from '@angular/core';
import { Photo } from '../../data-access/photos-list.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  @Input() photo!: Photo;
}
