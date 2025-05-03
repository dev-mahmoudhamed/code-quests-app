import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../../Models/match';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getMatches() {
    return this.http.get<Match[]>(`${environment.apiUrl}/matches`);
  }

  addToPlaylist(matchId: number) {
    return this.http.get<Match[]>(`${environment.apiUrl}/matches`);
  }

  getPlaylist() {
    return this.http.get<Match[]>(`${environment.apiUrl}/matches`);
  }
  removeFromPlaylist(matchId: number) {
    return this.http.get<Match[]>(`${environment.apiUrl}/matches`);
  }

}