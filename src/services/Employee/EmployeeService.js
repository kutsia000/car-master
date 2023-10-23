import { createContext, useState } from 'react';
import employeeApi from './employeeApi';

const EmployeeServiceContext = createContext();

const EmployeeService = ({ children }) => {
  const [error, setError] = useState(null);

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

  return <EmployeeServiceContext.Provider value={{}}>{children}</EmployeeServiceContext.Provider>;
};

export { EmployeeService, EmployeeServiceContext };
