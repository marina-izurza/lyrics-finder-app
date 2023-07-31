import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  @Input() searchResults: any[];

  constructor(private router: Router) {}

  public viewLyrics(songId: number) {
    this.router.navigate(['/lyrics', songId]);
  }
}
