import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import AppButton from '../../components/AppButton/AppButton';

const Port = ({ handleCloseDialog }) => {
  const { port, getPortById, addPort, updatePort, error, success } =
    useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
  });

  const lang = i18n.language || 'en';
  const { portId } = useParams();

  //console.log([portId, formData]);

  useEffect(() => {
    const fetchData = async () => {
      const langModel = {
        id: portId,
        languageCode: lang,
      };
      await getPortById(portId);
      setLoading(false);
    };

    if (portId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (port) {
      //console.log(review);
      if (!portId) {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: null,
          name: '',
        }));
      } else {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: port.id,
          name: port.name,
        }));
      }
    }
  }, [port]);

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
    if (portId) {
      await updatePort(formData);
    } else {
      await addPort(formData);
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
      <h2>port Id:{portId}</h2>
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

export default Port;
