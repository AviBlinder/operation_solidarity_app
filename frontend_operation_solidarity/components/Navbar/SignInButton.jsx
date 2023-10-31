const SignInButton = ({ signIn, provider }) => (
  <button
    type="button"
    onClick={() => signIn(provider.id)}
    className="btn_primary"
  >
    Sign in
  </button>
);

export default SignInButton;
