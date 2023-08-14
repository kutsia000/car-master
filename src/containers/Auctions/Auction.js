import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';

const Auction = ({ handleCloseDialog }) => {
  const { auction, getAuctionById, addAuction, updateAuction, error, success } =
    useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: -1,
    auctionName: '',
    url: '',
    trackingUrl: '',
  });

  const lang = i18n.language || 'en';
  const { auctionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const langModel = {
        id: auctionId,
        languageCode: lang,
      };
      await getAuctionById(auctionId);
      setLoading(false);
    };

    if (auctionId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auction) {
      //console.log(review);
      if (!auctionId) {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: -1,
          auctionName: '',
          url: '',
          trackingUrl: '',
        }));
      } else {
        //formData.fullName = review.fullName;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: auction.id,
          auctionName: auction.auctionName,
          url: auction.url,
          trackingUrl: auction.trackingUrl,
        }));
      }
    }
  }, [auction]);

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
    if (auctionId) {
      await updateAuction(formData);
    } else {
      await addAuction(formData);
    }

    if (success) {
      setFormData({
        id: -1,
        auctionName: '',
        url: '',
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
      <h2>portid :{auctionId}</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="auctionName"
          type="text"
          id="auctionName"
          required={true}
          name="auctionName"
          value={formData.auctionName}
          onChange={(e) => handleInputChange(e)}
        />
        <InputComponent
          label="url"
          type="text"
          id="url"
          required={true}
          name="url"
          value={formData.url}
          onChange={(e) => handleInputChange(e)}
        />
        <InputComponent
          label="trackingUrl"
          type="text"
          id="trackingUrl"
          required={true}
          name="trackingUrl"
          value={formData.trackingUrl}
          onChange={(e) => handleInputChange(e)}
        />
        {error ? error : null}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Auction;
