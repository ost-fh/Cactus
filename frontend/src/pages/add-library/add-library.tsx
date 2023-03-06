import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { createLibrary } from "../../shared/services/api";
import PublicLayout from "../../shared/layout/public-layout";
import { newLibrary } from "../../shared/resources/types";
import LinkButton from "../../shared/components/link-button";
import "./add-library.css";
import Heading from "../../shared/components/heading";

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
    createLibrary(newLibrary).then((res) => {
      navigate(`/libraries/${res._id}`);
    });
  };

  return (
    <PublicLayout activeLink='libraries'>
      <Heading noFocus>Add a new Library</Heading>
      <p>
        To add a new Library, please fill out the form below. Only add libraries
        that do not yet exit on cactus.
      </p>
      <form className='add-library-form' onSubmit={handleSubmit}>
        <div className='form'>
          <label htmlFor='lib-title'>Name of the Library</label>
          <input
            required
            autoFocus
            onChange={handleChange}
            pattern='[A-Za-z0-9\s]*'
            type='text'
            name='title'
            id='lib-title'
          />
          <label htmlFor='lib-version'>Current Version</label>
          <input
            required
            onChange={handleChange}
            pattern='^[A-Za-z0-9\\-\\.]+$'
            type='text'
            name='currentVersion'
            id='lib-version'
          />
          <label htmlFor='lib-link-home'>Link to Homepage (https://...)</label>
          <input
            required
            onChange={handleChange}
            type='url'
            pattern='http(s)?:\/\/(www\.)?[a-zA-Z0-9]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)'
            name='linkHome'
            id='lib-link-home'
          />
          <label htmlFor='lib-link-docs'>
            Link to Documentation (https://...)
          </label>
          <input
            required
            pattern='http(s)?:\/\/(www\.)?[a-zA-Z0-9]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)'
            onChange={handleChange}
            type='url'
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
