import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md'

function Row({exercise, onEdit, onDelete}) {
  return(
    <tr>
      <td className='name'>{exercise.name}</td>
      <td className='number'>{exercise.reps}</td>
      <td className='number'>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td><MdEdit className='click' onClick={() => onEdit(exercise)} /></td>
      <td><MdDeleteForever className='click' onClick={() => onDelete(exercise._id)}/></td>
    </tr>
  );
}

export default Row;
