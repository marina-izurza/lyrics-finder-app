import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LyricsComponent } from './components/lyrics/lyrics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lyrics/:id', component: LyricsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
