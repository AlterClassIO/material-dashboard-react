import React from "react";
import styled from 'styled-components';
// @material-ui/core components
import { teal, amber, red, indigo, grey } from '@material-ui/core/colors';
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ProfileIcon from '@material-ui/icons/PermContactCalendar';
import EmailIcon from '@material-ui/icons/Email';
import StarIcon from '@material-ui/icons/Star';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// styled components
const StyledPopover = styled(Popover)`  
  .MuiPopover-paper {
    width: 380px;
  }
  .MuiPaper-rounded {
    border-radius: 0px;
  }
`;
const Header = styled.header`
  padding: 24px;
`;
const Main = styled.main``;
const Footer = styled.footer`
  padding: 16px 24px;
`;
const Name = styled(Typography)`
  font-weight: 500;
  font-size: 1.1rem;
`;
const StyledList = styled(List)`
  padding-top: 0px;
  padding-bottom: 0px;
`;
const StyledListItem = styled(ListItem)`
  padding-left: 24px;
  padding-right: 24px;
`;
const StyledProfileIcon = styled(ProfileIcon)`
  color: ${teal[300]};
`;
const StyledEmailIcon = styled(EmailIcon)`
  color: ${amber[300]};
`;
const StyledStarIcon = styled(StarIcon)`
  color: ${red[400]};
`;
const StyledAssignmentIcon = styled(AssignmentIcon)`
  color: ${indigo[400]};
`;
const StyledNavigateNextIcon = styled(NavigateNextIcon)`
  color: ${grey[400]};
`;

// main component
const ProfilePopover = (props) => {
  const items = [
    {
      primary: "My Profile",
      secondary: "Account settings and more",
      icon: <StyledProfileIcon />
    },
    {
      primary: "My Messages",
      secondary: "Inbox and chat",
      icon: <StyledEmailIcon />
    },
    {
      primary: "My Activities",
      secondary: "Logs and notifications",
      icon: <StyledStarIcon />
    },
    {
      primary: "My Tasks",
      secondary: "Latest tasks and projects",
      icon: <StyledAssignmentIcon />
    },
  ];
  // render component
  return (
    <StyledPopover {...props}>
      <Header>
        <Grid
          container
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Name variant="subtitle1" noWrap>Marion Cotillard</Name>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
            >
              23 messages
            </Button>
          </Grid>
        </Grid>
      </Header>
      <Divider />
      <Main>
        <StyledList dense={true}>
          {
            items.map(item => (
              <React.Fragment key={item.primary}>
                <StyledListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                  />
                  <StyledNavigateNextIcon />
                </StyledListItem>
                <Divider />
              </React.Fragment>
            ))
          }
        </StyledList>
      </Main>
      <Footer>
        <Button
          variant="contained"
          color="primary"
          size="small"
        >
          Sign out
        </Button>
      </Footer>
    </StyledPopover>
  );
};

export default ProfilePopover;
