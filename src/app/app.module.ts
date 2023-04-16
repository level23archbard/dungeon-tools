import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageModule } from '@level23archbard/storage-service';

import { IconsModule } from 'src/icons/icons.module';

import { AboutComponent } from './about/about.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppVersionService } from './app-version.service';
import { AppComponent } from './app.component';
import { DiceComponent } from './dice/dice.component';
import { E404Component } from './e404/e404.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    IconsModule,
    MatDialogModule,
    ReactiveFormsModule,
    StorageModule,
  ],
  declarations: [
    AboutComponent,
    AppComponent,
    AppHeaderComponent,
    DiceComponent,
    E404Component,
    HomeComponent,
    SettingsComponent,
    WelcomeComponent,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        closeOnNavigation: true,
        disableClose: true,
        hasBackdrop: true,
        panelClass: 'lxs-dialog-card',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(appVersion: AppVersionService) {
    appVersion.updateVersion();
  }
}
