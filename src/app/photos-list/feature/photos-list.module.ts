import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosListRoutingModule } from './photos-list-routing.module';
import { PhotosListComponent } from './photos-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoModule } from '../ui/photo/photo.module';

@NgModule({
  declarations: [PhotosListComponent],
  imports: [
    CommonModule,
    PhotosListRoutingModule,
    MatGridListModule,
    PhotoModule,
  ],
})
export class PhotosListModule {}
