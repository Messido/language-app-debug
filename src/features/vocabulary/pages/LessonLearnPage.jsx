import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import {
  FlashCard,
  LessonHeader,
  CompletionScreen,
  dummyWords,
} from "../components/lesson-learn";

export default function LessonLearnPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentIndex < dummyWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
        <LessonHeader
          currentIndex={dummyWords.length - 1}
          total={dummyWords.length}
          onExit={() => navigate(-1)}
          words={dummyWords}
        />
        <main className="flex-1 flex items-center justify-center p-4">
          <CompletionScreen />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <LessonHeader
        currentIndex={currentIndex}
        total={dummyWords.length}
        onExit={() => navigate(-1)}
        words={dummyWords}
      />

      <main className="flex-1 flex flex-col items-center justify-start pt-12 p-4 relative">
        <div className="w-full max-w-5xl relative">
          <FlashCard word={dummyWords[currentIndex]} />

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border-2 border-gray-100 dark:border-slate-700 flex items-center justify-center text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:text-sky-500 hover:border-sky-100 transition-all hover:scale-110"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20">
            <button
              onClick={handleNext}
              className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border-2 border-gray-100 dark:border-slate-700 flex items-center justify-center text-gray-500 hover:text-sky-500 hover:border-sky-100 transition-all hover:scale-110"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
