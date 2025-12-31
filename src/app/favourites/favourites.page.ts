import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonThumbnail,
} from '@ionic/angular/standalone';

import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonThumbnail,
  ],
})
export class FavouritesPage {
  favourites: any[] = [];

  constructor(
    private favouritesService: FavouritesService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.favourites = this.favouritesService.getFavourites();
  }

  openDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  remove(id: number) {
    this.favouritesService.removeFavourite(id);
    this.favourites = this.favouritesService.getFavourites();
  }
}
