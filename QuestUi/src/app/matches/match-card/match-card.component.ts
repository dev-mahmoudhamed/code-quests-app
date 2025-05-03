import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match } from '../../Models/match';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css'
})
export class MatchCardComponent {
  @Input() match!: Match;
  @Output() add = new EventEmitter<void>();
}
