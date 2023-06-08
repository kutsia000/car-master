import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// import LanguageProvider from './components/Language/LanguageProvider';

import 'bootstrap/dist/js/bootstrap.js';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'flag-icon-css/css/flag-icons.css'

import './utils/i18n';

const loadingMarkup = (
  <div className='py-4 text-center'>
    <h3>Loading...</h3>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
