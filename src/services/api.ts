import { newLibrary, testResultTransmission } from "../types";

const API_URL = "http://localhost:3010/api";

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export const registerUser = async (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    if (data.status === 200) {
      return data.json();
    } else {
      throw new Error("failed");
    }
  });
};

export const getLibraries = async () => {
  return fetch(`${API_URL}/libraries`)
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const getLibrary = async (id: string) => {
  return fetch(`${API_URL}/libraries/${id}`).then((data) => {
    if (data.status === 200) {
      return data.json();
    } else {
      throw new Error("failed");
    }
  });
  // .catch((error) => console.error(error));
};

export const createLibrary = async (newLibrary: newLibrary, token: string) => {
  return fetch(`${API_URL}/libraries`, {
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

export const postTestResult = async (
  testResult: testResultTransmission,
  token: string
) => {
  return fetch(`${API_URL}/testlab`, {
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

export const postNewVersion = (
  newVersion: string,
  library: string,
  token: string
) => {
  return fetch(`${API_URL}/libraries/${library}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newVersion: newVersion }),
  }).then((data) => {
    if (data.status === 200) {
      return data.json();
    } else {
      throw new Error("Post failed");
    }
  });
};
