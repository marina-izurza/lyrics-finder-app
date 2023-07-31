import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGeniusService } from 'src/app/services/api-genius.service';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss'],
})
export class LyricsComponent implements OnInit {
  songId: number | null = null; //var para el id de la canción
  songDetails: any; //var para la info de la canción

  constructor(
    private route: ActivatedRoute,
    private service: ApiGeniusService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.songId = +id; // Obtenemos el ID de la canción desde la URL
        this.getSongDetails();
      }
    });
  }

  public getSongDetails() {
    if (this.songId !== null) {
      this.service.getSongDetails(this.songId).subscribe(
        (res: any) => {
          this.songDetails = res;
          console.log('Detalles de la canción: ', this.songDetails);
          // Eliminar los enlaces de la propiedad songDetails.lyrics.lyrics.body.html
          this.removeLinksFromLyrics();
        },
        (err: any) => {
          console.error('Error obteniendo detalles de la canción: ', err);
        }
      );
    }
  }

  public removeLinksFromLyrics() {
    let lyrics = this.songDetails.lyrics.lyrics.body.html;
    if (this.songDetails.lyrics.lyrics.body.html) {
      const lyricsWithoutLinks =
        this.songDetails.lyrics.lyrics.body.html.replace(/<a[^>]*>|<\/a>/g, ''); // Elimina las etiquetas <a> y </a>
      this.songDetails.lyrics.lyrics.body.html = lyricsWithoutLinks;
    }
  }
}
