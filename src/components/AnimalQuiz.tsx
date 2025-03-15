'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Animal } from '@/types/animal';

interface QuizQuestion {
  id: string;
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
}

interface QuizResult {
  correct: number;
  incorrect: number;
  total: number;
  score: number;
  maxScore: number;
  questionsWithAnswers: {
    question: QuizQuestion;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}

interface AnimalQuizProps {
  allAnimals: Animal[];
  difficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export const AnimalQuiz = ({
  allAnimals,
  difficulty,
  onDifficultyChange
}: AnimalQuizProps) => {
  // State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCategory, setQuizCategory] = useState<string>('all');
  const [numQuestions, setNumQuestions] = useState<number>(10);
  
  // Sounds
  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.5 });
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: 0.5 });
  const [playComplete] = useSound('/sounds/quiz-complete.mp3', { volume: 0.5 });
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Generate questions based on animals data
  const generateQuizQuestions = useCallback(() => {
    setIsLoading(true);
    
    // Filter animals by category if specified
    let filteredAnimals = [...allAnimals];
    if (quizCategory !== 'all') {
      filteredAnimals = filteredAnimals.filter(animal => animal.category === quizCategory);
      
      // If not enough animals in category, revert to all
      if (filteredAnimals.length < numQuestions * 4) {
        filteredAnimals = [...allAnimals];
      }
    }
    
    // Shuffle animals
    const shuffledAnimals = [...filteredAnimals].sort(() => Math.random() - 0.5);
    
    // Define question types and their generation functions
    const questionTypes = [
      // Identification questions
      (animal: Animal): QuizQuestion => ({
        id: `id-${animal.id}`,
        question: `What animal is shown in the image?`,
        imageUrl: animal.imageUrls.main,
        options: generateOptions(animal.name, shuffledAnimals.map(a => a.name)),
        correctAnswer: animal.name,
        explanation: `This is a ${animal.name} (${animal.scientificName}). ${animal.description.substring(0, 100)}...`,
        difficulty: 'easy',
        category: 'identification',
        points: 1
      }),
      
      // Habitat questions
      (animal: Animal): QuizQuestion => ({
        id: `habitat-${animal.id}`,
        question: `Which habitat is the primary environment for the ${animal.name}?`,
        imageUrl: animal.imageUrls.main,
        options: generateOptions(
          animal.habitat && animal.habitat.length > 0 ? animal.habitat[0] : 'Unknown', 
          shuffledAnimals.flatMap(a => a.habitat || [])
        ),
        correctAnswer: animal.habitat && animal.habitat.length > 0 ? animal.habitat[0] : 'Unknown',
        explanation: `The ${animal.name} primarily lives in ${animal.habitat ? animal.habitat.join(', ') : 'various habitats'}.`,
        difficulty: 'medium',
        category: 'habitat',
        points: 2
      }),
      
      // Diet questions
      (animal: Animal): QuizQuestion => ({
        id: `diet-${animal.id}`,
        question: `What is the diet of the ${animal.name}?`,
        imageUrl: animal.imageUrls.main,
        options: generateOptions(animal.diet || 'Unknown', shuffledAnimals.map(a => a.diet || 'Unknown')),
        correctAnswer: animal.diet || 'Unknown',
        explanation: `The ${animal.name} is ${animal.diet ? animal.diet.toLowerCase() : 'unknown'}.`,
        difficulty: 'medium',
        category: 'diet',
        points: 2
      }),
      
      // Facts questions
      (animal: Animal): QuizQuestion => {
        // Check if funFacts exists and has items
        if (!animal.funFacts || animal.funFacts.length === 0) {
          // Return a fallback question about the animal's name when no facts are available
          return {
            id: `name-${animal.id}`,
            question: `What is the scientific name of this animal?`,
            imageUrl: animal.imageUrls.main,
            options: generateOptions(animal.scientificName || 'Unknown', shuffledAnimals.map(a => a.scientificName || 'Unknown')),
            correctAnswer: animal.scientificName || 'Unknown',
            explanation: `The scientific name of the ${animal.name} is ${animal.scientificName || 'unknown'}.`,
            difficulty: 'medium',
            category: 'taxonomy',
            points: 2
          };
        }
        
        const fact = animal.funFacts[Math.floor(Math.random() * animal.funFacts.length)];
        return {
          id: `fact-${animal.id}`,
          question: `Which animal is known for this fact: "${fact}"?`,
          options: generateOptions(animal.name, shuffledAnimals.map(a => a.name)),
          correctAnswer: animal.name,
          explanation: `The ${animal.name} is known for this characteristic. ${animal.description ? animal.description.substring(0, 100) + '...' : ''}`,
          difficulty: 'hard',
          category: 'facts',
          points: 3
        };
      },
      
      // Conservation status questions
      (animal: Animal): QuizQuestion => ({
        id: `conservation-${animal.id}`,
        question: `What is the conservation status of the ${animal.name}?`,
        imageUrl: animal.imageUrls.main,
        options: generateOptions(
          animal.conservationStatus || 'Unknown', 
          ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild', 'Extinct', 'Unknown']
        ),
        correctAnswer: animal.conservationStatus || 'Unknown',
        explanation: `The ${animal.name} is currently classified as ${animal.conservationStatus || 'Unknown'}.`,
        difficulty: 'hard',
        category: 'conservation',
        points: 3
      }),
    ];
    
    // Generate questions based on difficulty
    const difficultyFilter = (q: QuizQuestion) => {
      if (difficulty === 'easy') return q.difficulty === 'easy';
      if (difficulty === 'medium') return q.difficulty === 'easy' || q.difficulty === 'medium';
      return true; // hard includes all difficulties
    };
    
    // Generate questions
    const generatedQuestions: QuizQuestion[] = [];
    
    // Take a subset of animals for the quiz
    const quizAnimals = shuffledAnimals.slice(0, Math.min(numQuestions * 2, shuffledAnimals.length));
    
    quizAnimals.forEach(animal => {
      const applicableQuestionTypes = questionTypes.filter((_, index) => {
        // For harder difficulty levels, include more complex question types
        if (difficulty === 'easy') return index < 2;
        if (difficulty === 'medium') return index < 4;
        return true;
      });
      
      // Randomly select a question type for this animal
      const questionGenerator = applicableQuestionTypes[Math.floor(Math.random() * applicableQuestionTypes.length)];
      generatedQuestions.push(questionGenerator(animal));
    });
    
    // Filter by difficulty and shuffle
    const filteredQuestions = generatedQuestions
      .filter(difficultyFilter)
      .sort(() => Math.random() - 0.5)
      .slice(0, numQuestions);
      
    setQuestions(filteredQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizResult(null);
    setIsLoading(false);
    setQuizStarted(true);
  }, [allAnimals, difficulty, quizCategory, numQuestions]);
  
  // Generate options for multiple choice questions
  const generateOptions = (correctAnswer: string, possibleOptions: string[]): string[] => {
    // Remove duplicates and the correct answer from possible options
    const uniqueOptions = Array.from(new Set(possibleOptions)).filter(opt => 
      opt !== correctAnswer && opt.trim() !== '');
    
    // Shuffle and take 3 wrong options
    const wrongOptions = uniqueOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // Combine with correct answer and shuffle
    return [correctAnswer, ...wrongOptions]
      .sort(() => Math.random() - 0.5);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };
  
  // Submit answer
  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      
      // Play sound
      if (isCorrect) {
        playCorrect();
      } else {
        playIncorrect();
      }
      
      setIsAnswerSubmitted(true);
    }
  };
  
  // Go to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz completed, calculate results
      finishQuiz();
    }
  };
  
  // Finish quiz and show results
  const finishQuiz = () => {
    const questionsWithAnswers = questions.map((question, index) => {
      let userAnswer = '';
      let isCorrect = false;
      
      // Only the current question has a selected answer
      if (index === currentQuestionIndex) {
        userAnswer = selectedAnswer || '';
        isCorrect = userAnswer === question.correctAnswer;
      }
      
      return {
        question,
        userAnswer,
        isCorrect
      };
    });
    
    const correct = questionsWithAnswers.filter(q => q.isCorrect).length;
    const total = questions.length;
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const score = questionsWithAnswers.reduce((sum, q) => sum + (q.isCorrect ? q.question.points : 0), 0);
    
    setQuizResult({
      correct,
      incorrect: total - correct,
      total,
      score,
      maxScore,
      questionsWithAnswers
    });
    
    playComplete();
  };
  
  // Restart quiz
  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuizResult(null);
  };
  
  // Categories derived from all animals
  const categories = [
    { id: 'all', name: 'All Categories' },
    ...Array.from(new Set(allAnimals.map(animal => animal.category)))
      .map(category => {
        const categoryInfo = allAnimals.find(a => a.category === category);
        return {
          id: category,
          name: categoryInfo ? categoryInfo.category : category
        };
      })
  ];
  
  return (
    <div className="animal-quiz">
      {!quizStarted ? (
        <div className="quiz-setup space-y-6">
          <h2 className="text-2xl font-bold text-center">Animal Knowledge Quiz</h2>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Test your knowledge about animals with this interactive quiz. Choose your settings and begin!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="difficulty" className="block mb-2">Difficulty Level</Label>
              <Select 
                value={difficulty}
                onValueChange={onDifficultyChange}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="category" className="block mb-2">Category</Label>
              <Select 
                value={quizCategory}
                onValueChange={setQuizCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="questions" className="block mb-2">Number of Questions</Label>
              <Select 
                value={numQuestions.toString()}
                onValueChange={(value) => setNumQuestions(parseInt(value))}
              >
                <SelectTrigger id="questions">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600"
              onClick={generateQuizQuestions}
              disabled={isLoading}
            >
              {isLoading ? 'Generating Quiz...' : 'Start Quiz'}
            </Button>
          </div>
        </div>
      ) : quizResult ? (
        <div className="quiz-results space-y-6">
          <h2 className="text-2xl font-bold text-center">Quiz Results</h2>
          
          <div className="results-summary grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">{quizResult.correct}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Correct Answers</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  {Math.round((quizResult.score / quizResult.maxScore) * 100)}%
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Score Percentage</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {quizResult.score}/{quizResult.maxScore}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Points</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleRestartQuiz}
            >
              Try Another Quiz
            </Button>
          </div>
        </div>
      ) : (
        <div className="quiz-active">
          <div className="quiz-progress mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <Badge variant="outline">
                {currentQuestion.difficulty === 'easy' ? 'Easy' : 
                 currentQuestion.difficulty === 'medium' ? 'Medium' : 'Hard'} 
                ({currentQuestion.points} pt{currentQuestion.points !== 1 ? 's' : ''})
              </Badge>
            </div>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />
          </div>
          
          <div className="question-container space-y-6">
            <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
            
            {currentQuestion.imageUrl && (
              <div className="relative h-64 w-full md:w-2/3 mx-auto rounded-lg overflow-hidden">
                <Image 
                  src={currentQuestion.imageUrl} 
                  alt="Question Image" 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
            )}
            
            <div className="options-container">
              <RadioGroup value={selectedAnswer || ''} onValueChange={handleAnswerSelect}>
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option) => (
                    <div key={option} className="relative">
                      <div 
                        className={`
                          flex items-center space-x-2 p-4 rounded-lg border-2 
                          ${!isAnswerSubmitted ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : 'cursor-default'}
                          ${selectedAnswer === option && !isAnswerSubmitted ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}
                          ${isAnswerSubmitted && option === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                          ${isAnswerSubmitted && selectedAnswer === option && option !== currentQuestion.correctAnswer ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
                        `}
                      >
                        <RadioGroupItem 
                          value={option} 
                          id={`option-${option}`} 
                          disabled={isAnswerSubmitted} 
                          className="hidden"
                        />
                        <Label htmlFor={`option-${option}`} className="w-full cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`p-4 rounded-lg ${
                    selectedAnswer === currentQuestion.correctAnswer 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                      : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                  }`}
                >
                  <h4 className="font-semibold mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!'}
                  </h4>
                  <p>{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex justify-end">
              {!isAnswerSubmitted ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalQuiz;
