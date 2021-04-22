import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiceComponent } from './dice/dice.component';
import { E404Component } from './e404/e404.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, DiceComponent, HomeComponent, E404Component, AboutComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: 'LXS_WINDOW', useFactory: () => window },
    { provide: 'LXS_LOCAL_STORAGE', useFactory: () => localStorage },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
