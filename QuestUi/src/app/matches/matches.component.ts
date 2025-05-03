// matches.component.ts (traditional approach)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchCardComponent } from './match-card/match-card.component';
import { ApiService } from '../Shared/Services/api.service';

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
  selectedFilter: string = 'all';
  filter: 'ALL' | 'LIVE' | 'REPLAY' = 'ALL';
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getMatches().subscribe(matches => {
      this.matches = matches;
      this.applyFilter('all');
    });
  }

  applyFilter(filter: string) {
    this.selectedFilter = filter;
    this.filteredMatches = filter === 'all'
      ? this.matches
      : this.matches.filter(m => m.status === filter);
  }

  addToPlaylist(matchId: number) {
    this.apiService.addToPlaylist(matchId).subscribe();
  }

  setFilter(f: 'ALL' | 'LIVE' | 'REPLAY') {
    this.filter = f;
    this.ngOnInit();
  }
}