import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import RegForm from "./RegForm";
import { useUser } from "../context/UserContextProvider";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

function SignUp() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const onSubmit = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate("/");
      })
      .catch((e) => console.log("Error in SignUP :: ", e));
  };

  const onGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <RegForm
        title="Sign up to your account"
        btnText="Sign Up"
        google={true}
        googleHandler={onGoogle}
        handleSubmit={onSubmit}
      />
    </>
  );
}

export default SignUp;
