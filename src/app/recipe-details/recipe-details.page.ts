import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


// Ionic standalone components
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';

import { FavouritesService } from '../services/favourites.service';

import { SettingsService, MeasurementUnit } from '../services/settings';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
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
  ],
})
export class RecipeDetailsPage {
  recipe: any = null;
  isLoading = true;
  isFavourite = false;
  measurementUnit: MeasurementUnit = 'metric';
  measurementUnitLabel: string = 'Metric';

  private apiKey = '70759a4f7911402abcc53d3c51d3b759';

    constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private favouritesService: FavouritesService,
    private settingsService: SettingsService
  ) {
    this.measurementUnit = this.settingsService.getMeasurementUnit();
    this.measurementUnitLabel =
      this.measurementUnit === 'us' ? 'US' : 'Metric';

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : null;

      if (id) {
        this.loadRecipe(id);
      } else {
        this.isLoading = false;
      }
    });
  }

  private loadRecipe(id: number) {
    this.isLoading = true;

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.recipe = response;
        this.isFavourite = this.favouritesService.isFavourite(this.recipe.id);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading recipe details', error);
        this.recipe = null;
        this.isLoading = false;
      },
    });
  }
  getIngredientAmount(ing: any): number | null {
    if (!ing || !ing.measures) return null;
    const measures = this.measurementUnit === 'us' ? ing.measures.us : ing.measures.metric;
    return measures?.amount ?? null;
  }

  getIngredientUnit(ing: any): string {
    if (!ing || !ing.measures) return '';
    const measures = this.measurementUnit === 'us' ? ing.measures.us : ing.measures.metric;
    return measures?.unitLong ?? '';
  }

  toggleFavourite() {
    if (!this.recipe) {
      return;
    }

    if (this.isFavourite) {
      this.favouritesService.removeFavourite(this.recipe.id);
      this.isFavourite = false;
    } else {
      this.favouritesService.addFavourite(this.recipe);
      this.isFavourite = true;
    }
  }
}
