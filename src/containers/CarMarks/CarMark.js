import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';

const CarMark = ({ handleCloseDialog }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    carName: '',
  });
  const { getCarMarkById, addCarmark, updateCarMark, carMark, error, success } =
    useContext(AdminServiceContext);

  const lang = i18n.language || 'en';
  const { carmarkId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getCarMarkById(carmarkId);
      setLoading(false);
    };

    if (carmarkId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (carMark) {
      if (!carmarkId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: null,
          carName: '',
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: carMark.id,
          carName: carMark.carName,
        }));
      }
    }
  }, [carMark]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (carmarkId) {
      await updateCarMark(formData);
    } else {
      await addCarmark(formData);
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
      <h2>carmarkId:{carmarkId}</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label={t('carName')}
          type="text"
          id="carName"
          required={true}
          name="carName"
          value={formData.carName}
          onChange={(e) => handleInputChange(e)}
        />
        {error ? error : null}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default CarMark;
