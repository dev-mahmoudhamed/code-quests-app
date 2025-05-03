export interface Match {
  id: number;
  title: string;
  competition: string;
  date: string;
  status: MatchStatus;

}


export enum MatchStatus {
  Live = 1,
  Replay = 2,
}
