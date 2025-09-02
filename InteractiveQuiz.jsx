import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, Clock, CheckCircle, XCircle, Star, Target, Zap } from 'lucide-react';

const InteractiveQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const quizzes = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      category: "Technology",
      difficulty: "Intermediate",
      duration: 10,
      totalQuestions: 8,
      description: "Test your knowledge of basic ML concepts and algorithms",
      icon: "🤖",
      questions: [
        {
          question: "What is supervised learning?",
          options: [
            "Learning without labeled data",
            "Learning with input-output pairs",
            "Learning through trial and error",
            "Learning from unlabeled data"
          ],
          correct: 1,
          explanation: "Supervised learning uses labeled training data to learn a mapping from inputs to outputs."
        },
        {
          question: "Which algorithm is best for classification problems?",
          options: [
            "Linear Regression",
            "K-means Clustering",
            "Random Forest",
            "PCA"
          ],
          correct: 2,
          explanation: "Random Forest is an ensemble method excellent for classification tasks."
        },
        {
          question: "What does overfitting mean?",
          options: [
            "Model performs well on training but poorly on test data",
            "Model performs poorly on both training and test data",
            "Model is too simple",
            "Model has too few parameters"
          ],
          correct: 0,
          explanation: "Overfitting occurs when a model learns the training data too well, including noise."
        }
      ]
    },
    {
      id: 2,
      title: "Climate Science Basics",
      category: "Science",
      difficulty: "Beginner",
      duration: 8,
      totalQuestions: 6,
      description: "Understand fundamental concepts of climate change and environmental science",
      icon: "🌍",
      questions: [
        {
          question: "What is the main cause of current climate change?",
          options: [
            "Solar variations",
            "Volcanic activity",
            "Greenhouse gas emissions from human activities",
            "Natural climate cycles"
          ],
          correct: 2,
          explanation: "Human activities, particularly burning fossil fuels, are the primary driver of current climate change."
        },
        {
          question: "Which gas contributes most to the greenhouse effect?",
          options: [
            "Carbon dioxide (CO2)",
            "Methane (CH4)",
            "Nitrous oxide (N2O)",
            "Fluorinated gases"
          ],
          correct: 0,
          explanation: "CO2 is the most abundant greenhouse gas from human activities."
        },
        {
          question: "What is the Paris Agreement?",
          options: [
            "A trade agreement between European countries",
            "An international climate change treaty",
            "A scientific research collaboration",
            "An environmental protection law"
          ],
          correct: 1,
          explanation: "The Paris Agreement is a global treaty to limit global warming to well below 2°C."
        }
      ]
    },
    {
      id: 3,
      title: "Creative Writing Techniques",
      category: "Arts",
      difficulty: "Intermediate",
      duration: 12,
      totalQuestions: 10,
      description: "Master the art of storytelling and creative expression",
      icon: "✍️",
      questions: [
        {
          question: "What is the 'show, don't tell' principle?",
          options: [
            "Use more dialogue than narration",
            "Demonstrate through actions and details rather than stating facts",
            "Include visual elements in writing",
            "Write in present tense only"
          ],
          correct: 1,
          explanation: "'Show, don't tell' means revealing information through actions, dialogue, and sensory details."
        },
        {
          question: "What is a metaphor?",
          options: [
            "A direct comparison using 'like' or 'as'",
            "An indirect comparison without using 'like' or 'as'",
            "A repetition of sounds",
            "A contradiction in terms"
          ],
          correct: 1,
          explanation: "A metaphor is an indirect comparison that states one thing is another thing."
        }
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizStarted && !showResult) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResult]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
    setQuizStarted(true);
    setTimeLeft(quiz.duration * 60); // Convert minutes to seconds
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAnswer('');
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const currentQ = selectedQuiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;
    
    const newAnswer = {
      questionIndex: currentQuestion,
      selectedAnswer,
      correct: isCorrect,
      timeSpent: selectedQuiz.duration * 60 - timeLeft
    };

    const newAnswers = [...userAnswers, newAnswer];
    setUserAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
    }

    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
      setQuizStarted(false);
    }
  };

  const handleTimeUp = () => {
    setShowResult(true);
    setQuizStarted(false);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
    setTimeLeft(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAnswer('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent work! 🌟";
    if (percentage >= 70) return "Good job! 👍";
    if (percentage >= 60) return "Not bad! 📚";
    return "Keep practicing! 💪";
  };

  if (!selectedQuiz) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Quizzes</h2>
          <p className="text-gray-600">Test your knowledge and track your progress with our gamified quiz system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{quiz.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{quiz.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Difficulty:</span>
                  <span className={`font-medium ${
                    quiz.difficulty === 'Beginner' ? 'text-green-600' :
                    quiz.difficulty === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
                  }`}>{quiz.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{quiz.duration} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Questions:</span>
                  <span className="font-medium">{quiz.totalQuestions}</span>
                </div>
              </div>

              <button
                onClick={() => startQuiz(quiz)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">{selectedQuiz.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className={`text-3xl font-bold ${getScoreColor(percentage)} mb-1`}>
                {score}/{selectedQuiz.questions.length}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
              <div className={`text-lg font-semibold ${getScoreColor(percentage)}`}>
                {percentage}%
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600 mb-1">{maxStreak}</div>
              <div className="text-sm text-gray-600">Best Streak</div>
              <div className="flex items-center justify-center mt-1">
                <Zap className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">Streak Bonus!</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {formatTime(selectedQuiz.duration * 60 - timeLeft)}
              </div>
              <div className="text-sm text-gray-600">Time Taken</div>
              <div className="flex items-center justify-center mt-1">
                <Clock className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium">Efficient!</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {getScoreMessage(percentage)}
            </h3>
            <p className="text-gray-600">
              {percentage >= 80 
                ? "You've mastered this topic! Ready for the next challenge?"
                : "Review the explanations below and try again to improve your score."
              }
            </p>
          </div>

          {/* Answer Review */}
          <div className="text-left mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Your Answers</h4>
            <div className="space-y-4">
              {selectedQuiz.questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer?.correct;
                
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                        {isCorrect ? 
                          <CheckCircle className="w-5 h-5 text-green-600" /> :
                          <XCircle className="w-5 h-5 text-red-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question}
                        </h5>
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Your answer:</span> {
                            userAnswer ? question.options[userAnswer.selectedAnswer] : 'Not answered'
                          }
                        </div>
                        {!isCorrect && (
                          <div className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Correct answer:</span> {question.options[question.correct]}
                          </div>
                        )}
                        <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => startQuiz(selectedQuiz)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </button>
            <button
              onClick={resetQuiz}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Quiz Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedQuiz.title}</h2>
            <p className="text-gray-600">Question {currentQuestion + 1} of {selectedQuiz.questions.length}</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
              <Clock className="w-5 h-5 inline mr-1" />
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500">Time Remaining</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Target className="w-4 h-4 text-green-600 mr-1" />
              <span>Score: {score}/{currentQuestion}</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-yellow-500 mr-1" />
              <span>Streak: {streak}</span>
            </div>
          </div>
          <div className="text-gray-500">
            {selectedQuiz.difficulty} • {selectedQuiz.category}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {selectedQuiz.questions[currentQuestion].question}
        </h3>

        <div className="space-y-3 mb-8">
          {selectedQuiz.questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                <span className="ml-2">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={resetQuiz}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Exit Quiz
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === ''}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-8 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {currentQuestion === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuiz;