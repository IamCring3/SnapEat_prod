import { useEffect } from "react";


// Regular users should only use phone authentication
// This component redirects to phone authentication
const Login = ({ setLogin }: { setLogin: any }) => {
  useEffect(() => {
    // Automatically switch to registration with phone auth
    setLogin(false);
  }, [setLogin]);

  return null; // This component doesn't render anything
};

export default Login;
