const SignInButton = ({ signIn, provider }) => (
  <button
    type="button"
    onClick={() => signIn(provider.id)}
    className="btn_primary py-1 px-4"
  >
    Sign in
  </button>
);

export default SignInButton;
