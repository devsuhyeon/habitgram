import AuthForm from 'components/AuthForm';
import GoogleAuth from 'components/GoogleAuth';
import { Link } from 'react-router-dom';
import styles from 'assets/styles/Login.module.css';

const Signup = () => {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <AuthForm isNewAccount={true} />
        <span className={styles.or}>or</span>
        <GoogleAuth />
        <div>
          <span>Already have an account?</span>
          <Link
            className={`${styles['other-way-link']} ${styles.signup}`}
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
