import { createContext, useState } from 'react';
import adminInstance from './AxiosInterceptor';

const AdminServiceContext = createContext();

const AdminService = ({ children }) => {
  const [error, setError] = useState(null);
  //const [blogs, setBlogs] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [review, setReview] = useState(null);

  const home = async () => {
    try {
      const response = await adminInstance.post('/Admin/Home');
      //console(response);
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        if (!isSuccess) {
          setError(message);
        }
        //console.log(code);
      }
    } catch (error) {
      setError(error);
    }
  };

  /////////////////////////
  ////////////Reviews
  /////////////////////////
  const getReviews = async (reqBody) => {
    try {
      const response = await adminInstance.post('/Reviews/GetReviews', reqBody);
      if (response.status === 200) {
        const { isSuccess, reviews, message } = response.data;
        if (!isSuccess) {
          setError(message);
          throw new Error('something went wrong');
        }

        setReviews(reviews);
      } else {
        setError(response.statusText);
        throw new Error('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const getReview = async (reqBody) => {
    try {
      const response = await adminInstance.post('/Reviews/GetReviewById', reqBody);
      if (response.status === 200) {
        const { isSuccess, review } = response.data;
        if (!isSuccess) throw new Error('??');

        setReview(review);
      } else {
        setError(response.statusText);
        throw new Error('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const getLastThreeReviews = async (reqBody) => {
    try {
      const response = await adminInstance.post('/Reviews/GetLastThree', reqBody);
      if (response.status === 200) {
        const { isSuccess, reviews, message } = response.data;
        if (!isSuccess) {
          setError(message);
          throw new Error(message);
        }
        setReviews(reviews);
      } else {
        setError(response.statusText);
        throw new Error('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const addReview = async (reqBody) => {
    try {
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AdminServiceContext.Provider
      value={{ home, getReviews, getReview, getLastThreeReviews, error, reviews, review }}
    >
      {children}
    </AdminServiceContext.Provider>
  );
};

export { AdminService, AdminServiceContext };
