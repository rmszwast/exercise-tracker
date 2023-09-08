import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import { Link, useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {

  const [exercises, setExercises] = useState([]);

  const navigate = useNavigate();

  async function loadExercises() {
    const response = await fetch('/exercises');
    const data = await response.json();
    setExercises(data);
  }

  function onEdit(exercise) {
    setExerciseToEdit(exercise);
    navigate('/edit');
  }

  async function onDelete(id) {
    const delResponse = await fetch(`/exercises/${id}`, {method: 'DELETE'});
    if (delResponse.status === 204) {
      const getResponse = await fetch('exercises');
      const data = await getResponse.json();
      setExercises(data);
    }
  }

  useEffect(() => {
    loadExercises();
  }, []);

  return(
    <>
      <Table  exercises={exercises} onEdit={onEdit} onDelete={onDelete} />
      <br />
      <Link to='/add'>Add Exercise</Link>
    </>
  );
}

export default HomePage;
