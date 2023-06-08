import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoDetailsRoutingModule } from './photo-details-routing.module';
import { PhotoDetailsComponent } from './photo-details.component';
import { LoadingIndicatorModule } from 'src/app/shared/ui/loading-indicator/loading-indicator.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PhotoDetailsComponent],
  imports: [
    CommonModule,
    PhotoDetailsRoutingModule,
    LoadingIndicatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [PhotoDetailsComponent],
})
export class PhotoDetailsModule {}
