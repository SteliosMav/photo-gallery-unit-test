import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoGridComponent } from './photo-grid.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoModule } from './photo/photo.module';
import { InfiniteScrollModule } from '../infinite-scroll/infinite-scroll.module';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';

@NgModule({
  declarations: [PhotoGridComponent],
  imports: [
    CommonModule,

    MatGridListModule,
    PhotoModule,
    InfiniteScrollModule,
    LoadingIndicatorModule,
  ],
  exports: [PhotoGridComponent],
})
export class PhotoGridModule {}
