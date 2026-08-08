export function validateCarCharge(formData) {
  const errors = {};
  //console.log(formData);
  if (!formData.carId) {
    errors.carId = 'carId is required';
  }

  if (!formData.payerName) {
    errors.payerName = 'Payer name is required';
  }
  if (!formData.paymentDate) {
    errors.paymentDate = 'Payment date is required';
  }
  if (!formData.Amount) {
    errors.Amount = 'Amount is required';
  } else if (isNaN(formData.Amount)) {
    errors.Amount = 'Amount must be a number';
  } else if (Number(formData.Amount) <= 0) {
    errors.Amount = 'Amount must be greater than zero';
  }

  return errors;
}
