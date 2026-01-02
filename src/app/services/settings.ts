import { Injectable } from '@angular/core';

export type MeasurementUnit = 'metric' | 'us';

const STORAGE_KEY = 'measurementUnit';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private currentUnit: MeasurementUnit = 'metric'; // default

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as MeasurementUnit | null;
      if (stored === 'metric' || stored === 'us') {
        this.currentUnit = stored;
      } else {
        this.currentUnit = 'metric';
      }
    } catch {
      this.currentUnit = 'metric';
    }
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, this.currentUnit);
  }

  getMeasurementUnit(): MeasurementUnit {
    return this.currentUnit;
  }

  setMeasurementUnit(unit: MeasurementUnit) {
    this.currentUnit = unit;
    this.saveToStorage();
  }
}
