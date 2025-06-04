import React, { createContext } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const user = {
    name: "arif",
  };

  return <AuthContext value={user}>{children}</AuthContext>;
};

export default AuthProvider;
