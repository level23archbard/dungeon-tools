import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
// import { CharactersComponent } from './characters/characters.component';
import { E404Component } from './e404/e404.component';
import { HomeComponent } from './home/home.component';
// import { MapsComponent } from './maps/maps.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'characters', component: CharactersComponent },
  // { path: 'maps', component: MapsComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/:id', component: NotesComponent },
  { path: '**', component: E404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
