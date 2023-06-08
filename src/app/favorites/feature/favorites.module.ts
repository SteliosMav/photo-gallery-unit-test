import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { PhotoGridModule } from 'src/app/shared/ui/photo-grid/photo-grid.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, FavoritesRoutingModule, PhotoGridModule],
})
export class FavoritesModule {}
