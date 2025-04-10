import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GameScore } from '../../features/word/types';

// 임시 점수 데이터
const mockScores: GameScore[] = [
  { score: 100, time: 45, date: '2024-04-09', category: '동물', difficulty: 'easy' },
  { score: 80, time: 50, date: '2024-04-09', category: '음식', difficulty: 'medium' },
  { score: 60, time: 55, date: '2024-04-09', category: '과학', difficulty: 'hard' },
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<GameScore[]>(mockScores);

  return (
    <Container maxWidth="md" className="mt-8">
      <Paper elevation={3} className="p-8">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          점수판
        </Typography>

        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>순위</TableCell>
                <TableCell>점수</TableCell>
                <TableCell>시간</TableCell>
                <TableCell>카테고리</TableCell>
                <TableCell>난이도</TableCell>
                <TableCell>날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{score.score}</TableCell>
                  <TableCell>{score.time}초</TableCell>
                  <TableCell>{score.category}</TableCell>
                  <TableCell>
                    {score.difficulty === 'easy' && '쉬움'}
                    {score.difficulty === 'medium' && '보통'}
                    {score.difficulty === 'hard' && '어려움'}
                  </TableCell>
                  <TableCell>{score.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mt-4 flex justify-center space-x-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/word/home')}
          >
            게임 시작
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/word/home')}
          >
            홈으로
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Leaderboard; 