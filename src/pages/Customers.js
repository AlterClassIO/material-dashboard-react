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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
// @material-ui/icons components
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import ArchiveIcon from '@material-ui/icons/Archive';
// core components
import Search from '../components/Search';

// styled components
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;
const StyledSearchButton = styled(Button)`
  margin-left: 10px;
`;
const StyledPaper = styled(Paper)`
  margin-top: 24px;
`;
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
const StyledTableHead = styled(TableHead)`
  background-color: ${grey[50]};
  border-top: 1px solid rgba(224, 224, 224, 1);
`;
const MenuIcon = styled(MoreVertIcon)`
  cursor: pointer;
`;
const Title = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
`;
const starIconStyles = css`
  color: ${amber[400]};
`;
const StyledStarIcon = styled(StarIcon)`${starIconStyles}`;
const StyledStarHalfIcon = styled(StarHalfIcon)`${starIconStyles}`;
const menuIconStyles = css`
  margin-right: 10px;
`;
const StyledGetAppIcon = styled(GetAppIcon)`${menuIconStyles}`;
const StyledFileCopyIcon = styled(FileCopyIcon)`${menuIconStyles}`;
const StyledPictureAsPdfIcon = styled(PictureAsPdfIcon)`${menuIconStyles}`;
const StyledPrintIcon = styled(PrintIcon)`${menuIconStyles}`;
const StyledArchiveIcon = styled(ArchiveIcon)`${menuIconStyles}`;

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
  const [anchorMenu, setAnchorMenu] = useState(null);
  // methods to handle items selection
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
  // methods to handle menu opening/closing
  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  // render component
  const renderHeader = () => (
    <>
      <Typography variant="overline" component="h2">Management</Typography>
      <Typography variant="h5" component="h1">Customers</Typography>
    </>
  );
  const renderSearch = () => (
    <SearchContainer>
      <Search 
        bgColor="#fff"
        color="rgba(0, 0, 0, 0.87)"
        elevation={1}
      />
      <StyledSearchButton
        variant="contained"
        color="secondary"
      >
        Search
      </StyledSearchButton>
    </SearchContainer>
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
      <StyledToolbar>
        <Title variant="h5" id="tableTitle" component="span">
          All customers
        </Title>
        <MenuIcon onClick={handleMenuClick} />
        <Menu
          anchorEl={anchorMenu}
          keepMounted
          open={Boolean(anchorMenu)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}><StyledGetAppIcon /> Import</MenuItem>
          <MenuItem onClick={handleMenuClose}><StyledFileCopyIcon /> Copy to clipboard</MenuItem>
          <MenuItem onClick={handleMenuClose}><StyledPictureAsPdfIcon /> Export as PDF</MenuItem>
          <MenuItem onClick={handleMenuClose}><StyledPrintIcon /> Print</MenuItem>
          <MenuItem onClick={handleMenuClose}><StyledArchiveIcon /> Archive</MenuItem>
        </Menu>
      </StyledToolbar>
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {customers.map(customer => (
            <TableRow
              key={customer.name}
              hover
              role="checkbox"
            >
              <TableCell 
                padding="checkbox"
                onClick={e => handleSelectItem(customer.name)}
              >
                <Checkbox checked={isSelected(customer.name)} />
              </TableCell>
              <TableCell component="th" scope="row">
                {customer.name}
              </TableCell>
              <TableCell>{customer.location}</TableCell>
              <TableCell>${customer.spent.toFixed(2)}</TableCell>
              <TableCell>{renderRatingStars(customer.rating)}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary">
                  View
                </Button>
              </TableCell>
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
      {renderSearch()}
      {renderTable()}
    </>
  );
};

export default Customers;
