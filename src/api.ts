import { newLibrary } from "./types";

const API_URL = "http://localhost:8080/api/";

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

export const createLibrary = (newLibrary: newLibrary) => {
    return fetch(API_URL + "libraries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newLibrary),
    })
        .then((data) => data.json())
        .catch((error) => console.error(error));
};
