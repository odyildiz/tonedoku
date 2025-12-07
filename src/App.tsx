import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import LevelSelection from './pages/LevelSelection';
import PracticePage from './pages/PracticePage';
import { useSettingsStore } from './stores/settingsStore';
import './App.css';

function App() {
  const loadFromStorage = useSettingsStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <BrowserRouter basename="/tonedoku">
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scale/:scaleId" element={<LevelSelection />} />
          <Route path="/scale/:scaleId/level/:levelId" element={<PracticePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
