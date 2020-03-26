import React from "react";
import styled from 'styled-components';
// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons components
import MenuIcon from '@material-ui/icons/Menu';
// core components
import Search from '../components/Search';
import ProfileButton from '../components/ProfileButton';
import ProfilePopover from '../components/ProfilePopover';

// styled components
const StyledAppBar = styled(AppBar)`
  margin-left: ${props => props.shift}px;
  width: ${props => `calc(100% - ${props.shift}px)`};
`;
const StyledIconButton = styled(IconButton)`
  display: ${props => props.show ? 'inline-block' : 'none'};
`;

const GridContainer = ({ children, ...rest }) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justify="space-between"
    {...rest}
  >
    {children}
  </Grid>
);
const GridItem = ({ children, ...rest }) => (
  <Grid item {...rest}>{children}</Grid>
);

// main component
const TopBar = (props) => {
  // props
  const {
    title = "Dashboard",
    showMenuIcon = true,
    onClickMenu = () => null,
    shift = 0
  } = props;
  //state
  const [anchorEl, setAnchorEl] = React.useState(null);
  // functions to handle profile popover opening/closing
  const open = Boolean(anchorEl);
  const handleProfilePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleProfilePopoverClose = () => {
    setAnchorEl(null);
  };
  // render component
  const renderLeftAppBarContent = () => (
    <GridItem>
      <GridContainer>
        <GridItem>
          <StyledIconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onClickMenu}
            edge="start"
            show={showMenuIcon ? 1 : 0}
          >
            <MenuIcon />
          </StyledIconButton>
        </GridItem>
        <GridItem>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </GridItem>
      </GridContainer>
    </GridItem>
  );
  const renderRightAppBarContent = () => (
    <GridItem>
      <GridContainer>
        <GridItem>
          <Search />
        </GridItem>
        <GridItem>
          <ProfileButton
            text="Hi, Marion"
            alt="Marion Cotillard"
            src="/avatar.jpg"
            onClick={handleProfilePopoverOpen}
          />
          <ProfilePopover 
            anchorEl={anchorEl}
            open={open}
            onClose={handleProfilePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          />
        </GridItem>
      </GridContainer>
    </GridItem>
  );
  return (
    <StyledAppBar 
      position="fixed" 
      shift={shift}
    >
      <Toolbar>
        <GridContainer>
          {renderLeftAppBarContent()}
          {renderRightAppBarContent()}
        </GridContainer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;
