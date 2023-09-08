import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return(
    <p>
    <Link to='/'>Home</Link><br />
    <Link to='/add'>Add Exercise</Link><br />
    </p>
  );
}

export default Navigation;
