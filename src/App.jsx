import jwtDecode from 'jwt-decode';
import { useMemo, useState } from 'react';
import { GoogleLogin, useGoogleLogin, CodeResponse, googleLogout } from "@react-oauth/google";

const App = () => {

  // const googleLogin = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: async codeResponse => {
  //     setCodeResponse(codeResponse)
  //   },
  //   onError: errorResponse => console.log(errorResponse),
  // })
const [credentialResponse, setCredentialResponse] = useState();
 const [codeResponse, setCodeResponse] = useState();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      setCodeResponse(codeResponse);
    },
    onError: errorResponse => console.log(errorResponse),
  });

 const user = useMemo(() => {
   if (!credentialResponse?.credential) return;
   return jwtDecode(credentialResponse.credential);
 }, [credentialResponse]);

  return (
    <div>
      <GoogleLogin
        clientId="794606318486-ftfo3bu412npnknf03rbgavstvh6a75t.apps.googleusercontent.com"
        onSuccess={(credentialResponse) => {
          setCredentialResponse(credentialResponse);
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <br />
      {user && JSON.stringify(user, null, 2)}

      <button type='button' onClick={() => googleLogin()}>
        Login with Google 🚀
      </button>
      <br />

      {codeResponse && JSON.stringify(codeResponse, null, 2)}

      <GoogleLogin
          onSuccess={credentialResponse => {
            setCredentialResponse(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <GoogleLogin
          theme="filled_black"
          shape="pill"
          onSuccess={credentialResponse => {
            setCredentialResponse(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <button type='button' onClick={() => googleLogout()}>Logout</button>
    </div>
  );
}

export default App;
