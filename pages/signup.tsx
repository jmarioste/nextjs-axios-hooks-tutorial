import useAxios from "axios-hooks";

type SignUpResponse = {
  success: boolean;
};
const SignupPage = () => {
  const [{ data, loading, error }, signup] = useAxios<SignUpResponse>(
    {
      url: "/api/signup",
      method: "POST",
    },
    {
      manual: true,
    }
  );

  return (
    <div style={{ padding: 16 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        <h1>Sign Up</h1>
        <input name="username" />
        <input name="password" />
        {error && <p>{error.message}</p>}
        {data?.success && <p>Successfully signed up</p>}
        <div>
          <button>{loading ? "Loading..." : "Sign up"}</button>
        </div>
      </form>
    </div>
  );
};
export default SignupPage;
