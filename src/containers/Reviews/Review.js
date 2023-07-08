import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';

const Review = () => {
  const { getReview, review } = useContext(AdminServiceContext);
  const { i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language || 'en';

  return (
    <>
      <h2>reviewPage</h2>
      
    </>
)
};

export default Review;
