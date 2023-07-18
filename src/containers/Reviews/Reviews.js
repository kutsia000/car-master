import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const { getReviews, reviews } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
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
    return <LoadingMarkUp />;
  }

  return (
    <>
      <Link to={`/${lang}/admin/dashboard/review/`}>{t('new')}</Link>
      {reviews &&
        reviews.map((review) => {
          return (
            <div key={review.id}>
              <Link to={`/${lang}/admin/dashboard/review/${review.id}`}>edit</Link>
              <h2>{review.fullName}</h2>
              <label>{review.text}</label>
            </div>
          );
        })}
    </>
  );
};

export default Reviews;
