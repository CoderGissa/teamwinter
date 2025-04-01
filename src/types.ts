export interface Player {
  id: string;
  accountName: string;
  townhallLevel: number;
  previousLeague: string;
  previousStars: number;
  previousPercentage: number;
  comments?: string;
  confirmed: boolean;
  createdAt: string;
}

export interface Clan {
  id: string;
  name: string;
  tag: string;
  level: number;
  players: Player[];
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
}