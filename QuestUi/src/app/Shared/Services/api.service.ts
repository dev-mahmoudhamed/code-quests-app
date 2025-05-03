import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../../Models/match';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getMatches(matchStatus: number, filter?: string) {
    let url = `${environment.apiUrl}/Matches?status=${matchStatus}`;
    if (filter) {
      url += `&filter=${filter}`;
    }
    return this.http.get<Match[]>(url);
  }

  addToPlaylist(matchId: number) {
    return this.http.post(`${environment.apiUrl}/Playlist/${matchId}`, {});
  }

  getPlaylist() {
    return this.http.get<Match[]>(`${environment.apiUrl}/playlist`);
  }

  removeFromPlaylist(matchId: number) {
    return this.http.delete(`${environment.apiUrl}/Playlist/${matchId}`, {});
  }

  GetMyPlayListIds() {
    return this.http.get<number[]>(`${environment.apiUrl}/myListIds`);
  }

}