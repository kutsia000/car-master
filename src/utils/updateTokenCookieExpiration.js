import Cookies from 'js-cookie';

const updateTokenCookieExpiration = () => {
  const token = Cookies.get('Token');

  if (token) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    Cookies.set('Token', token, { expires: expirationDate });
  }
};

export { updateTokenCookieExpiration };
