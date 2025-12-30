import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Standalone Ionic components
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonThumbnail,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonThumbnail,
  ],
})
export class HomePage {
  // Two-way bound to the input
  ingredientsInput: string = '';

  // List of recipes returned from API
  recipes: any[] = [];

  // Spoonacular API key
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';

  constructor(private http: HttpClient, private router: Router) {}

  // Called when user clicks "Search"
  searchRecipes() {
    const query = this.ingredientsInput.trim();
    if (!query) {
      // Nothing typed, do nothing for now
      return;
    }

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
      query
    )}&apiKey=${this.apiKey}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        // response.results is an array of recipes
        this.recipes = response.results || [];
        console.log('Recipes:', this.recipes);
      },
      error: (error) => {
        console.error('Error fetching recipes', error);
        this.recipes = [];
      },
    });
  }
  openDetails(id: number) {
  console.log('Navigating to details for recipe id:', id);
  this.router.navigate(['/details', id]);
}

}
