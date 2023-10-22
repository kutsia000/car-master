import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import styles from './PriceList.module.scss';

const MyPriceListPage = () => {
  const { myPriceList } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (myPriceList) {
  //     console.log(myPriceList);
  //   }
  // }, [myPriceList]);

  return (
    <>
      <div className={styles.PriceList}>
        <table className={styles.PriceList__table}>
          <thead>
            <tr>
              <th>Auction</th>
              <th>Location</th>
              <th>Port</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {myPriceList &&
              myPriceList.map((line) => {
                return (
                  <tr key={line.lineId}>
                    <td>{line.auctionName}</td>
                    <td>{line.locationName}</td>
                    <td>{line.portName}</td>
                    <td>{line.price}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* {myPriceList &&
        myPriceList.map((line) => {
          return line.lineId;
        })} */}
    </>
  );
};

export default MyPriceListPage;
