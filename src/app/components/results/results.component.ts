import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGeniusService } from 'src/app/services/api-genius.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  @Input() searchResults: any[];

  constructor(private router: Router, private service: ApiGeniusService) {}

  ngOnInit(): void {
    this.searchResults = this.service.getSearchResults();
  }

  public viewLyrics(songId: number) {
    this.router.navigate(['/lyrics', songId]);
  }
}
