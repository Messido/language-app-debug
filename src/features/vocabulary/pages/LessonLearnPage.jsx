import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  RectangleStackIcon,
  LanguageIcon,
  BookOpenIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

// DUMMY DATA - Updated to match structure in screenshot
const dummyWords = [
  {
    id: 1,
    english: "Dog",
    forms: [
      {
        word: "Chien",
        gender: "Masculine ♂",
        genderColor: "text-sky-500",
      },
      {
        word: "Chienne",
        gender: "Feminine ♀",
        genderColor: "text-pink-500",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500",
    exampleTarget: "Le chien caresse le quoi?",
    phonetic: "luh shvah(n) kah-ress luh kwah?",
    exampleNative: "The boy pets the dog?",
  },
  {
    id: 2,
    english: "Cat",
    forms: [
      {
        word: "Chat",
        gender: "Masculine ♂",
        genderColor: "text-sky-500",
      },
      {
        word: "Chatte",
        gender: "Feminine ♀",
        genderColor: "text-pink-500",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500",
    exampleTarget: "Le chat dort sur le canapé.",
    phonetic: "luh shah dor soor luh kah-nah-pay",
    exampleNative: "The cat sleeps on the sofa.",
  },
  {
    id: 3,
    english: "Horse",
    forms: [
      {
        word: "Cheval",
        gender: "Masculine ♂",
        genderColor: "text-sky-500",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1534759846116-5799c33ce46a?auto=format&fit=crop&q=80&w=500",
    exampleTarget: "Le cheval court vite.",
    phonetic: "luh shuh-val koor veet",
    exampleNative: "The horse runs fast.",
  },
];

// Custom Ribbon Badge Component
const RibbonBadge = ({
  text,
  position = "top-left",
  color = "bg-gray-200",
}) => {
  // Basic CSS implementation for corner ribbon
  const positionClasses =
    position === "top-left"
      ? "top-0 left-0 rounded-br-3xl"
      : "bottom-0 right-0 rounded-tl-3xl";

  return (
    <div
      className={`absolute ${positionClasses} ${color} px-8 py-2 z-10 shadow-sm`}
    >
      <span className="text-lg font-bold text-gray-700 dark:text-slate-800">
        {text}
      </span>
    </div>
  );
};

function Header({ currentIndex, total, onExit, words }) {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top Row: Breadcrumb, Progress, Controls */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm text-sky-500 font-medium">
            <Link to="/vocabulary/cefr/a1" className="hover:underline">
              A1 Level Wordlist
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 dark:text-slate-400">Colors</span>
            {/* Note: 'Colors' is hardcoded as per screenshot, strictly should be dynamic like 'People' */}
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-sm font-bold text-sky-500 mr-2">
              {currentIndex + 1} / {total}
            </span>
            <button className="hover:text-sky-500 transition-colors">
              <SpeakerWaveIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-sky-500 transition-colors">
              <PlayIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onExit}
              className="hover:text-sky-500 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Pills */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {words.map((word, idx) => {
            const isActive = idx === currentIndex;
            // Dummy pill calculation: 5-yellow etc from screenshot
            // We'll just use ID and English word
            return (
              <button
                key={word.id}
                className={`
                            px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                            ${
                              isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800"
                                : "bg-gray-50 text-gray-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-gray-100"
                            }
                        `}
              >
                {idx + 1}- {word.english.toLowerCase()}
              </button>
            );
          })}
          <button className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-gray-200 text-gray-400 hover:bg-gray-50">
            lesson summary
          </button>
        </div>
      </div>
    </div>
  );
}

function FlashCard({ word }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 w-full max-w-5xl mx-auto relative overflow-hidden">
      {/* "New" Badge - Triangle style approximated */}
      <div
        className="absolute top-0 left-0 w-20 h-20 bg-gray-200 dark:bg-slate-700 flex items-end justify-center pb-2 pr-2"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      >
        <span className="text-base font-bold text-gray-900 dark:text-white absolute top-3 left-3">
          New
        </span>
      </div>

      {/* Bookmark */}
      <div className="absolute top-6 right-6 z-10">
        <BookmarkIcon className="w-6 h-6 text-gray-400 dark:text-slate-500 hover:text-sky-500 cursor-pointer" />
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Left: Image */}
        <div className="md:w-5/12 p-8 flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[280px]">
            <img
              src={word.image}
              alt={word.english}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="md:w-7/12 p-8 md:pr-12 flex flex-col pt-12">
          {/* Words Grid */}
          <div className="flex gap-12 mb-8">
            {/* English Column */}
            <div className="flex flex-col gap-4 min-w-[120px]">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                English
              </h3>
              <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                <p className="text-xl text-gray-700 dark:text-slate-200">
                  {word.english}
                </p>
              </div>
            </div>

            {/* Target Column */}
            <div className="flex flex-col gap-4 flex-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">
                French
              </h3>
              <div className="border-t border-gray-200 dark:border-slate-700 pt-4 grid grid-cols-2 gap-4">
                {word.forms.map((form, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-1">
                      <button>
                        <SpeakerWaveIcon className="w-4 h-4 text-gray-400" />
                      </button>
                      <span className="text-xl font-medium text-gray-900 dark:text-white">
                        {form.word}
                      </span>
                    </div>
                    <p className={`text-sm font-medium ${form.genderColor}`}>
                      {form.gender.split(" ")[0]}
                      <span className="ml-1 text-base">
                        {form.gender.split(" ")[1]}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Example Sentence */}
          <div className="border-t border-gray-100 dark:border-slate-700 pt-8 mt-auto mb-12">
            <div className="flex items-start gap-4 mb-4">
              <button className="bg-gray-100 dark:bg-slate-700 p-2 rounded-full hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors">
                <SpeakerWaveIcon className="w-5 h-5 text-gray-600 dark:text-slate-300" />
              </button>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {word.exampleTarget}
                </p>
                <p className="text-sm text-gray-400 dark:text-slate-500 font-mono mb-4">
                  {word.phonetic}
                </p>
                <p className="text-base text-gray-600 dark:text-slate-300 italic">
                  {word.exampleNative}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* A1 Badge */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 bg-gray-200 dark:bg-slate-700 flex items-end justify-end p-4"
        style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
      >
        <span className="text-xl font-bold text-gray-900 dark:text-white mr-1 mb-1">
          A1
        </span>
      </div>
    </div>
  );
}

function BookmarkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}

