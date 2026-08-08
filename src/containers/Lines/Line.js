import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import AppButton from '../../components/AppButton/AppButton';

const Line = ({ handleCloseDialog }) => {
  const { line, getLineById, addLine, updateLine, error, success } =
    useContext(AdminServiceContext);

  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: -1,
    name: '',
    trackingUrl: '',
  });

  const lang = i18n.language || 'en';
  const { lineId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const langModel = {
        id: lineId,
        languageCode: lang,
      };
      await getLineById(lineId);
      setLoading(false);
    };

    if (lineId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (line) {
      //console.log(review);
      if (!lineId) {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: -1,
          name: '',
          trackingUrl: '',
        }));
      } else {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: line.id,
          name: line.name,
          trackingUrl: line.trackingUrl,
        }));
      }
    }
  }, [line]);

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
    if (lineId) {
      await updateLine(formData);
    } else {
      await addLine(formData);
    }

    if (success) {
      setFormData({
        id: -1,
        name: '',
        trackingUrl: '',
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
      <h2>line id:{lineId}</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="lineName"
          type="text"
          id="name"
          required={true}
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
        />
        <InputComponent
          label="trackingUrl"
          type="text"
          id="name"
          required={true}
          name="trackingUrl"
          value={formData.trackingUrl}
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

export default Line;
