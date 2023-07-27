import { Component } from '@angular/core';
import { ApiGeniusService } from 'src/app/services/api-genius.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  songTitle: string; //guardamos lo que introducimos en input
  searchResults: any[];

  constructor(private service: ApiGeniusService) {}

  public searchSong() {
    this.service.getSongLyrics(this.songTitle).subscribe(
      (res: any) => {
        this.searchResults = res.hits;
      },
      (err: any) => {
        console.error('Error buscando las letras de la canción: ', err);
        this.searchResults = [];
      }
    );
  }
}
