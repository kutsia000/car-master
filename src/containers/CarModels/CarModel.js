import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import Select from 'react-select';

const CarModel = ({ handleCloseDialog }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectError, setSelectError] = useState('');
  const {
    getCarModelById,
    getAllCarMarks,
    addCarModel,
    updateCarModel,
    carModel,
    carMarks,
    error,
    success,
  } = useContext(AdminServiceContext);

  const [formData, setFormData] = useState({
    carMarkId: null,
    carName: '',
    carModelId: null,
    carModelName: '',
  });

  const lang = i18n.language || 'en';
  const { carmodelId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getCarModelById(carmodelId);
      setLoading(false);
    };
    const fetchCarMarks = async () => {
      await getAllCarMarks();
    };

    if (carmodelId) {
      fetchCarMarks();
      fetchData();
    } else {
      fetchCarMarks();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (carMarks) {
      var opts = carMarks.map((item) => ({
        value: item.id,
        label: item.carName,
      }));
      setOptions(opts);
    }
  }, [carMarks]);

  useEffect(() => {
    if (carModel) {
      if (!carmodelId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          carMarkId: null,
          carName: '',
          carModelId: null,
          carModelName: '',
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          carMarkId: carModel.carMarkId,
          carName: carModel.carName,
          carModelId: carModel.carModelId,
          carModelName: carModel.carModelName,
        }));
      }
    }
  }, [carModel]);

  useEffect(() => {
    if (carMarks && carModel) {
      //console.log([carModel.carMarkId, carMarks]);
      handleSelectCar(carModel.carMarkId);
    }
  }, [carMarks, carModel]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectCar = (carId) => {
    const selectedCar = carMarks.find((car) => car.id === carId);
    //console.log(selectedCar);
    setSelectedOption({ value: selectedCar.id || 1, label: selectedCar.carName });
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      carMarkId: selectedOption.value,
      carName: selectedOption.label,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedOption) {
      setSelectError('please select a car mark');
      return;
    }

    setLoading(true);
    //console.log(formData);
    if (carmodelId) {
      await updateCarModel(formData);
    } else {
      await addCarModel(formData);
    }

    setLoading(false);

    if (success) {
      handleCloseDialog();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <h2>carmodelId:{carmodelId}</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label={t('carModelName')}
          type="text"
          id="carModelName"
          required={true}
          name="carModelName"
          value={formData.carModelName}
          onChange={(e) => handleInputChange(e)}
        />
        <Select
          options={options}
          onChange={handleSelectChange}
          isSearchable
          placeholder="select"
          value={selectedOption}
        />
        {selectError && <p style={{ color: 'red' }}>{selectError}</p>}
        {error ? error : null}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default CarModel;
