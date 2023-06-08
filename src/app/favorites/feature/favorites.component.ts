import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../data-access/favorites.service';
import { catchError, filter, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  photos$ = this.favoritesService.favoritePhotos$;

  ngOnInit() {}

  constructor(private favoritesService: FavoritesService) {}
}
