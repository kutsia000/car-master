import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Landing from './pages/Landing/Landing';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import LoginPage from './pages/Login/LoginPage';

function App() {
  const { t, i18n } = useTranslation();

  //console.log();
  const lang = i18n.language;

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column align-items-start">
          <h1 className="font-weight-normal mb-3">{t('welcome_message')}</h1>
          <Router>
            <Routes>
              <Route path={`/${lang}`} element={<Landing />}>
                <Route index element={<Home />} />
                <Route path={`/${lang}/about`} element={<About />} />
              </Route>
              <Route path={`/${lang}/login`} element={<LoginPage />} />
              <Route path="*" element={<Navigate to={`/${lang}`} />} />
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
