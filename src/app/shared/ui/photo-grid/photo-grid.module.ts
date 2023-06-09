import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoGridComponent } from './photo-grid.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoModule } from './photo/photo.module';
import { InfiniteScrollModule } from '../infinite-scroll/infinite-scroll.module';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [PhotoGridComponent],
  imports: [
    CommonModule,

    MatGridListModule,
    PhotoModule,
    InfiniteScrollModule,
    LoadingIndicatorComponent,
  ],
  exports: [PhotoGridComponent],
})
export class PhotoGridModule {}
