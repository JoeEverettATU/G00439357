import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
} from '@ionic/angular/standalone';

import { MeasurementUnit, SettingsService } from '../services/settings';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
  ],
})
export class SettingsPage {
  selectedUnit: MeasurementUnit = 'metric';

  constructor(private settingsService: SettingsService) {}

  ionViewWillEnter() {
    // Load current setting whenever the page becomes active
    this.selectedUnit = this.settingsService.getMeasurementUnit();
  }

  onUnitChange(event: any) {
    const value = event.detail.value as MeasurementUnit;
    this.settingsService.setMeasurementUnit(value);
  }
}
