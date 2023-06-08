import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './photo.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PhotoComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [PhotoComponent],
})
export class PhotoModule {}
