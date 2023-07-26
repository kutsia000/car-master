import { createContext, useState } from 'react';
import landginApi from './landingApi';

const LandingServiceContext = createContext();

const LandingService = ({ children }) => {
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [blog, setBlog] = useState(null);
  const [success, setSuccess] = useState(true);
  const [recordsCount, setRecordsCount] = useState(0);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  function jsonToFormData(data) {
    const formData = new FormData();

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];

        if (Array.isArray(value)) {
          for (let item of value) {
            if (item instanceof File) {
              formData.append(key, item);
            } else {
              formData.append(key, JSON.stringify(value));
            }
          }
        } else {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }
      }
    }

    return formData;
  }

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

  const getBlogs = async (reqBody) => {
    try {
      const response = await landginApi.get('/Landing/GetBlogs', { params: reqBody });
      if (response.status === 200) {
        const { isSuccess, message, blogs, recordsCount } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setBlogs(blogs);
          setRecordsCount(recordsCount);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const getBlogById = async (reqBody) => {
    try {
      const response = await landginApi.get('/Landing/GetBlogById', { params: reqBody });
      if (response.status === 200) {
        const { isSuccess, blog, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setBlog(blog);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addDealerRequest = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await landginApi.post('/BecomeDealer/AddBecomeDealerRequest', fData, config);
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setError(error);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <LandingServiceContext.Provider
      value={{
        getLandingHome,
        getBlogs,
        getBlogById,
        addDealerRequest,
        error,
        reviews,
        blogs,
        blog,
        recordsCount,
        success,
      }}
    >
      {children}
    </LandingServiceContext.Provider>
  );
};

export { LandingService, LandingServiceContext };
