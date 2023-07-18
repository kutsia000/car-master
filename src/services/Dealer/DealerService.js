import { createContext, useState } from 'react';
import dealerApi from './dealerApi';

const DealerServiceContext = createContext();

const DealerService = ({ children }) => {
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  const getDealerHome = async () => {
    try {
      const response = await dealerApi.get('/Dealer/Home');
      if (response.status === 200) {
        const { isSuccess, notifications, message } = response.data;
        setIsSuccess(isSuccess);
        if (!isSuccess) {
          setError(message);
        } else {
          setNotifications(notifications);
        }
      } else {
        setIsSuccess(false);
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const agreeNotification = async () => {};

  return (
    <DealerServiceContext.Provider
      value={{ getDealerHome, agreeNotification, isSuccess, error, notifications }}
    >
      {children}
    </DealerServiceContext.Provider>
  );
};

export { DealerService, DealerServiceContext };
