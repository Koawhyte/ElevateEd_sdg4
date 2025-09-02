import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Zap, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  Download,
  Share2,
  Copy,
  Lightbulb,
  Target,
  Clock
} from 'lucide-react';

const LensFeature = ({ user }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        analyzeImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = (imageData) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        type: 'Math Problem',
        confidence: 94,
        problem: 'Solve for x: 2x + 5 = 13',
        solution: {
          steps: [
            {
              step: 1,
              description: 'Subtract 5 from both sides',
              equation: '2x + 5 - 5 = 13 - 5',
              result: '2x = 8'
            },
            {
              step: 2,
              description: 'Divide both sides by 2',
              equation: '2x ÷ 2 = 8 ÷ 2',
              result: 'x = 4'
            }
          ],
          finalAnswer: 'x = 4',
          explanation: 'This is a linear equation. We isolate the variable x by performing inverse operations on both sides of the equation.',
          relatedConcepts: ['Linear Equations', 'Algebraic Manipulation', 'Inverse Operations'],
          difficulty: 'Beginner',
          timeToSolve: '2-3 minutes'
        },
        additionalResources: [
          {
            title: 'Linear Equations Masterclass',
            type: 'Video',
            duration: '45 min',
            rating: 4.8
          },
          {
            title: 'Algebra Practice Problems',
            type: 'Worksheet',
            pages: 12,
            rating: 4.6
          }
        ],
        tips: [
          'Always perform the same operation on both sides of the equation',
          'Work step by step to avoid errors',
          'Check your answer by substituting back into the original equation'
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    const mockCameraImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3ECamera Captured Image%3C/text%3E%3C/svg%3E";
    setUploadedImage(mockCameraImage);
    setShowCamera(false);
    analyzeImage(mockCameraImage);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Camera className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Lens Feature</h1>
            <p className="text-purple-100 text-lg">Snap, analyze, and learn instantly with AI-powered homework help</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <Zap className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Instant Analysis</h3>
            <p className="text-sm text-purple-100">Get solutions in seconds</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <BookOpen className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Step-by-Step Solutions</h3>
            <p className="text-sm text-purple-100">Understand the process</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <Target className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Related Resources</h3>
            <p className="text-sm text-purple-100">Learn more with curated content</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      {!uploadedImage && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Upload Your Problem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Camera Option */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
                 onClick={() => setShowCamera(true)}>
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Photo</h3>
              <p className="text-gray-600">Use your camera to capture the problem</p>
              <button className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                Open Camera
              </button>
            </div>

            {/* Upload Option */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
                 onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h3>
              <p className="text-gray-600">Select an image from your device</p>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Choose File
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Tips */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Tips for Best Results
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Ensure the text is clear and well-lit</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keep the camera steady and focused</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Include the entire problem in the frame</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Avoid shadows and reflections</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Camera</h2>
            
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center mb-6">
              <div className="text-center">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Camera preview would appear here</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setShowCamera(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCameraCapture}
                className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Section */}
      {uploadedImage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Uploaded Image */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Uploaded Image</h2>
            <div className="relative">
              <img 
                src={uploadedImage} 
                alt="Uploaded problem" 
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
              />
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setAnalysis(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">AI Analysis</h2>
            
            {isAnalyzing ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing your problem...</p>
                  <p className="text-sm text-gray-500 mt-2">This usually takes a few seconds</p>
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Problem Recognition */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">Problem Recognized</span>
                    <span className="text-sm text-green-700">({analysis.confidence}% confidence)</span>
                  </div>
                  <p className="text-green-800">{analysis.type}: {analysis.problem}</p>
                </div>

                {/* Step-by-Step Solution */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Solution</h3>
                  <div className="space-y-4">
                    {analysis.solution.steps.map((step, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                          <span className="font-medium text-gray-900">{step.description}</span>
                        </div>
                        <div className="ml-8">
                          <p className="text-gray-700 mb-1">{step.equation}</p>
                          <p className="font-semibold text-blue-600">{step.result}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Final Answer</span>
                    </div>
                    <p className="text-xl font-bold text-blue-600">{analysis.solution.finalAnswer}</p>
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Explanation</h3>
                  <p className="text-gray-700 mb-4">{analysis.solution.explanation}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Difficulty:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        analysis.solution.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        analysis.solution.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysis.solution.difficulty}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Time to solve:</span>
                      <span className="ml-2 text-gray-700">{analysis.solution.timeToSolve}</span>
                    </div>
                  </div>
                </div>

                {/* Related Concepts */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Related Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.solution.relatedConcepts.map((concept, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(analysis.solution.finalAnswer)}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Answer</span>
                  </button>
                  <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Additional Resources */}
      {analysis && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Learning Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {analysis.additionalResources.map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span>{resource.type}</span>
                  <span>{resource.duration || `${resource.pages} pages`}</span>
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{resource.rating}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  View Resource
                </button>
              </div>
            ))}
          </div>

          {/* Study Tips */}
          <div className="bg-yellow-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Study Tips
            </h3>
            <ul className="space-y-2">
              {analysis.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2 text-yellow-800">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LensFeature;