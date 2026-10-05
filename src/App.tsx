import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { LevelPage } from '@/pages/LevelPage';
import { AlgorithmPage } from '@/pages/AlgorithmPage';
import { EventLoopPage } from '@/pages/EventLoopPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="level/:level" element={<LevelPage />} />
          <Route path="algo/:id" element={<AlgorithmPage />} />
          <Route path="event-loop" element={<EventLoopPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
