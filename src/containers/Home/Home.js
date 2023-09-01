import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingServiceContext } from '../../services/LandingServices/LandingService';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';

const Home = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vinCode, setVinCode] = useState('');
  const lang = i18n.language || 'en';

  const handleChange = (e) => {
    const { value } = e.target;
    setVinCode(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!vinCode) return;
    navigate(`/${lang}/car/${vinCode}`);
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="row">
            <InputComponent
              label="VINCode"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="text"
              className="form-control"
              id="vincode"
              required={true}
              name="vincode"
              value={vinCode}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-sm btn-primary">
            search
          </button>
        </div>
      </form>
      home
    </>
  );
};

export default Home;
