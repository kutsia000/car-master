import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import Select from 'react-select';
import { validateForm } from '../../utils/formValidation';

const User = ({ handleCloseDialog }) => {
  const {
    user,
    getUserById,
    userTypes,
    selPriceListGroups,
    registerUser,
    updateUser,
    error,
    success,
  } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [selectedUserType, setSelecteduserType] = useState(null);
  const [priceListGroups, setPriceListGroups] = useState([]);
  const [selUserTypes, setSelUserTypes] = useState([]);
  const [selectedPriceListGroup, setSelectedPriceListGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: null,
    userTypeId: null,
    userTypeName: '',
    passwordHash: '',
    userName: '',
    firstName: '',
    lastName: '',
    personalId: '',
    email: '',
    phoneNumber: '',
    priceListGroupId: null,
    priceListGroupName: '',
    dateBirth: '',
  });

  const lang = i18n.language || 'en';
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getUserById(userId);
      setLoading(false);
    };
    //console.log(userId);
    if (userId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      //console.log(user);
      if (!userId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: null,
          userTypeId: null,
          userTypeName: '',
          passwordHash: '',
          userName: '',
          firstName: '',
          lastName: '',
          personalId: '',
          email: '',
          phoneNumber: '',
          priceListGroupId: null,
          priceListGroupName: '',
          dateBirth: '',
        }));
      } else {
        const dateObject = new Date(user.dateBirth);

        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(dateObject.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: user.id,
          userTypeId: user.userTypeId,
          userTypeName: user.userTypeName,
          passwordHash: '',
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          personalId: user.personalId,
          email: user.email,
          phoneNumber: user.phoneNumber,
          priceListGroupId: user.priceListGroupId,
          priceListGroupName: user.priceListGroupName,
          dateBirth: formattedDate,
        }));
        handleSelectUserType(user.userTypeId);
        handleSelectPriceListGroup(user.priceListGroupId);
      }
    }
  }, [user]);

  useEffect(() => {
    if (userTypes) {
      let opts = userTypes.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setSelUserTypes(opts);
    }
  }, [userTypes]);

  useEffect(() => {
    if (selPriceListGroups) {
      let opts = selPriceListGroups.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setPriceListGroups(opts);
    }
  }, [selPriceListGroups]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = {};

    for (const key in formData) {
      //console.log(key);
      if (key === 'passwordHash') {
        if (userId && formData.passwordHash) {
          newFormData[key] = formData[key];
        }
      } else {
        newFormData[key] = formData[key];
      }
    }

    //console.log(newFormData);

    const errors = validateForm(newFormData, t, newFormData.hasOwnProperty('passwordHash'));
    //console.log(errors);
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    if (userId) {
      await updateUser(formData);
    } else {
      await registerUser(formData);
    }

    handleCloseDialog();

    setLoading(false);
  };

  const handleSelectUserType = (id) => {
    //console.log(selUserTypes);
    const selecteduserType = userTypes.find((ut) => ut.id == id);
    setSelecteduserType({ value: selecteduserType.id, label: selecteduserType.name });
  };

  const handleUserTypeChange = (selectedOption) => {
    setSelecteduserType(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      userTypeId: selectedOption.value,
      userTypeName: selectedOption.label,
    }));
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
    //console.log(selPriceListGroups);
    if (groupId) {
      const selectedGroup = selPriceListGroups.find((gr) => gr.id == groupId);
      setSelectedPriceListGroup({ value: selectedGroup.id, label: selectedGroup.name });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">
            {/* <label className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-form-label">
                username
              </label> */}
            <InputComponent
              label="userName"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="text"
              className="form-control"
              id="userName"
              required={true}
              name="userName"
              value={formData.userName}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleInputChange(e)}
              error={errors.userName}
            />
            <InputComponent
              label="firstName"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="text"
              className="form-control"
              id="firstName"
              required={true}
              name="firstName"
              value={formData.firstName}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleInputChange(e)}
              error={errors.firstName}
            />
            <InputComponent
              label="lastName"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="text"
              className="form-control"
              id="lastName"
              required={true}
              name="lastName"
              value={formData.lastName}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleInputChange(e)}
              error={errors.lastName}
            />
            <InputComponent
              label="personalId"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="text"
              className="form-control"
              id="personalId"
              required={true}
              name="personalId"
              value={formData.personalId}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleInputChange(e)}
              error={errors.personalId}
            />
            <InputComponent
              label="email"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="text"
              className="form-control"
              id="email"
              required={false}
              name="email"
              value={formData.email}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleInputChange(e)}
              error={errors.email}
            />
            <InputComponent
              label="phoneNumber"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="text"
              className="form-control"
              id="phoneNumber"
              required={false}
              name="phoneNumber"
              value={formData.phoneNumber}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleInputChange(e)}
              error={errors.phoneNumber}
            />
            <InputComponent
              label="passwordHash"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="password"
              className="form-control"
              id="passwordHash"
              required={userId ? false : true}
              name="passwordHash"
              value={formData.passwordHash}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleInputChange(e)}
              error={errors.passwordHash}
            />
            <InputComponent
              label="dateBirth"
              labelClass="col-sm-12 col-md-4 col-lg-4 col-form-label"
              type="date"
              className="form-control"
              id="dateBirth"
              required={true}
              name="dateBirth"
              value={formData.dateBirth}
              containerClass="col-sm-12 col-md-8 col-lg-8"
              onChange={(e) => handleInputChange(e)}
              error={errors.dateBirth}
            />
            <div className="form-group row">
              <label htmlFor="userTypes" className="col-sm-12 col-md-4 col-lg-4 col-form-label">
                usertypes
              </label>
              <div className="col-sm-12 col-md-8 col-lg-8">
                <Select
                  id="userTypes"
                  options={selUserTypes}
                  onChange={handleUserTypeChange}
                  isSearchable
                  placeholder="select"
                  value={selectedUserType}
                />
                {errors.userTypeId && (
                  <span
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '0.25rem',
                      fontSize: '.875rem',
                      color: '#dc3545',
                    }}
                  >
                    {errors.userTypeId}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="pricelistgroup"
                className="col-sm-12 col-md-4 col-lg-4 col-form-label"
              >
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
              </div>
            </div>
            <button type="submit">submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default User;
