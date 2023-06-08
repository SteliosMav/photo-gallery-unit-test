import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoModule } from '../ui/photo/photo.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    MatGridListModule,
    PhotoModule,
    MatProgressSpinnerModule,
  ],
})
export class FavoritesModule {}
