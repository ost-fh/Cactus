import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { postNewVersion } from "../../../shared/services/api";
import "./add-version.css";
import Alert from "../../../shared/components/alert";

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
    event.preventDefault();
    setFormState(state.loading);
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
      {formState !== state.success && (
        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor='newVersionNumber'>New Version Number:</label>
          <input
            id='newVersionNumber'
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
      )}
      {formState === state.loading && (
        <Alert type='info' message='loading...' />
      )}
      {formState === state.error && (
        <Alert type='error' message='something went wrong' />
      )}
      {formState === state.success && (
        <>
          <Alert type='success' message='new version created!' />
          <button onClick={toggleForm}>Close</button>
        </>
      )}
    </div>
  ) : (
    <button onClick={toggleForm}>Add new Version...</button>
  );
};

export default AddVersion;
