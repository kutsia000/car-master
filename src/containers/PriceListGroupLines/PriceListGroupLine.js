import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import Select from 'react-select';

const PriceListGroupLine = ({ handleCloseDialog }) => {
  const {
    getPriceListGroupLineById,
    addPriceListGroupLine,
    updatePriceListGroupLine,
    priceListGroupLine,
    selPriceListGroups,
    selAuctions,
    selLocations,
    selPorts,
    error,
    success,
  } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [priceListGroups, setPriceListGroups] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [ports, setPorts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedPriceListGroup, setSelectedPriceListGroup] = useState(null);
  const [groupError, setGroupError] = useState(null);
  const [auctionError, setAuctionError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [portError, setPortError] = useState(null);

  const lang = i18n.language || 'en';
  const { lineId } = useParams();

  const [formData, setFormData] = useState({
    lineId: null,
    priceListGroupId: null,
    priceListGroupName: '',
    auctionId: null,
    auctionName: '',
    locationId: null,
    locationName: '',
    portId: null,
    portName: '',
    price: 0,
  });

  const fetchData = async () => {
    await getPriceListGroupLineById(lineId);
  };

  useEffect(() => {
    if (lineId) {
      fetchData();
    }
    setLoading(false);
  }, []);

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
    if (selPriceListGroups) {
      let opts = selPriceListGroups.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setPriceListGroups(opts);
    }
  }, [selPriceListGroups]);

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
    if (selPorts) {
      let opts = selPorts.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setPorts(opts);
    }
  }, [selPorts]);

  useEffect(() => {
    if (priceListGroupLine) {
      if (!lineId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          lineId: null,
          priceListGroupId: null,
          priceListGroupName: '',
          auctionId: null,
          auctionName: '',
          locationId: null,
          locationName: '',
          portId: null,
          portName: '',
          price: 0,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          lineId: priceListGroupLine.lineId,
          priceListGroupId: priceListGroupLine.priceListGroupId,
          priceListGroupName: priceListGroupLine.priceListGroupName,
          auctionId: priceListGroupLine.auctionId,
          auctionName: priceListGroupLine.auctionName,
          locationId: priceListGroupLine.locationId,
          locationName: priceListGroupLine.locationName,
          portId: priceListGroupLine.portId,
          portName: priceListGroupLine.portName,
          price: priceListGroupLine.price,
        }));
        handleSelectAuction(priceListGroupLine.auctionId);
        handleSelectPriceListGroup(priceListGroupLine.priceListGroupId);
        handleLocationSelect(priceListGroupLine.locationId);
        handlePortSelect(priceListGroupLine.portId);
      }
    }
  }, [priceListGroupLine]);

  const handleAuctionChange = (selectedOption) => {
    setSelectedAuction(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      auctionId: selectedOption.value,
      auctionName: selectedOption.label,
    }));
  };

  const handleSelectAuction = (auctionId) => {
    const selectedAuction = selAuctions.find((auc) => auc.id == auctionId);
    setSelectedAuction({ value: selectedAuction.id, label: selectedAuction.auctionName });
  };

  const handlePriceListGroupChange = (selectedOption) => {
    setSelectedPriceListGroup(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      priceListGroupId: selectedOption.value,
      priceListGroupName: selectedOption.label,
    }));
  };

  const handleSelectPriceListGroup = (groupId) => {
    const selectedGroup = selPriceListGroups.find((gr) => gr.id == groupId);
    setSelectedPriceListGroup({ value: selectedGroup.id, label: selectedGroup.name });
  };

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationId: selectedOption.value,
      locationName: selectedOption.label,
    }));
  };

  const handleLocationSelect = (locationId) => {
    const selectedLocation = selLocations.find((loc) => loc.id == locationId);
    setSelectedLocation({ value: selectedLocation.id, label: selectedLocation.name });
  };

  const handlePortChange = (selectedOption) => {
    setSelectedPort(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      portId: selectedOption.value,
      portName: selectedOption.label,
    }));
  };

  const handlePortSelect = (portId) => {
    const selectePort = selPorts.find((port) => port.id == portId);
    setSelectedPort({ value: selectePort.id, label: selectePort.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGroupError(null);
    setAuctionError(null);
    setLocationError(null);
    setPortError(null);

    if (!selectedPriceListGroup) {
      setGroupError('required');
      return;
    }

    if (!selectedAuction) {
      setAuctionError('required');
      return;
    }

    if (!selectedLocation) {
      setLocationError('required');
      return;
    }

    if (!selectedPort) {
      setPortError('required');
      return;
    }

    setLoading(true);

    if (lineId) {
      await updatePriceListGroupLine(formData);
    } else {
      await addPriceListGroupLine(formData);
    }

    if (success) {
      handleCloseDialog();
    }

    setLoading(false);
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>lineId:{lineId}</h2>
        <div className="form-group row">
          <label htmlFor="pricelistgroup" className="col-sm-12 col-md-4 col-lg-4 col-form-label">
            price list group
          </label>
          <div className="col-sm-12 col-md-8 col-lg-8">
            <Select
              id="pricelistgroup"
              options={priceListGroups}
              onChange={handlePriceListGroupChange}
              isSearchable
              placeholder="select"
              value={selectedPriceListGroup}
            />
            {groupError && <p style={{ color: 'red' }}>{groupError}</p>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="auction" className="col-sm-12 col-md-4 col-lg-4 col-form-label">
            auction
          </label>
          <div className="col-sm-12 col-md-8 col-lg-8">
            <Select
              id="auction"
              options={auctions}
              onChange={handleAuctionChange}
              isSearchable
              placeholder="select"
              value={selectedAuction}
            />
            {auctionError && <p style={{ color: 'red' }}>{auctionError}</p>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="location" className="col-sm-12 col-md-4 col-lg-4 col-form-label">
            locations
          </label>
          <div className="col-sm-12 col-md-8 col-lg-8">
            <Select
              id="location"
              options={locations}
              onChange={handleLocationChange}
              isSearchable
              placeholder="select"
              value={selectedLocation}
            />
            {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="port" className="col-sm-12 col-md-4 col-lg-4 col-form-label">
            ports
          </label>
          <div className="col-sm-12 col-md-8 col-lg-8">
            <Select
              id="port"
              options={ports}
              onChange={handlePortChange}
              isSearchable
              placeholder="select"
              value={selectedPort}
            />
            {portError && <p style={{ color: 'red' }}>{portError}</p>}
          </div>
        </div>
        <InputComponent
          label="price"
          labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
          type="number"
          className="form-control"
          id="price"
          required={true}
          name="price"
          value={formData.price}
          containerClass="col-sm-12 col-md-8 col-lg-8"
          onChange={(e) => handleInputChange(e)}
        />
        {error ? error : null}
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default PriceListGroupLine;
