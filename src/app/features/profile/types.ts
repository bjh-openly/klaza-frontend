import { ID } from '../../types/global';

export interface PointsHistoryItem {
  id: ID;
  date: string;
  description: string;
  delta: number;
}

export interface Preference {
  id: ID;
  label: string;
}

export interface ProfileState {
  points: number;
  pointsHistory: PointsHistoryItem[];
  preferences: Preference[];
  notifications: {
    push: boolean;
    sns: boolean;
  };
}
