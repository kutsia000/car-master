import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import InputComponent from '../../components/Input/InputComponent';
import { validateCarForm } from '../../utils/carFormValidation';
import InputFileComponent from '../../components/Input/InputFileComponent';
import AppButton from '../../components/AppButton/AppButton';
import AppSelect from '../../components/AppSelect/AppSelect';

const Car = ({ handleCloseDialog }) => {
  const {
    getCarById,
    addCar,
    updateCar,
    deleteCar,
    error,
    car,
    allCarMarks,
    allCarModels,
    carStatuses,
    selAuctions,
    selPorts,
    selLocations,
  } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [auctions, setAuctions] = useState([]);
  const [ports, setPorts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selCarMarks, setSelCarMarks] = useState([]);
  const [selCarModels, setSelCarModels] = useState([]);
  const [selCarStatuses, setSelCarStatuses] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCarMark, setSelectedCarMark] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [selectedCarStatus, setSelectedCarStatus] = useState(null);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [years, setYears] = useState([]);
  const lang = i18n.language || 'en';
  const [formData, setFormData] = useState({
    id: null,
    mainImageUrl: null,
    carMarkId: null,
    carMarkName: '',
    carModelId: null,
    carModelName: '',
    carStatusId: null,
    carStatusName: '',
    prodYear: '',
    vincode: '',
    lotNumber: '',
    userId: null,
    auctionId: null,
    locationId: null,
    portId: null,
    buyerId: null,
    dealerWin: '',
    saleDate: '',
    reciever: null,
    recieverPersonalId: null,
    phoneNumber: null,
    auctionPay: '',
    wayPay: '',
    tempPriceIncrease: '',
    documentPrice: '',
    fine: '',
    insurance: '',
    payOfService: '',
    transportAmount: '',
    dealerBalance: '',
    containerNumber: null,
    recieverPortId: null,
    lineId: null,
    containerEntryDate: '',
    containerOpenDate: '',
    greenDate: '',
    sublot: '',
    mainImage: '',
    images: [],
  });
  const { carId } = useParams();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1920;

    const yearOptions = [];

    for (let year = currentYear; year >= startYear; year--) {
      var obj = { value: year, label: year };
      yearOptions.push(obj);
    }
    setYears(yearOptions);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getCarById(carId);
      setLoading(false);
    };

    if (carId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [carId]);

  useEffect(() => {
    if (car) {
      if (!carId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: null,
          mainImageUrl: null,
          carMarkId: null,
          carMarkName: '',
          carModelId: null,
          carModelName: '',
          carStatusId: null,
          carStatusName: '',
          prodYear: '',
          vincode: '',
          lotNumber: '',
          userId: null,
          auctionId: null,
          locationId: null,
          portId: null,
          buyerId: '',
          dealerWin: '',
          saleDate: '',
          reciever: '',
          recieverPersonalId: '',
          phoneNumber: '',
          auctionPay: '',
          wayPay: '',
          tempPriceIncrease: '',
          documentPrice: '',
          fine: '',
          insurance: '',
          payOfService: '',
          transportAmount: '',
          dealerBalance: '',
          containerNumber: '',
          recieverPortId: '',
          lineId: null,
          containerEntryDate: '',
          containerOpenDate: '',
          greenDate: '',
          sublot: '',
          mainImage: '',
          images: [],
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: car.id,
          mainImageUrl: car.mainImageUrl,
          carMarkId: car.carMarkId,
          carMarkName: car.carMarkName,
          carModelId: car.carModelId,
          carModelName: car.carModelName,
          carStatusId: car.carStatusId,
          carStatusName: car.carStatusName,
          prodYear: car.prodYear,
          vincode: car.vincode,
          lotNumber: car.lotNumber,
          userId: car.userId,
          auctionId: car.auctionId,
          locationId: car.locationId,
          portId: car.portId,
          buyerId: car.buyerId ?? null,
          dealerWin: car.dealerWin,
          saleDate: car.saleDate,
          reciever: car.reciever ?? null,
          recieverPersonalId: car.recieverPersonalId ?? null,
          phoneNumber: car.phoneNumber ?? null,
          auctionPay: car.auctionPay,
          wayPay: car.wayPay,
          tempPriceIncrease: car.tempPriceIncrease,
          documentPrice: car.documentPrice,
          fine: car.fine,
          insurance: car.insurance,
          payOfService: car.payOfService,
          transportAmount: car.transportAmount,
          dealerBalance: car.dealerBalance,
          containerNumber: car.containerNumber ?? null,
          recieverPortId: car.recieverPortId,
          lineId: car.lineId,
          containerEntryDate: car.containerEntryDate,
          containerOpenDate: car.containerOpenDate,
          greenDate: car.greenDate,
          sublot: car.sublot,
          mainImage: '',
          images: [],
        }));
      }
    }
  }, [car]);

  useEffect(() => {
    if (allCarMarks) {
      let opts = allCarMarks.map((item) => ({
        value: item.id,
        label: item.carName,
      }));

      setSelCarMarks(opts);
    }
  }, [allCarMarks]);

  useEffect(() => {
    if (carStatuses) {
      let opts = carStatuses.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setSelCarStatuses(opts);
    }
  }, [carStatuses]);

  useEffect(() => {
    if (selAuctions) {
      let opts = selAuctions.map((item) => ({
        value: item.id,
        label: item.auctionName,
      }));

      setAuctions(opts);
    }
  }, [selAuctions]);

  useEffect(() => {
    if (selPorts) {
      let opts = selPorts.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setPorts(opts);
    }
  }, [selPorts]);

  useEffect(() => {
    if (selLocations) {
      let opts = selLocations.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setLocations(opts);
    }
  }, [selLocations]);

  useEffect(() => {
    if (selectedCarMark) {
      const filteredCarModels = allCarModels.filter(
        (item) => item.carMarkId == selectedCarMark.value
      );
      const opts = filteredCarModels.map((item) => {
        return { value: item.carModelId, label: item.carModelName };
      });
      setSelCarModels(opts);
      setSelectedCarModel(null);
    }
  }, [selectedCarMark]);

  useEffect(() => {
    if (carId && formData.carMarkId && formData.carModelId) {
      const selectedCarMark = allCarMarks.find((item) => item.id == formData.carMarkId);
      //console.log(selectedCarMark);
      setSelectedCarMark({ value: selectedCarMark.id, label: selectedCarMark.carName });
    }
  }, [carId, formData.carMarkId, formData.carModelId]);

  useEffect(() => {
    if (selCarModels && formData.carModelId) {
      const selectedCarModel = selCarModels.find((item) => item.value == formData.carModelId);
      if (selectedCarModel) {
        setSelectedCarModel(selectedCarModel);
      }
    }
  }, [selCarModels, formData.carModelId]);

  useEffect(() => {
    if (selCarStatuses && formData.carStatusId) {
      const selectedCarStatus = selCarStatuses.find((c) => c.value === formData.carStatusId);
      if (selectedCarStatus) {
        setSelectedCarStatus(selectedCarStatus);
      }
    }
  }, [selCarStatuses, formData.carStatusId]);

  useEffect(() => {
    if (years && formData.prodYear) {
      const selectedYear = years.find((y) => y.value === formData.prodYear);
      if (selectedYear) {
        setSelectedYear({ value: selectedYear.value, label: selectedYear.label });
      }
    }
  }, [years, formData.prodYear]);

  useEffect(() => {
    if (selAuctions && formData.auctionId) {
      const selectedAuction = auctions.find((a) => a.value === formData.auctionId);
      if (selectedAuction) {
        setSelectedAuction(selectedAuction);
      }
    }
  }, [selAuctions, formData.auctionId]);

  useEffect(() => {
    if (selPorts && formData.portId) {
      const selectedPort = selPorts.find((p) => p.id === formData.portId);
      if (selectedPort) {
        setSelectedPort({ value: selectedPort.id, label: selectedPort.name });
      }
    }
  }, [selPorts, formData.portId]);

  useEffect(() => {
    if (selLocations && formData.locationId) {
      const selectedLocation = selLocations.find((l) => l.id === formData.locationId);
      if (selectedLocation) {
        setSelectedLocation({ value: selectedLocation.id, label: selectedLocation.name });
      }
    }
  }, [selLocations, formData.locationId]);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleYearSelect = (selectedOption) => {
    setSelectedYear(selectedOption);
    //console.log(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      prodYear: selectedOption.value,
    }));
  };

  const handleCarMarkSelect = (selectedOption) => {
    setSelectedCarMark(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      carMarkId: selectedOption.value,
      carMarkName: selectedOption.label,
      carModelId: null,
      carModelName: '',
    }));
  };

  const handleCarModelSelect = (selectedOption) => {
    setSelectedCarModel(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      carModelId: selectedOption.value,
      carModelName: selectedOption.label,
    }));
  };

  const handleCarStatusSelect = (selectedOption) => {
    setSelectedCarStatus(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      carStatusId: selectedOption.value,
      carStatusName: selectedOption.label,
    }));
  };

  const handleAuctionSelect = (selectedOption) => {
    setSelectedAuction(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      auctionId: selectedOption.value,
      auctionName: selectedOption.label,
    }));
  };

  const handlePortSelect = (selectedOption) => {
    setSelectedPort(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      portId: selectedOption.value,
      portName: selectedOption.label,
    }));
  };

  const handleLocationSelect = (selectedOption) => {
    setSelectedLocation(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationId: selectedOption.value,
      locationName: selectedOption.label,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleMainImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mainImage: e,
    }));
  };

  const handleImagesChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...e],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateCarForm(formData, t);
    //console.log(errors);
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    if (carId) {
      await updateCar(formData);
    } else {
      await addCar(formData);
    }

    handleCloseDialog();

    setLoading(false);
  };

  return (
    <>
      <div>
        <h2>carId : {carId}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label style={{ marginBottom: '10px' }}>
              CarMark<span style={{ color: '#dc3545' }}>*</span>
            </label>
            <div>
              <AppSelect
                //id="carMarks"
                options={selCarMarks}
                onChange={handleCarMarkSelect}
                value={selectedCarMark}
                placeholder="select"
                isSearchable={true}
              />
              {errors.carMarks && (
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.25rem',
                    fontSize: '.875rem',
                    color: '#dc3545',
                  }}
                >
                  {errors.carMarks}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label style={{ marginBottom: '10px' }}>
              carModels<span style={{ color: '#dc3545' }}>*</span>
            </label>
            <div>
              <AppSelect
                getOptionLabel={({ label }) => label}
                options={selCarModels}
                onChange={handleCarModelSelect}
                value={selectedCarModel}
                placeholder={selectedCarModel ? selectedCarModel.label : 'select'}
                isSearchable={false}
              />
              {errors.carModels && (
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.25rem',
                    fontSize: '.875rem',
                    color: '#dc3545',
                  }}
                >
                  {errors.carModels}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label style={{ marginBottom: '10px' }}>
              carStatuses<span style={{ color: '#dc3545' }}>*</span>
            </label>
            <div>
              <AppSelect
                //id="carStatuses"
                options={selCarStatuses}
                onChange={handleCarStatusSelect}
                value={selectedCarStatus}
                placeholder="select"
                isSearchable={true}
              />
              {errors.carStatuses && (
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.25rem',
                    fontSize: '.875rem',
                    color: '#dc3545',
                  }}
                >
                  {errors.carStatuses}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label style={{ marginBottom: '10px' }}>
              Year<span style={{ color: '#dc3545' }}>*</span>
            </label>
            <div>
              <AppSelect
                //id="years"
                options={years}
                onChange={handleYearSelect}
                value={selectedYear}
                placeholder="select"
                isSearchable={true}
              />
              {errors.years && (
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.25rem',
                    fontSize: '.875rem',
                    color: '#dc3545',
                  }}
                >
                  {errors.years}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label style={{ marginBottom: '10px' }}>
              auctions<span style={{ color: '#dc3545' }}>*</span>
            </label>
            <div>
              <AppSelect
                //id="auctions"
                options={auctions}
                onChange={handleAuctionSelect}
                value={selectedAuction}
                placeholder="select"
                isSearchable={true}
              />
              {errors.auctions && (
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.25rem',
                    fontSize: '.875rem',
                    color: '#dc3545',
                  }}
                >
                  {errors.auctions}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label style={{ marginBottom: '10px' }}>
              ports<span style={{ color: '#dc3545' }}>*</span>
            </label>
            <div>
              <AppSelect
                // id="ports"
                options={ports}
                onChange={handlePortSelect}
                value={selectedPort}
                placeholder="select"
                isSearchable={true}
              />
              {errors.ports && (
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.25rem',
                    fontSize: '.875rem',
                    color: '#dc3545',
                  }}
                >
                  {errors.ports}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label style={{ marginBottom: '10px' }}>
              locations<span style={{ color: '#dc3545' }}>*</span>
            </label>
            <div>
              <AppSelect // id="locations"
                options={locations}
                onChange={handleLocationSelect}
                value={selectedLocation}
                placeholder="select"
                isSearchable={true}
              />
              {errors.locations && (
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '0.25rem',
                    fontSize: '.875rem',
                    color: '#dc3545',
                  }}
                >
                  {errors.locations}
                </span>
              )}
            </div>
          </div>
          <InputComponent
            label="VINCode"
            type="text"
            id="vincode"
            required={true}
            name="vincode"
            value={formData.vincode}
            onChange={(e) => handleInputChange(e)}
            error={errors.vincode}
          />
          <InputComponent
            label="lotNumber"
            type="text"
            id="lotNumber"
            required={true}
            name="lotNumber"
            value={formData.lotNumber}
            onChange={(e) => handleInputChange(e)}
            error={errors.lotNumber}
          />
          <br />
          <InputFileComponent
            label="Main Image"
            type="file"
            id="MainImage"
            name="MainImage"
            multiple={false}
            required={false}
            onFileSelected={handleMainImageChange}
          />
          <InputFileComponent
            label="images"
            type="file"
            id="images"
            name="images"
            multiple={true}
            required={false}
            onFileSelected={handleImagesChange}
          />

          <div className="form-group row"></div>
          <div className="form-group row">
            <AppButton type={'submit'} large label={'submit'} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Car;
