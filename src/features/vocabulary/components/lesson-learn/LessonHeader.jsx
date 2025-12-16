import { Link } from "react-router-dom";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

export default function LessonHeader({ currentIndex, total, onExit, words }) {
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
