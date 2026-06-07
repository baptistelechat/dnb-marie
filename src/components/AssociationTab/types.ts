export interface AssociationPair {
  countryCode: string;
  country: string;
  capital: string;
}

export interface AssociationLeaderboardEntry {
  name: string;
  firstTryScore: number;
  totalCountries: number;
  totalTimeSeconds: number;
  date: string;
}

export interface AssociationBoardState {
  pool: AssociationPair[];
  display: AssociationPair[];
  leftOrder: string[];
  rightOrder: string[];
}
