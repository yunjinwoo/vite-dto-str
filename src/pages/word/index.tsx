import { Routes, Route } from 'react-router-dom';
import WordGameHome from './home';
import Leaderboard from './leaderboard';
import Settings from './settings';
import Help from './help';

const WordGameRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<WordGameHome />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/" element={<WordGameHome />} />
    </Routes>
  );
};

export default WordGameRoutes;