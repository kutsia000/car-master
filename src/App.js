import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Home from './containers/Home/Home';
import About from './containers/About/About';
import Contact from './containers/Contact/Contact';
import LandingBlogs from './containers/Blog/LandingBlogs';
import LoginPage from './pages/Login/LoginPage';
import AdminDashboard from './pages/Admin/AdminPage';
import DealerDashboard from './pages/Dealer/DealerPage';
import EmployeeDashboard from './pages/Employee/EmployeePage';
import ReviewsPage from './pages/Admin/ReviewsPage';
import NotFound from './pages/NotFound';
import BlogsPage from './pages/Admin/BlogsPage';
import NotificationsPage from './pages/Admin/NotificationsPage';
import CarMarksPage from './pages/Admin/CarMarksPage';
import CarModelsPage from './pages/Admin/CarModelsPage';
import LandingBlog from './containers/Blog/LandingBlog';
import BecomeDealerPage from './pages/Landing/BecomeDealerPage';
import DealerRequests from './containers/DealerRequests/DealerRequests';

function App() {
  return (
    <>
      <div className="container">
        <div className="d-flex flex-column align-items-start">
          {/* <h1 className="font-weight-normal mb-3">{t('welcome_message')}</h1> */}
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path={`/:lang`} element={<Landing />}>
                <Route index element={<Home />} />
                <Route path={`/:lang/about`} element={<About />} />
                <Route path={`/:lang/contact`} element={<Contact />} />
                <Route path={`/:lang/blogs`} element={<LandingBlogs />} />
                <Route path={`/:lang/blogs/:blogId`} element={<LandingBlog />} />
                <Route path={`/:lang/becomedealer`} element={<BecomeDealerPage />} />
              </Route>
              <Route path={`/:lang/login`} element={<LoginPage />} />
              <Route path={`/:lang/dealer/dashboard`} element={<DealerDashboard />} />
              <Route path={`/:lang/admin/dashboard`} element={<AdminDashboard />}>
                <Route path={`/:lang/admin/dashboard/reviews`} element={<ReviewsPage />} />
                <Route
                  path={`/:lang/admin/dashboard/reviews/:reviewId`}
                  element={<ReviewsPage />}
                />
                <Route path={`/:lang/admin/dashboard/blogs`} element={<BlogsPage />} />
                <Route path={`/:lang/admin/dashboard/blogs/:blogId`} element={<BlogsPage />} />
                <Route
                  path={`/:lang/admin/dashboard/notifications`}
                  element={<NotificationsPage />}
                />
                <Route
                  path={`/:lang/admin/dashboard/notifications/:notificationId`}
                  element={<NotificationsPage />}
                />
                <Route path={`/:lang/admin/dashboard/carmarks`} element={<CarMarksPage />} />
                <Route
                  path={`/:lang/admin/dashboard/carmarks/:carmarkId`}
                  element={<CarMarksPage />}
                />
                <Route path={`/:lang/admin/dashboard/carmodels`} element={<CarModelsPage />} />
                <Route
                  path={`/:lang/admin/dashboard/carmodels/:carmodelId`}
                  element={<CarModelsPage />}
                />
                <Route
                  path={`/:lang/admin/dashboard/dealerrequests`}
                  element={<DealerRequests />}
                />
              </Route>
              <Route path={`/:lang/employee/dashboard`} element={<EmployeeDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
