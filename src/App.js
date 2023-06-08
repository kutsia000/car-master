import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import Landing from './pages/Landing/Landing';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import LoginPage from './pages/Login/LoginPage';
import {pathToRegexp, compile, parse } from "path-to-regexp";


  function App() {
    const {t}=useTranslation();

    //const location = useLocation();
    const lang = 'en'
    let loc=window.location.pathname;

    if(loc.length<2){
      loc+=lang;
    }

    console.log(loc);
    const changeLanguage = (lng) => {
      
      const currentPath = window.location;
      const newPath = `/${lng}${currentPath.substring(3)}`;
      i18next.changeLanguage(lng);
      //return <Navigate to={newPath} />;
    };
    // if (lang != match.params.locale) {
    //   changeLanguage(match.params.locale);
    // }

    return (
      <>
        <div className="container">
          <div className='d-flex flex-column align-items-start'>
            <h1 className='font-weight-normal mb-3'>{t('welcome_message')}</h1>
            {/* <p>{t('days_since_release',{number_of_days})}</p> */}
            <Router>
              <Routes>
                <Route path="/:lang" element={<Landing/>}>
                </Route>
                <Route path="/:lang/about" element={<About />} />
                {/* <Route exact path="/:lang" element={<Landing/>}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                </Route> */}
              </Routes>
            </Router>
          </div>
        </div>
      </>
    );
  }

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
