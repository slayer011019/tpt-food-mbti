import React from 'react';

const TasteTest = () => {
    return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">입맛 MBTI 테스트</h1>
      <form className="space-y-4">
        <div>
          <label className="font-semibold">1. 매운 음식을 얼마나 잘 드시나요?</label>
          <div className="flex gap-4 mt-2">
            <label><input type="radio" name="spicy" value="1" /> 안 먹어요</label>
            <label><input type="radio" name="spicy" value="2" /> 조금</label>
            <label><input type="radio" name="spicy" value="3" /> 보통</label>
            <label><input type="radio" name="spicy" value="4" /> 좋아해요</label>
          </div>
        </div>
        {/* 추가 질문들 */}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">제출</button>
      </form>
    </div>
  );
};

export default TasteTest;