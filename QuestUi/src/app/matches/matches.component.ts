// matches.component.ts (traditional approach)
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchCardComponent } from './match-card/match-card.component';
import { ApiService } from '../Shared/Services/api.service';
import { MatchStatus } from '../Models/match';

@Component({
  standalone: true,
  imports: [
    MatchCardComponent,
    FormsModule,
    CommonModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent implements OnInit {
  matches: any[] = [];
  filteredMatches: any[] = [];
  status: MatchStatus = MatchStatus.All;
  searchTerm: string = '';

  private apiService = inject(ApiService);

  ngOnInit() {
    this.getMatches();

    this.intervalId = setInterval(() => {
      this.getMatches();
    }, 45 * 1000);

  }

  getMatches(filter?: string) {
    this.apiService.getMatches(this.status, filter).subscribe(matches => {
      this.matches = matches;
      this.applyFilter(this.status);
    });
  }

  applyFilter(status: MatchStatus) {
    this.status = status;
    this.filteredMatches = status === MatchStatus.All
      ? this.matches
      : this.matches.filter(m => m.status === status);
  }

  setFilter(s: MatchStatus) {
    this.status = s;
    this.getMatches();
  }


  private intervalId: any;



  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}