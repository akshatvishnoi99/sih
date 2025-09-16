import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, Award, Clock } from 'lucide-react';

const QuizzesPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const quizzes = [
    {
      id: '1',
      title: 'Water Conservation Basics',
      description: 'Test your knowledge about water conservation techniques and their environmental impact.',
      totalPoints: 100,
      questions: [
        {
          id: '1',
          question: "What percentage of Earth's water is fresh water available for human use?",
          options: ['10%', '3%', '1%', '25%'],
          correctAnswer: 2,
          explanation: 'Less than 1% of Earth\'s water is fresh water that is accessible for human use. Most water is in oceans or frozen in ice caps.'
        },
        {
          id: '2',
          question: 'Which household activity typically uses the most water?',
          options: ['Showering', 'Toilet flushing', 'Laundry', 'Dishwashing'],
          correctAnswer: 1,
          explanation: 'Toilet flushing accounts for nearly 30% of household water use, making it the largest single use of water indoors.'
        },
        {
          id: '3',
          question: 'How much water can a running faucet waste per minute?',
          options: ['1 gallon', '2.5 gallons', '5 gallons', '0.5 gallons'],
          correctAnswer: 1,
          explanation: 'A running faucet can waste 2.5 gallons of water per minute, which adds up quickly!'
        },
        {
          id: '4',
          question: 'What is greywater?',
          options: ['Polluted river water', 'Wastewater from sinks and showers', 'Rainwater', 'Drinking water'],
          correctAnswer: 1,
          explanation: 'Greywater is wastewater from bathtubs, showers, bathroom sinks, and washing machines that can be recycled for irrigation.'
        }
      ]
    },
    {
      id: '2',
      title: 'Climate Change Fundamentals',
      description: 'Explore the science behind climate change and its global impacts.',
      totalPoints: 150,
      score: 125,
      completedAt: '2024-01-18',
      questions: [
        {
          id: '1',
          question: 'What is the primary greenhouse gas contributing to climate change?',
          options: ['Methane', 'Carbon Dioxide', 'Nitrous Oxide', 'Water Vapor'],
          correctAnswer: 1,
          explanation: 'While water vapor is the most abundant greenhouse gas, CO2 is the primary driver of human-caused climate change.'
        }
      ]
    },
    {
      id: '3',
      title: 'Renewable Energy Systems',
      description: 'Learn about different types of renewable energy and their benefits.',
      totalPoints: 120,
      questions: [
        {
          id: '1',
          question: 'Which renewable energy source has the fastest growing capacity worldwide?',
          options: ['Wind', 'Solar', 'Hydroelectric', 'Geothermal'],
          correctAnswer: 1,
          explanation: 'Solar energy has experienced the fastest growth in recent years due to decreasing costs and improving technology.'
        }
      ]
    }
  ];

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizScore(0);
  };

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!selectedQuiz) return;

    let score = 0;
    selectedQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score += selectedQuiz.totalPoints / selectedQuiz.questions.length;
      }
    });

    setQuizScore(Math.round(score));
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizScore(0);
  };

  // Quiz Taking Interface
  if (selectedQuiz && !showResults) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedQuiz.title}</h1>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Exit Quiz
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <div></div>
            <button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Interface
  if (showResults && selectedQuiz) {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === selectedQuiz.questions[index].correctAnswer
    ).length;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className="text-gray-600">
              Great job on completing "{selectedQuiz.title}"
            </p>
          </div>

          {/* Score */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {quizScore}/{selectedQuiz.totalPoints}
            </div>
            <p className="text-green-700 font-medium">
              {correctAnswers} out of {selectedQuiz.questions.length} questions correct
            </p>
          </div>

          {/* Question Review */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Review Your Answers
            </h3>
            <div className="space-y-4">
              {selectedQuiz.questions.map((question, index) => {
                const isCorrect =
                  selectedAnswers[index] === question.correctAnswer;
                const selectedOption = question.options[selectedAnswers[index]];
                const correctOption = question.options[question.correctAnswer];

                return (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">
                          {question.question}
                        </p>
                        <div className="text-sm">
                          <p
                            className={`mb-1 ${
                              isCorrect ? 'text-green-700' : 'text-red-700'
                            }`}
                          >
                            Your answer: {selectedOption}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-700 mb-2">
                              Correct answer: {correctOption}
                            </p>
                          )}
                          <p className="text-gray-600 italic">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz List Interface
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Environmental Quizzes
        </h1>
        <p className="text-gray-600">
          Test your environmental knowledge and earn points while learning!
        </p>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {quiz.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-green-600">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    {quiz.totalPoints} pts
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {quiz.questions.length} questions
                  </span>
                </div>
              </div>
            </div>

            {/* Score or Start Button */}
            {quiz.completedAt ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-medium">Completed</span>
                  <span className="text-green-600 font-semibold">
                    {quiz.score}/{quiz.totalPoints} pts
                  </span>
                </div>
              </div>
            ) : null}

            {/* Action Button */}
            <button
              onClick={() => startQuiz(quiz)}
              className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
                quiz.completedAt
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Brain className="h-4 w-4" />
              <span>{quiz.completedAt ? 'Retake Quiz' : 'Start Quiz'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzesPage;
