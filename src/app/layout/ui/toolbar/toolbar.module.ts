import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,

    // Angular Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
