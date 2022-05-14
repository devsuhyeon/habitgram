import AuthForm from 'components/AuthForm';
import GoogleAuth from 'components/GoogleAuth';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div>
      <AuthForm isNewAccount={true} />
      <span>or</span>
      <GoogleAuth />
      <span>Already have an account?</span>
      <Link to="/login">Log in</Link>
    </div>
  );
};

export default Signup;
