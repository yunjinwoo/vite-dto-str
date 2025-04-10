export interface Word {
  id: string;
  english: string;
  korean: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const words: Word[] = [
  { id: '1', english: 'apple', korean: '사과', category: 'food', difficulty: 'easy' },
  { id: '2', english: 'banana', korean: '바나나', category: 'food', difficulty: 'easy' },
  { id: '3', english: 'orange', korean: '오렌지', category: 'food', difficulty: 'easy' },
  { id: '4', english: 'computer', korean: '컴퓨터', category: 'technology', difficulty: 'easy' },
  { id: '5', english: 'phone', korean: '전화기', category: 'technology', difficulty: 'easy' },
  { id: '6', english: 'book', korean: '책', category: 'education', difficulty: 'easy' },
  { id: '7', english: 'pen', korean: '펜', category: 'education', difficulty: 'easy' },
  { id: '8', english: 'dog', korean: '개', category: 'animal', difficulty: 'easy' },
  { id: '9', english: 'cat', korean: '고양이', category: 'animal', difficulty: 'easy' },
  { id: '10', english: 'house', korean: '집', category: 'place', difficulty: 'easy' },
  { id: '11', english: 'car', korean: '자동차', category: 'transportation', difficulty: 'easy' },
  { id: '12', english: 'tree', korean: '나무', category: 'nature', difficulty: 'easy' },
  { id: '13', english: 'sun', korean: '태양', category: 'nature', difficulty: 'easy' },
  { id: '14', english: 'moon', korean: '달', category: 'nature', difficulty: 'easy' },
  { id: '15', english: 'water', korean: '물', category: 'nature', difficulty: 'easy' },
  { id: '16', english: 'fire', korean: '불', category: 'nature', difficulty: 'easy' },
  { id: '17', english: 'air', korean: '공기', category: 'nature', difficulty: 'easy' },
  { id: '18', english: 'earth', korean: '지구', category: 'nature', difficulty: 'easy' },
  { id: '19', english: 'star', korean: '별', category: 'nature', difficulty: 'easy' },
  { id: '20', english: 'cloud', korean: '구름', category: 'nature', difficulty: 'easy' },
  { id: '21', english: 'rain', korean: '비', category: 'nature', difficulty: 'easy' },
  { id: '22', english: 'snow', korean: '눈', category: 'nature', difficulty: 'easy' },
  { id: '23', english: 'wind', korean: '바람', category: 'nature', difficulty: 'easy' },
  { id: '24', english: 'flower', korean: '꽃', category: 'nature', difficulty: 'easy' },
  { id: '25', english: 'grass', korean: '풀', category: 'nature', difficulty: 'easy' },
  { id: '26', english: 'mountain', korean: '산', category: 'nature', difficulty: 'medium' },
  { id: '27', english: 'river', korean: '강', category: 'nature', difficulty: 'medium' },
  { id: '28', english: 'ocean', korean: '바다', category: 'nature', difficulty: 'medium' },
  { id: '29', english: 'desert', korean: '사막', category: 'nature', difficulty: 'medium' },
  { id: '30', english: 'forest', korean: '숲', category: 'nature', difficulty: 'medium' },
]; 