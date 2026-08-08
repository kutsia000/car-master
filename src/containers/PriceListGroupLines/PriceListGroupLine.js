import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import AppSelect from '../../components/AppSelect/AppSelect';
import AppButton from '../../components/AppButton/AppButton';

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
    //console.log(selLocations);
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
      <h2>lineId:{lineId}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label style={{ marginBottom: '10px' }}>price list group</label>
          <div>
            <AppSelect
              //id="pricelistgroup"
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
          <label htmlFor="auction" style={{ marginBottom: '10px' }}>
            auction
          </label>
          <div>
            <AppSelect
              //id="auction"
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
          <label style={{ marginBottom: '10px' }}>locations</label>
          <div>
            <AppSelect
              //id="location"
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
          <label style={{ marginBottom: '10px' }}>ports</label>
          <div>
            <AppSelect
              //id="port"
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
          type="number"
          id="price"
          required={true}
          name="price"
          value={formData.price}
          onChange={(e) => handleInputChange(e)}
        />
        {error ? error : null}
        <div className="form-group row"></div>
        <div className="form-group row"></div>
        <div className="form-group row">
          <AppButton type={'submit'} large label={'submit'} />
        </div>
      </form>
    </>
  );
};

export default PriceListGroupLine;
