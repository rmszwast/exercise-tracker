import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddExercise() {
  const [name, setName] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [unit, setUnit] = useState('lbs');
  const [date, setDate] = useState();

  const navigate = useNavigate();

  async function onSave() {
    const newExercise = {name, reps, weight, unit, date};

    const response = await fetch('/exercises', {
      method: 'POST', 
      body: JSON.stringify(newExercise),
      headers: {'Content-Type': 'application/json'}
    })

    if (response.status === 201) {
      alert('Successfully added exercise')
      navigate('/');
    } else {
      alert(`Failed to add exercise. Status code = ${response.status}`)
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
              <input type='text' onChange={e => setName(e.target.value)} />
            </td>
            <td>
              <input type='number' onChange={e => setReps(e.target.value)} />
            </td>
            <td>
              <input type='number' onChange={e => setWeight(e.target.value)} />
            </td>
            <td>
              <select name='unit' onChange={e => setUnit(e.target.value)}>
                <option value='lbs'>lbs</option>
                <option value='kgs'>kgs</option>
              </select>
            </td>
            <td>
              <input type='text' placeholder='MM-DD-YY' onChange={e => setDate(e.target.value)} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type='button' onClick={()=> onSave()}>Save</button>
    </form>
  );
}

export default AddExercise;
