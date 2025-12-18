import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BookmarkIcon,
  BookOpenIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { fetchCategoriesByLevel } from "../../../services/vocabularyApi";

// Level colors config
const levelColors = {
  a1: {
    bg: "bg-sky-500",
    text: "text-sky-500",
    progressBg: "bg-sky-100 dark:bg-sky-900/30",
    progressFill: "bg-sky-500",
  },
  a2: {
    bg: "bg-sky-400",
    text: "text-sky-400",
    progressBg: "bg-sky-100 dark:bg-sky-900/30",
    progressFill: "bg-sky-400",
  },
  b1: {
    bg: "bg-teal-500",
    text: "text-teal-500",
    progressBg: "bg-teal-100 dark:bg-teal-900/30",
    progressFill: "bg-teal-500",
  },
  b2: {
    bg: "bg-teal-400",
    text: "text-teal-400",
    progressBg: "bg-teal-100 dark:bg-teal-900/30",
    progressFill: "bg-teal-400",
  },
  c1: {
    bg: "bg-orange-500",
    text: "text-orange-500",
    progressBg: "bg-orange-100 dark:bg-orange-900/30",
    progressFill: "bg-orange-500",
  },
  c2: {
    bg: "bg-orange-400",
    text: "text-orange-400",
    progressBg: "bg-orange-100 dark:bg-orange-900/30",
    progressFill: "bg-orange-400",
  },
};

// Action button component
function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
      title={label}
    >
      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-sky-100 dark:group-hover:bg-sky-900/30 transition-colors">
        <Icon className="w-4 h-4 text-gray-500 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" />
      </div>
    </button>
  );
}

// Category Card component - now uses API data
function CategoryCard({ category, levelColor, level }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 flex flex-col hover:shadow-md transition-all">
      {/* Image and Bookmark */}
      <div className="relative mb-4">
        {/* Placeholder image */}
        <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
          <div className="w-20 h-20 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-3xl">📚</span>
          </div>
        </div>
        {/* Bookmark */}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-700/80 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors">
          <BookmarkIcon className="w-4 h-4 text-gray-400 dark:text-slate-500" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        {category.name}
      </h3>

      {/* Subcategories */}
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">
        {category.subcategories.length > 0
          ? category.subcategories.slice(0, 3).join(", ")
          : "Learn vocabulary in this category"}
      </p>

      {/* Progress bar - placeholder for now */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`flex-1 h-1.5 ${levelColor.progressBg} rounded-full overflow-hidden`}
        >
          <div
            className={`h-full ${levelColor.progressFill} rounded-full transition-all`}
            style={{ width: "0%" }}
          />
        </div>
        <span className="text-xs text-gray-400 dark:text-slate-500 min-w-[28px] text-right">
          0%
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-slate-400 mb-4 pb-4 border-b border-gray-100 dark:border-slate-700 whitespace-nowrap">
        <span className="flex items-center gap-1">
          <BookOpenIcon className="w-3.5 h-3.5" />
          {category.wordCount} Words
        </span>
        <span className="flex items-center gap-1">
          {category.subcategories.length} Topics
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <ActionButton icon={RectangleStackIcon} label="Word Card" />
        <Link
          to={`/vocabulary/lessons/learn/${level}/${category.slug}`}
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
          title="Flashcards"
        >
          <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
            <Squares2X2Icon className="w-4 h-4 text-sky-500" />
          </div>
        </Link>
        <ActionButton icon={LanguageIcon} label="Match the pairs" />
        <ActionButton icon={BookOpenIcon} label="Spelling" />
      </div>
    </div>
  );
}

export default function CEFRLevelPage() {
  const { level } = useParams();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const colors = levelColors[level] || levelColors.a1;

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCategoriesByLevel(level?.toUpperCase());
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, [level]);

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-slate-400">
              Loading categories...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {level?.toUpperCase()} Level Wordlist
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          Explore {categories.length} vocabulary categories. Each category
          includes flashcards and exercises to help you master new words.
        </p>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            levelColor={colors}
            level={level}
          />
        ))}
      </div>
    </div>
  );
}
