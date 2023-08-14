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
  const [becomeDealerRequests, setBecomeDelaerRequests] = useState(null);
  const [becomeDealerRequest, setBecomeDelaerRequest] = useState(null);
  const [auctions, setAuctions] = useState(null);
  const [auction, setAuction] = useState(null);
  const [locations, setLocations] = useState(null);
  const [Location, setLocation] = useState(null);
  const [ports, setPorts] = useState(null);
  const [port, setPort] = useState(null);
  const [priceListGroups, setPriceListGroups] = useState(null);
  const [priceListGroup, setPriceListGroup] = useState(null);
  const [priceListGroupLines, setPriceListGroupLines] = useState(null);
  const [priceListGroupLine, setPriceListGroupLine] = useState(null);
  const [recordsCount, setRecordsCount] = useState(null);
  const [selAuctions, setSelAuctions] = useState(null);
  const [selLocations, setSelLocations] = useState(null);
  const [selPorts, setSelPorts] = useState(null);
  const [selPriceListGroups, setSelPriceListGroups] = useState(null);
  const [userTypes, setUserTypes] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [myPriceList, setMyPriceList] = useState(null);

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
      if (response.status === 200) {
        const {
          isSuccess,
          message,
          auctions,
          locations,
          ports,
          priceListGroups,
          userTypes,
          myPriceList,
        } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setSelAuctions(auctions);
          setSelLocations(locations);
          setSelPorts(ports);
          setSelPriceListGroups(priceListGroups);
          setUserTypes(userTypes);
          setMyPriceList(myPriceList);
        }
        //console.log(code);
      }
    } catch (error) {
      setError(error);
    }
  };

  /////////////////////////
  ////////////Users
  /////////////////////////
  const getUsers = async () => {
    try {
      const response = await adminInstance.get('/Admin/GetUsers');
      setError(null);
      if (response.status === 200) {
        const { isSuccess, users, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          const temp = users.map((user) => {
            if (!user.priceListGroupId) {
              user.priceListGroupId = 0;
              user.priceListGroupName = '';
            }
            return user;
          });
          setUsers(temp);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await adminInstance.get('/Admin/GetUserById', { params: { id: id } });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, user, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setUser(user);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const registerUser = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.post('/Admin/RegisterUser', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, user, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setUser(user);
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

  const updateUser = async (reqBody) => {
    try {
      // console.log(reqBody);
      const fData = jsonToFormData(reqBody);
      // for (let [key, value] of fData.entries()) {
      //   console.log(`${key}:`, value);
      // }
      const response = await adminInstance.patch('/Admin/EditUser', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, user, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setUser(user);
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

  const deleteUser = async (id) => {
    try {
      const response = await adminInstance.delete('/Admin/DeleteUser', {
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

  /////////////////////////
  ////////////Reviews
  /////////////////////////
  const getReviews = async (reqBody) => {
    try {
      const response = await adminInstance.get('/Reviews/GetReviews', { params: reqBody });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, reviews, recordsCount, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
          throw new Error('something went wrong');
        }

        setReviews(reviews);
        setRecordsCount(recordsCount);
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
  const getNotifications = async (reqBody) => {
    try {
      const response = await adminInstance.get('/Notification/GetNotifications', {
        params: reqBody,
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, notifications, recordsCount, message } = response.data;
        if (!isSuccess) {
          setError(message);
          setSuccess(isSuccess);
        } else {
          setRecordsCount(recordsCount);
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
  const getCarMarks = async (reqBody) => {
    try {
      const response = await adminInstance.get('/CarMark/GetCarMarks', { params: reqBody });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carMarks, recordsCount, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setCarMarks(carMarks);
          setRecordsCount(recordsCount);
        }
        setSuccess(isSuccess);
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const getAllCarMarks = async () => {
    try {
      const response = await adminInstance.get('/CarMark/GetAllCarMarks');
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carMarks, message } = response.data;
        //console.log(carMarks);
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
  const getCarModels = async (reqBody) => {
    try {
      const response = await adminInstance.get('/CarMarkModel/GetCarMarkModels', {
        params: reqBody,
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carMarkModels, recordsCount, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarModels(carMarkModels);
          setRecordsCount(recordsCount);
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
      const response = await adminInstance.get('/CarMarkModel/GetCarMarkModelById', {
        params: { id: id },
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, carMarkModel, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCarModel(carMarkModel);
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
      const response = await adminInstance.post('/CarMarkModel/AddCarModel', fData, config);
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

  /////////////////////////
  ////////////Become Dealer Request
  /////////////////////////
  const getDealerRequests = async (reqBody) => {
    try {
      const response = await adminInstance.get('/BecomeDealer/GetDealerRequests', {
        params: reqBody,
      });
      if (response.status === 200) {
        const { isSuccess, message, becomeDealerRequests, recordsCount } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setRecordsCount(recordsCount);
          setBecomeDelaerRequests(becomeDealerRequests);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const getDealerRequestById = async (reqBody) => {
    try {
      const response = await adminInstance.get('/BecomeDealer/GetDealerRequestById', {
        params: reqBody,
      });
      if (response.status === 200) {
        const { isSuccess, message, becomeDealerRequest } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setBecomeDelaerRequest(becomeDealerRequest);
        }
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteDealerRequest = async (id) => {
    try {
      const response = await adminInstance.delete('/BecomeDealer/DeleteRequest', {
        params: { id: id },
      });
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setSuccess(false);
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  /////////////////////////
  ////////////Auctions
  /////////////////////////
  const getAuctions = async (reqBody) => {
    try {
      const response = await adminInstance.get('/Auctions/GetAuctions', {
        params: reqBody,
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, auctions, recordsCount, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setAuctions(auctions);
          setRecordsCount(recordsCount);
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

  const getAuctionById = async (id) => {
    try {
      const response = await adminInstance.get('/Auctions/GetAuctionById', {
        params: { id: id },
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, auction, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setAuction(auction);
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

  const deleteAuction = async (id) => {
    try {
      const response = await adminInstance.delete('/Auctions/DeleteAuction', {
        params: { id: id },
      });
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setSuccess(false);
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addAuction = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.post('/Auctions/AddAuction', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, auction, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setAuction(auction);
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

  const updateAuction = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch('/Auctions/UpdateAuction', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, auction, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setAuction(auction);
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
  ////////////Locations
  /////////////////////////
  const getLocations = async (reqBody) => {
    try {
      const response = await adminInstance.get('/Locations/GetLocations', {
        params: reqBody,
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, locations, recordsCount, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setLocations(locations);
          setRecordsCount(recordsCount);
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

  const getLocationById = async (id) => {
    try {
      const response = await adminInstance.get('/Locations/GetLocationById', {
        params: { id: id },
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, location, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setLocation(location);
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

  const deleteLocation = async (id) => {
    try {
      const response = await adminInstance.delete('/Locations/DeleteLocation', {
        params: { id: id },
      });
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setSuccess(false);
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addLocation = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.post('/Locations/AddAuction', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, location, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setLocation(location);
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

  const updateLocation = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch('/Locations/UpdateLocation', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, location, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setLocation(location);
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
  ////////////Ports
  /////////////////////////
  const getPorts = async (reqBody) => {
    try {
      const response = await adminInstance.get('/Ports/GetPorts', {
        params: reqBody,
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, ports, recordsCount, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPorts(ports);
          setRecordsCount(recordsCount);
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

  const getPortById = async (id) => {
    try {
      const response = await adminInstance.get('/Ports/GetPortById', {
        params: { id: id },
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, port, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPort(port);
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

  const deletePort = async (id) => {
    try {
      const response = await adminInstance.delete('/Ports/DeletePort', {
        params: { id: id },
      });
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setSuccess(false);
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addPort = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.post('/Ports/AddPort', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, port, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPort(port);
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

  const updatePort = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch('/Ports/UpdatePort', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, port, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPort(port);
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
  ////////////PriceListGroups
  /////////////////////////
  const getPriceListGroups = async (reqBody) => {
    try {
      const response = await adminInstance.get('/PriceListGroups/GetPriceListGroups', {
        params: reqBody,
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, priceListGroups, recordsCount, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPriceListGroups(priceListGroups);
          setRecordsCount(recordsCount);
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

  const getPriceListGroupById = async (id) => {
    try {
      const response = await adminInstance.get('/PriceListGroups/GetPriceListGroupById', {
        params: { id: id },
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, priceListGroup, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPriceListGroup(priceListGroup);
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

  const deletePriceListGroup = async (id) => {
    try {
      const response = await adminInstance.delete('/PriceListGroups/DeletePriceListGroup', {
        params: { id: id },
      });
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setSuccess(false);
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addPriceListGroup = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.post(
        '/PriceListGroups/AddPriceListGroup',
        fData,
        config
      );
      setError(null);
      if (response.status === 200) {
        const { isSuccess, priceListGroup, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPriceListGroup(priceListGroup);
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

  const updatePriceListGroup = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch(
        '/PriceListGroups/UpdatePriceListGroup',
        fData,
        config
      );
      setError(null);
      if (response.status === 200) {
        const { isSuccess, priceListGroup, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPriceListGroup(priceListGroup);
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
  ////////////PriceListGroupLines
  /////////////////////////
  const getPriceListGroupLines = async (reqBody) => {
    try {
      const response = await adminInstance.get('/PriceListGroupLines/GetPriceListGroupLines', {
        params: reqBody,
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, priceListGroupLines, recordsCount, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPriceListGroupLines(priceListGroupLines);
          setRecordsCount(recordsCount);
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

  const getPriceListGroupLineById = async (id) => {
    try {
      const response = await adminInstance.get('/PriceListGroupLines/GetPriceListGroupLineById', {
        params: { id: id },
      });
      setError(null);
      if (response.status === 200) {
        const { isSuccess, priceListGroupLine, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPriceListGroupLine(priceListGroupLine);
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

  const deletePriceListGroupLine = async (id) => {
    try {
      const response = await adminInstance.delete('/PriceListGroupLines/DeletePriceListGroupLine', {
        params: { id: id },
      });
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setSuccess(false);
        setError(response.statusText);
      }
    } catch (error) {
      setError(error);
    }
  };

  const addPriceListGroupLine = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.post(
        '/PriceListGroupLines/AddPriceListGroupLine',
        fData,
        config
      );
      setError(null);
      if (response.status === 200) {
        const { isSuccess, priceListGroupLine, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPriceListGroupLine(priceListGroupLine);
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

  const updatePriceListGroupLine = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await adminInstance.patch(
        '/PriceListGroupLines/UpdatePriceListGroupLine',
        fData,
        config
      );
      setError(null);
      if (response.status === 200) {
        const { isSuccess, priceListGroupLine, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setPriceListGroupLine(priceListGroupLine);
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
        getUsers,
        getUserById,
        registerUser,
        updateUser,
        deleteUser,
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
        getAllCarMarks,
        getCarMarkById,
        deleteCarMark,
        addCarmark,
        updateCarMark,
        getCarModels,
        getCarModelById,
        deleteCarModel,
        addCarModel,
        updateCarModel,
        getDealerRequests,
        getDealerRequestById,
        deleteDealerRequest,
        getAuctions,
        getAuctionById,
        deleteAuction,
        addAuction,
        updateAuction,
        getLocations,
        getLocationById,
        deleteLocation,
        addLocation,
        updateLocation,
        getPorts,
        getPortById,
        deletePort,
        addPort,
        updatePort,
        getPriceListGroups,
        getPriceListGroupById,
        deletePriceListGroup,
        addPriceListGroup,
        updatePriceListGroup,
        getPriceListGroupLines,
        getPriceListGroupLineById,
        deletePriceListGroupLine,
        addPriceListGroupLine,
        updatePriceListGroupLine,
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
        becomeDealerRequests,
        becomeDealerRequest,
        auctions,
        auction,
        locations,
        Location,
        ports,
        port,
        priceListGroups,
        priceListGroup,
        priceListGroupLines,
        priceListGroupLine,
        selAuctions,
        selLocations,
        selPorts,
        selPriceListGroups,
        userTypes,
        users,
        user,
        myPriceList,
      }}
    >
      {children}
    </AdminServiceContext.Provider>
  );
};

export { AdminService, AdminServiceContext };
