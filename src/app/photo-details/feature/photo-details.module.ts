import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoDetailsRoutingModule } from './photo-details-routing.module';
import { PhotoDetailsComponent } from './photo-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingIndicatorComponent } from 'src/app/shared/ui/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [PhotoDetailsComponent],
  imports: [
    CommonModule,
    PhotoDetailsRoutingModule,
    LoadingIndicatorComponent,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [PhotoDetailsComponent],
})
export class PhotoDetailsModule {}
