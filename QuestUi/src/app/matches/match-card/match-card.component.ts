import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Match, MatchStatus } from '../../Models/match';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../Shared/Services/api.service';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);

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
      next: (res) => {
        this.toastr.success('Match added to playlist!', 'Success', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true,
        });
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
        this.toastr.success('Match removed from playlist!', 'Success', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true,
        });
      },
      error: (err) => {
        console.error('Error removing from playlist', err);
      }
    });
  }

  watchMatch() {
    // we can pass url to the function in production environment
    var url = "https://youtu.be/keEVy7a1PpI?si=SWOroS5KBANp0YJi";
    window.open(url, '_blank');
  }

  getStatusText(status: number): string {
    switch (status) {
      case MatchStatus.Live:
        return MatchStatus[MatchStatus.Live];
      case MatchStatus.Replay:
        return MatchStatus[MatchStatus.Replay];
      default:
        return 'UNKNOWN';
    }
  }

}