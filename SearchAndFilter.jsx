import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, Star, Clock, Users, BookOpen } from 'lucide-react';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    duration: '',
    rating: '',
    price: '',
    format: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search data
  const mockResults = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      category: "Technology",
      level: "Beginner",
      duration: "6 weeks",
      rating: 4.8,
      students: 15420,
      price: "Free",
      format: "Video",
      description: "Learn the fundamentals of machine learning with hands-on projects.",
      instructor: "Dr. Sarah Chen",
      thumbnail: "🤖"
    },
    {
      id: 2,
      title: "Advanced Mathematics for Engineers",
      category: "Mathematics",
      level: "Advanced",
      duration: "12 weeks",
      rating: 4.6,
      students: 8750,
      price: "$49.99",
      format: "Interactive",
      description: "Master calculus, linear algebra, and differential equations.",
      instructor: "Prof. Michael Rodriguez",
      thumbnail: "📐"
    },
    {
      id: 3,
      title: "Creative Writing Workshop",
      category: "Arts",
      level: "Intermediate",
      duration: "8 weeks",
      rating: 4.9,
      students: 12300,
      price: "$29.99",
      format: "Workshop",
      description: "Develop your storytelling skills with peer feedback.",
      instructor: "Emma Thompson",
      thumbnail: "✍️"
    },
    {
      id: 4,
      title: "Climate Science and Sustainability",
      category: "Science",
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.7,
      students: 22100,
      price: "Free",
      format: "Video",
      description: "Understand climate change and sustainable solutions.",
      instructor: "Dr. James Wilson",
      thumbnail: "🌍"
    },
    {
      id: 5,
      title: "Business Strategy Fundamentals",
      category: "Business",
      level: "Intermediate",
      duration: "10 weeks",
      rating: 4.5,
      students: 18900,
      price: "$79.99",
      format: "Case Study",
      description: "Learn strategic thinking and business planning.",
      instructor: "Lisa Anderson",
      thumbnail: "📊"
    }
  ];

  const categories = ['Technology', 'Mathematics', 'Science', 'Arts', 'Business', 'Languages', 'Health'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['1-4 weeks', '5-8 weeks', '9-12 weeks', '12+ weeks'];
  const ratings = ['4.5+', '4.0+', '3.5+', '3.0+'];
  const prices = ['Free', 'Under $25', '$25-$50', '$50-$100', '$100+'];
  const formats = ['Video', 'Interactive', 'Workshop', 'Case Study', 'Reading'];

  useEffect(() => {
    handleSearch();
  }, [searchTerm, filters]);

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      let results = mockResults;

      // Filter by search term
      if (searchTerm) {
        results = results.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply filters
      if (filters.category) {
        results = results.filter(item => item.category === filters.category);
      }
      if (filters.level) {
        results = results.filter(item => item.level === filters.level);
      }
      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        results = results.filter(item => item.rating >= minRating);
      }
      if (filters.price) {
        if (filters.price === 'Free') {
          results = results.filter(item => item.price === 'Free');
        } else if (filters.price === 'Under $25') {
          results = results.filter(item => {
            const price = parseFloat(item.price.replace('$', ''));
            return !isNaN(price) && price < 25;
          });
        }
        // Add more price filtering logic as needed
      }
      if (filters.format) {
        results = results.filter(item => item.format === filters.format);
      }

      setSearchResults(results);
      setIsSearching(false);
      
      // Call parent callbacks
      if (onSearch) onSearch(searchTerm, results);
      if (onFilter) onFilter(filters, results);
    }, 500);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      level: '',
      duration: '',
      rating: '',
      price: '',
      format: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search courses, topics, or instructors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors ${
            showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Filter className="w-5 h-5" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="space-y-1">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.category === category}
                      onChange={() => handleFilterChange('category', category)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <div className="space-y-1">
                {levels.map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.level === level}
                      onChange={() => handleFilterChange('level', level)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <div className="space-y-1">
                {prices.map(price => (
                  <label key={price} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.price === price}
                      onChange={() => handleFilterChange('price', price)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="space-y-1">
                {ratings.map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange('rating', rating)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600 flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      {rating}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Format Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <div className="space-y-1">
                {formats.map(format => (
                  <label key={format} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.format === format}
                      onChange={() => handleFilterChange('format', format)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{format}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {isSearching ? 'Searching...' : `${searchResults.length} Results Found`}
          </h3>
          {searchTerm && (
            <p className="text-sm text-gray-600">
              Showing results for "<span className="font-medium">{searchTerm}</span>"
            </p>
          )}
        </div>

        {isSearching ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchResults.map(result => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{result.thumbnail}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{result.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {result.category}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {result.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {result.students.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{result.rating}</span>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {result.level}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{result.price}</div>
                        <div className="text-xs text-gray-500">{result.format}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isSearching && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;