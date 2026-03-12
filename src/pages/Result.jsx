import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTypeDescription } from '../data/mbtiDescriptions';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mbtiType = location.state?.mbtiType;
  const mbtiInfo = getTypeDescription(mbtiType);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '입맛 MBTI 결과',
          text: `🍴 나는 ${mbtiInfo?.title || mbtiType} 타입이래!`,
          url: window.location.href,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('이 브라우저는 공유 기능을 지원하지 않아요 😥');
    }
  };

  const handleRestart = () => navigate('/');

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-2xl mx-auto p-6 text-left">
        <h1 className="text-2xl font-bold mb-2">🍽 입맛 MBTI 결과</h1>
        <p className="text-gray-700 mb-6">당신은 <span className="font-bold text-gray-900">{mbtiInfo?.title || mbtiType}</span> 타입이에요!</p>

        {mbtiInfo && mbtiInfo.title !== '알 수 없는 타입' ? (
          <div className="p-4 sm:p-5 bg-gray-100 border rounded">
            {mbtiInfo.image && (
              <img src={mbtiInfo.image} alt={mbtiType} className="w-32 h-32 object-contain mb-4" />
            )}

            <h2 className="text-xl font-semibold mb-2">{mbtiInfo.title}</h2>
            <p className="text-gray-700 mb-4 whitespace-pre-line leading-relaxed">{mbtiInfo.description}</p>

            <div className="mb-5">
              <h3 className="font-semibold mb-2">🍴 추천 음식 리스트</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                {mbtiInfo.recommendations.map((food, index) => (
                  <li key={index}>• {food}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={handleShare} className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition">결과 공유하기</button>
              <button onClick={handleRestart} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded transition">테스트 다시 하기</button>
            </div>
          </div>
        ) : (
          <p className="text-red-500">해당 유형에 대한 정보가 아직 준비되지 않았습니다. (유형: {mbtiType})</p>
        )}
      </div>
    </div>
  );
};

export default Result;

 