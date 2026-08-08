import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import InputFileComponent from '../../components/Input/InputFileComponent';
import AppButton from '../../components/AppButton/AppButton';

const Review = ({ handleCloseDialog }) => {
  const { review, getReview, addReview, updateReview, error } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: -1,
    fullName: '',
    text: '',
    File: null,
  });

  const lang = i18n.language || 'en';
  const { reviewId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const langModel = {
        id: reviewId,
        languageCode: lang,
      };
      await getReview(langModel);
      setLoading(false);
    };

    if (reviewId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (review) {
      //console.log(review);
      if (!reviewId) {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: -1,
          fullName: '',
          text: '',
        }));
      } else {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: review.id,
          fullName: review.fullName,
          text: review.text,
        }));
      }
    }
  }, [review]);

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
    if (reviewId) {
      await updateReview(formData);
    } else {
      await addReview(formData);
    }
    setLoading(false);
    handleCloseDialog();
  };

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        File: file,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        File: null,
      }));
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <h2>reviewPage : {reviewId}</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label={t('fullName')}
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => handleInputChange(e)}
        />
        <InputComponent
          label={t('text')}
          type="text"
          id="text"
          name="text"
          value={formData.text}
          onChange={(e) => handleInputChange(e)}
        />
        <InputFileComponent
          label="file"
          type="file"
          id="File"
          name="File"
          multiple={false}
          required={true}
          onFileSelected={handleFileChange}
        />
        {error ? <span style={{ color: 'white' }}>error</span> : null}
        <div className="form-group row"></div>
        <div className="form-group row"></div>
        <div className="form-group row">
          <AppButton type={'submit'} full label="submit" />
        </div>
        {/* <button type="submit">submit</button> */}
      </form>
    </>
  );
};

export default Review;
