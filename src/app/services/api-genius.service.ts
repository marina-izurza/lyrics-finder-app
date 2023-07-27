import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiGeniusService {
  apiUrl = 'https://genius-song-lyrics1.p.rapidapi.com';
  apiKey = 'b1001027bdmsh8ce4c05f5e05fd8p1302d2jsn21a09e2663a4';

  constructor(private http: HttpClient) {}

  public getSongLyrics(title: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
    });

    const params = new HttpParams()
      .set('q', title)
      .set('per_page', '10')
      .set('page', '1');

    return this.http.get<any>(`${this.apiUrl}/search/`, { headers, params });
  }
}
