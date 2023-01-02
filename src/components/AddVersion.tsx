import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { postNewVersion } from "../services/api";
import "./addversion.css";
import Alert from "./Alert";

type AddVersionProps = {
  libraryId: string;
  changeVersion: Function;
};

const AddVersion = ({ libraryId, changeVersion }: AddVersionProps) => {
  const userData = useContext(UserContext);
  const [newVersionNumber, setNewVersionNumber] = useState("");

  enum state {
    new,
    error,
    loading,
    success,
  }
  const [formState, setFormState] = useState(state.new);
  const [formOpen, setFormOpen] = useState(false);
  const toggleForm = () => {
    setFormOpen(!formOpen);
    setNewVersionNumber("");
    setFormState(state.new);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setFormState(state.loading);
    event.preventDefault();
    postNewVersion(newVersionNumber, libraryId, userData!.token)
      .then(() => {
        setFormState(state.success);
        changeVersion(newVersionNumber);
      })
      .catch((error) => {
        console.error(error);
        setFormState(state.error);
      });
  };

  return formOpen ? (
    <div className='add-version-form'>
      <form className='form' onSubmit={handleSubmit}>
        <label>New Version Number:</label>
        <input
          autoFocus
          required
          onChange={(e) => setNewVersionNumber(e.target.value)}
          type='text'
          value={newVersionNumber}
        />
        <button onClick={toggleForm}>Cancel</button>
        <button
          className='button-primary'
          disabled={formState === state.loading}
          type='submit'
        >
          Save new Version
        </button>
      </form>
      {formState === state.loading && (
        <Alert type='info' message='loading...' />
      )}
      {formState === state.error && (
        <Alert type='error' message='something went wrong' />
      )}
      {formState === state.success && (
        <Alert type='success' message='new version created!' />
      )}
    </div>
  ) : (
    <button onClick={toggleForm}>Add new Version...</button>
  );
};

export default AddVersion;
