import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { LevelPage } from '@/pages/LevelPage';
import { AlgorithmPage } from '@/pages/AlgorithmPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="level/:level" element={<LevelPage />} />
          <Route path="algo/:id" element={<AlgorithmPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
