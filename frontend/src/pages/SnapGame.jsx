import React, { useState, useEffect } from "react";
import "./SnapGame.css";

const initialCards = [
    
    { id: 1, pairId: 1, content: "What is a spectrogram?", type: "question" },
    { id: 2, pairId: 1, content: "A visual representation of sound over time.", type: "answer" },
  
    
    { id: 3, pairId: 2, content: "What does the CNN do?", type: "question" },
    { id: 4, pairId: 2, content: "It recognises patterns in spectrogram images.", type: "answer" },
  
    
    { id: 5, pairId: 3, content: "What library was used for audio analysis?", type: "question" },
    { id: 6, pairId: 3, content: "Librosa.", type: "answer" },
  
    
    { id: 7, pairId: 4, content: "What does softmax activation do?", type: "question" },
    { id: 8, pairId: 4, content: "It turns outputs into probability scores.", type: "answer" },
  
    
    { id: 9, pairId: 5, content: "What is audio preprocessing?", type: "question" },
    { id: 10, pairId: 5, content: "It prepares raw sound for the model, converting it into a consistent visual format.", type: "answer" },
  
    
    { id: 11, pairId: 6, content: "Why use mel spectrograms instead of regular ones?", type: "question" },
    { id: 12, pairId: 6, content: "They reflect how humans hear sound, giving more detail to lower frequencies.", type: "answer" },
  
    
    { id: 13, pairId: 7, content: "What does confidence score mean?", type: "question" },
    { id: 14, pairId: 7, content: "It shows how sure the model is about its prediction, based on what it learned.", type: "answer" },
  
    
    { id: 15, pairId: 8, content: "What is data augmentation?", type: "question" },
    { id: 16, pairId: 8, content: "It's a technique that creates modified copies of data to improve model learning.", type: "answer" },
  ];
  

const shuffleCards = () => {
  return [...initialCards].sort(() => Math.random() - 0.5);
};

const SnapGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [turns, setTurns] = useState(0);
  const [feedbackMatch, setFeedbackMatch] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const isGameOver = matched.length === cards.length;

  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  useEffect(() => {
    document.title = "Match-Pairs Quiz | AI Sound Classifier";
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && !isGameOver) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isGameOver]);

  useEffect(() => {
    if (isGameOver) setIsRunning(false);
  }, [matched]);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    if (!isRunning && turns === 0) {
        setIsRunning(true);
      }
    

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setTurns((prev) => prev + 1);
      const [i, j] = newFlipped;
      const isMatch = cards[i].pairId === cards[j].pairId && cards[i].id !== cards[j].id;
      setFeedbackMatch(isMatch);

      setTimeout(() => {
        if (isMatch) {
          setMatched((prev) => [...prev, i, j]);
        }
        setFlipped([]);
        setFeedbackMatch(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setTurns(0);
    setTime(0);
    setIsRunning(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-100 transition-colors">
      <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">🃏 AI Concept Snap</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Match each concept with its correct explanation to test your understanding!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);

          return (
            <div
              key={index}
              className={`card-container ${isFlipped ? "card-flipped" : ""}`}
              onClick={() => handleFlip(index)}
            >
              <div className="card-inner">
                <div className="card-front dark:bg-gray-800">
                  ❓
                </div>
                <div
                  className={`card-back ${
                    isMatched
                      ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white"
                      : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  }`}
                >
                  <div className="text-xs uppercase font-semibold mb-1 opacity-60">
                    {card.type === "question" ? "Q" : "A"}
                  </div>
                  <div>{card.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-lg text-gray-700 dark:text-gray-300">
        Turns: {turns} | Time: {time}s
      </div>

      {isGameOver && (
        <div className="mt-6">
          <div className="text-green-600 dark:text-green-400 text-lg font-semibold">
            🎉 You matched all pairs in {turns} turns and {time} seconds!
          </div>
          <div className="mt-4">
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
            >
              🔁 Play Again
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">📚 What You Matched</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              {[...new Set(cards.map((card) => card.pairId))].map((pairId) => {
                const pair = cards.filter((c) => c.pairId === pairId);
                const question = pair.find((c) => c.type === "question")?.content;
                const answer = pair.find((c) => c.type === "answer")?.content;
                return (
                  <li key={pairId}>
                    <strong>Q:</strong> {question} <br />
                    <strong>A:</strong> {answer}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnapGame;
