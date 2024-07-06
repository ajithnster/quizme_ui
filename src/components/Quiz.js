import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    RadioButton
} from '@carbon/react';

export const Quiz = ({ questions, endQuiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [mode, setMode] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [loadingExplanation, setLoadingExplanation] = useState(false); // New state for loading indicator

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerChange = (value) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = value;
        setUserAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowAnswer(false);
            setShowExplanation(false); // Reset explanation visibility on next question
        } else {
            alert('Review completed!');
            endQuiz();
        }
    };

    const handleSubmitAnswer = () => {
        setShowAnswer(true);
    };

    const handleStartQuiz = (selectedMode) => {
        setMode(selectedMode);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowExplanation(false);
    };

    const handleExplanation = async () => {
        setLoadingExplanation(true); // Start loading indicator
        try {
            const response = await axios.post('http://63.250.56.78/:8081/api/explanation', {
                question: currentQuestion.question,
                options: currentQuestion.options,
                answer: currentQuestion.correct
            });
            setExplanation(response.data.explanation);
            setShowExplanation(true);
        } catch (error) {
            console.error('Error fetching explanation:', error);
        } finally {
            setLoadingExplanation(false); // Stop loading indicator
        }
    };

    return (
        <div>
            {mode === '' ? (
                <div>
                    <br /><br /><br /><br />
                    <h2>Select Mode</h2>
                    <Button onClick={() => handleStartQuiz('test')}>Test Mode</Button>
                    <Button onClick={() => handleStartQuiz('review')}>Review Mode</Button>
                </div>
            ) : (
                <div>
                    {mode === 'test' && (
                        <div>
                            <br /><br /><br /><br />
                            <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
                            <br />
                            <p>{currentQuestion.question}</p>
                            <br />
                            {currentQuestion.options.map((option, index) => (
                                <div key={index}>
                                    <RadioButton
                                        labelText={option}
                                        name={`question-${currentQuestionIndex}`}
                                        value={option}
                                        checked={userAnswers[currentQuestionIndex] === option}
                                        onChange={() => handleAnswerChange(option)}
                                        disabled={showAnswer}
                                    />
                                </div>
                            ))}
                            {showAnswer && (
                                <div>
                                    <p>Your Answer: {userAnswers[currentQuestionIndex]}</p>
                                    <p>Correct Answer: {currentQuestion.correct}</p>
                                </div>
                            )}
                            <br />
                            <Button onClick={handleNextQuestion}>
                                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                            </Button>
                        </div>
                    )}
                    {mode === 'review' && (
                        <div>
                            <br /><br /><br /><br />
                            <h2>Review Mode - Question {currentQuestionIndex + 1} of {questions.length}</h2>
                            <br /><br />
                            <p>{currentQuestion.question}</p>
                            <br />
                            {currentQuestion.options.map((option, index) => (
                                <div key={index}>
                                    <RadioButton
                                        labelText={option}
                                        name={`question-${currentQuestionIndex}`}
                                        value={option}
                                        checked={userAnswers[currentQuestionIndex] === option}
                                        onChange={() => handleAnswerChange(option)}
                                        disabled={showAnswer}
                                    />
                                </div>
                            ))}
                            {showAnswer && (
                                <div>
                                    <p>Your Answer: {userAnswers[currentQuestionIndex]}</p>
                                    <p>Correct Answer: {currentQuestion.correct}</p>
                                    <button onClick={handleExplanation} disabled={loadingExplanation}>
                                        Explanation
                                    </button>
                                    {loadingExplanation ? (
                                        <p>Please wait while I get the explanation from watsonx...</p>
                                    ) : (
                                        showExplanation && (
                                            <div>
                                                <p>Explanation: {explanation}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                            <br /><br />
                            <Button onClick={showAnswer ? handleNextQuestion : handleSubmitAnswer}>
                                {currentQuestionIndex < questions.length - 1 ? (showAnswer ? 'Next' : 'Submit') : 'Finish'}
                            </Button>
                        </div>
                    )}
                    <br /><br />
                    <Button onClick={endQuiz}>End Quiz</Button>
                </div>
            )}
        </div>
    );
};
