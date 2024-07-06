import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FileContext } from './FileContext';
import { FileUpload } from './FileUpload';
import './style.scss';

export const LoadData = () => {
    const { setOriginalFileContent } = useContext(FileContext); // Update to use setOriginalFileContent
    const history = useHistory();

    const handleFileUpload = (uploadedFile) => {
        setOriginalFileContent(uploadedFile); // Update to setOriginalFileContent
        history.push('/actionitems');
    };

    return (
        <div>
            <br></br><br></br><br></br><br></br>

            <FileUpload onFileUpload={handleFileUpload} labelDescription={"Please upload csv file with a column named 'Feedback'"} />
        </div>
    );
};
