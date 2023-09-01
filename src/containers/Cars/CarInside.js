import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { LandingServiceContext } from '../../services/LandingServices/LandingService';
import LoadingMarkUp from '../../components/Loading/Loading';

const CarInside = () => {
  const { car, searchCar, success, error } = useContext(LandingServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { vinCode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await searchCar(vinCode);
      setLoading(false);
    };

    if (vinCode) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      {car && (
        <>
          <div className="col-xs-12 col-sm-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                {car.carMarkName} {car.carModelName}
              </div>
              <div className="card-body">
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    year:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.prodYear}
                  </label>
                </div>
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    carMarkName:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.carMarkName}
                  </label>
                </div>
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    carModelName:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.carModelName}
                  </label>
                </div>
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    carStatusName:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.carStatusName}
                  </label>
                </div>
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    locationName:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.locationName}
                  </label>
                </div>
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    recieverPortName:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.recieverPortName}
                  </label>
                </div>
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    containerOpenDate:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.containerOpenDate}
                  </label>
                </div>
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    lineName:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.lineName}
                  </label>
                </div>
                <div className="row">
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    containerNumber:
                  </label>
                  <label className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-form-label">
                    {car.containerNumber}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <iframe
              src={car.trackingUrl}
              title="tracking"
              style={{ width: '100%', height: '720px' }}
            ></iframe>
          </div>
        </>
      )}
    </>
  );
};

export default CarInside;
