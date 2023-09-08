import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditExercise({exerciseToEdit}) {
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const navigate = useNavigate();

  async function onSave() {
    const editedExercise = {name, reps, weight, unit, date};

    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: 'PUT', 
      body: JSON.stringify(editedExercise),
      headers: {'Content-Type': 'application/json'}
    })

    if (response.status === 200) {
      alert('Successfully edited exercise')
      navigate('/');
    } else {
      alert(`Failed to edit exercise. Status code = ${response.status}`)
      navigate('/');
    }
  }

  return(
    <form>
      <table>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Reps</th>
            <th scope='col'>Weight</th>
            <th scope='col'>Unit</th>
            <th scope='col'>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <input type='text' value={name} onChange={e => setName(e.target.value)} />
            </td>
            <td>
              <input type='number' value={reps} onChange={e => setReps(e.target.value)} />
            </td>
            <td>
              <input type='number' value={weight} onChange={e => setWeight(e.target.value)} />
            </td>
            <td>
              <select name='unit' defaultValue={unit} onChange={e => setUnit(e.target.value)}>
                <option value='lbs'>lbs</option>
                <option value='kgs'>kgs</option>
              </select>
            </td>
            <td>
              <input type='text' value={date} onChange={e => setDate(e.target.value)} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type='button' onClick={()=> onSave()}>Save</button>
    </form>
  );
}

export default EditExercise;
