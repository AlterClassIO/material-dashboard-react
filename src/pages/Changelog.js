import React from 'react';
// @material-ui/core components
import Typography from '@material-ui/core/Typography';

// main component
const Changelog = () => {
  return (
    <>
      <Typography variant="h5" component="h1">V0.1.0</Typography>
      <Typography variant="body1">04/25/2020</Typography>
      <ul>
        <li>Initial Development Release</li>
        <li>Added Material-UI as base framework</li>
        <li>Created basic admin dashboard</li>
      </ul>
    </>
  );
};

export default Changelog;
