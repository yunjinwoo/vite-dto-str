export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Word {
  id: string;
  text: string;
  category: string;
  difficulty: Difficulty;
  hint?: string;
}

export interface GameSettings {
  sound: boolean;
  music: boolean;
  difficulty: Difficulty;
  language: string;
}

export interface GameScore {
  score: number;
  time: number;
  date: string;
  category: string;
  difficulty: Difficulty;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  totalPlayTime: number;
  averageScore: number;
  achievements: string[];
  highScores: GameScore[];
} 