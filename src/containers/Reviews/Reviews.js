import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';

const Reviews = () => {
  const { getReviews, reviews } = useContext(AdminServiceContext);
  const { i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language || 'en';

  useEffect(() => {
    const fetchData = async () => {
      const langModel = {
        id: null,
        languageCode: lang,
      };
      await getReviews(langModel);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      sadasdsadsa
      {reviews &&
        reviews.map((review) => {
          return (
            <div key={review.id}>
              <h2>{review.fullName}</h2>
              <label>{review.text}</label>
            </div>
          );
        })}
    </>
  );
};

export default Reviews;
