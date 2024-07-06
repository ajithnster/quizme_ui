import React, { createContext, useState } from 'react';

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [originalFile, setOriginalFile] = useState(null);
  const [originalFileContent, setOriginalFileContent] = useState([]);
  const [processedFileContent, setProcessedFileContent] = useState([]);

  return (
    <FileContext.Provider value={{ 
      originalFile, setOriginalFile, 
      originalFileContent, setOriginalFileContent, 
      processedFileContent, setProcessedFileContent 
    }}>
      {children}
    </FileContext.Provider>
  );
};
