import { createContext, useState } from 'react';
import dealerApi from './dealerApi';

const DealerServiceContext = createContext();

const DealerService = ({ children }) => {
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [success, setSuccess] = useState(true);
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState(null);
  const [car, setCar] = useState(null);
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
            }
          }
        } else {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            if (value !== null) {
              formData.append(key, value);
            }
          }
        }
      }
    }

    return formData;
  }

  const getDealerHome = async () => {
    try {
      const response = await dealerApi.get('/Dealer/Home');
      if (response.status === 200) {
        const { isSuccess, userDTO, notifications, myPriceList, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setUser(userDTO);
          setMyPriceList(myPriceList);
          setNotifications(notifications);
        }
      } else {
        setSuccess(false);
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const agreeNotification = async (id) => {
    setSuccess(true);
    setError(null);
    try {
      const response = await dealerApi.get('/Dealer/AgreeNotification', { params: { id: id } });
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
      setSuccess(false);
      setError(error);
    }
  };

  const getCars = async () => {
    try {
      const response = await dealerApi.get('/Dealer/GetCars');
      setError(null);
      if (response.status === 200) {
        const { isSuccess, cars, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          const carsTemp = cars.map((car) => {
            if (!car.recieverPortId) {
              car.recieverPortName = '';
            }
            if (!car.lineId) {
              car.lineName = '';
            }
            if (!car.userId) {
              car.fullName = '';
            }
            return car;
          });
          setCars(carsTemp);
          //setRecordsCount(recordsCount);
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

  const updateCar = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await dealerApi.patch('/Dealer/UpdateCar', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, car, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setCar(car);
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

  const resetPassword = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await dealerApi.post('/Dealer/ResetPassword', fData, config);
      setError(null);
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        }
      } else {
        setError(response.statusText);
      }
    } catch (ex) {
      setError(error);
      setSuccess(false);
    }
  };

  return (
    <DealerServiceContext.Provider
      value={{
        getDealerHome,
        agreeNotification,
        getCars,
        updateCar,
        resetPassword,
        user,
        cars,
        car,
        success,
        error,
        notifications,
        myPriceList,
      }}
    >
      {children}
    </DealerServiceContext.Provider>
  );
};

export { DealerService, DealerServiceContext };
