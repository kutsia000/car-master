import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import About from './containers/About/About';
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
import AuctionsPage from './pages/Admin/AuctionsPage';
import LocationsPage from './pages/Admin/LocationsPage';
import PortsPage from './pages/Admin/Portspage';
import PriceListGroupsPage from './pages/Admin/PriceListGroupsPage';
import PriceListGroupLinesPage from './pages/Admin/PriceListGroupLinesPage';
import UsersPage from './pages/Admin/UsersPage';
import MyPriceListPage from './pages/Common/MyPriceListPage';
import CarsPage from './pages/Admin/CarsPage';
import DealerCarsPage from './pages/Dealer/DealerCarsPage';
import '../src/assets/styles/main.scss';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import CarInside from './containers/Cars/CarInside';
import CarInnerPage from './pages/CarInnerPage';

function App() {
  return (
    <>
      {/* <div className="container"> */}
      {/* <div className="d-flex flex-column align-items-start"> */}
      {/* <h1 className="font-weight-normal mb-3">{t('welcome_message')}</h1> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path={`/:lang?`}>
            <Route index element={<Home />} />
            <Route path={`/:lang/about`} element={<About />} />
            <Route path={`/:lang/contact`} element={<ContactPage />} />
            <Route path={`/:lang/blogs`} element={<LandingBlogs />} />
            <Route path={`/:lang/blogs/:blogId`} element={<LandingBlog />} />
            <Route path={`/:lang/becomedealer`} element={<BecomeDealerPage />} />
            <Route path={`/:lang/car`} element={<CarInside />} />
            <Route path={`/:lang/car/:vinCode`} element={<CarInside />} />
          </Route>
          <Route path={`/:lang/login`} element={<LoginPage />} />
          <Route path={`/:lang/dealer/dashboard`} element={<DealerDashboard />}>
            <Route path={`/:lang/dealer/dashboard/mypricelist`} element={<MyPriceListPage />} />
            <Route path={`/:lang/dealer/dashboard/cars`} element={<DealerCarsPage />} />
          </Route>
          <Route path={`/:lang/admin/dashboard`} element={<AdminDashboard />}>
            <Route path={`/:lang/admin/dashboard/reviews`} element={<ReviewsPage />} />
            <Route path={`/:lang/admin/dashboard/reviews/:reviewId`} element={<ReviewsPage />} />
            <Route path={`/:lang/admin/dashboard/blogs`} element={<BlogPage />} />
            <Route path={`/:lang/admin/dashboard/blogs/:blogId`} element={<BlogsPage />} />
            <Route path={`/:lang/admin/dashboard/notifications`} element={<NotificationsPage />} />
            <Route
              path={`/:lang/admin/dashboard/notifications/:notificationId`}
              element={<NotificationsPage />}
            />
            <Route path={`/:lang/admin/dashboard/carmarks`} element={<CarMarksPage />} />
            <Route path={`/:lang/admin/dashboard/carmarks/:carmarkId`} element={<CarMarksPage />} />
            <Route path={`/:lang/admin/dashboard/carmodels`} element={<CarModelsPage />} />
            <Route
              path={`/:lang/admin/dashboard/carmodels/:carmodelId`}
              element={<CarModelsPage />}
            />
            <Route path={`/:lang/admin/dashboard/dealerrequests`} element={<DealerRequests />} />
            <Route path={`/:lang/admin/dashboard/auctions`} element={<AuctionsPage />} />
            <Route path={`/:lang/admin/dashboard/auctions/:auctionId`} element={<AuctionsPage />} />
            <Route path={`/:lang/admin/dashboard/locations`} element={<LocationsPage />} />
            <Route
              path={`/:lang/admin/dashboard/locations/:locationId`}
              element={<LocationsPage />}
            />
            <Route path={`/:lang/admin/dashboard/ports`} element={<PortsPage />} />
            <Route path={`/:lang/admin/dashboard/ports/:portId`} element={<PortsPage />} />
            <Route
              path={`/:lang/admin/dashboard/pricelistgroups`}
              element={<PriceListGroupsPage />}
            />
            <Route
              path={`/:lang/admin/dashboard/pricelistgroups/:priceListGroupId`}
              element={<PriceListGroupsPage />}
            />
            <Route
              path={`/:lang/admin/dashboard/pricelistgrouplines`}
              element={<PriceListGroupLinesPage />}
            />
            <Route
              path={`/:lang/admin/dashboard/pricelistgrouplines/:lineId`}
              element={<PriceListGroupLinesPage />}
            />
            <Route path={`/:lang/admin/dashboard/users`} element={<UsersPage />} />
            <Route path={`/:lang/admin/dashboard/users/:userId`} element={<UsersPage />} />
            <Route path={`/:lang/admin/dashboard/cars`} element={<CarsPage />} />
            <Route path={`/:lang/admin/dashboard/cars/:carId`} element={<CarsPage />} />
            <Route path={`/:lang/admin/dashboard/mypricelist`} element={<MyPriceListPage />} />
          </Route>
          <Route path={`/:lang/employee/dashboard`} element={<EmployeeDashboard />}>
            <Route path={`/:lang/employee/dashboard`} element={<MyPriceListPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default App;
