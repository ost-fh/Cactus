import { UserData } from "../../App";
import { newLibrary, testResultTransmission } from "../resources/types";

const API_URL = (window as any).env?.REACT_APP_BACKEND_BASE_URI || process.env.REACT_APP_BACKEND_BASE_URI || "";

const getUserData = (): UserData | undefined => {
  const userDataString = sessionStorage.getItem("userData");
  if (userDataString) {
    return JSON.parse(userDataString);
  } else {
    return undefined;
  }
};

const httpService = (method: "GET" | "POST", url: string, data?: any) => {
  const userData = getUserData();
  const fetchHeaders = new Headers({ "content-type": "application/json" });

  if (userData && userData.token) {
    fetchHeaders.append("authorization", "Bearer " + userData.token);
  }

  return fetch(url, {
    method: method,
    headers: fetchHeaders,
    body: JSON.stringify(data),
  });
};

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  return httpService("POST", `${API_URL}/auth/login`, credentials).then(
    (data) => data.json()
  );
};

export const registerUser = async (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  return httpService("POST", `${API_URL}/auth/register`, credentials).then(
    (data) => {
      if (data.status === 201) {
        return data.json();
      } else {
        throw new Error("failed");
      }
    }
  );
};

export const getLibraries = async () => {
  return httpService("GET", `${API_URL}/libraries`)
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const getLibrary = async (id: string) => {
  return httpService("GET", `${API_URL}/libraries/${id}`).then((data) => {
    if (data.status === 200) {
      return data.json();
    } else {
      throw new Error("failed");
    }
  });
};

export const createLibrary = async (newLibrary: newLibrary) => {
  return httpService("POST", `${API_URL}/libraries`, newLibrary)
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const postTestResult = async (testResult: testResultTransmission) => {
  return httpService("POST", `${API_URL}/testlab`, testResult)
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const postNewVersion = (newVersion: string, library: string) => {
  return httpService("POST", `${API_URL}/libraries/${library}`, {
    newVersion: newVersion,
  }).then((data) => {
    if (data.status === 200) {
      return data.json();
    } else {
      throw new Error("Post failed");
    }
  });
};
