import { createContext } from "react";

const AuthContext = createContext({
  authContext: "",
  setAuthContext: (authContext: string) => {},
});
export default AuthContext;
