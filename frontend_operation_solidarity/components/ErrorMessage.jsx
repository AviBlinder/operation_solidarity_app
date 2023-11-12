const ErrorMessage = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return <div className="error_message">{errorMessage}</div>;
};

export default ErrorMessage;
