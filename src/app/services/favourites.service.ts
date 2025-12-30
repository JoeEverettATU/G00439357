import { Injectable } from '@angular/core';

const STORAGE_KEY = 'favouriteRecipes';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favourites: any[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      this.favourites = data ? JSON.parse(data) : [];
    } catch {
      this.favourites = [];
    }
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favourites));
  }

  getFavourites(): any[] {
    return [...this.favourites];
  }

  isFavourite(id: number): boolean {
    return this.favourites.some((f) => f.id === id);
  }

  addFavourite(recipe: any) {
    if (!this.isFavourite(recipe.id)) {
      this.favourites.push(recipe);
      this.saveToStorage();
    }
  }

  removeFavourite(id: number) {
    this.favourites = this.favourites.filter((f) => f.id !== id);
    this.saveToStorage();
  }
}
