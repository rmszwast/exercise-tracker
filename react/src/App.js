import './App.css';
import { LuDumbbell } from 'react-icons/lu'
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AddExercise from './pages/AddExercise';
import EditExercise from './pages/EditExercise';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker<LuDumbbell /></h1>
        <p>Full Stack MERN App Demonstration</p>
      </header>

      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
          <Route path='/add' element={<AddExercise />} />
          <Route path='/edit' element={<EditExercise exerciseToEdit={exerciseToEdit} />} />
        </Routes>
      </Router>

      <footer>
      </footer>
    </div>
  );
}

export default App;
