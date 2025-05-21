import RegForm from "./RegForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from "../context/UserContextProvider";
import { useNavigate } from "react-router";

function SignIn() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const onSubmit = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate("/");
      })
      .catch((err) => console.log("Error in SignIn :: ", e));
  };
  return (
    <>
      <RegForm
        title="Sign in to your account"
        btnText="Sign In"
        google={false}
        googleHandler={null}
        handleSubmit={onSubmit}
      />
    </>
  );
}

export default SignIn;
