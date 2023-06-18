import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
type Props = {
  setSubmited: Dispatch<SetStateAction<string>>;
};

const LoginForm: FC<Props> = ({ setSubmited }) => {
  const supabaseClient = useSupabaseClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError(null);
    event.preventDefault();
    //@ts-ignore
    const email = event.target.elements.email.value;
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      console.log("error message", error?.message);
    } else {
      setSubmited(email);
      setError(null);
    }
  };
  return (
    <form onSubmit={onSubmit} className="content-grid home-hero">
      {error && (
        <div className="danger" role="alert">
          {error}
        </div>
      )}
      <h1>Well come back</h1>
      <div className="email-input">
        <label htmlFor="email">Email</label>
        <input
          required
          id="email"
          type="email"
          name="email"
          autoComplete="email"
        />
      </div>
      <button disabled={loading} type="submit" className="large-button">
        <div className="large-button-text">
          {loading ? "Loading.." : "Login"}
        </div>
      </button>
    </form>
  );
};

export default LoginForm;
