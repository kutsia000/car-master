import { createContext, useState } from 'react';
import dealerApi from './dealerApi';

const DealerServiceContext = createContext();

const DealerService = ({ children }) => {
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [success, setSuccess] = useState(true);

  const getDealerHome = async () => {
    try {
      const response = await dealerApi.get('/Dealer/Home');
      if (response.status === 200) {
        const { isSuccess, notifications, message } = response.data;
        setSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
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

  return (
    <DealerServiceContext.Provider
      value={{ getDealerHome, agreeNotification, success, error, notifications }}
    >
      {children}
    </DealerServiceContext.Provider>
  );
};

export { DealerService, DealerServiceContext };
