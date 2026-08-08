import React, { useContext, useEffect, useState } from 'react';
import AppButton from '../../components/AppButton/AppButton';
import { AdminServiceContext } from '../../services/AdminService';
import InputComponent from '../../components/Input/InputComponent';
import styles from './CarCharge.module.scss';
import { validateCarCharge } from '../../utils/carChargeValidation';

const CarCharge = ({ carId, handleCloseDialog }) => {
  const { getChargeHistory, chargeHistory, addChargeHistory } = useContext(AdminServiceContext);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    carId: '',
    payerName: '',
    Amount: '',
    paymentDate: '',
  });

  const fetchChargeHistory = async () => {
    setLoading(true);
    await getChargeHistory(carId);
    setLoading(false);
  };

  useEffect(() => {
    if (carId) {
      setFormData((prev) => ({
        ...prev,
        carId: carId,
      }));

      fetchChargeHistory();

      setLoading(false);
    }
  }, [carId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateCarCharge(formData);
    //console.log(errors);
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    await addChargeHistory(formData);
    await fetchChargeHistory();

    setFormData({
      carId: carId,
      payerName: '',
      Amount: '',
      paymentDate: '',
    });
    setLoading(false);
  };

  return (
    <>
      <div>
        <h2>carId : {carId}</h2>
        <form onSubmit={handleSubmit}>
          <InputComponent
            label="გადამხდელი"
            type="text"
            id="payerName"
            required={true}
            name="payerName"
            value={formData.payerName}
            onChange={(e) => handleInputChange(e)}
            error={errors.payerName}
          />
          <InputComponent
            label="თარიღი"
            type="date"
            id="paymentDate"
            required={true}
            name="paymentDate"
            value={formData.paymentDate}
            onChange={(e) => handleInputChange(e)}
            error={errors.paymentDate}
          />
          <InputComponent
            label="თანხა $"
            type="number"
            id="Amount"
            required={true}
            name="Amount"
            value={formData.Amount}
            onChange={(e) => handleInputChange(e)}
            error={errors.Amount}
          />
          <div className="form-group row"></div>
          <div className="form-group row">
            <AppButton type={'submit'} large label={'submit'} />
          </div>
        </form>
      </div>
      <div className={styles.CarCharge}>
        <table className={styles.CarCharge__table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>დამრიცხველი</th>
              <th>თანხა</th>
              <th>თარიღი</th>
            </tr>
          </thead>
          <tbody>
            {chargeHistory &&
              chargeHistory.map((charge) => {
                return (
                  <tr key={charge.id}>
                    <td>{charge.id}</td>
                    <td>{charge.payerName}</td>
                    <td>{charge.amount}</td>
                    <td>{new Date(charge.paymentDate).toLocaleDateString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CarCharge;
