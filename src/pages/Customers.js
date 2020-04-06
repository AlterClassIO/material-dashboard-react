import React from 'react';
import styled from 'styled-components';
// @material-ui/core components
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// core components
//...

// styled components
const StyledTableContainer = styled(TableContainer)`
  margin-top: 24px;
`;

const customers = [
  { name: "Robert DeNiro", location: "Los Angeles, USA", spent: 450, rating: 4 },
  { name: "Al Pacino", location: "San Francisco, USA", spent: 450, rating: 4 },
  { name: "Pierre Niney", location: "Paris, France", spent: 450, rating: 4 },
];

const Customers = () => {
  // render component
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Management</Typography>
      <Typography variant="h5" component="h1">Customers</Typography>
    </>
  );
  const renderTable = () => (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Total Spent</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(customer => (
            <TableRow key={customer.name}>
              <TableCell component="th" scope="row">
                {customer.name}
              </TableCell>
              <TableCell>{customer.location}</TableCell>
              <TableCell>{customer.spent}</TableCell>
              <TableCell>{customer.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
  return (
    <>
      {renderHeader()}
      {renderTable()}
    </>
  );
};

export default Customers;
