import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiGeniusService {
  apiUrl = 'https://genius-song-lyrics1.p.rapidapi.com';
  apiKey = 'b1001027bdmsh8ce4c05f5e05fd8p1302d2jsn21a09e2663a4';

  private searchResults: any[];

  constructor(private http: HttpClient) {}

  public getSongLyrics(title: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
    });

    const params = new HttpParams()
      .set('q', title)
      .set('per_page', '20')
      .set('page', '1');

    return this.http.get<any>(`${this.apiUrl}/search/`, { headers, params });
  }

  public getSongDetails(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
    });

    return this.http.get<any>(`${this.apiUrl}/song/lyrics/`, {
      headers,
      params: { id: id.toString() }, // Convierte el ID en una cadena para pasarlo como parámetro
    }).pipe(
      catchError((error) => {
        console.error('Error obteniendo detalles de la canción: ', error);
        return throwError('Error en la solicitud'); // Puedes personalizar el mensaje de error si lo deseas
      })
    );
  }

  public setSearchResults(results: any[]) {
    this.searchResults = results;
  }

  public getSearchResults() {
    return this.searchResults;
  }
}
