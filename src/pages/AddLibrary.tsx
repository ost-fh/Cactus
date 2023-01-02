import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLibrary } from "../services/api";
import { UserContext } from "../App";
import PublicLayout from "../layout/PublicLayout";
import { newLibrary } from "../types";
import LinkButton from "../components/LinkButton";

const AddLibrary = () => {
  const userData = useContext(UserContext);

  const navigate = useNavigate();
  const [newLibrary, setNewLibrary] = useState<newLibrary>({
    title: "",
    currentVersion: "",
    linkDocs: "",
    linkHome: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewLibrary((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userData) {
      throw new Error("missing userData");
    }
    createLibrary(newLibrary, userData.token).then((res) => {
      navigate(`/libraries/${res._id}`);
    });
  };

  return (
    <PublicLayout>
      <h2>Add a new Library</h2>
      <p>To add a new Library, please fill out the form below.</p>
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <label htmlFor='lib-title'>Name of the Library</label>
          <input
            required
            autoFocus
            onChange={handleChange}
            type='text'
            name='title'
            id='lib-title'
          />
          <label htmlFor='lib-version'>Current Version</label>
          <input
            required
            onChange={handleChange}
            type='text'
            name='currentVersion'
            id='lib-version'
          />
          <label htmlFor='lib-link-home'>Link to Homepage</label>
          <input
            required
            onChange={handleChange}
            type='text'
            name='linkHome'
            id='lib-link-home'
          />
          <label htmlFor='lib-link-docs'>Link to Documentation</label>
          <input
            required
            onChange={handleChange}
            type='text'
            name='linkDocs'
            id='lib-link-docs'
          />
        </div>
        <div className='control-group'>
          <LinkButton
            type='button'
            to={"/libraries"}
            label={"Cancel and Return"}
          />
          <button className='button-primary' type='submit'>
            Add new Library
          </button>
        </div>
      </form>
    </PublicLayout>
  );
};

export default AddLibrary;
