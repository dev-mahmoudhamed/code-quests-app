// playlist.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Shared/Services/api.service';
import { MatchCardComponent } from '../matches/match-card/match-card.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, MatchCardComponent, RouterLink],
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent implements OnInit {
  playlist: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadPlaylist();
  }

  loadPlaylist(): void {
    this.apiService.getPlaylist().subscribe({
      next: (data) => this.playlist = data,
      error: (err) => console.error('Failed to load playlist', err)
    });
  }

}