export function validateCarForm(formData, t) {
  const errors = {};
  //console.log(formData);
  if (!formData.carMarkId) {
    errors.carMarks = 'car mark';
  }

  if (!formData.carModelId) {
    errors.carModels = 'car model is required';
  }

  if (!formData.carStatusId) {
    errors.carStatuses = 'carStatus  is required';
  }

  if (!formData.prodYear) {
    errors.years = 'prodYear is required';
  }

  if (!formData.vincode) {
    errors.vincode = 'vincode is required';
  }

  if (!formData.auctionId) {
    errors.auctions = 'auction is Required';
  }

  if (!formData.locationId) {
    errors.locations = 'locationId is Required';
  }

  if (!formData.portId) {
    errors.ports = 'portId is Required';
  }

  // if (!formData.auctionId) {
  //   errors.userTypeId = 'auction is Required';
  // }

  return errors;
}
