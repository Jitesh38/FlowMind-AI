import React from "react";
import { useUser } from "../context/UserContextProvider";
import Popup from "./Popup";

function AuthLayer({ children }) {
  const { user } = useUser();
  if (user !== null) {
    return <>{children}</>;
  }
  else{
    return <><Popup title="Login to Start" inputType="hidden" inputPlaceholder="" buttonText="Cancel" onSubmit={()=>{}} onCancel={()=>{}} /> </>
  }
}

export default AuthLayer;
