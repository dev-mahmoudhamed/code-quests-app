// playlist.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Shared/Services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent implements OnInit {
  playlist: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getPlaylist().subscribe(playlist => {
      this.playlist = playlist;
    });
  }

  removeFromPlaylist(matchId: number) {
    this.apiService.removeFromPlaylist(matchId).subscribe(() => {
      this.playlist = this.playlist.filter(m => m.id !== matchId);
    });
  }
}