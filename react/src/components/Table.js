import React from 'react';
import Row from './Row';

function Table({exercises, onEdit, onDelete}) {
  return(
    <table>
      <thead>
        <tr>
          <th className='name' scope='col'>Name</th>
          <th scope='col'>Reps</th>
          <th scope='col'>Weight</th>
          <th scope='col'>Unit</th>
          <th scope='col'>Date</th>
        </tr>
      </thead>

      <tbody>
        {exercises.map((exercise, i) => <Row exercise={exercise} onEdit={onEdit} onDelete={onDelete} key={i} />)}
      </tbody>
    </table>
  );
}

export default Table;
