import React from 'react';
import CrudTableRow from './CrudTableRow';

const CrudTable = ({ data, setDataToEdit, deleteData }) => {

// how can I check if a variable is an array in javascript?

  return (
    <div>
      <h3>Datatable</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!Array.isArray(data) ? <tr><td colSpan="3">Sin datos</td></tr> : data.map(el => <CrudTableRow key={el.id} el={el} setDataToEdit={setDataToEdit} deleteData={deleteData} />)}
        </tbody>
      </table>
    </div>
  );
}

export default CrudTable;