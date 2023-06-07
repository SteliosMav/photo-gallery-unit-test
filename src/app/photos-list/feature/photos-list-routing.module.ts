import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosListComponent } from './photos-list.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosListRoutingModule {}
