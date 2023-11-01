import { createContext, useState } from 'react';
import employeeApi from './employeeApi';

const EmployeeServiceContext = createContext();

const EmployeeService = ({ children }) => {
  const [error, setError] = useState(null);
  const [carMarks, setCarMarks] = useState(null);
  const [carModels, setCarModels] = useState(null);
  const [success, setSuccess] = useState(false);
  const [auctions, setAuctions] = useState(null);
  const [locations, setLocations] = useState(null);
  const [ports, setPorts] = useState(null);
  const [recordsCount, setRecordsCount] = useState(null);
  const [selAuctions, setSelAuctions] = useState(null);
  const [selLocations, setSelLocations] = useState(null);
  const [selPorts, setSelPorts] = useState(null);
  const [carStatuses, setCarStatuses] = useState(null);
  const [allCarMarks, setAllCarMarks] = useState(null);
  const [allCarModels, setAllCarModels] = useState(null);
  const [allRecieverPorts, setAllRecieverPorts] = useState(null);
  const [allLines, setAllLines] = useState(null);
  const [cars, setCars] = useState(null);
  const [car, setCar] = useState(null);
  const [recieverPorts, setRecieverPorts] = useState(null);
  const [lines, setLines] = useState(null);
  const [user, setUser] = useState(null);

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

  const home = async () => {
    try {
      const response = await employeeApi.post('/Employee/Home');
      if (response.status === 200) {
        const {
          isSuccess,
          message,
          auctions,
          locations,
          ports,
          carStatuses,
          carMarks,
          carMarkModels,
          recieverPorts,
          lines,
          userDTO,
        } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          setSelAuctions(auctions);
          setSelLocations(locations);
          setSelPorts(ports);
          setCarStatuses(carStatuses);
          setAllCarMarks(carMarks);
          setAllCarModels(carMarkModels);
          setAllRecieverPorts(recieverPorts);
          setAllLines(lines);
          setUser(userDTO);
          //console.log(userTypes);
        }
        //console.log(code);
      }
    } catch (error) {
      setError(error);
    }
  };

  const resetPassword = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await employeeApi.post('/Employee/ResetPassword', fData, config);
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

  /////////////////////////
  ////////////Cars
  ////////////////////////
  const getCars = async () => {
    try {
      const response = await employeeApi.get('/Employee/GetCars');
      setError(null);
      if (response.status === 200) {
        const { isSuccess, cars, recordsCount, message } = response.data;
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

  const getCarById = async (id) => {
    try {
      const response = await employeeApi.get('/Employee/GetCarById', {
        params: { id: id },
      });
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

  const deleteCar = async (id) => {
    try {
      const response = await employeeApi.delete('/Employee/DeleteCar', {
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

  const deleteCarImages = async (id) => {
    try {
      const response = await employeeApi.delete('/Employee/DeleteAllImages', {
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

  const addCar = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await employeeApi.post('/Employee/AddCar', fData, config);
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

  const updateCar = async (reqBody) => {
    try {
      const fData = jsonToFormData(reqBody);
      const response = await employeeApi.patch('/Employee/UpdateCar', fData, config);
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

  return (
    <EmployeeServiceContext.Provider
      value={{
        home,
        resetPassword,
        getCars,
        getCarById,
        deleteCar,
        deleteCarImages,
        addCar,
        updateCar,
        success,
        recordsCount,
        carMarks,
        carModels,
        auctions,
        locations,
        ports,
        selAuctions,
        selLocations,
        selPorts,
        user,
        carStatuses,
        allCarMarks,
        allCarModels,
        allRecieverPorts,
        allLines,
        cars,
        recieverPorts,
        lines,
        car,
      }}
    >
      {children}
    </EmployeeServiceContext.Provider>
  );
};

export { EmployeeService, EmployeeServiceContext };
