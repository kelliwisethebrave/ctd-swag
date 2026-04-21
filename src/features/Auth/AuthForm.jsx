import spinner from '../../assets/icons/spinner.svg';
import RegisterForm from './RegisterForm.jsx';
import LoginForm from './LoginForm.jsx';

function AuthForm({
  handleCloseAuthForm,
  handleAuthenticate,
  isAuthenticating,
  authError,
  isRegistering,
  handleRegister,
}) {
  return (
    <>
      <div className="authFormScreen"></div>
      {isAuthenticating ? (
        <div className="loadingScreen">
          <div className="spinnerWrapper">
            <img src={spinner} alt="code the dream logo" />
          </div>
          <p>Logging into CTD Swag...</p>
        </div>
      ) : isRegistering ? (
        <RegisterForm
          handleCloseAuthForm={handleCloseAuthForm}
          authError={authError}
          handleRegister={handleRegister}
        />
      ) : (
        <LoginForm
          handleAuthenticate={handleAuthenticate}
          handleCloseAuthForm={handleCloseAuthForm}
          authError={authError}
        />
      )}
    </>
  );
}

export default AuthForm;
