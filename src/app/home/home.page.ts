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

  // Innovation 1: Loading indicator state.
// This boolean controls whether the UI should show a spinner while the Spoonacular API call is in progress.
// When true: show <ion-spinner> and hide results.
// When false: show results OR show a "no results" message.
isLoading = false;
//Called when the user clicks Search
searchRecipes() {
  // Trim whitespace so the user can't submit just spaces.
  const query = this.ingredientsInput.trim();
  if (!query) return;

  //Innovation 1: Set loading true BEFORE the HTTP request begins.
  // This gives immediate user feedback that the app is working (prevents "frozen app" feeling).
  this.isLoading = true;

  // Clear existing recipes so the UI doesn't show stale results while loading new ones.
  this.recipes = [];

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
    query
  )}&apiKey=${this.apiKey}`;

  // Angular HttpClient returns an Observable. The request is sent when we subscribe.
  this.http.get<any>(url).subscribe({
    next: (response) => {
      // Spoonacular returns results in response.results
      this.recipes = response.results || [];

      //Innovation 1: Loading finished successfully → hide spinner.
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error fetching recipes', error);

      // Ensure UI is consistent in error case.
      this.recipes = [];

      // ✅ Innovation 1: Loading finished with error → hide spinner.
      this.isLoading = false;
    },
  });
}




goToFavourites() {
  this.router.navigate(['/favourites']);
}

goToSettings() {
  this.router.navigate(['/settings']);
}

  openDetails(id: number) {
  console.log('Navigating to details for recipe id:', id);
  this.router.navigate(['/details', id]);
}

}
