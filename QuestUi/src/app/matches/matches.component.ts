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
  filter: MatchStatus = MatchStatus.All;

  private apiService = inject(ApiService);

  ngOnInit() {
    this.apiService.getMatches(this.filter).subscribe(matches => {
      this.matches = matches;
      this.applyFilter(this.filter);
    });
  }

  applyFilter(filter: MatchStatus) {
    this.filter = filter;
    this.filteredMatches = filter === MatchStatus.All
      ? this.matches
      : this.matches.filter(m => m.status === filter);
  }

  addToPlaylist(matchId: number) {
    this.apiService.addToPlaylist(matchId).subscribe();
  }

  setFilter(f: MatchStatus) {
    this.filter = f;
    this.ngOnInit();
  }
}