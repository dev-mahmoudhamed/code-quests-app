import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Match } from '../../Models/match';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../Shared/Services/api.service';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css'
})
export class MatchCardComponent {
  private datePipe = inject(DatePipe);
  private apiService = inject(ApiService);
  isAdded = false;
  @Input() isPlaylistPage = false;
  @Input() match!: Match;
  @Output() removeMatchEvent = new EventEmitter();

  playlist: Match[] = [];

  getRelativeDate(): string {
    const matchDate = new Date(this.match.date);
    const today = new Date();

    return matchDate.toDateString() === today.toDateString()
      ? 'Today'
      : this.datePipe.transform(this.match.date, 'mediumDate') || '';
  }

  addToPlaylist(id?: number) {
    this.isAdded = !this.isAdded;
    this.apiService.addToPlaylist(id!).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Error adding to playlist', err);
        this.isAdded = !this.isAdded;
      }
    });
  }

  removeFromPlaylist(id?: number) {
    this.apiService.removeFromPlaylist(id!).subscribe({
      next: () => {
        this.removeMatchEvent.emit();
      },
      error: (err) => {
        console.error('Error removing from playlist', err);
      }
    });
  }

}