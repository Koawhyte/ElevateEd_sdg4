import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Award, 
  Brain, 
  Download,
  Star,
  PlayCircle,
  FileText,
  Users
} from 'lucide-react';

const PersonalDashboard = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [learningStats, setLearningStats] = useState({});

  useEffect(() => {
    // Simulate AI-powered recommendations based on user profile
    const mockRecommendations = [
      {
        id: 1,
        title: "Advanced Machine Learning Techniques",
        type: "Video Lecture",
        instructor: "Dr. Sarah Chen",
        duration: "45 min",
        rating: 4.8,
        relevance: 95,
        reason: "Based on your Computer Science major and recent ML quiz scores"
      },
      {
        id: 2,
        title: "Sustainable Development in Practice",
        type: "Research Paper",
        author: "UN Development Programme",
        pages: 24,
        rating: 4.6,
        relevance: 88,
        reason: "Aligns with your interest in SDG topics"
      },
      {
        id: 3,
        title: "Data Structures and Algorithms Masterclass",
        type: "Interactive Course",
        instructor: "Prof. Michael Rodriguez",
        duration: "2.5 hours",
        rating: 4.9,
        relevance: 92,
        reason: "Recommended for your upcoming algorithms exam"
      }
    ];

    const mockActivity = [
      { id: 1, action: "Completed", resource: "Linear Algebra Quiz", time: "2 hours ago", score: 85 },
      { id: 2, action: "Watched", resource: "Introduction to Neural Networks", time: "1 day ago", progress: 100 },
      { id: 3, action: "Downloaded", resource: "Statistics Handbook", time: "2 days ago", size: "15 MB" },
      { id: 4, action: "Posted", resource: "Question in Data Science Forum", time: "3 days ago", replies: 5 }
    ];

    const mockStats = {
      totalHours: 127,
      completedCourses: 12,
      averageScore: 87,
      streak: 7,
      downloadedResources: 45,
      forumContributions: 23
    };

    setRecommendations(mockRecommendations);
    setRecentActivity(mockActivity);
    setLearningStats(mockStats);
  }, [user]);

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 🎓</h1>
        <p className="text-blue-100 text-lg">
          Continue your learning journey towards achieving SDG 4: Quality Education
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">🔥 {learningStats.streak} day streak</span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">⭐ {learningStats.averageScore}% avg score</span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">📚 {learningStats.completedCourses} courses completed</span>
          </div>
        </div>
      </div>

      {/* Learning Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Clock}
          title="Study Hours"
          value={learningStats.totalHours}
          subtitle="This semester"
          color="text-blue-600"
        />
        <StatCard
          icon={Award}
          title="Courses Completed"
          value={learningStats.completedCourses}
          subtitle="With certificates"
          color="text-green-600"
        />
        <StatCard
          icon={Download}
          title="Resources Downloaded"
          value={learningStats.downloadedResources}
          subtitle="Available offline"
          color="text-purple-600"
        />
        <StatCard
          icon={Users}
          title="Forum Contributions"
          value={learningStats.forumContributions}
          subtitle="Helping peers"
          color="text-orange-600"
        />
      </div>

      {/* AI-Powered Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h2>
            <p className="text-gray-600">Personalized content based on your learning patterns</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {rec.type === 'Video Lecture' && <PlayCircle className="h-5 w-5 text-red-500" />}
                  {rec.type === 'Research Paper' && <FileText className="h-5 w-5 text-blue-500" />}
                  {rec.type === 'Interactive Course' && <BookOpen className="h-5 w-5 text-green-500" />}
                  <span className="text-sm font-medium text-gray-600">{rec.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{rec.rating}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{rec.title}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {rec.instructor || rec.author} • {rec.duration || `${rec.pages} pages`}
              </p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Relevance</span>
                  <span className="font-medium text-green-600">{rec.relevance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${rec.relevance}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mb-4">{rec.reason}</p>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all">
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action} <span className="text-blue-600">{activity.resource}</span>
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500">
                {activity.score && `Score: ${activity.score}%`}
                {activity.progress && `Progress: ${activity.progress}%`}
                {activity.size && `Size: ${activity.size}`}
                {activity.replies && `${activity.replies} replies`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;