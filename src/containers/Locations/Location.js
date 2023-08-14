import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';

const Location = ({ handleCloseDialog }) => {
  const { Location, getLocationById, addLocation, updateLocation, error, success } =
    useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: -1,
    name: '',
  });

  const lang = i18n.language || 'en';
  const { locationId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const langModel = {
        id: locationId,
        languageCode: lang,
      };
      await getLocationById(locationId);
      setLoading(false);
    };

    if (locationId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (Location) {
      //console.log(review);
      if (!locationId) {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: -1,
          name: '',
        }));
      } else {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: Location.id,
          name: Location.name,
        }));
      }
    }
  }, [Location]);

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
    if (locationId) {
      await updateLocation(formData);
    } else {
      await addLocation(formData);
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
      <h2>location id:{locationId}</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="locationName"
          type="text"
          id="name"
          required={true}
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
        />

        {error ? error : null}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Location;
