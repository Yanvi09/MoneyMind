//Quiz wala page (Finance Quiz

import React, { useState } from 'react';

const quizData = [
  {
    question: "What is a mutual fund?",
    options: [
      "A type of fixed deposit",
      "A collective investment scheme",
      "A savings account",
      "A type of loan"
    ],
    answer: 1
  },
  {
    question: "What does SIP stand for?",
    options: [
      "Systematic Investment Plan",
      "Stock Investment Plan",
      "Secure Insurance Policy",
      "Simple Interest Payment"
    ],
    answer: 0
  }
];

const LearnPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    if (index === quizData[currentQ].answer) {
      setScore(score + 1);
    }

    const next = currentQ + 1;
    if (next < quizData.length) {
      setCurrentQ(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📘 Finance Quiz</h2>
      {showResult ? (
        <div>
          <h3 className="text-lg font-semibold">🎉 Your Score: {score} / {quizData.length}</h3>
        </div>
      ) : (
        <div>
          <h4 className="mb-2">{quizData[currentQ].question}</h4>
          <div className="flex flex-col gap-2">
            {quizData[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="border p-2 rounded bg-blue-100 hover:bg-blue-300"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
