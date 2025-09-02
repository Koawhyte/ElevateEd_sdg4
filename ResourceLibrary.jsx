import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  FileText, 
  BookOpen, 
  Download, 
  Star, 
  Heart,
  Share2,
  Quote,
  Filter,
  Grid,
  List,
  Clock,
  User,
  Tag
} from 'lucide-react';

const ResourceLibrary = ({ user }) => {
  const [resources, setResources] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const mockResources = [
      {
        id: 1,
        title: "Introduction to Machine Learning",
        type: "video",
        category: "Computer Science",
        instructor: "Dr. Andrew Ng",
        duration: "1h 23m",
        rating: 4.9,
        reviews: 2847,
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
        description: "Comprehensive introduction to ML concepts, algorithms, and applications.",
        tags: ["Machine Learning", "AI", "Algorithms"],
        difficulty: "Beginner",
        downloadSize: "245 MB",
        isBookmarked: false,
        citations: 156
      },
      {
        id: 2,
        title: "Sustainable Development Goals: A Comprehensive Guide",
        type: "paper",
        category: "Sustainability",
        author: "United Nations",
        pages: 48,
        rating: 4.7,
        reviews: 892,
        thumbnail: "/images/Sustainability.jpg",
        description: "Official UN document outlining all 17 SDGs with implementation strategies.",
        tags: ["SDG", "Sustainability", "Global Goals"],
        difficulty: "Intermediate",
        downloadSize: "12 MB",
        isBookmarked: true,
        citations: 2341
      },
      {
        id: 3,
        title: "Advanced Data Structures Interactive Course",
        type: "course",
        category: "Computer Science",
        instructor: "Prof. Sarah Johnson",
        duration: "4h 15m",
        rating: 4.8,
        reviews: 1523,
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
        description: "Interactive course covering trees, graphs, heaps, and advanced algorithms.",
        tags: ["Data Structures", "Algorithms", "Programming"],
        difficulty: "Advanced",
        downloadSize: "567 MB",
        isBookmarked: false,
        citations: 89
      },
      {
        id: 4,
        title: "Climate Change and Education Policy",
        type: "paper",
        category: "Education Policy",
        author: "Dr. Maria Rodriguez",
        pages: 32,
        rating: 4.6,
        reviews: 445,
        thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400",
        description: "Research on integrating climate education into university curricula.",
        tags: ["Climate Change", "Education", "Policy"],
        difficulty: "Intermediate",
        downloadSize: "8 MB",
        isBookmarked: true,
        citations: 178
      }
    ];

    setResources(mockResources);
  }, []);

  const categories = ['all', 'Computer Science', 'Sustainability', 'Education Policy', 'Programming'];

  const filteredResources = resources.filter(resource => 
    selectedCategory === 'all' || resource.category === selectedCategory
  );

  const toggleBookmark = (id) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, isBookmarked: !resource.isBookmarked } : resource
    ));
  };

  const generateCitation = (resource) => {
    const currentYear = new Date().getFullYear();
    if (resource.type === 'paper') {
      return `${resource.author} (${currentYear}). ${resource.title}. Retrieved from EduAccess Digital Library.`;
    } else {
      return `${resource.instructor} (${currentYear}). ${resource.title} [${resource.type}]. EduAccess Digital Library.`;
    }
  };

  const ResourceCard = ({ resource }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={resource.thumbnail} 
          alt={resource.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            resource.type === 'video' ? 'bg-red-100 text-red-800' :
            resource.type === 'paper' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {resource.type === 'video' ? '📹 Video' : 
             resource.type === 'paper' ? '📄 Paper' : '📚 Course'}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={() => toggleBookmark(resource.id)}
            className={`p-2 rounded-full ${resource.isBookmarked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} hover:scale-110 transition-transform`}
          >
            <Heart className={`h-4 w-4 ${resource.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
          {resource.duration || `${resource.pages} pages`}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{resource.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{resource.rating}</span>
            <span className="text-sm text-gray-500">({resource.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <User className="h-4 w-4 mr-1" />
          <span>{resource.instructor || resource.author}</span>
          <span className="mx-2">•</span>
          <span className={`px-2 py-1 rounded text-xs ${
            resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
            resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {resource.difficulty}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
              <PlayCircle className="h-4 w-4" />
              <span>Start</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
              <Download className="h-4 w-4" />
              <span>{resource.downloadSize}</span>
            </button>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigator.clipboard.writeText(generateCitation(resource))}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy Citation"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resource Library</h1>
            <p className="text-gray-600 mt-2">Access thousands of educational resources supporting SDG 4</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredResources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all transform hover:scale-105">
          Load More Resources
        </button>
      </div>
    </div>
  );
};

export default ResourceLibrary;