function CompletionScreen() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircleIcon className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Congratulations!!
      </h2>
      <p className="text-lg text-gray-600 dark:text-slate-400 mb-12 max-w-xl mx-auto">
        You learned{" "}
        <span className="font-bold text-gray-900 dark:text-white">3 words</span>{" "}
        from Lesson 6. To improve learning and review vocabulary, start
        practicing.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto px-4">
        <ActionCard icon={RectangleStackIcon} label="Flashcards" color="sky" />
        <ActionCard
          icon={LanguageIcon}
          label="Match the pairs"
          color="orange"
        />
        <ActionCard
          icon={BookOpenIcon}
          label="Spelling Practice"
          color="teal"
        />
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, label, color }) {
  // Map simplified color names to Tailwind classes
  const colors = {
    sky: "bg-sky-100 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300",
    orange:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300",
    teal: "bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-300",
  };
  const iconBg = {
    sky: "bg-sky-200 dark:bg-sky-800",
    orange: "bg-orange-200 dark:bg-orange-800",
    teal: "bg-teal-200 dark:bg-teal-800",
  };

  return (
    <button
      className={`group relative aspect-[4/5] ${colors[color]} rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all`}
    >
      <div
        className={`w-16 h-16 ${iconBg[color]} rounded-full flex items-center justify-center`}
      >
        <Icon className="w-8 h-8" />
      </div>
      <span className="font-semibold">{label}</span>
    </button>
  );
}

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
        <Header
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
      <Header
        currentIndex={currentIndex}
        total={dummyWords.length}
        onExit={() => navigate(-1)}
        words={dummyWords}
      />

      <main className="flex-1 flex flex-col items-center justify-start pt-12 p-4 relative">
        <div className="w-full max-w-5xl relative">
          <FlashCard word={dummyWords[currentIndex]} />

          {/* Navigation Buttons - Positioned relative to the card container */}
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
