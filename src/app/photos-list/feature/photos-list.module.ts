import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosListRoutingModule } from './photos-list-routing.module';
import { PhotosListComponent } from './photos-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoModule } from '../ui/photo/photo.module';
import { InfiniteScrollModule } from '../../shared/ui/infinite-scroll/infinite-scroll.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PhotosListComponent],
  imports: [
    CommonModule,
    PhotosListRoutingModule,
    MatGridListModule,
    PhotoModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ],
})
export class PhotosListModule {}
