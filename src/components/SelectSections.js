import { useState, useEffect } from 'react';
import axios from 'axios';
import { Quiz } from './Quiz';
import {
    Button,
    Checkbox,
} from '@carbon/react';

export const SelectSections = () => {
    const [sections, setSections] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const response = await axios.get('http://63.250.56.78:8081/api/sections');
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const handleSectionChange = (checked, id) => {
        console.log('Checked:', checked);
        console.log('ID:', id);

        // Extract the correct value based on the logged properties
        const value = id.id.replace('checkbox-', '');

        console.log('Extracted Value:', value);

        setSelectedSections(
            checked ? [...selectedSections, value] : selectedSections.filter(section => section !== value)
        );
    };


    const startQuiz = async () => {
        try {
            console.log("Selected Sections:", selectedSections);
            const response = await axios.post('http://63.250.56.78:8081/queen', { sections: selectedSections });
            setQuestions(response.data);
            setQuizStarted(true);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const endQuiz = () => {
        setQuizStarted(false);
        setSelectedSections([]);
    };

    return (
        <div>
            {!quizStarted ? (
                <>
                    <br /><br /><br />
                    <h1>Select Sections to Start Quiz</h1>
                    <br />
                    <div>
                        {sections.map(section => (
                            <div key={section}>
                                <Checkbox
                                    id={`checkbox-${section}`}
                                    labelText={section}
                                    value={section}
                                    onChange={(checked, id, event) => handleSectionChange(checked, id)}
                                />
                            </div>
                        ))}

                    </div>
                    <br /><br />
                    <Button onClick={startQuiz}>Start Quiz</Button>
                </>
            ) : (
                <Quiz questions={questions} endQuiz={endQuiz} />
            )}
        </div>
    );
};
