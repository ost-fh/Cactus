import { newLibrary, testResultTransmission } from "../types";

const API_URL = "http://localhost:3010/api/";

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  return fetch(`${API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export const getLibraries = () => {
  return fetch(API_URL + "libraries")
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const getLibrary = (id: string) => {
  return fetch(API_URL + "libraries/" + id)
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const createLibrary = (newLibrary: newLibrary, token: string) => {
  return fetch(API_URL + "libraries", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLibrary),
  })
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const postTestResult = (
  testResult: testResultTransmission,
  token: string
) => {
  return fetch(API_URL + "testlab", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testResult),
  })
    .then((data) => data.json())
    .catch((error) => console.error(error));
};
