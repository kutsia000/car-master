import { createContext, useState } from 'react';
import adminInstance from './AxiosInterceptor';

const AdminServiceContext = createContext();

const AdminService = ({ children }) => {
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [blog, setBlog] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [review, setReview] = useState(null);
  const [carMarks, setCarMarks] = useState(null);
  const [carMark, setCarMark] = useState(null);
  const [carModels, setCarModels] = useState(null);
  const [carModel, setCarModel] = useState(null);
  const [success, setSuccess] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [notification, setNotification] = useState(null);
  const [recordsCount, setRecordsCount] = useState(null);

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
              //var dt = JSON.stringify(value);
              // value.forEach((element) => {
              //   //console.log(element);
              //   formData.append(`${key}[]`, JSON.stringify(element));
              // });
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

  const home = async () => {
    try {
      const response = await adminInstance.post('/Admin/Home');
      //console.log(response);
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
  const getReviews = async () => {
    try {
      const response = await adminInstance.get('/Reviews/GetReviews');
      setError(null);
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
      const response = await adminInstance.get(`/Reviews/GetReviewById?id=${reqBody.id}`);
      setError(null);
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
      setError(null);
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
      const fData = jsonToFormData(reqBody);
      // for (let [key, value] of fData.entries()) {
      //   console.log(`${key}:`, value);
      // }
      const response = await adminInstance.post('/Reviews/AddReview', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, review, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setReview(review);
        }
        //return review;
      } else {
        setError(response.statusText);
        throw new Error('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const updateReview = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch('/Reviews/EditReview', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, review, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setReview(review);
        }
      } else {
        setError(response.statusText);
        throw new Error('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteReview = async (reqBody) => {
    try {
      const response = await adminInstance.delete(`/Reviews/DeleteReview?id=${reqBody.id}`);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setSuccess(true);
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  /////////////////////////
  ////////////Blogs
  /////////////////////////
  const getBlogs = async (reqBody) => {
    try {
      const response = await adminInstance.get('/Blogs/GetBlogs', { params: reqBody });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, blogs, message, recordsCount } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setRecordsCount(recordsCount);
          setBlogs(blogs);
          setSuccess(isSuccess);
        }
      } else {
        setError(response.statusText);
        throw new Error('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const getBlogsAllLanguages = async () => {
    try {
      const response = await adminInstance.get('/Blogs/GetBlogsAllLanguages', {}, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, blogs, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setSuccess(isSuccess);
          setBlogs(blogs);
        }
      } else {
        setError(response.statusText);
        throw new Error('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const getBlogById = async (reqBody) => {
    try {
      const response = await adminInstance.get('/Blogs/GetBlogById', { params: reqBody });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, blog, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setSuccess(isSuccess);
          setBlog(blog);
        }
      } else {
        setError(response.statusText);
        throw new Error('something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const getBlogByIdAllLanguages = async (id) => {
    try {
      const response = await adminInstance.get(`/Blogs/GetBlogByIdAllLanguages?id=${id}`);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, blog, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setSuccess(isSuccess);
          setBlog(blog);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await adminInstance.delete(`/Blogs/DeleteBlog?id=${id}`);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setSuccess(true);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addBlog = async (reqBody) => {
    try {
      var body = {
        id: reqBody.id,
        mainImage: reqBody.mainImage,
        images: reqBody.images,
        blogContents: reqBody.blogContents,
        //JSON.stringify(reqBody.blogContents),
      };
      const fData = jsonToFormData(body);
      // for (let [key, value] of fData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      const response = await adminInstance.post('/Blogs/AddBlog', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, blog, message } = response.data;
        if (!isSuccess) {
          setSuccess(false);
          setError(message);
        } else {
          setBlog(blog);
        }
      } else {
        setSuccess(false);
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const updateBlog = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      // for (let [key, value] of fData.entries()) {
      //   console.log(`${key}:`, value);
      // }
      const response = await adminInstance.patch('/Blogs/EditBlog', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, blog, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setBlog(blog);
        }
      } else {
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  /////////////////////////
  ////////////Notifications
  /////////////////////////
  const getNotifications = async () => {
    try {
      const response = await adminInstance.get('/Notification/GetNotifications');
      setError(null);
      if (response.status === 200) {
        const { isSuccess, notifications, message } = response.data;
        if (!isSuccess) {
          setError(message);
          setSuccess(isSuccess);
        } else {
          setNotifications(notifications);
          setSuccess(isSuccess);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const getNotificationById = async (id) => {
    try {
      const response = await adminInstance.get(`/Notification/GetNotificationById?id=${id}`);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, notification, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setNotification(notification);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await adminInstance.delete(`/Notification/DeleteNotification?id=${id}`);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        if (!isSuccess) {
          setError(message);
        }
        setSuccess(isSuccess);
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addNotification = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.post('/Notification/AddNotification', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, notification, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setNotification(notification);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const updateNotification = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch('/Notification/UpdateNotification', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, notification, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setNotification(notification);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  /////////////////////////
  ////////////CarMarks
  /////////////////////////
  const getCarMarks = async () => {
    try {
      const response = await adminInstance.get('/CarMark/GetCarMarks');
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carMarks, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setCarMarks(carMarks);
        }
        setSuccess(isSuccess);
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const getCarMarkById = async (id) => {
    try {
      const response = await adminInstance.get('/CarMark/GetCarMarkById', { params: { id: id } });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carMark, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarMark(carMark);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteCarMark = async (id) => {
    try {
      const response = await adminInstance.delete('/CarMark/DeleteCarMark', { params: { id: id } });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  const addCarmark = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.post('/CarMark/AddCarMark', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carMark, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarMark(carMark);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  const updateCarMark = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch('/CarMark/UpdateCarMark', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carMark, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarMark(carMark);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  /////////////////////////
  ////////////CarModels
  /////////////////////////
  const getCarModels = async () => {
    try {
      const response = await adminInstance.get('/CarMarkModel/GetCarMarkModels');
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carModels, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarModels(carModels);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  const getCarModelById = async (id) => {
    try {
      const response = await adminInstance.get('/CarMarkModel/GetCarMarkModels', {
        params: { id: id },
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carModel, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarModel(carModel);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  const deleteCarModel = async (id) => {
    try {
      const response = await adminInstance.delete('/CarMarkModel/DeleteCarMarkModel', {
        params: { id: id },
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  const addCarModel = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance('/CarMarkModel/AddCarModel', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carModel, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarModel(carModel);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  const updateCarModel = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch('/CarMarkModel/UpdateCarModel', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carModel, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarModel(carModel);
        }
      } else {
        setError(response.statusText);
        setSuccess(false);
      }
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  };

  return (
    <AdminServiceContext.Provider
      value={{
        home,
        getReviews,
        getReview,
        getLastThreeReviews,
        addReview,
        updateReview,
        deleteReview,
        getBlogs,
        getBlogsAllLanguages,
        getBlogById,
        getBlogByIdAllLanguages,
        deleteBlog,
        addBlog,
        updateBlog,
        getNotifications,
        getNotificationById,
        deleteNotification,
        addNotification,
        updateNotification,
        getCarMarks,
        getCarMarkById,
        deleteCarMark,
        addCarmark,
        updateCarMark,
        getCarModels,
        getCarModelById,
        deleteCarModel,
        addCarModel,
        updateCarModel,
        error,
        success,
        recordsCount,
        reviews,
        review,
        blogs,
        blog,
        notifications,
        notification,
        carMarks,
        carMark,
        carModels,
        carModel,
      }}
    >
      {children}
    </AdminServiceContext.Provider>
  );
};

export { AdminService, AdminServiceContext };
