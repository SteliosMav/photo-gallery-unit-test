import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosListRoutingModule } from './photos-list-routing.module';
import { PhotosListComponent } from './photos-list.component';
import { InfiniteScrollModule } from '../../shared/ui/infinite-scroll/infinite-scroll.module';
import { PhotoGridModule } from 'src/app/shared/ui/photo-grid/photo-grid.module';

@NgModule({
  declarations: [PhotosListComponent],
  imports: [
    CommonModule,
    PhotosListRoutingModule,

    PhotoGridModule,
    InfiniteScrollModule,
  ],
})
export class PhotosListModule {}
