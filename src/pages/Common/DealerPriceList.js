import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DealerServiceContext } from '../../services/Dealer/DealerService';
import AppAdminHomeFilter from '../../components/Admin/AppAdminHomeFilter/AppAdminHomeFilter';

const DealerPriceListPage = () => {
  const { myPriceList } = useContext(DealerServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  console.log(myPriceList);
  return (
    <>
      <label style={{ color: 'white', fontSize: '500x' }}>sssssssssssssssssssssssssss</label>
      {myPriceList &&
        myPriceList.map((item) => {
          return <div key={item.id}>{item.location}</div>;
        })}
    </>
  );
};

export default DealerPriceListPage;
