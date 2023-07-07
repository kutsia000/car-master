import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Landing from './pages/Landing/Landing';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import LoginPage from './pages/Login/LoginPage';
import AdminDashboard from './pages/Admin/AdminPage';
import DealerDashboard from './pages/Dealer/DealerPage';
import EmployeeDashboard from './pages/Employee/EmployeePage';
import Reviews from './containers/Reviews/Reviews';
import Review from './containers/Reviews/Review';

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
              <Route path={`/${lang}/admin/dashboard`} element={<AdminDashboard />}>
                <Route path={`/${lang}/admin/dashboard/reviews`} element={<Reviews />} />
                <Route path={`/${lang}/admin/dashboard/review/:reviewId`} element={<Review />} />
              </Route>
              <Route path={`/${lang}/employee/dashboard`} element={<EmployeeDashboard />} />

              <Route path="*" element={<Navigate to={`/${lang}`} />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
