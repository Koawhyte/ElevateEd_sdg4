import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, BookOpen, Star, Zap } from 'lucide-react';

const AuthSystem = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    onLogin({
      name: formData.name || 'Sarah Johnson',
      email: formData.email,
      plan: selectedPlan
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Access to basic courses',
        'Community forum access',
        'Basic quiz features',
        'Limited AI assistance'
      ],
      color: 'border-gray-200',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      features: [
        'All free features',
        'Unlimited course access',
        'Advanced AI homework help',
        'Priority community support',
        'Offline content download'
      ],
      color: 'border-blue-500',
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: '/month',
      features: [
        'All premium features',
        'Personal learning coach',
        '1-on-1 tutoring sessions',
        'Advanced analytics',
        'Custom learning paths',
        'Certificate programs'
      ],
      color: 'border-purple-500',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Elevate Ed</h1>
          <p className="text-gray-600">Empowering the Future of Learning</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 text-center rounded-lg font-medium transition-colors ${
                isLogin
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 text-center rounded-lg font-medium transition-colors ${
                !isLogin
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Subscription Plans for Sign Up */}
            {!isLogin && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Plan</h3>
                <div className="space-y-3">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedPlan === plan.id
                          ? plan.color + ' bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 left-4">
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                            <span className="text-gray-500 ml-1">{plan.period}</span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPlan === plan.id
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedPlan === plan.id && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </div>
                      
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Zap className="w-3 h-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                        {plan.features.length > 3 && (
                          <li className="text-blue-500 text-xs">
                            +{plan.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                Forgot your password?
              </a>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div>
              <div className="font-semibold text-gray-900">50,000+</div>
              <div>Active Learners</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">10,000+</div>
              <div>Courses</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">95%</div>
              <div>Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;