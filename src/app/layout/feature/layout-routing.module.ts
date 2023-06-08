import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../photos-list/feature/photos-list.module').then(
            (m) => m.PhotosListModule
          ),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../../favorites/feature/favorites.module').then(
            (m) => m.FavoritesModule
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
