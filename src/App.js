import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import NotFound from './pages/NotFound';
import Blogs from './containers/Blog/Blogs';
import Blog from './containers/Blog/Blog';
import Notifications from './containers/Notification/Notifications';
import Notification from './containers/Notification/Notification';
import CarMarks from './containers/CarMarks/CarMarks';
import CarMark from './containers/CarMarks/CarMark';
import CarModels from './containers/CarModels/CarModels';
import CarModel from './containers/CarModels/CarModel';

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
              <Route path="/" element={<Landing />} />
              <Route path={`/${lang}`} element={<Landing />}>
                <Route index element={<Home />} />
                <Route path={`/${lang}/about`} element={<About />} />
              </Route>
              <Route path={`/${lang}/login`} element={<LoginPage />} />
              <Route path={`/${lang}/dealer/dashboard`} element={<DealerDashboard />} />
              <Route path={`/${lang}/admin/dashboard`} element={<AdminDashboard />}>
                <Route path={`/${lang}/admin/dashboard/reviews`} element={<Reviews />} />
                <Route path={`/${lang}/admin/dashboard/review/:reviewId`} element={<Review />} />
                <Route path="review/*" element={<Review />} />
                <Route path={`/${lang}/admin/dashboard/blogs`} element={<Blogs />} />
                <Route path={`/${lang}/admin/dashboard/blog/:blogId`} element={<Blog />} />
                <Route path="blog/*" element={<Blog />} />
                <Route
                  path={`/${lang}/admin/dashboard/notifications`}
                  element={<Notifications />}
                />
                <Route
                  path={`/${lang}/admin/dashboard/notification/:notificationId`}
                  element={<Notification />}
                />
                <Route path="notification/*" element={<Notification />} />
                <Route path={`/${lang}/admin/dashboard/carmarks`} element={<CarMarks />} />
                <Route path={`/${lang}/admin/dashboard/carmark/:carmarkId`} element={<CarMark />} />
                <Route path="carmark/*" element={<CarMark />} />
                <Route path={`/${lang}/admin/dashboard/carmodels`} element={<CarModels />} />
                <Route
                  path={`/${lang}/admin/dashboard/carmodel/:carmodelId`}
                  element={<CarModel />}
                />
                <Route path="carmodel/*" element={<CarModel />} />
              </Route>
              <Route path={`/${lang}/employee/dashboard`} element={<EmployeeDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
