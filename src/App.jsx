import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TasteTest from './pages/TasteTest';

function App() {
  const [recommendation, setRecommendation] = useState('');

  const recommenPlaces = {
    spicy: '고추 짬뽕',
    sweet: '티라미수',
    savory: '할매순대국',
  };

  const handleRecommend = (taste) => {
    setRecommendation(recommenPlaces[taste]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
              <h1 className="text-3xl font-bold mb-6">오늘 뭐 먹지?</h1>
              <div className="flex gap-4 mb-6">
                <button onClick={() => handleRecommend('spicy')} className="px-4 py-2 bg-red-500 text-white rounded-lg">매운맛</button>
                <button onClick={() => handleRecommend('sweet')} className="px-4 py-2 bg-pink-500 text-white rounded-lg">달달한맛</button>
                <button onClick={() => handleRecommend('savory')} className="px-4 py-2 bg-green-500 text-white rounded-lg">고소한맛</button>
              </div>
              {recommendation && (
                <p className="text-xl">🍽️ 오늘의 추천은 <strong>{recommendation}</strong> 입니다!</p>
              )}
            </div>
          }
        />
        <Route path="/taste-test" element={<TasteTest />} />
      </Routes>
    </Router>
  );
}

export default App;
