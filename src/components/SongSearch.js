import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Details from "./SongDetails";
import Form from "./SongForm";
import Loader from "./Loader";
import Message from "./Message";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Error from "./Error";
import SongTable from "./SongTable";
import SongPage from "../pages/SongPage";

const mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || [];

const Search = () => {
  /*----------------------------STATE------------------*/
  const [search, setSearch] = useState(null);
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mySongs, setMySongs] = useState(mySongsInit);

  useEffect(() => {
    if (search === null) return;

    const fetchData = async () => {
      const { artist, song } = search;
      const songUrl = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${song}&q_artist=${artist}&apikey=1dcb33f994869c84929b1144b0039df6`;

      setLoading(true);

      try {
        await helpHttp()
          .get(songUrl)
          .then((res) => {
            setLoading(false);
            if (res.message.header.status_code === 404) {
              setErrorMessage(
                "This song couldn't be found, please try another."
              );
              setError(true);
              setLyrics(null);
            } else {
              setError(false);
              const songLyrics = res.message.body.lyrics.lyrics_body;
              setLyrics(songLyrics);
            }
          });
      } catch (err) {
        setErrorMessage(
          "Failed to establish a connection to the lyrics server."
        );
        setError(true);
        setLyrics(null);
      }
    };

    fetchData();

    localStorage.setItem("mySongs", JSON.stringify(mySongs));
  }, [search, mySongs]);

  /*----------------------FUNCTIONS-------------------- */
  const handleSearch = (data) => {
    setSearch(data);
  };

  const handleSaveSong = () => {
    const currentSong = {
      search,
      lyrics,
    };
    setMySongs((mySongs) => [...mySongs, currentSong]);
    setSearch(null);
    const songs = [...mySongs, currentSong];
    localStorage.setItem("mySongs", JSON.stringify(songs));
  };

  const handleDeleteSong = (id) => {
    const isDelete = window.confirm(
      `Are you sure to delete the song with id ${id}?`
    );
    if (!isDelete) return;
    let songs = mySongs.filter((el, index) => id !== index);
    setMySongs(songs);
    localStorage.setItem("mySongs", JSON.stringify(songs));
  };

  /*--------------------------RENDER---------------------- */
  return (
    <div>
      <Router>
        <header>
          <h2>Song search</h2>
          <Link to="/">Home</Link>
        </header>

        {loading && <Loader />}
        {error && <Message message={errorMessage} backgroundColor="#dc3545" />}

        {/* ----------------------ROUTES--------------------- */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Form
                  handleSearch={handleSearch}
                  handleSaveSong={handleSaveSong}
                />
                <SongTable
                  mySongs={mySongs}
                  handleDeleteSong={handleDeleteSong}
                />

                {search && !loading && (
                  <Details search={search} lyrics={lyrics} />
                )}
              </>
            }
          ></Route>

          <Route
            path="/songs/:id"
            element={<SongPage mySongs={mySongs} />}
          ></Route>

          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Search;
