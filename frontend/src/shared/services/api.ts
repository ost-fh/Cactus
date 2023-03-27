import {
  ComponentCriteria,
  Criterium,
  NewLibrary,
  TestResultTransmission,
} from "../resources/types";

export const API_BASE_URL =
  (window as any).env?.REACT_APP_BACKEND_BASE_URI ||
  process.env.REACT_APP_BACKEND_BASE_URI ||
  "";

const getToken = (): string | undefined => {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    return JSON.parse(userDataString).token;
  } else {
    return undefined;
  }
};

const httpService = (
  method: "GET" | "POST",
  url: string,
  data?: any,
  token: string | undefined = getToken()
) => {
  const fetchHeaders = new Headers({ "content-type": "application/json" });

  if (token) {
    fetchHeaders.append("authorization", "Bearer " + token);
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
  return httpService("POST", `${API_BASE_URL}/auth/login`, credentials).then(
    (data) => data.json()
  );
};

export const registerUser = async (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  return httpService("POST", `${API_BASE_URL}/auth/register`, credentials).then(
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
  return httpService("GET", `${API_BASE_URL}/libraries`)
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const getComponents = async (): Promise<ComponentCriteria[]> => {
  return httpService("GET", `${API_BASE_URL}/components`)
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const getAllCriteria = async (): Promise<Criterium[]> => {
  const allCriteria: ComponentCriteria[] = await getComponents();
  const res = allCriteria.map((component) => {
    return component.testModes.map((group) => group.criteria);
  });
  return res.flat(2);
};

export const getCriterium = async (
  id: string
): Promise<Criterium | undefined> => {
  const allCriteria = await getAllCriteria();
  return allCriteria.find((item) => item._id === id);
};

export const getLibrary = async (id: string) => {
  return httpService("GET", `${API_BASE_URL}/libraries/${id}`).then((data) => {
    if (data.status === 200) {
      return data.json();
    } else {
      throw new Error("failed");
    }
  });
};

export const getUserProfile = async (token?: string) => {
  return httpService("GET", `${API_BASE_URL}/users`, undefined, token).then(
    (data) => {
      if (data.status === 200) {
        return data.json();
      } else {
        throw new Error("failed");
      }
    }
  );
};

export const createLibrary = async (newLibrary: NewLibrary) => {
  return httpService("POST", `${API_BASE_URL}/libraries`, {
    title: newLibrary.title,
    linkHome: newLibrary.linkHome,
    linkDocs: newLibrary.linkDocs,
    currentVersion: { name: newLibrary.currentVersion },
  })
    .then((data) => data.json())
    .catch((error) => console.error(error));
};

export const postTestResult = async (testResult: TestResultTransmission) => {
  return httpService("POST", `${API_BASE_URL}/testlab`, testResult).then(
    (data) => {
      if (data.status === 201) {
        return data.json();
      } else {
        throw new Error(data.status + data.statusText);
      }
    }
  );
};

export const postNewVersion = (newVersion: string, library: string) => {
  return httpService("POST", `${API_BASE_URL}/libraries/${library}`, {
    name: newVersion,
  }).then((data) => {
    if (data.status === 200 || data.status === 201) {
      return data.json();
    } else {
      throw new Error("Post failed");
    }
  });
};
