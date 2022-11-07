import React, { useState } from "react";

type newLibrary = {
  title: string;
  version: string;
  linkHome: string;
  linkDocs: string;
};

const AddLibrary = () => {
  const [newLibrary, setNewLibrary] = useState<newLibrary>({
    title: "",
    version: "",
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
    console.log(newLibrary);
  };

  return (
    <div>
      <h1>New Library</h1>
      <p>To add a new Library, please fill out the form below.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='lib-title'>Name of the Library</label>
        <input
          onChange={handleChange}
          type='text'
          name='title'
          id='lib-title'
        />
        <label htmlFor='lib-version'>Current Version</label>
        <input
          onChange={handleChange}
          type='text'
          name='version'
          id='lib-version'
        />
        <label htmlFor='lib-link-home'>Link to Homepage</label>
        <input
          onChange={handleChange}
          type='text'
          name='linkHome'
          id='lib-link-home'
        />
        <label htmlFor='lib-link-docs'>Link to Documentation</label>
        <input
          onChange={handleChange}
          type='text'
          name='linkDocs'
          id='lib-link-docs'
        />
        <div className='form-control'>
          <button type='submit'>Add new Library</button>
        </div>
      </form>
    </div>
  );
};

export default AddLibrary;
