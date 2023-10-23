import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import AppButton from '../../components/AppButton/AppButton';

const PriceListGroup = ({ handleCloseDialog }) => {
  const {
    priceListGroup,
    getPriceListGroupById,
    addPriceListGroup,
    updatePriceListGroup,
    error,
    success,
  } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
  });

  const lang = i18n.language || 'en';
  const { priceListGroupId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const langModel = {
        id: priceListGroupId,
        languageCode: lang,
      };
      await getPriceListGroupById(priceListGroupId);
      setLoading(false);
    };

    if (priceListGroupId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (priceListGroup) {
      if (!priceListGroupId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: null,
          name: '',
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: priceListGroup.id,
          name: priceListGroup.name,
        }));
      }
    }
  }, [priceListGroup]);

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
    if (priceListGroupId) {
      await updatePriceListGroup(formData);
    } else {
      await addPriceListGroup(formData);
    }

    if (success) {
      setFormData({
        id: -1,
        name: '',
      });
      handleCloseDialog();
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <h2>port Id:{priceListGroupId}</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="portname"
          type="text"
          id="name"
          required={true}
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
        />

        {error ? error : null}
        <div className="form-group row"></div>
        <div className="form-group row"></div>
        <div className="form-group row">
          <AppButton type={'submit'} full label="submit" />
        </div>
      </form>
    </>
  );
};

export default PriceListGroup;
