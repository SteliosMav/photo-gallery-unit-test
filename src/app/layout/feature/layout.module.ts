import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { ToolbarModule } from '../ui/toolbar/toolbar.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule, ToolbarModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
