import React, { useState } from "react";

/*----------------------------VARIABLES------------------*/
const initialForm = {
  artist: "",
  song: "",
};

const Form = ({ handleSearch, handleSaveSong }) => {
  /*----------------------------STATE------------------*/

  const [form, setForm] = useState(initialForm);
  const [isDisabled, setIsDisabled] = useState(true);

  /*----------------------------FUNCTIONS------------------*/
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.artist || !form.song) {
      setIsDisabled(true);
      alert("Missing data");
      return;
    }
    handleSearch(form);
    setForm(initialForm);
    setIsDisabled(false);
  };

  /*----------------------------RENDER------------------*/
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="artist"
          placeholder="Artist name"
          onChange={handleChange}
          value={form.artist}
        />
        <input
          type="text"
          name="song"
          placeholder="Song name"
          onChange={handleChange}
          value={form.song}
        />
        <input type="submit" value="Submit" />
        <input
          type="button"
          onClick={handleSaveSong}
          value="Add song"
          disabled={isDisabled && true}
        />
      </form>
    </div>
  );
};

export default Form;
