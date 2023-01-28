import React from "react";
import { useNavigate } from "react-router-dom";

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { name, phone, id } = el;

  let navigate = useNavigate();

  const handleEdit = () => {
    setDataToEdit(el);
    navigate(`edit/${id}`)
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{phone}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => deleteData(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
