import React, { useState } from 'react';
import LanguageContext from '../../utils/LanguageContext';

const LanguageProvider = ({ defaultLanguage, children }) => {
  const [language, setLanguage] = useState(defaultLanguage);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
