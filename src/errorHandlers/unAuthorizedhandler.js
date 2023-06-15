import { useNavigate } from 'react-router-dom';

const handleUnauthorizedError = () => {
  const navigate = useNavigate();

  // Handle unauthorized errors
  navigate('/ka/login'); // Example: Redirect to the login page

  // Perform any additional error handling or actions as needed
  // ...
};

export default handleUnauthorizedError;
