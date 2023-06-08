import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Landing from './pages/Landing/Landing';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import LoginPage from './pages/Login/LoginPage';

const languages = [
  {
    code:'en',
    name:'English',
    country_code:'fr'
  },
  {
    code:'ka',
    name:'ქართული',
    country_code:'ge'
  },
]

  function App() {
    const { t } = useTranslation();
  
    const releaseDate = new Date('2021-03-07')
    const timeDifference = new Date() - releaseDate
    const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return (
      <>
        <div className="container">
          <div className='d-flex justify-content-end'>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
              </button>
              <ul className="dropdown-menu">
                {languages.map(({code,name,country_code})=>{
                  <li key={country_code}>
                    <button className="dropdown-item">
                      {name} 
                    </button>
                  </li>
                })}

              </ul>
            </div>
          </div>
          <div className='d-flex flex-column align-items-start'>
            <h1 className='font-weight-normal mb-3'>{t('welcome_message')}</h1>
            <p>{t('days_since_release',{number_of_days})}</p>
          </div>
        </div>
      </>
    );
  }

// function App() {
//   const { t } = useTranslation();

//   return ( 
//     <>
    
//     <div className="container">
//       <div className='d-flex flex-column align-items-start'>
//         <h2>{t('welcome_message')}</h2>
//       </div>
//       {/* <Landing></Landing> */}
//       {/* <Router>
//         <Routes>
//           <Route exact path="/" element={<Landing />}>
//             <Route index element={<Home />} />
//             <Route path="about" element={<About />} />
//           </Route>
//           <Route path="/login" element={<LoginPage />}></Route>
//           {/* <Route path="/user" component={UserPage} />
//           <Route path="/admin" component={AdminPage} /> 
//           <Navigate to="/" /> 
//         </Routes>
//       </Router> */}
//     </div>
//     </>
    
//   );
// }

export default App;
