import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import ChatTopicCard from "./ChatTopicCard";

// Dummy data - will be replaced with API calls later
const chatTopics = [
  {
    id: 1,
    slug: "introducing-yourself",
    title: "Introducing Yourself",
    description:
      "Practice introducing yourself in French, sharing your name, age, and where you're from.",
    difficulty: "beginner",
    icon: "👋",
    estimatedTime: "5 min",
    messageCount: 8,
    rating: 4.8,
    category: "daily-life",
  },
  {
    id: 2,
    slug: "ordering-at-restaurant",
    title: "Ordering at a Restaurant",
    description:
      "Learn how to order food, ask for recommendations, and request the bill in French.",
    difficulty: "beginner",
    icon: "🍽️",
    estimatedTime: "8 min",
    messageCount: 12,
    rating: 4.9,
    category: "daily-life",
  },
  {
    id: 3,
    slug: "hotel-check-in",
    title: "Hotel Check-in",
    description:
      "Practice checking into a hotel, asking about amenities, and making special requests.",
    difficulty: "beginner",
    icon: "🏨",
    estimatedTime: "7 min",
    messageCount: 10,
    rating: 4.7,
    category: "travel",
  },
  {
    id: 4,
    slug: "asking-for-directions",
    title: "Asking for Directions",
    description:
      "Learn to ask for and understand directions to navigate streets and public transport.",
    difficulty: "beginner",
    icon: "🗺️",
    estimatedTime: "6 min",
    messageCount: 9,
    rating: 4.6,
    category: "travel",
  },
  {
    id: 5,
    slug: "shopping-for-clothes",
    title: "Shopping for Clothes",
    description:
      "Practice asking about sizes, colors, prices, and making purchases at clothing stores.",
    difficulty: "intermediate",
    icon: "👕",
    estimatedTime: "10 min",
    messageCount: 14,
    rating: 4.5,
    category: "shopping",
  },
  {
    id: 6,
    slug: "doctors-appointment",
    title: "At the Doctor's Office",
    description:
      "Learn medical vocabulary and how to describe symptoms to a doctor in French.",
    difficulty: "intermediate",
    icon: "🏥",
    estimatedTime: "12 min",
    messageCount: 15,
    rating: 4.8,
    category: "health",
  },
  {
    id: 7,
    slug: "job-interview",
    title: "Job Interview",
    description:
      "Practice common job interview questions and learn professional vocabulary.",
    difficulty: "advanced",
    icon: "💼",
    estimatedTime: "15 min",
    messageCount: 20,
    rating: 4.9,
    category: "professional",
  },
  {
    id: 8,
    slug: "apartment-hunting",
    title: "Apartment Hunting",
    description:
      "Learn to discuss rental terms, ask about features, and negotiate in French.",
    difficulty: "intermediate",
    icon: "🏠",
    estimatedTime: "12 min",
    messageCount: 16,
    rating: 4.7,
    category: "daily-life",
  },
];

const difficultyFilters = ["all", "beginner", "intermediate", "advanced"];

export default function ChatsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Filter topics based on search and difficulty
  const filteredTopics = chatTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "all" || topic.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Conversation Topics
        </h2>
        <p className="text-gray-500 dark:text-slate-400">
          Choose a topic to practice your French conversation skills with our AI
          tutor.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            {difficultyFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedDifficulty(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDifficulty === filter
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTopics.map((topic) => (
            <ChatTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-slate-400">
            No topics found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
