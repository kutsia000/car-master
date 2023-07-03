import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Landing from './pages/Landing/Landing';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import LoginPage from './pages/Login/LoginPage';
import AdminDashboard from './pages/Admin/AdminPage';
import DealerDashboard from './pages/Dealer/DealerPage';

function App() {
  const { i18n } = useTranslation();

  const lang = i18n.language;

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column align-items-start">
          {/* <h1 className="font-weight-normal mb-3">{t('welcome_message')}</h1> */}
          <Router>
            <Routes>
              <Route path={`/${lang}`} element={<Landing />}>
                <Route index element={<Home />} />
                <Route path={`/${lang}/about`} element={<About />} />
              </Route>
              <Route path={`/${lang}/login`} element={<LoginPage />} />
              <Route path={`/${lang}/dealer/dashboard`} element={<DealerDashboard />} />
              <Route path={`/${lang}/admin/dashboard`} element={<AdminDashboard />} />

              <Route path="*" element={<Navigate to={`/${lang}`} />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
