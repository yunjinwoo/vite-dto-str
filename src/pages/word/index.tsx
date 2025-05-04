import { Routes, Route } from "react-router-dom";
import Settings from "./settings";
import Help from "./help";
import WordInfoGame from "./WordInfoGame";
import WordNewGame from "./WordNewGame";
import Layout from "@widgets/Layout";

const WordGameRoutes = () => {
  return (
    <Layout title="Word">
      <Routes>
        <Route index element={<WordNewGame />} />
        <Route path="info" element={<WordInfoGame />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Routes>
    </Layout>
  );
};

export default WordGameRoutes;
