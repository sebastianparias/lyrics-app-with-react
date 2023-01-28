import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Error from "./Error";

const CrudApi = () => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let url = "http://localhost:5000/contacts";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          setError(res);
        }

        setLoading(false);
      });
  }, [url]);

  const createData = (data) => {
    data.id = Date.now();

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    helpHttp()
      .post(url, options)
      .then((res) => {
        if (!res.err) {
          setDb([...db, res]);
        } else {
          setError(res);
        }
      });
  };

  const updateData = (data) => {
    const endpoint = `${url}/${data.id}`;

    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    helpHttp()
      .put(endpoint, options)
      .then((res) => {
        if (!res.err) {
          let newData = db.map((el) => (el.id === data.id ? data : el));
          setDb(newData);
        } else {
          setError(res);
        }
      });
  };

  const deleteData = (id) => {
    const confirmation = window.confirm(
      `Are you sure to delete the contact with id ${id}?`
    );
    if (!confirmation) return;

    const options = {
      headers: { "content-type": "application/json" },
    };
    const endpoint = `${url}/${id}`;
    helpHttp()
      .del(endpoint, options)
      .then((res) => {
        if (!res.err) {
          const newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
  };

  return (
    <div>
      <Router>
        <header>
          <h2>CRUD API with routes</h2>
          <nav>
            <NavLink to="/">See all</NavLink>
            <NavLink to="/add">Add</NavLink>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Contacts home</h2>
                {loading && <Loader />}
                {error && (
                  <Message
                    message={`Error ${error.status}: ${error.statusText}`}
                    backgroundColor="#dc3545"
                  />
                )}

                {db && (
                  <CrudTable
                    data={db}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                  />
                )}
              </>
            }
          ></Route>
          <Route
            path="/add"
            element={
              <>
                <h2>Add contact</h2>
                <CrudForm
                  createData={createData}
                  updateData={updateData}
                  dataToEdit={dataToEdit}
                  setDataToEdit={setDataToEdit}
                />
              </>
            }
          ></Route>
          <Route
            path="/edit/:id"
            element={
              <>
                <h2>Edit contact</h2>
                <CrudForm
                  createData={createData}
                  updateData={updateData}
                  dataToEdit={dataToEdit}
                  setDataToEdit={setDataToEdit}
                />
              </>
            }
          ></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default CrudApi;
