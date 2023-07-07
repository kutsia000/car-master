import { createContext, useState } from 'react';
import landginApi from './landingApi';

const LandingServiceContext = createContext();

const LandingService = ({ children }) => {
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [blog, setBlog] = useState(null);

  const getLandingHome = async (reqBody) => {
    try {
      const response = await landginApi.post('/Landing/Home', reqBody);
      if (response.status === 200) {
        const { isSuccess, message, reviews, blogs } = response.data;

        if (!isSuccess) {
          setError(message);
          throw new Error('something went wrong');
        }

        setReviews(reviews);
        setBlogs(blogs);
      } else {
        setError('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <LandingServiceContext.Provider value={{ getLandingHome, error, reviews, blogs }}>
      {children}
    </LandingServiceContext.Provider>
  );
};

export { LandingService, LandingServiceContext };
