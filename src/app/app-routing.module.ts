import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { E404Component } from './e404/e404.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'characters', loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule)},
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)},
  { path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)},
  { path: '**', component: E404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
