import React, { useState } from 'react';
import styled, { css } from 'styled-components';
// @material-ui/core components
import { grey, amber } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
// @material-ui/icons components
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// core components
//...

// styled components
const StyledPaper = styled(Paper)`
  margin-top: 24px;
`;
const StyledTableHead = styled(TableHead)`
  background-color: ${grey[50]};
  border-top: 1px solid rgba(224, 224, 224, 1);
`;
const Title = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
`;
const iconStyles = css`
  color: ${amber[400]};
`;
const StyledStarIcon = styled(StarIcon)`${iconStyles}`;
const StyledStarHalfIcon = styled(StarHalfIcon)`${iconStyles}`;

const customers = [
  { 
    name: "Robert DeNiro",
    location: "Los Angeles, USA",
    spent: 4500,
    rating: 4.5
  },
  {
    name: "Al Pacino",
    location: "San Francisco, USA",
    spent: 300,
    rating: 4
  },
  { 
    name: "Pierre Niney",
    location: "Paris, France",
    spent: 2600,
    rating: 3.5
  },
];

const Customers = () => {
  // state
  const [selected, setSelected] = useState([]);
  
  const handleSelectItem = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = customers.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // render component
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Management</Typography>
      <Typography variant="h5" component="h1">Customers</Typography>
    </>
  );
  const renderRatingStars = (rating) => {
    let stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<StyledStarIcon />);
    }
    if (rating - Math.floor(rating) > 0) {
      stars.push(<StyledStarHalfIcon />);
    }
    while (stars.length < 5) {
      stars.push(<StarBorderIcon />);
    }
    return stars;
  };
  const renderTable = () => (
    <StyledPaper>
      <Toolbar>
        <Title variant="h5" id="tableTitle" component="span">
          All customers
        </Title>
      </Toolbar>
      <TableContainer>
        <Table>
        <StyledTableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < customers.length}
                checked={customers.length > 0 && selected.length === customers.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Total Spent</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {customers.map(customer => (
            <TableRow
              key={customer.name}
              hover
              onClick={e => handleSelectItem(customer.name)}
              role="checkbox"
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isSelected(customer.name)} />
              </TableCell>
              <TableCell component="th" scope="row">
                {customer.name}
              </TableCell>
              <TableCell>{customer.location}</TableCell>
              <TableCell>${customer.spent.toFixed(2)}</TableCell>
              <TableCell>{renderRatingStars(customer.rating)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </StyledPaper>
  );
  return (
    <>
      {renderHeader()}
      {renderTable()}
    </>
  );
};

export default Customers;
