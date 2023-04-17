import { useState } from "react";

export const useUserData = () => {
  const getUserData = () => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const token = decodeJWT(userData.token);
      console.log(token);

      const exp = new Date(token.payload.exp);
      if (exp < new Date()) {
        localStorage.removeItem("userData");
        return undefined;
      }
      return userData;
    } else {
      return undefined;
    }
  };
  const [userData, setUserData] = useState(getUserData());
  const saveUserData = (userData: any) => {
    if (userData === undefined) {
      localStorage.removeItem("userData");
    } else {
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    setUserData(userData);
  };
  return {
    setUserData: saveUserData,
    userData,
  };
};

const decodeJWT = (token: any) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  return { header, payload };
};
