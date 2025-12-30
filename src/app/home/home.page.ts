import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  ingredientsInput: string = '';
  recipes: any[] = [];

  private apiKey = '70759a4f7911402abcc53d3c51d3b759';

  constructor(private http: HttpClient, private router: Router) {}

  searchRecipes() {
    const query = this.ingredientsInput.trim();
    if (!query) {
      // No ingredients entered; do nothing for now
      return;
    }

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
      query
    )}&apiKey=${this.apiKey}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
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
    // We'll create the actual details page later
    this.router.navigate(['/details', id]);
  }
}

