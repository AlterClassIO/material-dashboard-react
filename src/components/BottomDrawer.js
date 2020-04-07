import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// @material-ui/core components
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// @material-ui/icons components
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ArchiveIcon from '@material-ui/icons/Archive';

// styled components
const DrawerContent = styled(Grid)`
  padding: 24px 18px;
`;

const BottomDrawer = ({ num = 0 }) => (
  <Drawer
    anchor="bottom"
    variant="persistent"
    open={num > 0}
  >
    <DrawerContent
      container
      alignItems="center"
      spacing={2}
    >
      <Grid item md={3}>
        <Typography>{num} selected</Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid
          container 
          alignItems="center"
          justify="center"
          spacing={2}
        >
          <Grid item><Button startIcon={<ShareIcon />}>share</Button></Grid>
          <Grid item><Button startIcon={<ArchiveIcon />}>archive</Button></Grid>
          <Grid item><Button startIcon={<DeleteIcon />}>delete</Button></Grid>
        </Grid>
      </Grid>
    </DrawerContent>
  </Drawer>
);

BottomDrawer.propTypes = {
  selected: PropTypes.number
};

export default BottomDrawer;
