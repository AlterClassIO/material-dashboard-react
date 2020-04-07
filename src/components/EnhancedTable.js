import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// @material-ui/core components
import { grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons components
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import ArchiveIcon from '@material-ui/icons/Archive';
// core components
//...

// styled components
const Container = styled(Paper)`
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
const menuIconStyles = css`
  margin-right: 10px;
`;
const StyledGetAppIcon = styled(GetAppIcon)`${menuIconStyles}`;
const StyledFileCopyIcon = styled(FileCopyIcon)`${menuIconStyles}`;
const StyledPictureAsPdfIcon = styled(PictureAsPdfIcon)`${menuIconStyles}`;
const StyledPrintIcon = styled(PrintIcon)`${menuIconStyles}`;
const StyledArchiveIcon = styled(ArchiveIcon)`${menuIconStyles}`;

const EnhancedTable = (props) => {
  // props
  const {
    title = "",
    data = [],
    header = [],
    excludeColumns = []
  } = props;
  // state
  const [selected, setSelected] = useState([]);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // methos to handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // methods to handle items selection
  const handleSelectItem = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
      const newSelecteds = data.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  // methods to handle menu opening/closing
  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };
  // render component
  return (
    <Container>
      <StyledToolbar>
        <Title variant="h5" id="tableTitle" component="span">{title}</Title>
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
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {header.map(item => <TableCell key={item}>{item}</TableCell>)}
              <TableCell>Actions</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow
                    key={row.id}
                    hover
                    role="checkbox"
                  >
                    <TableCell 
                      padding="checkbox"
                      onClick={e => handleSelectItem(row.id)}
                    >
                      <Checkbox checked={isSelected(row.id)} />
                    </TableCell>
                    {
                      Object.entries(row).map((column, id) => {
                        if (excludeColumns.indexOf(column[0]) !== -1) {
                          return null;
                        }
                        return (
                          <TableCell key={id}>{column[1]}</TableCell>
                        );
                      })
                    }
                    <TableCell>
                      <Button variant="outlined" color="primary">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  );
};

EnhancedTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  header: PropTypes.array,
  excludeColumns: PropTypes.array
};

export default EnhancedTable;
