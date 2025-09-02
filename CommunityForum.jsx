import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  User, 
  Clock, 
  Tag,
  Search,
  Plus,
  Star,
  Award,
  TrendingUp,
  Filter
} from 'lucide-react';

const CommunityForum = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        title: "How to implement machine learning in sustainable development projects?",
        content: "I'm working on a project that combines ML with SDG goals. Looking for advice on best practices and frameworks.",
        author: "Sarah Chen",
        authorLevel: "Advanced",
        category: "Machine Learning",
        tags: ["ML", "SDG", "Sustainability"],
        timestamp: "2 hours ago",
        upvotes: 24,
        downvotes: 2,
        replies: 8,
        isAnswered: true,
        userVote: null
      },
      {
        id: 2,
        title: "Best resources for learning Python data analysis?",
        content: "New to programming and want to focus on data analysis for my environmental science research. Any recommendations?",
        author: "Mike Rodriguez",
        authorLevel: "Beginner",
        category: "Programming",
        tags: ["Python", "Data Analysis", "Beginner"],
        timestamp: "5 hours ago",
        upvotes: 18,
        downvotes: 0,
        replies: 12,
        isAnswered: true,
        userVote: "up"
      },
      {
        id: 3,
        title: "Collaborative study group for SDG 4 research?",
        content: "Looking to form a study group focused on Quality Education research. Anyone interested in joining?",
        author: "Emily Watson",
        authorLevel: "Intermediate",
        category: "Study Groups",
        tags: ["SDG4", "Collaboration", "Research"],
        timestamp: "1 day ago",
        upvotes: 31,
        downvotes: 1,
        replies: 15,
        isAnswered: false,
        userVote: null
      },
      {
        id: 4,
        title: "Help with statistics homework - hypothesis testing",
        content: "Struggling with understanding p-values and confidence intervals. Can someone explain in simple terms?",
        author: "Alex Johnson",
        authorLevel: "Beginner",
        category: "Mathematics",
        tags: ["Statistics", "Homework Help", "Hypothesis Testing"],
        timestamp: "2 days ago",
        upvotes: 15,
        downvotes: 0,
        replies: 6,
        isAnswered: true,
        userVote: null
      }
    ];

    setPosts(mockPosts);
  }, []);

  const categories = ['all', 'Machine Learning', 'Programming', 'Study Groups', 'Mathematics', 'Sustainability'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case 'replies':
        return b.replies - a.replies;
      case 'recent':
      default:
        return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  const handleVote = (postId, voteType) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newPost = { ...post };
        
        if (post.userVote === voteType) {
          // Remove vote
          newPost.userVote = null;
          if (voteType === 'up') newPost.upvotes--;
          else newPost.downvotes--;
        } else {
          // Change or add vote
          if (post.userVote === 'up') newPost.upvotes--;
          if (post.userVote === 'down') newPost.downvotes--;
          
          newPost.userVote = voteType;
          if (voteType === 'up') newPost.upvotes++;
          else newPost.downvotes++;
        }
        
        return newPost;
      }
      return post;
    }));
  };

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              post.isAnswered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {post.isAnswered ? '✓ Answered' : '⏳ Open'}
            </span>
            <span className="text-sm text-blue-600 font-medium">{post.category}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                post.authorLevel === 'Beginner' ? 'bg-green-100 text-green-800' :
                post.authorLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {post.authorLevel}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleVote(post.id, 'up')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
              post.userVote === 'up' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{post.upvotes}</span>
          </button>
          
          <button
            onClick={() => handleVote(post.id, 'down')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
              post.userVote === 'down' 
                ? 'bg-red-100 text-red-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{post.downvotes}</span>
          </button>
          
          <button className="flex items-center space-x-1 px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <Reply className="h-4 w-4" />
            <span>{post.replies} replies</span>
          </button>
        </div>
        
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          View Discussion
        </button>
      </div>
    </div>
  );

  const NewPostModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="What's your question or topic?"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a category</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              rows="6"
              placeholder="Describe your question or share your knowledge..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              placeholder="Add tags separated by commas (e.g., python, machine learning, beginner)"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowNewPostModal(false)}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
            <p className="text-gray-600 mt-2">Connect, collaborate, and learn with fellow students</p>
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="replies">Most Replies</option>
            </select>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Total Posts</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-1">1,247</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Active Members</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-1">3,456</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-900">Solved Today</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600 mt-1">89</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Your Reputation</span>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-1">247</p>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {sortedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        
        {sortedPosts.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-lg">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Be the first to start a discussion!'
              }
            </p>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create First Post
            </button>
          </div>
        )}
      </div>

      {/* Load More */}
      {sortedPosts.length > 0 && (
        <div className="text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all transform hover:scale-105">
            Load More Posts
          </button>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && <NewPostModal />}
    </div>
  );
};

export default CommunityForum;