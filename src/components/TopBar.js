import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons components
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
// core components
import Search from '../components/Search';
import ProfileButton from '../components/ProfileButton';
import ProfilePopover from '../components/ProfilePopover';
import NotificationsPopover from '../components/NotificationsPopover';

// styled components
const StyledAppBar = styled(AppBar)`
  margin-left: ${props => props.shift}px;
  width: ${props => `calc(100% - ${props.shift}px)`};
`;
const StyledIconButton = styled(IconButton)`
  display: ${props => props.show ? 'inline-block' : 'none'};
`;
const StyledButton = styled(Button)`
  min-width: 24px;
`;

const GridContainer = ({ children, ...rest }) => (
  <Grid
    container
    spacing={1}
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
  const [profileEl, setProfileEl] = useState(null);
  const [notificationsEl, setNotificationsEl] = useState(null);
  // variables to handle popovers opening/closing
  const profileOpen = Boolean(profileEl);
  const notificationsOpen = Boolean(notificationsEl);
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
          <StyledButton color="inherit">
            <Badge
              badgeContent={4}
              color="secondary"
              onClick={e => setNotificationsEl(e.currentTarget)}
            >
              <NotificationsIcon />
            </Badge>
          </StyledButton>
          <NotificationsPopover 
            anchorEl={notificationsEl}
            open={notificationsOpen}
            onClose={() => setNotificationsEl(null)}
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
        <GridItem>
          <StyledButton color="inherit">
            <AppsIcon />
          </StyledButton>
        </GridItem>
        <GridItem>
          <ProfileButton
            text="Hi, Marion"
            alt="Marion Cotillard"
            src="/avatar.jpg"
            onClick={e => setProfileEl(e.currentTarget)}
          />
          <ProfilePopover 
            anchorEl={profileEl}
            open={profileOpen}
            onClose={() => setProfileEl(null)}
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

TopBar.propTypes = {
  title: PropTypes.string,
  showMenuIcon: PropTypes.bool,
  onClickMenu: PropTypes.func,
  shift: PropTypes.number
};

export default TopBar;
