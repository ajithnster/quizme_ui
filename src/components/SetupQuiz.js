import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './style.scss';
import { Quiz } from './Quiz';
import {
    Button,
} from '@carbon/react';

export const SetupQuiz = () => {
    const [llm, setLLM] = useState('openai');
    const [sections] = useState([
        "Variables and Data Types",
        "Operators and Control Flow",
        "Functions and Methods",
        "Arrays and Collections",
        "Object-Oriented Programming",
        "Exception Handling",
        "Multithreading",
        "File Input/Output",
        "Networking",
        "GUI Programming"
    ]);
    const [selectedSections, setSelectedSections] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [showQuestions, setShowQuestions] = useState(false);

    const addSections = useCallback(async () => {
        try {
            const payload = { sections };
            console.log('Adding sections:', payload);
            await axios.post('http://127.0.0.1:8080/api/add_sections', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error adding sections:', error.response ? error.response.data : error.message);
        }
    }, [sections]);

    useEffect(() => {
        addSections(); // Automatically add sections on mount
    }, [addSections]);

    const handleLLMChange = (event) => {
        setLLM(event.target.value);
    };

    const handleSectionChange = (event) => {
        const { value, checked } = event.target;
        setSelectedSections(prev =>
            checked ? [...prev, value] : prev.filter(section => section !== value)
        );
    };

    const fetchQuestions = async () => {
        try {
            await axios.post('http://127.0.0.1:8080/api/set_llm', { llm });
            const response = await axios.post('http://127.0.0.1:8080/api/questions', { sections: selectedSections });
            setQuestions(response.data);
            setShowQuestions(true);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    return (
        <div>
            <h1>Select LLM and Sections to Start Quiz</h1>
            <div>
                <label>
                    Select LLM:
                    <select value={llm} onChange={handleLLMChange}>
                        <option value="openai">OpenAI</option>
                        <option value="watsonx">Watsonx</option>
                    </select>
                </label>
            </div>
            <div>
                <h2>Select Sections</h2>
                <br />
                {sections.map(section => (
                    <div key={section}>
                        <label>
                            <input
                                type="checkbox"
                                value={section}
                                onChange={handleSectionChange}
                            />
                            {section}
                        </label>
                    </div>
                ))}
            </div>
            <br />
            <Button onClick={fetchQuestions}>Fetch Questions</Button>
            {showQuestions && questions.length > 0 && <Quiz questions={questions} />}
        </div>
    );
};
