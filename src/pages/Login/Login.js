import AuthForm from 'pages/Login/AuthForm';
import GoogleAuth from 'pages/Login/GoogleAuth';
import { Link } from 'react-router-dom';
import styles from 'styles/Login.module.css';

const Login = () => {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <AuthForm isNewAccount={false} />
        <span className={styles.or}>or</span>
        <GoogleAuth />
        <div>
          <span className={styles['other-way-ask']}>
            Don't have an account?
          </span>
          <Link
            className={`${styles['other-way-link']} ${styles.login}`}
            to="/signup"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
