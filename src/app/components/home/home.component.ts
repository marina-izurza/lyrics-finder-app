import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiGeniusService } from 'src/app/services/api-genius.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  songTitle: string; //guardamos lo que introducimos en input
  searchResults: any[];
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private service: ApiGeniusService) {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        this.searchSong();
      });
  }

  public onSearchChange(event: any) {
    this.searchSubject.next(this.songTitle);
  }

  public searchSong() {
    this.service.getSongLyrics(this.songTitle).subscribe(
      (res: any) => {
        this.searchResults = res.hits;
        this.service.setSearchResults(this.searchResults); // Guardar los resultados en el servicio
      },
      (err: any) => {
        console.error('Error buscando las letras de la canción: ', err);
        this.searchResults = [];
      }
    );
  }
}
