export interface Match {
  matchId: number;
  title: string;
  competition: string;
  date: string;
  status: MatchStatus;

}


export enum MatchStatus {
  All = 0,
  Live = 1,
  Replay = 2,
}
