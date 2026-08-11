import { useState } from 'react';
import AppInput from '../AppInput/AppInput';
import AppButton from '../AppButton/AppButton';
//IAAI
const AppCalcIAAIPrice = () => {
  const [price, setPrice] = useState(0);
  const [estimatePrice, setEstimatePrice] = useState(0);

  const calculateFees = (finalBidPrice) => {
    let securedPaymentFee = 0;
    let liveBidFee = 0;
    const gateFee = 95; // Static

    const enviromentalFee = 15;
    const additionalFee = 250;
    // პროსტაზე 250$

    // Secured Payment Fee logic
    if (finalBidPrice >= 0 && finalBidPrice <= 99.99) securedPaymentFee = 1;
    // else if (finalBidPrice >= 100 && finalBidPrice <= 99.99) securedPaymentFee = 1;
    else if (finalBidPrice >= 100 && finalBidPrice <= 199.99) securedPaymentFee = 25;
    else if (finalBidPrice >= 200 && finalBidPrice <= 299.99) securedPaymentFee = 60;
    else if (finalBidPrice >= 300 && finalBidPrice <= 349.99) securedPaymentFee = 85;
    else if (finalBidPrice >= 350 && finalBidPrice <= 399.99) securedPaymentFee = 100;
    else if (finalBidPrice >= 400 && finalBidPrice <= 449.99) securedPaymentFee = 125;
    else if (finalBidPrice >= 450 && finalBidPrice <= 499.99) securedPaymentFee = 135;
    else if (finalBidPrice >= 500 && finalBidPrice <= 549.99) securedPaymentFee = 145;
    else if (finalBidPrice >= 550 && finalBidPrice <= 599.99) securedPaymentFee = 155;
    else if (finalBidPrice >= 600 && finalBidPrice <= 699.99) securedPaymentFee = 170;
    else if (finalBidPrice >= 700 && finalBidPrice <= 799.99) securedPaymentFee = 195;
    else if (finalBidPrice >= 800 && finalBidPrice <= 899.99) securedPaymentFee = 215;
    else if (finalBidPrice >= 900 && finalBidPrice <= 999.99) securedPaymentFee = 230;
    else if (finalBidPrice >= 1000 && finalBidPrice <= 1199.99) securedPaymentFee = 250;
    else if (finalBidPrice >= 1200 && finalBidPrice <= 1299.99) securedPaymentFee = 270;
    else if (finalBidPrice >= 1300 && finalBidPrice <= 1399.99) securedPaymentFee = 285;
    else if (finalBidPrice >= 1400 && finalBidPrice <= 1499.99) securedPaymentFee = 300;
    else if (finalBidPrice >= 1500 && finalBidPrice <= 1599.99) securedPaymentFee = 315;
    else if (finalBidPrice >= 1600 && finalBidPrice <= 1699.99) securedPaymentFee = 330;
    else if (finalBidPrice >= 1700 && finalBidPrice <= 1799.99) securedPaymentFee = 350;
    else if (finalBidPrice >= 1800 && finalBidPrice <= 1999.99) securedPaymentFee = 370;
    else if (finalBidPrice >= 2000 && finalBidPrice <= 2399.99) securedPaymentFee = 390;
    else if (finalBidPrice >= 2400 && finalBidPrice <= 2499.99) securedPaymentFee = 425;
    else if (finalBidPrice >= 2500 && finalBidPrice <= 2999.99) securedPaymentFee = 460;
    else if (finalBidPrice >= 3000 && finalBidPrice <= 3499.99) securedPaymentFee = 505;
    else if (finalBidPrice >= 3500 && finalBidPrice <= 3999.99) securedPaymentFee = 555;
    else if (finalBidPrice >= 4000 && finalBidPrice <= 4499.99) securedPaymentFee = 600;
    else if (finalBidPrice >= 4500 && finalBidPrice <= 4999.99) securedPaymentFee = 625;
    else if (finalBidPrice >= 5000 && finalBidPrice <= 5499.99) securedPaymentFee = 650;
    else if (finalBidPrice >= 5500 && finalBidPrice <= 5999.99) securedPaymentFee = 675;
    else if (finalBidPrice >= 6000 && finalBidPrice <= 6499.99) securedPaymentFee = 700;
    else if (finalBidPrice >= 6500 && finalBidPrice <= 6999.99) securedPaymentFee = 720;
    else if (finalBidPrice >= 7000 && finalBidPrice <= 7499.99) securedPaymentFee = 755;
    else if (finalBidPrice >= 7500 && finalBidPrice <= 7999.99) securedPaymentFee = 775;
    else if (finalBidPrice >= 8000 && finalBidPrice <= 8499.99) securedPaymentFee = 800;
    else if (finalBidPrice >= 8500 && finalBidPrice <= 9999.99) securedPaymentFee = 820;
    // else if (finalBidPrice >= 9000 && finalBidPrice <= 9999.99) securedPaymentFee = 820;
    else if (finalBidPrice >= 10000 && finalBidPrice <= 11499.99) securedPaymentFee = 850;
    else if (finalBidPrice >= 11500 && finalBidPrice <= 11999.99) securedPaymentFee = 860;
    else if (finalBidPrice >= 12000 && finalBidPrice <= 12499.99) securedPaymentFee = 875;
    else if (finalBidPrice >= 12500 && finalBidPrice <= 14999.99) securedPaymentFee = 890;
    else if (finalBidPrice >= 15000) securedPaymentFee = finalBidPrice * 0.06;

    // Live Bid Fee logic
    if (finalBidPrice > 0 && finalBidPrice <= 99.9) liveBidFee = 0;
    else if (finalBidPrice >= 100 && finalBidPrice < 500) liveBidFee = 50;
    else if (finalBidPrice >= 500 && finalBidPrice < 1000) liveBidFee = 65;
    else if (finalBidPrice >= 1000 && finalBidPrice < 1500) liveBidFee = 85;
    else if (finalBidPrice >= 1500 && finalBidPrice < 2000) liveBidFee = 95;
    else if (finalBidPrice >= 2000 && finalBidPrice < 4000) liveBidFee = 110;
    else if (finalBidPrice >= 4000 && finalBidPrice <= 6000) liveBidFee = 125;
    else if (finalBidPrice >= 6000 && finalBidPrice < 8000) liveBidFee = 145;
    else if (finalBidPrice > 8000) liveBidFee = 160;

    // Calculate total fee
    const totalFee =
      parseFloat(finalBidPrice) +
      parseFloat(securedPaymentFee) +
      parseFloat(liveBidFee) +
      gateFee +
      additionalFee +
      enviromentalFee;

    return {
      finalBidPrice,
      additionalFee,
      enviromentalFee,
      securedPaymentFee,
      liveBidFee,
      gateFee,
      totalFee,
    };
  };

  const handleChange = (e) => {
    setPrice(e.target.value);
    setEstimatePrice(0);
  };

  const handleSubmit = () => {
    //e.preventDefault();

    if (price <= 0) {
      console.log('Please enter a valid price');
      return;
    }

    const finalBidPrice = price;
    const fees = calculateFees(finalBidPrice);

    setEstimatePrice(fees.totalFee);
    //console.log(fees);
  };

  return (
    <>
      <form>
        <AppInput
          type="number"
          placeholder="შეიყვანეთ თანხა"
          label="ავტომობილის ღირებულება"
          id="price"
          name="price"
          min={0}
          currency={true}
          onChange={handleChange}
          isUSD={true}
        />
        <AppInput
          type="number"
          placeholder="ფასი"
          label="სრული ღირებულება"
          id="estimatePrice"
          name="estimatePrice"
          min={0}
          currency={true}
          value={estimatePrice}
          disabled={true}
          isUSD={true}
        />
      </form>
      <AppButton label="გამოთვლა" full type={'button'} onClick={handleSubmit} />
    </>
  );
};

export default AppCalcIAAIPrice;
