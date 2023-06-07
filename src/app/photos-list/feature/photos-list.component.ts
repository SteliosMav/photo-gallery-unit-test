import { Component } from '@angular/core';
import { PhotosListService } from '../data-access/photos-list.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
})
export class PhotosListComponent {
  photos$ = this.photosListService.photos$;

  constructor(private photosListService: PhotosListService) {}
}
